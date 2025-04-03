// TrainingsView.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboardStyles/trainings.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TrainingsView = () => {
  const [formData, setFormData] = useState({
    trainingName: '',
    trainingObjective: '',
    trainingDuration: '',
    trainingMode: 'Online',
    trainingRequirements: '',
    departmentId: ''
  });

  const [departments, setDepartments] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const trainingsPerPage = 2;

  const fetchDepartments = async () => {
    const res = await axios.get('http://localhost:5009/departments/fetchDept');
    setDepartments(res.data);
  };

  const fetchTrainings = async () => {
    const res = await axios.get('http://localhost:5009/programs/allTrainings');
    setTrainings(res.data.data);
  };

  useEffect(() => {
    fetchDepartments();
    fetchTrainings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5009/programs/updateTrainings/${editId}`, formData);
      } else {
        await axios.post('http://localhost:5009/programs/createTrainings', formData);
      }
      setFormData({ trainingName: '', trainingObjective: '', trainingDuration: '', trainingMode: 'Online', trainingRequirements: '', departmentId: '' });
      setEditId(null);
      fetchTrainings();
    } catch (err) {
      console.error("Error submitting training:", err);
    }
  };

  const handleEdit = (training) => {
    setEditId(training._id);
    setFormData({
      trainingName: training.trainingName,
      trainingObjective: training.trainingObjective,
      trainingDuration: training.trainingDuration,
      trainingMode: training.trainingMode,
      trainingRequirements: training.trainingRequirements,
      departmentId: training.departmentId?._id || training.departmentId
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5009/programs/deleteTrainings/${id}`);
    fetchTrainings();
  };

  const filteredTrainings = trainings.filter(t =>
    t.trainingName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentTrainings = filteredTrainings.slice((currentPage - 1) * trainingsPerPage, currentPage * trainingsPerPage);
  const totalPages = Math.ceil(filteredTrainings.length / trainingsPerPage);

  return (
    <div className="trainings-form-container">
      <h2>Add Training</h2>
      <form className="trainings-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <input type="text" name="trainingName" placeholder="Training Name" value={formData.trainingName} onChange={handleChange} required />
          <select name="departmentId" value={formData.departmentId} onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept._id} value={dept._id}>{dept.name}</option>
            ))}
          </select>
        </div>

        <input type="text" className='new-input' name="trainingObjective" placeholder="Objective" value={formData.trainingObjective} onChange={handleChange} required />
        <input type="text" className='new-input' name="trainingDuration" placeholder="Duration" value={formData.trainingDuration} onChange={handleChange} required />

        <select name="trainingMode" value={formData.trainingMode} onChange={handleChange} required>
          <option value="Online">Online</option>
          <option value="Onsite">Onsite</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <textarea className='new-inputs' name="trainingRequirements" placeholder="Requirements" value={formData.trainingRequirements} onChange={handleChange} required />

        <div className="buttons">
          <button type="reset" className="cancel-btn">Cancel</button>
          <button type="submit" className="submit-btn">Save Training</button>
        </div>
      </form>

      <div className="trainings-list">
        <input type="text" placeholder="Search trainings..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        <ul>
          {currentTrainings.map(training => (
            <li key={training._id} className="trainings-card">
              <h3>{training.trainingName}</h3>
              <p>
                <strong>{training.departmentId?.name || 'No department'}</strong> — {training.trainingMode} — {training.trainingDuration}
              </p>
              <div className="actions">
                <button onClick={() => handleEdit(training)}><FaEdit color='#007bff' /></button>
                <button onClick={() => handleDelete(training._id)}><MdDelete color='red' /></button>
              </div>
            </li>
          ))}
        </ul>

        <div className="pagination">
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
          <span>{currentPage}</span>
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default TrainingsView;
