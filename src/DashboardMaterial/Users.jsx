import React, { useState } from "react";
import "./dashboardStyles/users.css";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");



  return (
    <div className="users-container">
      <h2 className="users-title">Users</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {usersData
            .filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td className={user.status === "Active" ? "status-active" : "status-inactive"}>
                  {user.status}
                </td>
              </tr>
            ))}
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

export default Users;
