import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import "./dashboardStyles/analytics.css";

const Analytics = () => {
  // Users Growth Data (Line Chart)
  const usersData = [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 400 },
    { month: "Mar", users: 700 },
    { month: "Apr", users: 1000 },
    { month: "May", users: 1500 },
    { month: "Jun", users: 2000 },
  ];

  // Total Applications Data (Bar Chart)
  const applicationsData = [
    { month: "Jan", applications: 500 },
    { month: "Feb", applications: 700 },
    { month: "Mar", applications: 800 },
    { month: "Apr", applications: 1200 },
    { month: "May", applications: 1400 },
    { month: "Jun", applications: 1600 },
  ];

  // Department Applications Data (Pie Chart)
  const departmentData = [
    { name: "IT", value: 500 },
    { name: "Finance", value: 300 },
    { name: "Business", value: 400 },
    { name: "Sales", value: 600 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="analytics-container">
      <h2>Analytics Overview</h2>

      {/* Users Growth Line Chart */}
      <div className="chart-box">
        <h3>Users Applications Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={usersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Total Applications Bar Chart */}
      <div className="chart-box">
        <h3>Total Applications Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={applicationsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="applications" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Department with High Applications Pie Chart */}
      <div className="chart-box">
        <h3>Applications by Department</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {departmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
