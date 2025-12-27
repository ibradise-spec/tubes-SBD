import React from 'react';
import { useAuth } from '../Context/AuthContext';

function Dashboard() {
    const { user } = useAuth();
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || 'User'}! 👋</h1>
        <p>Here's what's happening with your restaurant today.</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{background: '#E3F2FD'}}>
            <i className="fas fa-dollar-sign" style={{color: '#1976D2'}}></i>
          </div>
          <div className="stat-content">
            <h3>Today's Revenue</h3>
            <p className="stat-number">$2,845</p>
            <span className="stat-change positive">+12.5%</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{background: '#E8F5E9'}}>
            <i className="fas fa-users" style={{color: '#388E3C'}}></i>
          </div>
          <div className="stat-content">
            <h3>Active Users</h3>
            <p className="stat-number">24</p>
            <span className="stat-change positive">+3</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{background: '#FFF3E0'}}>
            <i className="fas fa-utensils" style={{color: '#F57C00'}}></i>
          </div>
          <div className="stat-content">
            <h3>Menu Items</h3>
            <p className="stat-number">156</p>
            <span className="stat-change neutral">+2</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{background: '#FFEBEE'}}>
            <i className="fas fa-exclamation-triangle" style={{color: '#D32F2F'}}></i>
          </div>
          <div className="stat-content">
            <h3>Low Stock</h3>
            <p className="stat-number">7 Items</p>
            <span className="stat-change negative">Attention</span>
          </div>
        </div>
      </div>
      
      {/* Quick Actions dihapus dari sini */}
    </div>
  );
}

export default Dashboard;