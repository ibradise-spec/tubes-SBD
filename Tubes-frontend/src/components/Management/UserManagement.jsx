import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';

const UserManagement = () => {
  const { user } = useAuth();

  
  const [users] = useState([
    { id: 1, name: 'Kelvin', email: 'kelvin@ultaratie.com', role: 'cs_manager', status: 'active' },
    { id: 2, name: 'Ibra', email: 'ibra@ultaratie.com', role: 'logistics_manager', status: 'active' },
    { id: 3, name: 'Staff 1', email: 'staff1@ultaratie.com', role: 'viewer', status: 'inactive' },
  ]);

  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRevokeClick = (user) => {
    setSelectedUser(user);
    setShowRevokeModal(true);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>User Management 👥</h1>
        <p>Manage user permissions and access levels</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">System Users</h2>
          <button className="btn btn-success">
            <i className="fas fa-plus"></i> Add New User
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userItem) => (
                <tr key={userItem.id}>
                  <td>{userItem.id}</td>
                  <td>{userItem.name}</td>
                  <td>{userItem.email}</td>
                  <td>
                    <span className={`role-badge ${userItem.role}`}>
                      {userItem.role === 'owner' ? 'Owner' : 
                       userItem.role === 'cs_manager' ? 'CS Manager' : 
                       userItem.role === 'logistics_manager' ? 'Logistics Manager' : 'Viewer'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${userItem.status}`}>
                      {userItem.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleRevokeClick(userItem)}
                    >
                      <i className="fas fa-ban"></i> Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revoke Permission Modal */}
      {showRevokeModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Revoke Permissions</h3>
              <button onClick={() => setShowRevokeModal(false)} className="close-btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Revoke permissions for <strong>{selectedUser.name}</strong> ({selectedUser.email})</p>
              
              <div className="permission-list">
                <label>
                  <input type="checkbox" />
                  Remove transaction processing rights
                </label>
                <label>
                  <input type="checkbox" />
                  Remove customer edit rights
                </label>
                <label>
                  <input type="checkbox" />
                  Remove inventory management rights
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger">
                Confirm Revoke
              </button>
              <button className="btn" onClick={() => setShowRevokeModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;