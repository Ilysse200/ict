// JobPositionForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboardStyles/positions.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const JobPositionForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    employmentType: 'Full-time',
    description: '',
    requirements: '',
    deadline:'',
  });

  const [departments, setDepartments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 2;

  const getDepartments = async () => {
    const res = await axios.get('http://localhost:5009/departments/fetchDept');
    setDepartments(res.data);
  };

  const fetchJobs = async () => {
    const res = await axios.get('http://localhost:5009/jobs/displayJobs');
    setJobs(res.data);
  };

  useEffect(() => {
    getDepartments();
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5009/jobs/updateJobs/${editId}`, formData);
    } else {
      await axios.post('http://localhost:5009/jobs/jobCreation', formData);
    }
    setFormData({
      title: '',
      department: '',
      location: '',
      employmentType: 'Full-time',
      description: '',
      requirements: '',
      deadline: '',
    });
    setEditId(null);
    fetchJobs();
  };

  const handleEdit = (job) => {
    setEditId(job._id);
    setFormData({
      title: job.title,
      department: job.department?._id || job.department,
      location: job.location,
      employmentType: job.employmentType,
      description: job.description,
      requirements: job.requirements,
      deadline: job.deadline?.substring(0, 10) || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5009/jobs/deleteJobPosition/${id}`);
    fetchJobs();
  };

  const filteredJobs = Array.isArray(jobs)
  ? jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="job-form-container">
      <h2>Add Job Position</h2>
      <form className="job-form" onSubmit={handleSubmit}>
        <div className="row">
          <input
            type="text"
            name="title"
            placeholder="e.g. Senior Software Engineer"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
                </option>
            ))}
          </select>
        </div>

        <div className="row">
          <input
            type="text"
            name="location"
            placeholder="e.g. New York, NY"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <select name="employmentType" value={formData.employmentType} onChange={handleChange}>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <textarea
          name="description"
          placeholder="Job description..."
          value={formData.description}
          onChange={handleChange}
          required
        />

        <textarea
          name="requirements"
          placeholder="Job requirements..."
          value={formData.requirements}
          onChange={handleChange}
        />
        <div className="row">
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <div className="buttons">
          <button type="reset">Cancel</button>
          <button type="submit" className="submit-btn">Save Position</button>
        </div>
      </form>

      <div className="job-list">
        <input
          type="text"
          placeholder="Search positions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul>
          {currentJobs.map((job) => (
            <li key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p>
                <strong>{job.department?.name || 'No department'}</strong> — {job.location} — {job.employmentType}
              </p>
              <div className="actions">
                <button onClick={() => handleEdit(job)}><FaEdit color='#007bff'/></button>
                <button onClick={() => handleDelete(job._id)}><MdDelete color='red'/></button>
              </div>
            </li>
          ))}
        </ul>

        <div className="pagination">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{currentPage}</span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPositionForm;
