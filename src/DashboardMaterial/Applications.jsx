import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboardStyles/applications.css";

const Applications = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [blueprints, setBlueprints] = useState({}); // new

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get("http://localhost:5009/formBuild/allblueprints");
        setSubmissions(res.data);

        // Fetch blueprint for each unique vacancyType
        const types = [...new Set(res.data.map((s) => s.vacancyType).filter(Boolean))];
        console.log("📦 Blueprint request types:", types);
        const blueprintData = {};
        for (const type of types) {
          const response = await axios.get(`http://localhost:5009/formBuild/blueprint/${type}`);
          blueprintData[type] = response.data.fields || [];
        }
        
        setBlueprints(blueprintData);
      } catch (err) {
        console.error("❌ Error fetching applications or blueprints:", err);
      }
    };

    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter((submission) =>
    submission.vacancyType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="applications-container">
      <h2 className="applications-title">Applications</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search by category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="applications-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map((submission, index) => {
            const nameField = submission.fields?.find(f =>
              /full\s*name|name/i.test(f.label)
            );
            
            const emailField = submission.fields?.find(f =>
              /email/i.test(f.label)
            );

            return (
              <tr key={index}>
                <td>{nameField?.value || "N/A"}</td>
                <td>{emailField?.value || "N/A"}</td>
                <td>{submission.vacancyType || "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="blueprint-display">
        {/* <h3>📋 Saved Form Fields by Category</h3> */}
        {Object.entries(blueprints).map(([type, fields]) => (
          <div key={type}>
            <h4>{type}</h4>
            <ul>
              {fields.map((field, idx) => (
                <li key={idx}>
                  <strong>{field.label}</strong> ({field.type})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button>{"<"}</button>
        <span className="active-page">1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <button>{">"}</button>
      </div>
    </div>
  );
};

export default Applications;
