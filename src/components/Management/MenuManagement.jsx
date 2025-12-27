import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import Pagination from '../UI/Pagination';

const MenuManagement = () => {
  const { user, hasPermission } = useAuth();
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Beef Steak', category: 'Main Course', price: 25.99, status: 'available', stock: 45 },
    { id: 2, name: 'Grilled Salmon', category: 'Seafood', price: 22.50, status: 'available', stock: 30 },
    { id: 3, name: 'Caesar Salad', category: 'Appetizer', price: 12.99, status: 'available', stock: 25 },
    { id: 4, name: 'Tiramisu', category: 'Dessert', price: 8.99, status: 'low stock', stock: 5 },
    { id: 5, name: 'Mushroom Soup', category: 'Soup', price: 9.99, status: 'available', stock: 40 },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Main Course',
    price: '',
    description: '',
    status: 'available'
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
    const newItem = {
      id: menuItems.length + 1,
      ...formData,
      stock: 50
    };
    setMenuItems([...menuItems, newItem]);
    setShowForm(false);
    setFormData({ name: '', category: 'Main Course', price: '', description: '', status: 'available' });
    alert('Menu item added successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  // Pagination calculation
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = menuItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Menu Management 🍽️</h1>
        <p>Manage restaurant menu items, prices, and availability</p>
      </div>

      {/* Add New Menu Button (only for Owner and CS Manager) */}
      {(user.role === 'owner' || user.role === 'cs_manager') && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <h2 className="card-title">Menu Actions</h2>
            <button 
              className="btn btn-success" 
              onClick={() => setShowForm(!showForm)}
              disabled={user.role === 'cs_manager' && !hasPermission('create_menu')}
            >
              <i className="fas fa-plus"></i> {showForm ? 'Cancel' : 'Add New Menu'}
            </button>
          </div>
        </div>
      )}

      {/* Add Menu Form */}
      {showForm && (user.role === 'owner' || user.role === 'cs_manager') && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <h2 className="card-title">Add New Menu Item</h2>
          </div>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label>Menu Name</label>
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
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="Main Course">Main Course</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Seafood">Seafood</option>
                  <option value="Soup">Soup</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="form-input"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="available">Available</option>
                  <option value="out of stock">Out of Stock</option>
                  <option value="seasonal">Seasonal</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-input"
                rows="3"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-success">
                <i className="fas fa-save"></i> Save Menu Item
              </button>
              <button type="button" className="btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Menu Items Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Menu Items</h2>
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search menu items..." className="search-input" />
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price ($)</th>
                <th>Status</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td>
                    <strong>{item.name}</strong>
                    {item.description && (
                      <small style={{ display: 'block', color: 'var(--neutral-dark)' }}>
                        {item.description}
                      </small>
                    )}
                  </td>
                  <td>
                    <span className="category-badge">{item.category}</span>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${item.status.replace(' ', '-')}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="stock-indicator">
                      <div 
                        className="stock-bar" 
                        style={{ 
                          width: `${Math.min(100, (item.stock / 50) * 100)}%`,
                          backgroundColor: item.stock > 20 ? 'var(--accent-green)' : 
                                         item.stock > 10 ? 'var(--accent-orange)' : 'var(--accent-red)'
                        }}
                      ></div>
                      <span>{item.stock} units</span>
                    </div>
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
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {menuItems.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Statistics */}
        <div className="table-footer">
          <div className="stats">
            <div className="stat-item">
              <i className="fas fa-utensils" style={{ color: 'var(--primary-dark)' }}></i>
              <span>Total Items: {menuItems.length}</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-check-circle" style={{ color: 'var(--accent-green)' }}></i>
              <span>Available: {menuItems.filter(item => item.status === 'available').length}</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-exclamation-triangle" style={{ color: 'var(--accent-red)' }}></i>
              <span>Low Stock: {menuItems.filter(item => item.stock < 10).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;