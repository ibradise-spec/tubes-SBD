// AdminDashboard.jsx
import React from 'react';
import { useAuth } from '../../Context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  
  const stats = [
    { label: 'Total Revenue', value: '$124,580', icon: 'fas fa-dollar-sign', color: 'green' },
    { label: 'Total Orders', value: '1,245', icon: 'fas fa-shopping-cart', color: 'blue' },
    { label: 'Active Customers', value: '548', icon: 'fas fa-users', color: 'orange' },
    { label: 'Pending Deliveries', value: '12', icon: 'fas fa-truck', color: 'red' }
  ];
  
  const quickActions = [
    { label: 'Manage Users', icon: 'fas fa-user-cog', path: '/admin/users', color: 'primary' },
    { label: 'View Reports', icon: 'fas fa-chart-bar', path: '/reports', color: 'secondary' },
    { label: 'Add Menu Item', icon: 'fas fa-utensils', path: '/menu/new', color: 'accent' },
    { label: 'Check Inventory', icon: 'fas fa-boxes', path: '/supply', color: 'warning' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}! 👑</h1>
        <p className="role-badge owner">Restaurant Owner</p>
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
      
      <div className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <button key={index} className="quick-action-btn">
              <i className={action.icon}></i>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Recent Activity Table */}
      <div className="recent-activity">
        <h2>Recent Transactions</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td>#TRX-100{i+1}</td>
                  <td>Customer {i+1}</td>
                  <td>${(Math.random() * 100 + 50).toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${i % 3 === 0 ? 'completed' : 'pending'}`}>
                      {i % 3 === 0 ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td>2024-01-{15+i}</td>
                  <td>
                    <button className="table-action-btn view">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="table-action-btn edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="table-action-btn delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Toggle for Stress Test */}
        <div className="pagination-toggle">
          <label>
            <input type="checkbox" id="paginationToggle" />
            Enable Pagination (10 items per page)
          </label>
          <small className="toggle-note">Toggle to test with/without pagination</small>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;