import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import Pagination from '../UI/Pagination';

const DeliveryManagement = () => {
  const { user } = useAuth();
  const [deliveries, setDeliveries] = useState([
    { id: 1, orderId: 'ORD-1001', customer: 'John Doe', address: '123 Main St', driver: 'Alex Johnson', status: 'delivered', estimated: '14:30', actual: '14:25', items: 3 },
    { id: 2, orderId: 'ORD-1002', customer: 'Jane Smith', address: '456 Oak Ave', driver: 'Mike Wilson', status: 'on the way', estimated: '15:45', actual: '-', items: 2 },
    { id: 3, orderId: 'ORD-1003', customer: 'Bob Johnson', address: '789 Pine Rd', driver: 'Sarah Lee', status: 'preparing', estimated: '16:30', actual: '-', items: 4 },
    { id: 4, orderId: 'ORD-1004', customer: 'Alice Brown', address: '321 Elm St', driver: 'Tom Davis', status: 'pending', estimated: '17:15', actual: '-', items: 1 },
    { id: 5, orderId: 'ORD-1005', customer: 'Charlie Wilson', address: '654 Maple Dr', driver: 'Not Assigned', status: 'cancelled', estimated: '13:00', actual: '-', items: 2 },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [drivers] = useState(['Alex Johnson', 'Mike Wilson', 'Sarah Lee', 'Tom Davis', 'Emma Garcia']);

  const handleStatusUpdate = (id, newStatus) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { 
        ...d, 
        status: newStatus,
        actual: newStatus === 'delivered' ? new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : d.actual
      } : d
    ));
    alert(`Delivery status updated to: ${newStatus}`);
  };

  const handleAssignDriver = (id, driver) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { ...d, driver: driver } : d
    ));
    alert(`Driver ${driver} assigned to delivery`);
  };

  const totalPages = Math.ceil(deliveries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = deliveries.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const deliveredCount = deliveries.filter(d => d.status === 'delivered').length;
  const onTheWayCount = deliveries.filter(d => d.status === 'on the way').length;
  const preparingCount = deliveries.filter(d => d.status === 'preparing').length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Delivery Management 🚚</h1>
        <p>Track and manage food delivery orders</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-green)' }}>
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <h3>{deliveredCount}</h3>
            <p>Delivered</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-blue)' }}>
            <i className="fas fa-truck"></i>
          </div>
          <div className="stat-content">
            <h3>{onTheWayCount}</h3>
            <p>On The Way</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-orange)' }}>
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <h3>{preparingCount}</h3>
            <p>Preparing</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-red)' }}>
            <i className="fas fa-times-circle"></i>
          </div>
          <div className="stat-content">
            <h3>{deliveries.filter(d => d.status === 'cancelled').length}</h3>
            <p>Cancelled</p>
          </div>
        </div>
      </div>

      {/* Delivery Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Active Deliveries</h2>
          {(user.role === 'owner' || user.role === 'cs_manager') && (
            <button className="btn btn-success">
              <i className="fas fa-plus"></i> New Delivery
            </button>
          )}
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Delivery Address</th>
                <th>Driver</th>
                <th>Items</th>
                <th>Estimated Time</th>
                <th>Actual Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((delivery) => (
                <tr key={delivery.id}>
                  <td>
                    <strong>{delivery.orderId}</strong>
                  </td>
                  <td>{delivery.customer}</td>
                  <td>
                    <small>{delivery.address}</small>
                  </td>
                  <td>
                    {user.role === 'owner' || user.role === 'logistics_manager' ? (
                      <select
                        value={delivery.driver}
                        onChange={(e) => handleAssignDriver(delivery.id, e.target.value)}
                        className="driver-select"
                      >
                        <option value="Not Assigned">Not Assigned</option>
                        {drivers.map(driver => (
                          <option key={driver} value={driver}>{driver}</option>
                        ))}
                      </select>
                    ) : (
                      <span>{delivery.driver}</span>
                    )}
                  </td>
                  <td>{delivery.items} items</td>
                  <td>{delivery.estimated}</td>
                  <td>{delivery.actual}</td>
                  <td>
                    <span className={`status-badge ${delivery.status.replace(' ', '-')}`}>
                      {delivery.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn view">
                      <i className="fas fa-eye"></i>
                    </button>
                    {(user.role === 'owner' || user.role === 'cs_manager') && delivery.status !== 'delivered' && delivery.status !== 'cancelled' && (
                      <div className="status-actions">
                        <button 
                          className="action-btn success"
                          onClick={() => handleStatusUpdate(delivery.id, 'preparing')}
                        >
                          Prep
                        </button>
                        <button 
                          className="action-btn info"
                          onClick={() => handleStatusUpdate(delivery.id, 'on the way')}
                        >
                          Ship
                        </button>
                        <button 
                          className="action-btn complete"
                          onClick={() => handleStatusUpdate(delivery.id, 'delivered')}
                        >
                          Deliver
                        </button>
                      </div>
                    )}
                    {user.role === 'owner' && delivery.status !== 'cancelled' && (
                      <button 
                        className="action-btn delete"
                        onClick={() => handleStatusUpdate(delivery.id, 'cancelled')}
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

        {/* Pagination */}
        {deliveries.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Delivery Status Legend */}
        <div className="legend-section">
          <h3>Delivery Status Legend</h3>
          <div className="legend-items">
            <div className="legend-item">
              <span className="status-badge pending">Pending</span>
              <span>Order received, not yet processed</span>
            </div>
            <div className="legend-item">
              <span className="status-badge preparing">Preparing</span>
              <span>Food being prepared in kitchen</span>
            </div>
            <div className="legend-item">
              <span className="status-badge on-the-way">On the way</span>
              <span>Food picked up by driver</span>
            </div>
            <div className="legend-item">
              <span className="status-badge delivered">Delivered</span>
              <span>Successfully delivered to customer</span>
            </div>
            <div className="legend-item">
              <span className="status-badge cancelled">Cancelled</span>
              <span>Order cancelled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Delivery Tracking (for Logistics) */}
      {user.role === 'logistics_manager' || user.role === 'owner' ? (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Live Delivery Tracking</h2>
          </div>
          <div className="tracking-container">
            <div className="map-placeholder">
              <i className="fas fa-map-marked-alt"></i>
              <p>Live delivery tracking map</p>
              <small>Active deliveries: {onTheWayCount}</small>
            </div>
            <div className="tracking-list">
              <h4>Active Deliveries</h4>
              {deliveries
                .filter(d => d.status === 'on the way')
                .map(delivery => (
                  <div key={delivery.id} className="tracking-item">
                    <div className="tracking-info">
                      <strong>{delivery.orderId}</strong>
                      <span>Driver: {delivery.driver}</span>
                      <span>ETA: {delivery.estimated}</span>
                    </div>
                    <div className="tracking-status">
                      <div className="progress-bar">
                        <div className="progress" style={{ width: '75%' }}></div>
                      </div>
                      <span>75% complete</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DeliveryManagement;