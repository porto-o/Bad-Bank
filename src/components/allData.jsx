// AllData.jsx
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import "../styles/allData.css"; // Import the CSS styles

const AllData = () => {
  const { shareData, switchUser, activeUser } = useContext(DataContext);

  return (
    <div className="container all-data">
      <div className="header">
        <h1 className="text-center mb-4">All Data</h1>
      </div>
      <div className="table-container">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Operations</th>
              <th>Photo</th>
              {shareData.length > 1 && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {shareData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>${user.balance.toFixed(2)}</td>
                <td>
                  <ul>
                    {user.operations.map((operation) => (
                      <li key={operation.id}>
                        {operation.type} ${operation.amount.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <img
                    src={user.photo ? URL.createObjectURL(user.photo) : ""}
                    alt={user.name}
                    className="profile-photo"
                  />
                </td>
                {shareData.length > 1 && (
                  <td>
                    <button
                      className="btn btn-custom"
                      onClick={() => switchUser(user.id)}
                    >
                      Switch User
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {activeUser && (
        <div className="active-user">
          <h2>Active User</h2>
          <p>
            <strong>Name:</strong> {activeUser.name}
          </p>
          <p>
            <strong>Email:</strong> {activeUser.email}
          </p>
          <p>
            <strong>Balance:</strong> ${activeUser.balance.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllData;
