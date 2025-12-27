import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';

const DeliveryManagement = () => {
  const { user } = useAuth();
  
  const [deliveries, setDeliveries] = useState([
    { 
      id: 1, 
      orderId: 'ORD-1001', 
      customer: 'John Doe', 
      address: '123 Main St, City', 
      driver: 'Alex Johnson', 
      status: 'delivered', 
      estimated: '14:30', 
      actual: '14:25', 
      items: 3,
      total: 84.50,
      deliveryType: 'food',
      vehicle: 'Motorcycle',
      distance: '2.5 km',
      rating: 5
    },
    { 
      id: 2, 
      orderId: 'ORD-1002', 
      customer: 'Jane Smith', 
      address: '456 Oak Ave, City', 
      driver: 'Mike Wilson', 
      status: 'on_the_way', 
      estimated: '15:45', 
      actual: '-', 
      items: 2,
      total: 42.75,
      deliveryType: 'food',
      vehicle: 'Car',
      distance: '5.1 km',
      rating: null
    },
    { 
      id: 3, 
      orderId: 'ORD-1003', 
      customer: 'Bob Johnson', 
      address: '789 Pine Rd, City', 
      driver: 'Sarah Lee', 
      status: 'preparing', 
      estimated: '16:30', 
      actual: '-', 
      items: 4,
      total: 126.90,
      deliveryType: 'food',
      vehicle: 'Motorcycle',
      distance: '3.2 km',
      rating: null
    },
    { 
      id: 4, 
      orderId: 'ORD-1004', 
      customer: 'Alice Brown', 
      address: '321 Elm St, City', 
      driver: 'Tom Davis', 
      status: 'pending', 
      estimated: '17:15', 
      actual: '-', 
      items: 1,
      total: 19.99,
      deliveryType: 'supplies',
      vehicle: 'Van',
      distance: '8.7 km',
      rating: null
    },
    { 
      id: 5, 
      orderId: 'ORD-1005', 
      customer: 'Charlie Wilson', 
      address: '654 Maple Dr, City', 
      driver: 'Not Assigned', 
      status: 'cancelled', 
      estimated: '13:00', 
      actual: '-', 
      items: 2,
      total: 67.80,
      deliveryType: 'food',
      vehicle: 'N/A',
      distance: '4.3 km',
      rating: null
    },
  ]);

  const [drivers] = useState([
    { id: 1, name: 'Alex Johnson', vehicle: 'Motorcycle', status: 'active', deliveries: 245, rating: 4.8 },
    { id: 2, name: 'Mike Wilson', vehicle: 'Car', status: 'active', deliveries: 189, rating: 4.7 },
    { id: 3, name: 'Sarah Lee', vehicle: 'Motorcycle', status: 'active', deliveries: 312, rating: 4.9 },
    { id: 4, name: 'Tom Davis', vehicle: 'Van', status: 'busy', deliveries: 156, rating: 4.6 },
    { id: 5, name: 'Emma Garcia', vehicle: 'Car', status: 'available', deliveries: 98, rating: 4.5 },
  ]);

  const [view, setView] = useState('all'); // all, active, completed, pending
  const [searchTerm, setSearchTerm] = useState('');
  
  // Statistics
  const deliveredCount = deliveries.filter(d => d.status === 'delivered').length;
  const onTheWayCount = deliveries.filter(d => d.status === 'on_the_way').length;
  const preparingCount = deliveries.filter(d => d.status === 'preparing').length;
  const pendingCount = deliveries.filter(d => d.status === 'pending').length;
  const cancelledCount = deliveries.filter(d => d.status === 'cancelled').length;
  
  const totalRevenue = deliveries
    .filter(d => d.status === 'delivered')
    .reduce((sum, d) => sum + d.total, 0);
  
  const averageDeliveryTime = '32 minutes';
  const onTimeRate = '94%';

  // Filter deliveries
  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = 
      delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.driver.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesView = 
      view === 'all' || 
      (view === 'active' && (delivery.status === 'on_the_way' || delivery.status === 'preparing')) ||
      (view === 'completed' && delivery.status === 'delivered') ||
      (view === 'pending' && delivery.status === 'pending');
    
    return matchesSearch && matchesView;
  });

  const handleStatusUpdate = (id, newStatus) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { 
        ...d, 
        status: newStatus,
        actual: newStatus === 'delivered' ? new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : d.actual,
        rating: newStatus === 'delivered' ? Math.floor(Math.random() * 2) + 4 : d.rating
      } : d
    ));
    alert(`Delivery status updated to: ${newStatus.replace('_', ' ')}`);
  };

  const handleAssignDriver = (id, driverName) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { ...d, driver: driverName } : d
    ));
    alert(`Driver ${driverName} assigned to delivery`);
  };

  const handleAddDelivery = () => {
    const newDelivery = {
      id: deliveries.length + 1,
      orderId: `ORD-${1000 + deliveries.length + 1}`,
      customer: 'New Customer',
      address: 'Address to be specified',
      driver: 'Not Assigned',
      status: 'pending',
      estimated: '18:00',
      actual: '-',
      items: 1,
      total: 0.00,
      deliveryType: 'food',
      vehicle: 'TBD',
      distance: '0 km',
      rating: null
    };
    setDeliveries([...deliveries, newDelivery]);
    alert('New delivery order added');
  };

  // Check permission
  if (!user || (user.role !== 'logistics_manager' && user.role !== 'owner' && user.role !== 'cs_manager')) {
    return (
      <div className="page-container">
        <h1><i className="fas fa-truck"></i> Delivery Management</h1>
        <p>You don't have permission to access delivery management.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1><i className="fas fa-truck"></i> Delivery Logistics Dashboard</h1>
        <p>Manage and track all delivery operations</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(108, 207, 127, 0.1)' }}>
            <i className="fas fa-check-circle" style={{ color: 'var(--accent-green)' }}></i>
          </div>
          <div className="stat-content">
            <h3>{deliveredCount}</h3>
            <p>Delivered Today</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(93, 156, 236, 0.1)' }}>
            <i className="fas fa-truck" style={{ color: 'var(--accent-blue)' }}></i>
          </div>
          <div className="stat-content">
            <h3>{onTheWayCount + preparingCount}</h3>
            <p>In Progress</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(255, 167, 38, 0.1)' }}>
            <i className="fas fa-clock" style={{ color: 'var(--accent-orange)' }}></i>
          </div>
          <div className="stat-content">
            <h3>{pendingCount}</h3>
            <p>Pending</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(255, 107, 107, 0.1)' }}>
            <i className="fas fa-times-circle" style={{ color: 'var(--accent-red)' }}></i>
          </div>
          <div className="stat-content">
            <h3>{cancelledCount}</h3>
            <p>Cancelled</p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h4><i className="fas fa-dollar-sign"></i> Today's Revenue</h4>
          <h2>${totalRevenue.toFixed(2)}</h2>
          <p>From {deliveredCount} completed deliveries</p>
        </div>
        
        <div className="metric-card">
          <h4><i className="fas fa-stopwatch"></i> Avg Delivery Time</h4>
          <h2>{averageDeliveryTime}</h2>
          <p>From kitchen to customer</p>
        </div>
        
        <div className="metric-card">
          <h4><i className="fas fa-bullseye"></i> On-Time Rate</h4>
          <h2>{onTimeRate}</h2>
          <p>Deliveries within estimated time</p>
        </div>
        
        <div className="metric-card">
          <h4><i className="fas fa-star"></i> Avg Rating</h4>
          <h2>4.8/5.0</h2>
          <p>Based on customer feedback</p>
        </div>
      </div>

      {/* Controls */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <div className="controls-row">
            <div className="view-toggle">
              <button 
                className={`view-btn ${view === 'all' ? 'active' : ''}`}
                onClick={() => setView('all')}
              >
                <i className="fas fa-list"></i> All ({deliveries.length})
              </button>
              <button 
                className={`view-btn ${view === 'active' ? 'active' : ''}`}
                onClick={() => setView('active')}
              >
                <i className="fas fa-truck-moving"></i> Active ({onTheWayCount + preparingCount})
              </button>
              <button 
                className={`view-btn ${view === 'completed' ? 'active' : ''}`}
                onClick={() => setView('completed')}
              >
                <i className="fas fa-check-circle"></i> Completed ({deliveredCount})
              </button>
              <button 
                className={`view-btn ${view === 'pending' ? 'active' : ''}`}
                onClick={() => setView('pending')}
              >
                <i className="fas fa-clock"></i> Pending ({pendingCount})
              </button>
            </div>
            
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search by order ID, customer, or driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                style={{ width: '300px' }}
              />
            </div>
            
            <div className="action-buttons">
              <button className="btn btn-success" onClick={handleAddDelivery}>
                <i className="fas fa-plus"></i> New Delivery
              </button>
              <button className="btn btn-primary">
                <i className="fas fa-print"></i> Print Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Drivers Status */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <h2 className="card-title">
            <i className="fas fa-user-tie"></i> Drivers Status
          </h2>
          <button className="btn">
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
        </div>
        <div className="drivers-grid">
          {drivers.map(driver => (
            <div key={driver.id} className="driver-card">
              <div className="driver-avatar">
                {driver.name.charAt(0)}
              </div>
              <div className="driver-info">
                <h4>{driver.name}</h4>
                <p><i className="fas fa-car"></i> {driver.vehicle}</p>
                <div className="driver-stats">
                  <span className="stat">
                    <i className="fas fa-box"></i> {driver.deliveries}
                  </span>
                  <span className="stat">
                    <i className="fas fa-star"></i> {driver.rating}
                  </span>
                </div>
              </div>
              <div className="driver-status">
                <span className={`status-indicator ${driver.status}`}>
                  {driver.status === 'active' ? 'On Duty' : 
                   driver.status === 'busy' ? 'Delivering' : 'Available'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fas fa-clipboard-list"></i> Delivery Orders
            <span className="badge" style={{ marginLeft: '10px' }}>
              {filteredDeliveries.length} orders
            </span>
          </h2>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Delivery Address</th>
                <th>Driver</th>
                <th>Type</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Estimated</th>
                <th>Actual</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery.id}>
                  <td>
                    <strong>{delivery.orderId}</strong>
                    <div style={{ fontSize: '0.85rem', color: 'var(--neutral-dark)' }}>
                      #{delivery.id}
                    </div>
                  </td>
                  <td>
                    <strong>{delivery.customer}</strong>
                    <div style={{ fontSize: '0.85rem', color: 'var(--neutral-dark)' }}>
                      <i className="fas fa-phone"></i> +1 234-567-890
                    </div>
                  </td>
                  <td>
                    <small>{delivery.address}</small>
                    <div style={{ fontSize: '0.85rem', color: 'var(--neutral-dark)' }}>
                      <i className="fas fa-road"></i> {delivery.distance}
                    </div>
                  </td>
                  <td>
                    {user.role === 'logistics_manager' || user.role === 'owner' ? (
                      <select
                        value={delivery.driver}
                        onChange={(e) => handleAssignDriver(delivery.id, e.target.value)}
                        className="driver-select"
                      >
                        <option value="Not Assigned">Not Assigned</option>
                        {drivers.map(driver => (
                          <option key={driver.id} value={driver.name}>{driver.name}</option>
                        ))}
                      </select>
                    ) : (
                      <span>{delivery.driver}</span>
                    )}
                    {delivery.vehicle !== 'N/A' && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--neutral-dark)' }}>
                        <i className="fas fa-car"></i> {delivery.vehicle}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`type-badge ${delivery.deliveryType}`}>
                      {delivery.deliveryType === 'food' ? '🍔 Food' : '📦 Supplies'}
                    </span>
                  </td>
                  <td>{delivery.items} items</td>
                  <td>
                    <strong>${delivery.total.toFixed(2)}</strong>
                  </td>
                  <td>{delivery.estimated}</td>
                  <td>
                    {delivery.actual !== '-' ? (
                      <span style={{ color: 'var(--accent-green)', fontWeight: '600' }}>
                        {delivery.actual}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--neutral-dark)' }}>-</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${delivery.status.replace('_', '-')}`}>
                      {delivery.status === 'on_the_way' ? 'On The Way' : 
                       delivery.status === 'delivered' ? 'Delivered' : 
                       delivery.status.charAt(0).toUpperCase() + delivery.status.slice(1)}
                    </span>
                    {delivery.rating && (
                      <div style={{ fontSize: '0.85rem', marginTop: '5px' }}>
                        <i className="fas fa-star" style={{ color: '#FFD700' }}></i> {delivery.rating}/5
                      </div>
                    )}
                  </td>
                  <td>
                    <button className="action-btn view">
                      <i className="fas fa-eye"></i>
                    </button>
                    {(user.role === 'logistics_manager' || user.role === 'owner' || user.role === 'cs_manager') && 
                     delivery.status !== 'delivered' && delivery.status !== 'cancelled' && (
                      <div className="status-actions">
                        <button 
                          className="action-btn warning"
                          onClick={() => handleStatusUpdate(delivery.id, 'preparing')}
                          title="Mark as Preparing"
                        >
                          <i className="fas fa-utensils"></i>
                        </button>
                        <button 
                          className="action-btn info"
                          onClick={() => handleStatusUpdate(delivery.id, 'on_the_way')}
                          title="Mark as On The Way"
                        >
                          <i className="fas fa-truck-moving"></i>
                        </button>
                        <button 
                          className="action-btn success"
                          onClick={() => handleStatusUpdate(delivery.id, 'delivered')}
                          title="Mark as Delivered"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                      </div>
                    )}
                    {user.role === 'logistics_manager' && delivery.status !== 'cancelled' && (
                      <button 
                        className="action-btn delete"
                        onClick={() => handleStatusUpdate(delivery.id, 'cancelled')}
                        title="Cancel Delivery"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDeliveries.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--neutral-dark)' }}>
            <i className="fas fa-truck" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
            <p>No deliveries found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Live Tracking (for Logistics only) */}
      {(user.role === 'logistics_manager' || user.role === 'owner') && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <i className="fas fa-map-marked-alt"></i> Live Delivery Tracking
            </h2>
            <button className="btn">
              <i className="fas fa-sync-alt"></i> Refresh Map
            </button>
          </div>
          <div className="tracking-container">
            <div className="map-placeholder">
              <i className="fas fa-map-marked-alt" style={{ fontSize: '3rem', color: 'var(--primary-dark)' }}></i>
              <h3>Live Tracking Map</h3>
              <p>Active deliveries: {onTheWayCount}</p>
              <small>GPS tracking integration</small>
            </div>
            <div className="tracking-list">
              <h4>Active Deliveries</h4>
              {deliveries
                .filter(d => d.status === 'on_the_way')
                .map(delivery => (
                  <div key={delivery.id} className="tracking-item">
                    <div className="tracking-info">
                      <strong>{delivery.orderId}</strong>
                      <span><i className="fas fa-user"></i> {delivery.driver}</span>
                      <span><i className="fas fa-car"></i> {delivery.vehicle}</span>
                    </div>
                    <div className="tracking-status">
                      <div className="progress-bar">
                        <div className="progress" style={{ width: '75%' }}></div>
                      </div>
                      <span>ETA: {delivery.estimated} (75% complete)</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Delivery Analytics */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fas fa-chart-line"></i> Delivery Analytics
          </h2>
        </div>
        <div className="analytics-grid">
          <div className="analytics-card">
            <h4>Peak Delivery Times</h4>
            <div className="time-slots">
              <div className="time-slot">
                <span>12:00-14:00</span>
                <div className="bar" style={{ width: '90%', backgroundColor: 'var(--accent-red)' }}></div>
                <span>45 orders</span>
              </div>
              <div className="time-slot">
                <span>18:00-20:00</span>
                <div className="bar" style={{ width: '80%', backgroundColor: 'var(--accent-orange)' }}></div>
                <span>38 orders</span>
              </div>
              <div className="time-slot">
                <span>14:00-16:00</span>
                <div className="bar" style={{ width: '60%', backgroundColor: 'var(--accent-blue)' }}></div>
                <span>28 orders</span>
              </div>
            </div>
          </div>
          
          <div className="analytics-card">
            <h4>Popular Delivery Areas</h4>
            <ul className="area-list">
              <li>
                <span>Downtown</span>
                <span className="count">42%</span>
              </li>
              <li>
                <span>North District</span>
                <span className="count">28%</span>
              </li>
              <li>
                <span>South Suburbs</span>
                <span className="count">18%</span>
              </li>
              <li>
                <span>East Side</span>
                <span className="count">12%</span>
              </li>
            </ul>
          </div>
          
          <div className="analytics-card">
            <h4>Vehicle Utilization</h4>
            <div className="vehicle-stats">
              <div className="vehicle-stat">
                <i className="fas fa-motorcycle"></i>
                <div>
                  <strong>Motorcycles</strong>
                  <p>65% utilization</p>
                </div>
              </div>
              <div className="vehicle-stat">
                <i className="fas fa-car"></i>
                <div>
                  <strong>Cars</strong>
                  <p>45% utilization</p>
                </div>
              </div>
              <div className="vehicle-stat">
                <i className="fas fa-truck"></i>
                <div>
                  <strong>Vans</strong>
                  <p>30% utilization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryManagement;