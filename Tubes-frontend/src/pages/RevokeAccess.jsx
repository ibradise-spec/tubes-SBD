import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';

const RevokeAccess = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([
    { id: 1, name: 'Kelvin', email: 'kelvin@ultaratie.com', role: 'cs_manager', status: 'active', selected: false },
    { id: 2, name: 'Ibra', email: 'ibra@ultaratie.com', role: 'logistics_manager', status: 'active', selected: false },
    { id: 3, name: 'Staff 1', email: 'staff1@ultaratie.com', role: 'viewer', status: 'inactive', selected: false },
    { id: 4, name: 'Fahmi', email: 'fahmi@ultaratie.com', role: 'owner', status: 'active', selected: false },
    { id: 5, name: 'Vendor ABC', email: 'vendor@abc.com', role: 'vendor', status: 'active', selected: false },
    { id: 6, name: 'John Doe', email: 'john@email.com', role: 'viewer', status: 'revoked', selected: false },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [permissionsToRevoke, setPermissionsToRevoke] = useState({
    transactions: false,
    customers: false,
    inventory: false,
    menu: false,
    reports: false
  });

  const toggleSelect = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, selected: !user.selected } : user
    ));
  };

  const handleRevokeClick = (user) => {
    setSelectedUser(user);
    setShowRevokeModal(true);
    // Reset permissions selection
    setPermissionsToRevoke({
      transactions: false,
      customers: false,
      inventory: false,
      menu: false,
      reports: false
    });
  };

  const handleBulkRevoke = () => {
    const selectedUsers = users.filter(user => user.selected);
    if (selectedUsers.length === 0) {
      alert('Please select at least one user');
      return;
    }
    
    if (window.confirm(`Revoke access for ${selectedUsers.length} selected user(s)?`)) {
      setUsers(users.map(user => 
        user.selected ? { ...user, status: 'revoked', selected: false } : user
      ));
      alert(`Access revoked for ${selectedUsers.length} user(s)`);
    }
  };

  const handleConfirmRevoke = () => {
    if (!selectedUser) return;
    
    const selectedPermissions = Object.keys(permissionsToRevoke).filter(key => permissionsToRevoke[key]);
    
    if (selectedPermissions.length === 0) {
      alert('Please select at least one permission to revoke');
      return;
    }

    setUsers(users.map(u => 
      u.id === selectedUser.id ? { ...u, status: 'revoked' } : u
    ));
    
    setShowRevokeModal(false);
    alert(`Access revoked for ${selectedUser.name}. Permissions removed: ${selectedPermissions.join(', ')}`);
  };

  const handlePermissionToggle = (permission) => {
    setPermissionsToRevoke(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCount = users.filter(user => user.selected).length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const revokedUsers = users.filter(user => user.status === 'revoked').length;

  // Only owner can access this page
  if (user?.role !== 'owner') {
    return (
      <div className="page-container">
        <h1><i className="fas fa-ban"></i> Access Denied</h1>
        <p>Only restaurant owners can access the revoke access page.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1><i className="fas fa-user-lock"></i> Revoke Access Management</h1>
        <p>Manage user permissions and access levels</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-blue)' }}>
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-green)' }}>
            <i className="fas fa-user-check"></i>
          </div>
          <div className="stat-content">
            <h3>{activeUsers}</h3>
            <p>Active Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-red)' }}>
            <i className="fas fa-user-slash"></i>
          </div>
          <div className="stat-content">
            <h3>{revokedUsers}</h3>
            <p>Revoked Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-orange)' }}>
            <i className="fas fa-user-clock"></i>
          </div>
          <div className="stat-content">
            <h3>{selectedCount}</h3>
            <p>Selected</p>
          </div>
        </div>
      </div>

      {/* Search and Bulk Actions */}
      <div className="card">
        <div className="card-header">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search users by name, email or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="bulk-actions">
            <button 
              className="btn btn-danger"
              onClick={handleBulkRevoke}
              disabled={selectedCount === 0}
            >
              <i className="fas fa-user-lock"></i> Revoke Selected ({selectedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">System Users</h2>
          <button className="btn btn-success" disabled>
            <i className="fas fa-plus"></i> Add New User
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    checked={selectedCount === filteredUsers.length && filteredUsers.length > 0}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setUsers(users.map(user => {
                        const isInFiltered = filteredUsers.some(fu => fu.id === user.id);
                        return isInFiltered ? { ...user, selected: checked } : user;
                      }));
                    }}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((userItem) => (
                <tr key={userItem.id}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={userItem.selected}
                      onChange={() => toggleSelect(userItem.id)}
                      disabled={userItem.status === 'revoked'}
                    />
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: userItem.role === 'owner' ? 'var(--primary-dark)' : 
                                       userItem.role === 'cs_manager' ? 'var(--accent-blue)' :
                                       userItem.role === 'logistics_manager' ? 'var(--accent-green)' : 'var(--neutral-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        {userItem.name.charAt(0)}
                      </div>
                      <div>
                        <strong>{userItem.name}</strong>
                        <div style={{ fontSize: '0.85rem', color: 'var(--neutral-dark)' }}>
                          ID: #{userItem.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{userItem.email}</td>
                  <td>
                    <span className={`role-badge ${userItem.role}`}>
                      {userItem.role === 'owner' ? 'Owner' : 
                       userItem.role === 'cs_manager' ? 'CS Manager' : 
                       userItem.role === 'logistics_manager' ? 'Logistics Manager' : 
                       userItem.role === 'viewer' ? 'Viewer' : 'Vendor'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${userItem.status}`}>
                      <i className={`fas fa-${userItem.status === 'active' ? 'check-circle' : 
                                    userItem.status === 'revoked' ? 'ban' : 'user-clock'}`}></i>
                      {userItem.status === 'active' ? 'Active' : 
                       userItem.status === 'revoked' ? 'Revoked' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    {userItem.status === 'active' ? 'Today, 10:30 AM' : 
                     userItem.status === 'revoked' ? '2 days ago' : '1 week ago'}
                  </td>
                  <td>
                    <button className="action-btn view" title="View Details">
                      <i className="fas fa-eye"></i>
                    </button>
                    {userItem.status !== 'revoked' && (
                      <button 
                        className="action-btn delete" 
                        title="Revoke Access"
                        onClick={() => handleRevokeClick(userItem)}
                      >
                        <i className="fas fa-ban"></i>
                      </button>
                    )}
                    {userItem.status === 'revoked' && (
                      <button className="action-btn restore" title="Restore Access" disabled>
                        <i className="fas fa-undo"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--neutral-dark)' }}>
            <i className="fas fa-search" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
            <p>No users found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Audit Log */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fas fa-history"></i> Access Audit Log
          </h2>
        </div>
        <div className="audit-log">
          <div className="log-item">
            <div className="log-icon" style={{ backgroundColor: 'rgba(255, 107, 107, 0.1)', color: 'var(--accent-red)' }}>
              <i className="fas fa-ban"></i>
            </div>
            <div className="log-content">
              <p><strong>Access revoked for John Doe (john@email.com)</strong></p>
              <p>Permissions removed: Transaction processing, Customer management</p>
              <small>By: Fahmi (Owner) • 2 hours ago</small>
            </div>
          </div>
          <div className="log-item">
            <div className="log-icon" style={{ backgroundColor: 'rgba(108, 207, 127, 0.1)', color: 'var(--accent-green)' }}>
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="log-content">
              <p><strong>New user added: Staff 1 (staff1@ultaratie.com)</strong></p>
              <p>Role assigned: Viewer • Limited access permissions</p>
              <small>By: Kelvin (CS Manager) • Yesterday, 3:45 PM</small>
            </div>
          </div>
          <div className="log-item">
            <div className="log-icon" style={{ backgroundColor: 'rgba(93, 156, 236, 0.1)', color: 'var(--accent-blue)' }}>
              <i className="fas fa-user-edit"></i>
            </div>
            <div className="log-content">
              <p><strong>Permissions updated for Ibra (ibra@ultaratie.com)</strong></p>
              <p>Added: Inventory management, Delivery tracking</p>
              <small>By: Fahmi (Owner) • 2 days ago</small>
            </div>
          </div>
        </div>
      </div>

      {/* Revoke Modal */}
      {showRevokeModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3><i className="fas fa-user-lock"></i> Revoke Permissions</h3>
              <button onClick={() => setShowRevokeModal(false)} className="close-btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="user-info-modal">
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: selectedUser.role === 'owner' ? 'var(--primary-dark)' : 
                                 selectedUser.role === 'cs_manager' ? 'var(--accent-blue)' :
                                 selectedUser.role === 'logistics_manager' ? 'var(--accent-green)' : 'var(--neutral-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
                  {selectedUser.name.charAt(0)}
                </div>
                <h4>{selectedUser.name}</h4>
                <p>{selectedUser.email}</p>
                <span className={`role-badge ${selectedUser.role}`} style={{ marginBottom: '1.5rem' }}>
                  {selectedUser.role === 'owner' ? 'Owner' : 
                   selectedUser.role === 'cs_manager' ? 'CS Manager' : 
                   selectedUser.role === 'logistics_manager' ? 'Logistics Manager' : 'Viewer'}
                </span>
              </div>

              <p style={{ marginBottom: '1rem', color: 'var(--neutral-dark)' }}>
                Select permissions to revoke from this user:
              </p>
              
              <div className="permission-list" style={{ marginBottom: '1.5rem' }}>
                {[
                  { key: 'transactions', label: 'Transaction Processing', icon: 'fas fa-receipt' },
                  { key: 'customers', label: 'Customer Management', icon: 'fas fa-user-friends' },
                  { key: 'inventory', label: 'Inventory Management', icon: 'fas fa-boxes' },
                  { key: 'menu', label: 'Menu Management', icon: 'fas fa-utensils' },
                  { key: 'reports', label: 'Report Access', icon: 'fas fa-chart-bar' }
                ].map((permission) => (
                  <div 
                    key={permission.key}
                    className={`permission-item ${permissionsToRevoke[permission.key] ? 'selected' : ''}`}
                    onClick={() => handlePermissionToggle(permission.key)}
                  >
                    <div className="permission-checkbox">
                      {permissionsToRevoke[permission.key] && <i className="fas fa-check"></i>}
                    </div>
                    <i className={permission.icon}></i>
                    <span>{permission.label}</span>
                  </div>
                ))}
              </div>

              <div className="alert warning" style={{ marginBottom: '1.5rem' }}>
                <i className="fas fa-exclamation-triangle"></i>
                <div>
                  <strong>Warning:</strong> This action cannot be undone. The user will lose access to selected features immediately.
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" onClick={handleConfirmRevoke}>
                <i className="fas fa-ban"></i> Confirm Revoke
              </button>
              <button className="btn" onClick={() => setShowRevokeModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevokeAccess;