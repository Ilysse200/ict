import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FaBriefcase, FaWallet, FaChartPie, FaClock } from "react-icons/fa";
import "./dashboardStyles/dashboard.css";

const Dashboard = () => {
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
    <div className="dashboard-container">
      {/* Top Statistics Cards */}
      <div className="stats-cards">
        <div className="card">
          <FaBriefcase className="card-icon" />
          <div>
            <h4>IT department</h4>
            <h2>25.1k</h2>
            <p className="positive">+15%</p>
          </div>
        </div>
        <div className="card">
          <FaWallet className="card-icon" />
          <div>
            <h4>Finance department</h4>
            <h2>2,435k</h2>
            <p className="negative">-3.5%</p>
          </div>
        </div>
        <div className="card">
          <FaChartPie className="card-icon" />
          <div>
            <h4>Business department</h4>
            <h2>3.5M</h2>
            <p className="positive">+15%</p>
          </div>
        </div>
        <div className="card">
          <FaClock className="card-icon" />
          <div>
            <h4>Sales department</h4>
            <h2>43.5k</h2>
            <p className="positive">+10%</p>
          </div>
        </div>
      </div>

      {/* Total Applications Chart */}
      <div className="chart-container">
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

      {/* Pending Applications Chart */}
      <div className="chart-container">
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
    </div>
  );
};

export default Dashboard;
