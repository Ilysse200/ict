import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboardStyles/department.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export default function DepartmentsView() {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', head: '', employees: '' });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchDepartments = async () => {
    const response = await axios.get('http://localhost:5009/departments/fetchDept');
    setDepartments(response.data);
    setFilteredDepartments(response.data);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5009/departments/modifyDept/${editId}`, formData);
    } else {
      await axios.post('http://localhost:5009/departments/createDept', formData);
    }
    setFormData({ name: '', head: '', employees: '' });
    setEditId(null);
    setShowForm(false);
    fetchDepartments();
  };

  const handleEdit = (dept) => {
    setFormData({ name: dept.name, head: dept.head, employees: dept.employees });
    setEditId(dept._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5009/departments/deleteDept/${id}`);
    fetchDepartments();
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = departments.filter(dept =>
      dept.name.toLowerCase().includes(term) ||
      dept.head.toLowerCase().includes(term)
    );
    setFilteredDepartments(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDepartments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  return (
    <div className="departments-page">
      <div className="header-row">
        <h2>Vacancies Management</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>+ Add Vacancies</button>
      </div>

      <input
        type="text"
        className="search-input"
        placeholder="Search departments..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {showForm && (
        <form className="department-form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Vacancy Name" value={formData.name} onChange={handleInputChange} required />
          <input name="head" placeholder="Vacancy Type" value={formData.head} onChange={handleInputChange} required />
          <input name="employees" placeholder="Purpose" type={formData.purpose} value={formData.employees} onChange={handleInputChange} required />
          <button type="submit">{editId ? 'Update' : 'Create'}</button>
        </form>
      )}

      <div className="table-wrapper">
        <table className="departments-table">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Vacancy Type</th>
              <th>Purpose</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((dept) => (
              <tr key={dept._id}>
                <td>{dept.name}</td>
                <td>{dept.head}</td>
                <td>{dept.employees}</td>
                <td className="actions-cell">
                  <button className="icon-btn edit-btn" onClick={() => handleEdit(dept)}><FaEdit color='007bff'/></button>
                  <button className="icon-btn delete-btn" onClick={() => handleDelete(dept._id)}><MdDelete color='red'/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}