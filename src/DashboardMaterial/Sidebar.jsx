import React from "react";
import { FaChartBar, FaUser, FaCog, FaSignOutAlt, FaClipboardList } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { IoIosApps } from "react-icons/io";
import "./dashboardStyles/sidebar.css";
import {Link} from "react-router-dom"

const Sidebar = ({ setActiveSection }) => {  // Accept setActiveSection as a prop
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-item" onClick={() => setActiveSection("dashboard")}>
          <FaChartBar className="sidebar-icon" />
          <span>Dashboard</span>
        </li>
        <li className="sidebar-item" onClick={() => setActiveSection("trainings")}>
          <FaClipboardList className="sidebar-icon" />
          <span>Trainings</span>
        </li>
        <li className="sidebar-item" onClick={() => setActiveSection("applications")}>
          <IoIosApps className="sidebar-icon" />
          <span>Applications</span>
        </li>
        <li className="sidebar-item" onClick={() => setActiveSection("departments")}>
          <IoIosApps className="sidebar-icon" />
          <span>Departments</span>
        </li>
        <li className="sidebar-item" onClick={() => setActiveSection("jobPositions")}>
          <IoIosApps className="sidebar-icon" />
          <span>Jobs</span>
        </li>
        <li className="sidebar-item" onClick={() => setActiveSection("formBuilder")}>
          <IoIosApps className="sidebar-icon" />
          <span>Form Builder</span>
        </li>
        <li className="sidebar-item" onClick={() => setActiveSection("events")}>
          <MdAnalytics className="sidebar-icon" />
          <span>Events</span>
        </li>
        <li className="sidebar-item" onClick={() => setActiveSection("settings")}>
          <FaCog className="sidebar-icon" />
          <span>Settings</span>
        </li>
        <Link to='/signup' className="logout-link">
        <li className="sidebar-item">
          <FaSignOutAlt className="sidebar-icon" />
          <span>Logout</span>
        </li>
        </Link>
        
      </ul>
    </div>
  );
};

export default Sidebar;
