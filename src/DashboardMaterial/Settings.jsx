import React, { useState } from "react";
import { FaBell, FaEnvelope, FaGlobe, FaQuestionCircle, FaFileAlt } from "react-icons/fa";
import "./dashboardStyles/settings.css";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);

  return (
    <div className="settings-container">
      <h2 className="settings-title">General Settings</h2>
      <div className="settings-list">
        <div className="settings-item">
          <div className="settings-left">
            <FaBell className="settings-icon" />
            <span>Sounds and Notifications</span>
          </div>
        </div>

        <div className="settings-item">
          <div className="settings-left">
            <FaEnvelope className="settings-icon" />
            <span>Email Notification</span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <div className="settings-left">
            <FaGlobe className="settings-icon" />
            <span>Languages</span>
          </div>
        </div>

        <div className="settings-item">
          <div className="settings-left">
            <FaQuestionCircle className="settings-icon" />
            <span>Help Center</span>
          </div>
        </div>

        <div className="settings-item">
          <div className="settings-left">
            <FaFileAlt className="settings-icon" />
            <span>Terms & Conditions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
