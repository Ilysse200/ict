import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboardStyles/applications.css";

const Applications = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get("http://localhost:5009/submissions/formFetch");
        setSubmissions(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter((submission) =>
    submission.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="applications-container">
      <h2 className="applications-title">Applications</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search by job title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="applications-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job Position</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map((submission, index) => {
            const nameField = submission.fields.find(
              (f) => f.label.toLowerCase().includes("name")
            );
            const emailField = submission.fields.find(
              (f) => f.label.toLowerCase().includes("email")
            );

            return (
              <tr key={index}>
                <td>{nameField?.value || "N/A"}</td>
                <td>{emailField?.value || "N/A"}</td>
                <td>{submission.jobTitle || "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

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
