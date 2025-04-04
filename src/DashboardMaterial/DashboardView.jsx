import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Settings from './Settings';
import Applications from './Applications';
import Users from './Users';
import './dashboardStyles/dashboardView.css';
import DepartmentsView from './Department';
import JobPositionForm from './JobPositions';
import FormBuilder from './FormBuilder';
import EventsView from './Events';
import TrainingsView from './TrainingsView';
function DashboardView() {
  const [activeSection, setActiveSection] = useState("dashboard"); 

  const arrayCards = [
    { title: 'IT department', value: 1200, text: 'Total for this month' },
    { title: 'Finance department', value: 1200, text: 'Total for this month' },
    { title: 'Business department', value: 1200, text: 'Total for this month' },
    { title: 'Sales department', value: 3000, text: 'Total for this month' },
  ];

  // Sample data for charts
  const applicationsData = [
    { month: "Jan", submitted: 20, onHold: 10 },
    { month: "Feb", submitted: 30, onHold: 15 },
    { month: "March", submitted: 45, onHold: 25 },
    { month: "April", submitted: 50, onHold: 30 },
    { month: "May", submitted: 40, onHold: 35 },
    { month: "June", submitted: 48, onHold: 38 },
  ];

  const pendingApplicationsData = [
    { month: "Jan", inProgress: 15, underReview: 8 },
    { month: "Feb", inProgress: 25, underReview: 12 },
    { month: "March", inProgress: 35, underReview: 20 },
    { month: "April", inProgress: 45, underReview: 28 },
    { month: "May", inProgress: 38, underReview: 30 },
    { month: "June", inProgress: 50, underReview: 32 },
  ];

  return (
    <div className='view-container'>
      <Sidebar setActiveSection={setActiveSection} />

      <div className='content'>
        {activeSection === "dashboard" && (
          <>
            {/* Graphs Section */}
            <div className="charts-container">
              <div className="charts-box">
                <h3>Total Applications</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={applicationsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="onHold" stroke="gold" strokeWidth={2} />
                    <Line type="monotone" dataKey="submitted" stroke="black" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="charts-box">
                <h3>Pending Applications</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={pendingApplicationsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="inProgress" stroke="gold" strokeWidth={2} />
                    <Line type="monotone" dataKey="underReview" stroke="black" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* This Month Overview */}
            <div className="overview-container">
              <h3>This Month <span className="view-details">View details</span></h3>
              <p>Department: IT</p>
              <table className="overview-table">
                <tbody>
                  <tr><td>Software Engineering</td><td>4238</td></tr>
                  <tr><td>Data Scientist</td><td>1005</td></tr>
                  <tr><td>UX Design</td><td>914</td></tr>
                  <tr><td>Pending</td><td>281</td></tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeSection === "settings" && <Settings />}
        {activeSection === "applications" && <Applications />} 
        {activeSection === "departments" && <DepartmentsView />}
        {activeSection === "jobPositions" && <JobPositionForm />}
        {activeSection === "formBuilder" && <FormBuilder />}
        {activeSection === "events" && <EventsView />}
        {activeSection === "trainings" && <TrainingsView />}

      </div>
    </div>
  );
}

export default DashboardView;
