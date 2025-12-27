import React from 'react';
import { useAuth } from '../../Context/AuthContext';

const LogisticsDashboard = () => {
  const { user } = useAuth();
  
  const stats = [
    { label: 'Items to Restock', value: '15', icon: 'fas fa-boxes', color: 'red' },
    { label: 'Today\'s Deliveries', value: '7', icon: 'fas fa-truck', color: 'blue' },
    { label: 'Warehouse Capacity', value: '78%', icon: 'fas fa-warehouse', color: 'orange' },
    { label: 'Pending Orders', value: '3', icon: 'fas fa-clipboard-list', color: 'purple' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}! 🚚</h1>
        <p className="role-badge logistics">Logistics Manager</p>
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
          <h2 className="card-title">Inventory Alerts</h2>
          <button className="btn btn-success">
            <i className="fas fa-plus"></i> New Order
          </button>
        </div>
        
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Current Stock</th>
                <th>Min Stock</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {['Beef', 'Chicken', 'Rice', 'Vegetables', 'Spices'].map((item, i) => (
                <tr key={i}>
                  <td>{item}</td>
                  <td>{Math.floor(Math.random() * 50)} kg</td>
                  <td>20 kg</td>
                  <td>Supplier {i+1}</td>
                  <td>
                    <span className={`status-badge ${i < 2 ? 'pending' : 'completed'}`}>
                      {i < 2 ? 'Low Stock' : 'Adequate'}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="action-btn delete">
                      <i className="fas fa-trash"></i>
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

export default LogisticsDashboard;