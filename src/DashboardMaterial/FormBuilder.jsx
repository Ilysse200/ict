import React, { useState } from 'react';
import './dashboardStyles/builder.css';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [vacancyType, setVacancyType] = useState('');

  const fieldTypes = [
    { type: 'text', label: 'Text Input' },
    { type: 'textarea', label: 'Textarea' },
    { type: 'checkbox', label: 'Checkbox' },
    { type: 'radio', label: 'Radio Button' },
    { type: 'dropdown', label: 'Dropdown' },
    { type: 'file', label: 'File Upload' }
  ];

  const addField = (type) => {
    const newField = {
      id: Date.now(),
      label: 'Untitled',
      placeholder: '',
      type,
      required: false,
      validation: 'none'
    };
    setFields([...fields, newField]);
  };

  const handleFieldClick = (field) => {
    setSelectedField(field);
  };

  const updateSelectedField = (key, value) => {
    if (!selectedField) return;
    const updated = fields.map((f) =>
      f.id === selectedField.id ? { ...f, [key]: value } : f
    );
    setFields(updated);
    setSelectedField({ ...selectedField, [key]: value });
  };

  const deleteField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
    if (selectedField?.id === id) setSelectedField(null);
  };

  const handleSaveForm = async () => {
    if (!vacancyType) {
      alert("Please select a vacancy type before saving the form.");
      return;
    }
    try {
      const payload = {
        vacancyType,
        fields: fields.map(({ id, ...rest }) => rest)
      };
      await axios.post('http://localhost:5009/formBuild/blueprint', payload);
      alert("Form saved successfully!");
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Failed to save form");
    }
  };

  return (
    <div className="form-builder">
      <header className="form-header">
        <h2>FormBuilder</h2>
        <div>
          <button className="preview-btn">Preview</button>
          <button className="save-btn" onClick={handleSaveForm}>Save Form</button>
        </div>
      </header>
      <div className="form-content">
        <aside className="builder-sidebar">
          <h3>Form Elements</h3>
          {fieldTypes.map((ft) => (
            <button key={ft.type} onClick={() => addField(ft.type)} className="field-button">
              {ft.label}
            </button>
          ))}
        </aside>

        <main className="builder-main">
          <h3>Form Canvas</h3>
          <div className="job-selector">
            <label>Select Vacancy Type:</label>
            <select value={vacancyType} onChange={(e) => setVacancyType(e.target.value)}>
              <option value="">-- Select Type --</option>
              <option value="Jobs">Jobs</option>
              <option value="Trainings">Trainings</option>
              <option value="Events">Events</option>
            </select>
          </div>

          <div className="form-canvas">
            <div className="drop-hint">Drag and drop form elements here</div>
            {fields.map((field) => (
              <div key={field.id} className={`field-preview ${selectedField?.id === field.id ? 'selected' : ''}`}>
                <label>{field.label}</label>
                {field.type === 'text' && <input type="text" placeholder={field.placeholder} disabled />} 
                {field.type === 'textarea' && <textarea placeholder={field.placeholder} disabled></textarea>} 
                {field.type === 'file' && <input type="file" disabled />} 
                <div className="field-actions">
                  <button onClick={() => handleFieldClick(field)}><FaEdit color='#007bff'/></button>
                  <button onClick={() => deleteField(field.id)}><MdDelete color='red'/></button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <aside className="builder-properties">
          <h3>Field Properties</h3>
          {selectedField ? (
            <div className="field-settings">
              <label>Field Label</label>
              <input
                type="text"
                value={selectedField.label}
                onChange={(e) => updateSelectedField('label', e.target.value)}
              />

              <label>Placeholder</label>
              <input
                type="text"
                value={selectedField.placeholder}
                onChange={(e) => updateSelectedField('placeholder', e.target.value)}
              />

              <label>Field Type</label>
              <select
                value={selectedField.type}
                onChange={(e) => updateSelectedField('type', e.target.value)}
              >
                {fieldTypes.map((ft) => (
                  <option key={ft.type} value={ft.type}>
                    {ft.label}
                  </option>
                ))}
              </select>

              <label>
                <input
                  type="checkbox"
                  checked={selectedField.required}
                  onChange={(e) => updateSelectedField('required', e.target.checked)}
                />{' '}
                Required field
              </label>

              <label>Validation</label>
              <select
                value={selectedField.validation}
                onChange={(e) => updateSelectedField('validation', e.target.value)}
              >
                <option value="none">None</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
              </select>
            </div>
          ) : (
            <p>Select a field to edit its properties</p>
          )}
        </aside>
      </div>
    </div>
  );
}
