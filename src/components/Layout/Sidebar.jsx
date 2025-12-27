import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  // Menu items based on role
  const menuItems = {
    owner: [
      { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-home' },
      { path: '/admin/users', label: 'User Management', icon: 'fas fa-users-cog' },
      { path: '/menu', label: 'Menu Management', icon: 'fas fa-utensils' },
      { path: '/customers', label: 'Customers', icon: 'fas fa-user-friends' },
      { path: '/transactions', label: 'Transactions', icon: 'fas fa-receipt' },
      { path: '/supply', label: 'Inventory', icon: 'fas fa-boxes' },
      { path: '/delivery', label: 'Delivery', icon: 'fas fa-truck' },
      { path: '/reports', label: 'Reports', icon: 'fas fa-chart-bar' },
      { path: '/admin/revoke', label: 'Revoke Access', icon: 'fas fa-ban' }
    ],
    cs_manager: [
      { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-home' },
      { path: '/menu', label: 'Menu', icon: 'fas fa-utensils' },
      { path: '/customers', label: 'Customers', icon: 'fas fa-user-friends' },
      { path: '/transactions', label: 'Transactions', icon: 'fas fa-receipt' },
      { path: '/delivery', label: 'Delivery Status', icon: 'fas fa-truck' }
    ],
    logistics_manager: [
      { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-home' },
      { path: '/supply', label: 'Inventory', icon: 'fas fa-boxes' },
      { path: '/delivery', label: 'Delivery', icon: 'fas fa-truck' },
      { path: '/reports/inventory', label: 'Inventory Report', icon: 'fas fa-chart-pie' }
    ],
    viewer: [
      { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-home' }
    ]
  };

  const items = menuItems[user?.role] || menuItems.viewer;

  return (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <div style={styles.sidebarLogo}>
          <i className="fas fa-utensils" style={styles.logoIcon}></i>
        </div>
        <h3 style={styles.sidebarTitle}>Ultaratie</h3>
      </div>
      
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          {items.map((item, index) => (
            <li key={index} style={styles.navItem}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  ...styles.navLink,
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  color: isActive ? 'var(--secondary-dark)' : 'var(--text-dark)'
                })}
              >
                <i className={item.icon} style={styles.navIcon}></i>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div style={styles.sidebarFooter}>
        <div style={styles.systemStatus}>
          <div style={styles.statusIndicator}></div>
          <span style={styles.statusText}>System Online</span>
        </div>
        <small style={styles.version}>v1.0.0</small>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: 'white',
    borderRight: '1px solid var(--primary-light)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '2px 0 10px var(--shadow)'
  },
  sidebarHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid var(--primary-light)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  sidebarLogo: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--primary-dark)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--secondary-dark)',
    fontSize: '1.25rem'
  },
  sidebarTitle: {
    color: 'var(--secondary-dark)',
    fontSize: '1.25rem',
    fontWeight: '600'
  },
  nav: {
    flex: 1,
    padding: '1rem 0'
  },
  navList: {
    listStyle: 'none'
  },
  navItem: {
    marginBottom: '0.25rem'
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontWeight: '500'
  },
  navIcon: {
    width: '20px',
    textAlign: 'center'
  },
  sidebarFooter: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid var(--primary-light)',
    fontSize: '0.75rem',
    color: 'var(--neutral-dark)'
  },
  systemStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem'
  },
  statusIndicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-green)'
  },
  statusText: {
    fontSize: '0.75rem'
  },
  version: {
    opacity: '0.6'
  }
};

export default Sidebar;