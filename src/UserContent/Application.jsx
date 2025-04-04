import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userStyles/apply.css';
import { useNavigate } from 'react-router-dom';

const ApplyPage = () => {
  const [formFields, setFormFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('selectedJob');
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("🌟 Selected Item:", parsed);
      setSelectedJob(parsed);
      fetchForm(parsed.vacancyType);
    }
  }, []);

  const fetchForm = async (type) => {
    if (!type) {
      console.error("❌ Missing vacancyType for form fetch");
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:5009/formBuild/blueprint/${type}`);
      if (response.data?.fields) {
        setFormFields(response.data.fields);
      } else {
        console.warn("⚠️ No form fields returned.");
      }
    } catch (error) {
      console.error('❌ Error loading form:', error);
    }
  };
  

  const handleChange = (e, fieldName) => {
    const { type, checked, value, files } = e.target;
    setFormValues({
      ...formValues,
      [fieldName]: type === 'checkbox' ? checked : files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const [key, value] of Object.entries(formValues)) {
      data.append(key, value);
    }
    data.append('jobId', selectedJob?._id);
    data.append('vacancyType', selectedJob?.vacancyType);
    data.append('jobTitle', selectedJob?.title || selectedJob?.eventName || selectedJob?.trainingName || ''); // smart fallback
    data.append('department', selectedJob?.department?.name || ''); // in case it's available

    try {
      await axios.post('http://localhost:5009/submissions/formCreate', data);
      alert('✅ Application submitted!');
      navigate('/welcome');
    } catch (err) {
      console.error('❌ Submission failed:', err);
      alert('Submission failed');
    }
  };

  return (
    <section className="apply-section">
      <h2>Apply for Opportunity</h2>

      {selectedJob && (
        <div className="job-info-banner">
          <p><strong>Type:</strong> {selectedJob.vacancyType}</p>
          <p><strong>Title:</strong> {selectedJob.title || selectedJob.eventName || selectedJob.trainingName}</p>
          {selectedJob?.department?.name && (
            <p><strong>Department:</strong> {selectedJob.department.name}</p>
          )}
        </div>
      )}

      <form className="apply-form" onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index} className="form-group">
            <label>{field.label}{field.required && '*'}</label>
            {field.type === 'text' && (
              <input
                type="text"
                placeholder={field.placeholder}
                required={field.required}
                onChange={(e) => handleChange(e, field.label)}
              />
            )}
            {field.type === 'textarea' && (
              <textarea
                placeholder={field.placeholder}
                required={field.required}
                onChange={(e) => handleChange(e, field.label)}
              ></textarea>
            )}
            {field.type === 'file' && (
              <input
                type="file"
                required={field.required}
                onChange={(e) => handleChange(e, field.label)}
              />
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default ApplyPage;
