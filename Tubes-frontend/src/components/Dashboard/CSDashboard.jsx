import React from 'react';
import { useAuth } from '../../Context/AuthContext';

const CSDashboard = () => {
  const { user } = useAuth();
  
  const stats = [
    { label: 'Pending Orders', value: '8', icon: 'fas fa-clock', color: 'orange' },
    { label: 'Today\'s Revenue', value: '$2,450', icon: 'fas fa-dollar-sign', color: 'green' },
    { label: 'Customer Complaints', value: '2', icon: 'fas fa-exclamation-triangle', color: 'red' },
    { label: 'Avg Response Time', value: '15min', icon: 'fas fa-stopwatch', color: 'blue' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}! 🎯</h1>
        <p className="role-badge cs">Customer Service Manager</p>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `var(--accent-${stat.color})` }}>
              <i className={stat.icon}></i>
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Recent Customer Tickets</h2>
          <button className="btn btn-primary">
            <i className="fas fa-plus"></i> New Ticket
          </button>
        </div>
        
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Customer</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td>#TICK-100{i+1}</td>
                  <td>Customer {i+1}</td>
                  <td>Order Issue</td>
                  <td>
                    <span className="status-badge pending">Pending</span>
                  </td>
                  <td>2 hours ago</td>
                  <td>
                    <button className="action-btn view">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="action-btn edit">
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CSDashboard;