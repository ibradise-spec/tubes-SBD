import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import Pagination from '../UI/Pagination';

const SupplyManagement = () => {
  const { user } = useAuth();
  const [supplies, setSupplies] = useState([
    { id: 1, item: 'Beef', category: 'Meat', currentStock: 45, minStock: 20, unit: 'kg', supplier: 'Meat Supplier Co.', lastOrder: '2024-01-18', status: 'adequate' },
    { id: 2, item: 'Chicken Breast', category: 'Meat', currentStock: 32, minStock: 25, unit: 'kg', supplier: 'Poultry Farm', lastOrder: '2024-01-19', status: 'adequate' },
    { id: 3, item: 'Salmon', category: 'Seafood', currentStock: 18, minStock: 15, unit: 'kg', supplier: 'Ocean Fresh', lastOrder: '2024-01-17', status: 'low' },
    { id: 4, item: 'Rice', category: 'Grains', currentStock: 120, minStock: 50, unit: 'kg', supplier: 'Grain Masters', lastOrder: '2024-01-15', status: 'adequate' },
    { id: 5, item: 'Tomatoes', category: 'Vegetables', currentStock: 25, minStock: 30, unit: 'kg', supplier: 'Fresh Farms', lastOrder: '2024-01-20', status: 'critical' },
    { id: 6, item: 'Cooking Oil', category: 'Oil', currentStock: 38, minStock: 20, unit: 'L', supplier: 'Oil Distributors', lastOrder: '2024-01-16', status: 'adequate' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    item: '',
    category: 'Meat',
    currentStock: '',
    minStock: '',
    unit: 'kg',
    supplier: ''
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
    const status = formData.currentStock < formData.minStock * 0.3 ? 'critical' : 
                   formData.currentStock < formData.minStock ? 'low' : 'adequate';
    
    const newSupply = {
      id: supplies.length + 1,
      ...formData,
      currentStock: parseInt(formData.currentStock),
      minStock: parseInt(formData.minStock),
      lastOrder: new Date().toISOString().split('T')[0],
      status: status
    };
    
    setSupplies([...supplies, newSupply]);
    setShowForm(false);
    setFormData({ item: '', category: 'Meat', currentStock: '', minStock: '', unit: 'kg', supplier: '' });
    alert('Supply item added successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this supply item?')) {
      setSupplies(supplies.filter(supply => supply.id !== id));
    }
  };

  const handleRestock = (id) => {
    const item = supplies.find(s => s.id === id);
    const newStock = item.currentStock + 50; // Add 50 units
    const updatedSupplies = supplies.map(s => 
      s.id === id ? { 
        ...s, 
        currentStock: newStock,
        status: newStock < s.minStock ? 'critical' : newStock < s.minStock * 1.5 ? 'low' : 'adequate',
        lastOrder: new Date().toISOString().split('T')[0]
      } : s
    );
    setSupplies(updatedSupplies);
    alert(`Restocked ${item.item}. New stock: ${newStock}${item.unit}`);
  };

  const totalPages = Math.ceil(supplies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = supplies.slice(startIndex, startIndex + itemsPerPage);

  // Calculate statistics
  const criticalItems = supplies.filter(s => s.status === 'critical').length;
  const lowItems = supplies.filter(s => s.status === 'low').length;
  const totalStockValue = supplies.reduce((sum, s) => sum + s.currentStock, 0);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Inventory Management 📦</h1>
        <p>Manage restaurant supplies and inventory levels</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-blue)' }}>
            <i className="fas fa-boxes"></i>
          </div>
          <div className="stat-content">
            <h3>{supplies.length}</h3>
            <p>Total Items</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-red)' }}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="stat-content">
            <h3>{criticalItems}</h3>
            <p>Critical Items</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-orange)' }}>
            <i className="fas fa-low-vision"></i>
          </div>
          <div className="stat-content">
            <h3>{lowItems}</h3>
            <p>Low Stock</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-green)' }}>
            <i className="fas fa-weight"></i>
          </div>
          <div className="stat-content">
            <h3>{totalStockValue}</h3>
            <p>Total Stock Units</p>
          </div>
        </div>
      </div>

      {/* Add Supply Button */}
      {(user.role === 'owner' || user.role === 'logistics_manager') && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <h2 className="card-title">Inventory Actions</h2>
            <button 
              className="btn btn-success" 
              onClick={() => setShowForm(!showForm)}
            >
              <i className="fas fa-plus"></i> {showForm ? 'Cancel' : 'Add New Item'}
            </button>
          </div>
        </div>
      )}

      {/* Add Supply Form */}
      {showForm && (user.role === 'owner' || user.role === 'logistics_manager') && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <h2 className="card-title">Add New Inventory Item</h2>
          </div>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label>Item Name</label>
                <input
                  type="text"
                  name="item"
                  value={formData.item}
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
                  <option value="Meat">Meat</option>
                  <option value="Seafood">Seafood</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Grains">Grains</option>
                  <option value="Oil">Oil</option>
                  <option value="Spices">Spices</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Dairy">Dairy</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Current Stock</label>
                <input
                  type="number"
                  name="currentStock"
                  value={formData.currentStock}
                  onChange={handleInputChange}
                  className="form-input"
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label>Minimum Stock</label>
                <input
                  type="number"
                  name="minStock"
                  value={formData.minStock}
                  onChange={handleInputChange}
                  className="form-input"
                  min="0"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Unit</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="g">Gram (g)</option>
                  <option value="L">Liter (L)</option>
                  <option value="ml">Milliliter (ml)</option>
                  <option value="pcs">Pieces</option>
                  <option value="box">Box</option>
                  <option value="pack">Pack</option>
                </select>
              </div>
              <div className="form-group">
                <label>Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-success">
                <i className="fas fa-save"></i> Save Item
              </button>
              <button type="button" className="btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Supplies Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Inventory Items</h2>
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search inventory..." className="search-input" />
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Min Stock</th>
                <th>Unit</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Last Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((supply) => (
                <tr key={supply.id}>
                  <td>#{supply.id}</td>
                  <td>
                    <strong>{supply.item}</strong>
                  </td>
                  <td>
                    <span className="category-badge">{supply.category}</span>
                  </td>
                  <td>
                    <div className="stock-indicator">
                      <div 
                        className="stock-bar" 
                        style={{ 
                          width: `${Math.min(100, (supply.currentStock / (supply.minStock * 2)) * 100)}%`,
                          backgroundColor: supply.status === 'critical' ? 'var(--accent-red)' : 
                                         supply.status === 'low' ? 'var(--accent-orange)' : 'var(--accent-green)'
                        }}
                      ></div>
                      <span>{supply.currentStock}{supply.unit}</span>
                    </div>
                  </td>
                  <td>{supply.minStock}{supply.unit}</td>
                  <td>{supply.unit}</td>
                  <td>
                    <small>{supply.supplier}</small>
                  </td>
                  <td>
                    <span className={`status-badge ${supply.status}`}>
                      {supply.status}
                    </span>
                  </td>
                  <td>{supply.lastOrder}</td>
                  <td>
                    <button className="action-btn view">
                      <i className="fas fa-eye"></i>
                    </button>
                    {(user.role === 'owner' || user.role === 'logistics_manager') && (
                      <>
                        <button 
                          className="action-btn success"
                          onClick={() => handleRestock(supply.id)}
                        >
                          <i className="fas fa-truck-loading"></i>
                        </button>
                        <button className="action-btn edit">
                          <i className="fas fa-edit"></i>
                        </button>
                      </>
                    )}
                    {user.role === 'owner' && (
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDelete(supply.id)}
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
        {supplies.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Restock Alerts */}
        <div className="alerts-section">
          <h3>Restock Alerts</h3>
          <div className="alerts-list">
            {supplies
              .filter(s => s.status === 'critical' || s.status === 'low')
              .map(item => (
                <div key={item.id} className="alert-item">
                  <i className={`fas fa-exclamation-${item.status === 'critical' ? 'circle' : 'triangle'}`} 
                     style={{ color: item.status === 'critical' ? 'var(--accent-red)' : 'var(--accent-orange)' }}></i>
                  <div className="alert-content">
                    <strong>{item.item}</strong>
                    <span>Stock: {item.currentStock}{item.unit} (Min: {item.minStock}{item.unit})</span>
                  </div>
                  {(user.role === 'owner' || user.role === 'logistics_manager') && (
                    <button 
                      className="btn btn-sm"
                      onClick={() => handleRestock(item.id)}
                    >
                      <i className="fas fa-truck"></i> Order
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyManagement;