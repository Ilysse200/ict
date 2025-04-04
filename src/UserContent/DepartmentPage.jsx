import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './userStyles/department.css';

const DepartmentsPage = () => {
  const [vacancies, setVacancies] = useState({ Events: [], Trainings: [], Jobs: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [jobsRes, trainingsRes, eventsRes] = await Promise.all([
          axios.get('http://localhost:5009/jobs/displayJobs'),
          axios.get('http://localhost:5009/programs/allTrainings'),
          axios.get('http://localhost:5009/eventsVacancy/fetchEvent')
        ]);

        const jobs = jobsRes.data.data || jobsRes.data;
        const trainings = trainingsRes.data.data || trainingsRes.data;
        const events = eventsRes.data.data || eventsRes.data;

        console.log("🟡 Jobs:", jobs);
        console.log("🔵 Trainings:", trainings);
        console.log("🔴 Events:", events);

        const filterByVacancy = (data, type) => {
          if (!Array.isArray(data)) return [];
        
          return data.filter((item) => {
            console.log('🔍 Checking item:', item); // Full item
            console.log('➡️  item.department:', item.department); // Populated department
            console.log('➡️  item.department.vacancyType:', item?.department?.vacancyType); // The target
            return item?.department?.vacancyType === type;
          });
        };
        

        setVacancies({
          Events: filterByVacancy(events, 'Events'),
          Trainings: filterByVacancy(trainings, 'Trainings'),
          Jobs: filterByVacancy(jobs, 'Jobs')
        });

      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };

    fetchAll();
  }, []);

  const handleClick = (type, item) => {
    const enriched = {
      ...item,
      vacancyType: type,
      vacancyId: item._id, // Alias for clarity
      jobTitle: item.title || item.eventName || item.trainingName || 'Unknown',
    };
    sessionStorage.setItem('selectedJob', JSON.stringify(enriched));
    navigate('/apply');
  };

  return (
    <section className="departments" id="departments">
      <h2>Explore our Events</h2>
      <div className="department-grid">
        {vacancies.Events.map((event, index) => (
          <div key={index} className="job-card" onClick={() => handleClick('Events', event)}>
            {event.eventName}
          </div>
        ))}
      </div>

      <h2>Explore our Trainings</h2>
      <div className="department-grid">
        {vacancies.Trainings.map((training, index) => (
          <div key={index} className="job-card" onClick={() => handleClick('Trainings', training)}>
            {training.trainingName}
          </div>
        ))}
      </div>

      <h2>Explore our Jobs</h2>
      <div className="department-grid">
        {vacancies.Jobs.map((job, index) => (
          <div key={index} className="job-card" onClick={() => handleClick('Jobs', job)}>
            {job.title}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DepartmentsPage;
