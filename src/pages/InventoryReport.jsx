import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const InventoryReport = () => {
  const { user } = useAuth();
  
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Data sample untuk grafik
  const inventoryData = [
    { name: 'Beef', current: 45, min: 20, max: 100, unit: 'kg', category: 'Meat', value: 4500 },
    { name: 'Chicken', current: 32, min: 25, max: 80, unit: 'kg', category: 'Meat', value: 2400 },
    { name: 'Salmon', current: 18, min: 15, max: 40, unit: 'kg', category: 'Seafood', value: 7200 },
    { name: 'Rice', current: 120, min: 50, max: 200, unit: 'kg', category: 'Grains', value: 1200 },
    { name: 'Tomatoes', current: 25, min: 30, max: 60, unit: 'kg', category: 'Vegetables', value: 750 },
    { name: 'Cooking Oil', current: 38, min: 20, max: 50, unit: 'L', category: 'Oil', value: 1520 },
    { name: 'Cheese', current: 42, min: 25, max: 60, unit: 'kg', category: 'Dairy', value: 4200 },
    { name: 'Lettuce', current: 15, min: 20, max: 40, unit: 'kg', category: 'Vegetables', value: 600 },
  ];

  // Data untuk grafik batang
  const barChartData = inventoryData.map(item => ({
    name: item.name,
    'Current Stock': item.current,
    'Min Stock': item.min,
    'Max Stock': item.max,
  }));

  // Data untuk grafik pie (per kategori)
  const categoryData = [
    { name: 'Meat', value: inventoryData.filter(i => i.category === 'Meat').reduce((sum, i) => sum + i.value, 0), color: '#FF6B6B' },
    { name: 'Seafood', value: inventoryData.filter(i => i.category === 'Seafood').reduce((sum, i) => sum + i.value, 0), color: '#5D9CEC' },
    { name: 'Vegetables', value: inventoryData.filter(i => i.category === 'Vegetables').reduce((sum, i) => sum + i.value, 0), color: '#6BCF7F' },
    { name: 'Grains', value: inventoryData.filter(i => i.category === 'Grains').reduce((sum, i) => sum + i.value, 0), color: '#FFA726' },
    { name: 'Dairy', value: inventoryData.filter(i => i.category === 'Dairy').reduce((sum, i) => sum + i.value, 0), color: '#9C27B0' },
    { name: 'Oil', value: inventoryData.filter(i => i.category === 'Oil').reduce((sum, i) => sum + i.value, 0), color: '#795548' },
  ];

  // Low stock items
  const lowStockItems = inventoryData.filter(item => item.current < item.min);
  const criticalItems = inventoryData.filter(item => item.current < item.min * 0.5);
  
  // Inventory value
  const totalInventoryValue = inventoryData.reduce((sum, item) => sum + item.value, 0);
  const averageStockLevel = (inventoryData.reduce((sum, item) => sum + (item.current / item.max) * 100, 0) / inventoryData.length).toFixed(1);

  // Filter data berdasarkan kategori
  const filteredData = selectedCategory === 'all' 
    ? inventoryData 
    : inventoryData.filter(item => item.category === selectedCategory);

  // Export function
  const handleExport = (format) => {
    alert(`Inventory report exported as ${format.toUpperCase()}`);
    // Implementasi export sebenarnya akan di sini
  };

  // Check permission
  if (!user || (user.role !== 'logistics_manager' && user.role !== 'owner')) {
    return (
      <div className="page-container">
        <h1><i className="fas fa-chart-pie"></i> Inventory Report</h1>
        <p>You don't have permission to access inventory reports.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1><i className="fas fa-chart-pie"></i> Inventory Analytics Report</h1>
        <p>Comprehensive inventory analysis and stock monitoring</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(93, 156, 236, 0.1)' }}>
            <i className="fas fa-dollar-sign" style={{ color: 'var(--accent-blue)' }}></i>
          </div>
          <div className="stat-content">
            <h3>${totalInventoryValue.toLocaleString()}</h3>
            <p>Total Inventory Value</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(108, 207, 127, 0.1)' }}>
            <i className="fas fa-boxes" style={{ color: 'var(--accent-green)' }}></i>
          </div>
          <div className="stat-content">
            <h3>{inventoryData.length}</h3>
            <p>Total Items</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(255, 167, 38, 0.1)' }}>
            <i className="fas fa-exclamation-triangle" style={{ color: 'var(--accent-orange)' }}></i>
          </div>
          <div className="stat-content">
            <h3>{lowStockItems.length}</h3>
            <p>Low Stock Items</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(255, 107, 107, 0.1)' }}>
            <i className="fas fa-skull-crossbones" style={{ color: 'var(--accent-red)' }}></i>
          </div>
          <div className="stat-content">
            <h3>{criticalItems.length}</h3>
            <p>Critical Items</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <div className="controls-row">
            <div className="time-range-selector">
              <button 
                className={`time-btn ${timeRange === 'week' ? 'active' : ''}`}
                onClick={() => setTimeRange('week')}
              >
                This Week
              </button>
              <button 
                className={`time-btn ${timeRange === 'month' ? 'active' : ''}`}
                onClick={() => setTimeRange('month')}
              >
                This Month
              </button>
              <button 
                className={`time-btn ${timeRange === 'quarter' ? 'active' : ''}`}
                onClick={() => setTimeRange('quarter')}
              >
                This Quarter
              </button>
            </div>
            
            <div className="category-filter">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-input"
                style={{ width: '200px' }}
              >
                <option value="all">All Categories</option>
                <option value="Meat">Meat</option>
                <option value="Seafood">Seafood</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Grains">Grains</option>
                <option value="Dairy">Dairy</option>
                <option value="Oil">Oil</option>
              </select>
            </div>
            
            <div className="export-buttons">
              <button className="btn btn-success" onClick={() => handleExport('pdf')}>
                <i className="fas fa-file-pdf"></i> Export PDF
              </button>
              <button className="btn btn-primary" onClick={() => handleExport('excel')}>
                <i className="fas fa-file-excel"></i> Export Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Bar Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3><i className="fas fa-chart-bar"></i> Stock Levels Overview</h3>
            <small>Current vs Min/Max Stock Levels</small>
          </div>
          <div className="chart-container" style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Current Stock" fill="#5D9CEC" />
                <Bar dataKey="Min Stock" fill="#6BCF7F" />
                <Bar dataKey="Max Stock" fill="#FFA726" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3><i className="fas fa-chart-pie"></i> Inventory Value by Category</h3>
            <small>Total value distribution</small>
          </div>
          <div className="chart-container" style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Low Stock Alert Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fas fa-exclamation-triangle"></i> Low Stock Alerts
            <span className="badge" style={{ marginLeft: '10px', backgroundColor: 'var(--accent-red)' }}>
              {lowStockItems.length} items need attention
            </span>
          </h2>
          <button className="btn btn-success">
            <i className="fas fa-truck-loading"></i> Order All
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Minimum Required</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Days Left*</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item) => {
                const percent = (item.current / item.min) * 100;
                const daysLeft = Math.floor((item.current / 5) * 7); // Estimasi kasar
                
                return (
                  <tr key={item.name}>
                    <td>
                      <strong>{item.name}</strong>
                    </td>
                    <td>
                      <span className="category-badge">{item.category}</span>
                    </td>
                    <td>
                      <div className="stock-indicator">
                        <div 
                          className="stock-bar" 
                          style={{ 
                            width: `${Math.min(100, percent)}%`,
                            backgroundColor: percent < 30 ? 'var(--accent-red)' : 
                                           percent < 60 ? 'var(--accent-orange)' : 'var(--accent-green)'
                          }}
                        ></div>
                        <span>{item.current}{item.unit}</span>
                      </div>
                    </td>
                    <td>{item.min}{item.unit}</td>
                    <td>{item.unit}</td>
                    <td>
                      <span className={`status-badge ${percent < 30 ? 'critical' : 'low'}`}>
                        {percent < 30 ? 'Critical' : 'Low Stock'}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        color: daysLeft < 3 ? 'var(--accent-red)' : 
                               daysLeft < 7 ? 'var(--accent-orange)' : 'var(--accent-green)',
                        fontWeight: '600'
                      }}>
                        {daysLeft} days
                      </span>
                    </td>
                    <td>
                      <button className="action-btn success">
                        <i className="fas fa-truck"></i> Order
                      </button>
                      <button className="action-btn info">
                        <i className="fas fa-chart-line"></i> Forecast
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {lowStockItems.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--neutral-dark)' }}>
            <i className="fas fa-check-circle" style={{ fontSize: '2rem', color: 'var(--accent-green)', marginBottom: '1rem' }}></i>
            <p>All inventory items are at healthy stock levels! 🎉</p>
          </div>
        )}
      </div>

      {/* Detailed Inventory Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fas fa-list-alt"></i> Detailed Inventory Report
          </h2>
          <div className="table-stats">
            <span>Average Stock Level: <strong>{averageStockLevel}%</strong></span>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Min Stock</th>
                <th>Max Stock</th>
                <th>Unit</th>
                <th>Stock Level %</th>
                <th>Value</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => {
                const stockLevel = (item.current / item.max) * 100;
                const status = stockLevel < 25 ? 'critical' : stockLevel < 50 ? 'low' : 'adequate';
                
                return (
                  <tr key={item.name}>
                    <td>
                      <strong>{item.name}</strong>
                      <div style={{ fontSize: '0.85rem', color: 'var(--neutral-dark)' }}>
                        ID: INV-{item.name.substring(0, 3).toUpperCase()}
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">{item.category}</span>
                    </td>
                    <td>{item.current}{item.unit}</td>
                    <td>{item.min}{item.unit}</td>
                    <td>{item.max}{item.unit}</td>
                    <td>{item.unit}</td>
                    <td>
                      <div className="progress-bar" style={{ marginBottom: '5px' }}>
                        <div 
                          className="progress" 
                          style={{ 
                            width: `${stockLevel}%`,
                            backgroundColor: status === 'critical' ? 'var(--accent-red)' : 
                                           status === 'low' ? 'var(--accent-orange)' : 'var(--accent-green)'
                          }}
                        ></div>
                      </div>
                      <span style={{ 
                        color: status === 'critical' ? 'var(--accent-red)' : 
                               status === 'low' ? 'var(--accent-orange)' : 'var(--accent-green)',
                        fontWeight: '600'
                      }}>
                        {stockLevel.toFixed(1)}%
                      </span>
                    </td>
                    <td>
                      <strong>${item.value.toLocaleString()}</strong>
                    </td>
                    <td>
                      {timeRange === 'week' ? 'Today' : 
                       timeRange === 'month' ? 'This week' : 'This month'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fas fa-clipboard-check"></i> Inventory Summary
          </h2>
        </div>
        <div className="summary-grid">
          <div className="summary-item">
            <h4>📊 Stock Efficiency</h4>
            <p>Overall inventory is at <strong>{averageStockLevel}%</strong> of maximum capacity</p>
            <p>Turnover rate: <strong>2.4</strong> times per month</p>
          </div>
          <div className="summary-item">
            <h4>⚠️  Recommendations</h4>
            <p>• Order <strong>{criticalItems.length}</strong> critical items immediately</p>
            <p>• Review <strong>{lowStockItems.length}</strong> low stock items</p>
            <p>• Consider reducing max stock for overstocked items</p>
          </div>
          <div className="summary-item">
            <h4>💡 Insights</h4>
            <p>• Highest value category: <strong>Seafood (${categoryData[1].value.toLocaleString()})</strong></p>
            <p>• Most stable: <strong>Grains</strong> (rarely below min)</p>
            <p>• Most volatile: <strong>Vegetables</strong> (frequent restocking needed)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryReport;