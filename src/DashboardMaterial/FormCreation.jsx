import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./dashboardStyles/formCreation.css";

const FormCreation = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [departments, setDepartments] = useState([]); // Store fetched department options

  // Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
       
        const response = await axios.get("http://localhost:5009/forms/getdepartment");
        
        console.log("API Response:", response.data.data); 
        
        setDepartments(response.data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
  
    fetchDepartments();
  },[]);

  // Handle form submission
  const onSubmit = async (data) => {
    if (!data.termsAccepted) {
      alert("You must accept the terms and conditions!");
      return;
    }
  };

  return (
    <div className="form-container">
      <h2>Create Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Input */}
        <label>Name:</label>
        <input type="text" {...register("name", { required: "Name is required" })} placeholder="Enter full name" />
        {errors.name && <p className="error">{errors.name.message}</p>}

        {/* Email Input */}
        <label>Email:</label>
        <input type="email" {...register("email", { required: "Email is required" })} placeholder="Enter email address" />
        {errors.email && <p className="error">{errors.email.message}</p>}

        {/* Phone Number Input */}
        <label>Phone Number:</label>
        <input type="tel" {...register("phone", { required: "Phone number is required" })} placeholder="Enter phone number" />
        {errors.phone && <p className="error">{errors.phone.message}</p>}

        {/* Department Dropdown */}
        <label>Department:</label>
        <select {...register("department", { required: "Please select a department" })}>
          
        <option value="">Select a department</option>
  {Array.isArray(departments) && departments.length > 0 ? (
    departments.map((item, index) => (
      <option key={index} value={item}>{item}</option> // ✅ Now correctly maps options
    ))
  ) : (
    <option disabled>Loading departments...</option> // ✅ Handles cases when data is not ready
  )}
        </select>
        {errors.department && <p className="error">{errors.department.message}</p>}

        {/* Job Position Dropdown */}
        {watch("department") && (
          <>
            <label>Job Position:</label>
            <select {...register("jobPosition", { required: "Please select a job position" })}>
              <option value="">Select a job position</option>
              {jobPositions.map((job) => (
                <option key={job._id} value={job.name}>{job.name}</option>
              ))}
            </select>
            {errors.jobPosition && <p className="error">{errors.jobPosition.message}</p>}
          </>
        )}

        {/* Referral Dropdown */}
        <label>Where did you hear about us?</label>
        <select {...register("referral", { required: "Please select a referral option" })}>
          <option value="">Select an option</option>
          <option value="Social Media">Social Media</option>
          <option value="Friend or Colleague">Friend or Colleague</option>
          <option value="Online Advertisement">Online Advertisement</option>
          <option value="Search Engine">Search Engine</option>
          <option value="Other">Other</option>
        </select>
        {errors.referral && <p className="error">{errors.referral.message}</p>}

        {/* Terms & Conditions Checkbox */}
        <div className="terms-container">
          <input type="checkbox" {...register("termsAccepted", { required: "You must accept the terms and conditions" })} />
          <label>I agree to the Terms & Conditions</label>
        </div>
        {errors.termsAccepted && <p className="error">{errors.termsAccepted.message}</p>}

        {/* File Upload */}
        <label>Upload Resume:</label>
        <input type="file" {...register("resume", { required: "Please upload your resume" })} accept=".pdf,.doc,.docx" />
        {errors.resume && <p className="error">{errors.resume.message}</p>}

        {/* Submit Button */}
        <button type="submit">Create Form</button>
      </form>
    </div>
  );
};

export default FormCreation;
