import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import Pagination from '../UI/Pagination';

const CustomerManagement = () => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-890', totalOrders: 15, totalSpent: 1250.50, lastOrder: '2024-01-20', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 345-678-901', totalOrders: 8, totalSpent: 645.75, lastOrder: '2024-01-18', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 456-789-012', totalOrders: 3, totalSpent: 189.99, lastOrder: '2024-01-15', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+1 567-890-123', totalOrders: 22, totalSpent: 2105.25, lastOrder: '2024-01-22', status: 'active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', phone: '+1 678-901-234', totalOrders: 5, totalSpent: 425.50, lastOrder: '2024-01-10', status: 'active' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: customers.length + 1,
      ...formData,
      totalOrders: 0,
      totalSpent: 0,
      lastOrder: 'Never',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0]
    };
    setCustomers([...customers, newCustomer]);
    setShowForm(false);
    setFormData({ name: '', email: '', phone: '', address: '' });
    alert('Customer added successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = customers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Customer Management 👥</h1>
        <p>Manage customer information and order history</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-blue)' }}>
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>{customers.length}</h3>
            <p>Total Customers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-green)' }}>
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-content">
            <h3>{customers.reduce((sum, c) => sum + c.totalOrders, 0)}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--primary-dark)' }}>
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <h3>${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-orange)' }}>
            <i className="fas fa-star"></i>
          </div>
          <div className="stat-content">
            <h3>{customers.filter(c => c.totalSpent > 1000).length}</h3>
            <p>VIP Customers</p>
          </div>
        </div>
      </div>

      {/* Add Customer Button */}
      {(user.role === 'owner' || user.role === 'cs_manager') && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <h2 className="card-title">Customer Actions</h2>
            <button 
              className="btn btn-success" 
              onClick={() => setShowForm(!showForm)}
            >
              <i className="fas fa-plus"></i> {showForm ? 'Cancel' : 'Add New Customer'}
            </button>
          </div>
        </div>
      )}

      {/* Add Customer Form */}
      {showForm && (user.role === 'owner' || user.role === 'cs_manager') && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <h2 className="card-title">Add New Customer</h2>
          </div>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-success">
                <i className="fas fa-save"></i> Save Customer
              </button>
              <button type="button" className="btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Customers Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Customer List</h2>
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search customers..." className="search-input" />
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((customer) => (
                <tr key={customer.id}>
                  <td>#{customer.id}</td>
                  <td>
                    <strong>{customer.name}</strong>
                    <small style={{ display: 'block', color: 'var(--neutral-dark)' }}>
                      Joined: {customer.joinDate || '2024-01-01'}
                    </small>
                  </td>
                  <td>
                    <div>{customer.email}</div>
                    <small style={{ color: 'var(--neutral-dark)' }}>{customer.phone}</small>
                  </td>
                  <td>
                    <span className="badge">{customer.totalOrders} orders</span>
                  </td>
                  <td>
                    <strong>${customer.totalSpent.toFixed(2)}</strong>
                  </td>
                  <td>{customer.lastOrder}</td>
                  <td>
                    <span className={`status-badge ${customer.status}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn view">
                      <i className="fas fa-eye"></i>
                    </button>
                    {(user.role === 'owner' || user.role === 'cs_manager') && (
                      <button className="action-btn edit">
                        <i className="fas fa-edit"></i>
                      </button>
                    )}
                    {user.role === 'owner' && (
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDelete(customer.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                    <button className="action-btn message">
                      <i className="fas fa-envelope"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {customers.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;