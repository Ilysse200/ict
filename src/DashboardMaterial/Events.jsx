// Updated EventsView.jsx with Edit/Update Feature
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboardStyles/events.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const EventsView = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    departmentId: '',
    eventLocation: '',
    eventDate: '',
    eventDescription: '',
    eventRequirements: ''
  });

  const [departments, setDepartments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 2;
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const getDepartments = async () => {
    const res = await axios.get('http://localhost:5009/departments/fetchDept');
    setDepartments(res.data);
  };

  const fetchEvents = async () => {
    const res = await axios.get('http://localhost:5009/eventsVacancy/fetchEvent');
    setEvents(res.data.data);
  };

  useEffect(() => {
    getDepartments();
    fetchEvents();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === 'departmentId') {
      setFormData({ ...formData, departmentId: value });
      const departmentInfo = departments.find(dept => dept._id === value);
      setSelectedDepartment(departmentInfo);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventPayload = { ...formData };

    try {
      if (editId) {
        await axios.put(`http://localhost:5009/eventsVacancy/updateEvent/${editId}`, eventPayload);
      } else {
        await axios.post('http://localhost:5009/eventsVacancy/eventCreate', eventPayload);
      }

      setFormData({
        eventName: '',
        departmentId: '',
        eventLocation: '',
        eventDate: '',
        eventDescription: '',
        eventRequirements: ''
      });
      setEditId(null);
      fetchEvents();
    } catch (error) {
      console.error("Event submission failed:", error);
    }
  };

  const handleEdit = (event) => {
    setEditId(event._id);
    setFormData({
      eventName: event.eventName,
      departmentId: event.departmentId?._id || event.departmentId,
      eventLocation: event.eventLocation,
      eventDate: event.eventDate?.substring(0, 10) || '',
      eventDescription: event.eventDescription,
      eventRequirements: event.eventRequirements
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5009/eventsVacancy/deleteEvent/${id}`);
    fetchEvents();
  };

  const filteredEvents = Array.isArray(events)
    ? events.filter((event) =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <div className="event-form-container">
      <h2>{editId ? 'Edit Event' : 'Add Event'}</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <div className="row">
          <input
            type="text"
            name="eventName"
            placeholder="e.g. Data Science Expo"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
          <select name="departmentId" value={formData.departmentId} onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>{dept.name}</option>
            ))}
          </select>
        </div>

        <div className="row">
          <input
            type="text"
            name="eventLocation"
            placeholder="e.g. Kigali Convention Center"
            value={formData.eventLocation}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name="eventDescription"
          placeholder="Event description..."
          value={formData.eventDescription}
          onChange={handleChange}
          required
        />

        <textarea
          name="eventRequirements"
          placeholder="Event requirements..."
          value={formData.eventRequirements}
          onChange={handleChange}
        />

        <div className="event-buttons">
          <button type="reset" className="cancel-btn" onClick={() => {
            setFormData({
              eventName: '',
              departmentId: '',
              eventLocation: '',
              eventDate: '',
              eventDescription: '',
              eventRequirements: ''
            });
            setEditId(null);
          }}>Cancel</button>
          <button type="submit" className="submit-button">{editId ? 'Update' : 'Save Event'}</button>
        </div>
      </form>

      <div className="event-list">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul>
          {currentEvents.map((event) => (
            <li key={event._id} className="event-card">
              <h3>{event.eventName}</h3>
              <p>
                <strong>{event.departmentId?.name || 'No department'}</strong> — {event.eventLocation} — {new Date(event.eventDate).toDateString()}
              </p>
              <div className="actions">
                <button onClick={() => handleEdit(event)}><FaEdit color='#007bff' /></button>
                <button onClick={() => handleDelete(event._id)}><MdDelete color='red' /></button>
              </div>
            </li>
          ))}
        </ul>

        <div className="pagination">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
          <span>{currentPage}</span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default EventsView;
