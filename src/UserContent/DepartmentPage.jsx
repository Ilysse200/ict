import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './userStyles/department.css';

const DepartmentsPage = () => {
  const [groupedDepartments, setGroupedDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5009/jobs/displayJobs');
        const jobs = response.data;

        // Group by department name
        const grouped = jobs.reduce((acc, job) => {
          const deptName = job.department?.name || 'Unknown Department';
          if (!acc[deptName]) {
            acc[deptName] = [];
          }
          acc[deptName].push({ title: job.title, _id: job._id });
          return acc;
        }, {});

        // Convert to array for rendering
        const departmentList = Object.entries(grouped).map(([department, jobPositions]) => ({
          department,
          jobPositions,
        }));

        setGroupedDepartments(departmentList);
      } catch (error) {
        console.error('Error fetching job positions:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (department, jobPosition) => {
    sessionStorage.setItem(
      'selectedJob',
      JSON.stringify({
        department,
        jobId: jobPosition._id,
        jobTitle: jobPosition.title // ✅ must be the correct MongoDB _id
      })
    );
    navigate('/apply');
  };

  return (
    <section className="departments" id="departments">
      <h2>Explore Job Opportunities</h2>
      <div className="department-grid">
        {groupedDepartments.map((dept, index) => (
          <div className="department-card" key={index}>
            <h3>{dept.department}</h3>
            <div className="job-list">
              {dept.jobPositions.map((job, jIndex) => (
                <div
                  key={jIndex}
                  className="job-card"
                  onClick={() => handleJobClick(dept.department, job)}
                >
                  {job.title} ➤
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DepartmentsPage;
