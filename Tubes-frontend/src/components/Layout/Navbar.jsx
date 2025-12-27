import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getRoleDisplay = (role) => {
    const roles = {
      owner: 'Restaurant Owner',
      cs_manager: 'Customer Service Manager',
      logistics_manager: 'Logistics Manager',
      viewer: 'Viewer'
    };
    return roles[role] || role;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navLeft}>
        <div style={styles.logo} onClick={() => navigate('/dashboard')}>
          <i className="fas fa-utensils" style={styles.logoIcon}></i>
          <span style={styles.logoText}>Ultaratie</span>
        </div>
      </div>

      <div style={styles.navRight}>
        <div style={styles.userInfo}>
          <div style={styles.userAvatar}>
            <i className="fas fa-user"></i>
          </div>
          <div style={styles.userDetails}>
            <span style={styles.userName}>{user?.name || 'User'}</span>
            <span style={styles.userRole}>{getRoleDisplay(user?.role)}</span>
          </div>
        </div>
        
        <button onClick={handleLogout} style={styles.logoutBtn}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: 'var(--secondary-dark)',
    color: 'var(--text-light)',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer'
  },
  logoIcon: {
    fontSize: '1.5rem',
    color: 'var(--primary-dark)'
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: '600'
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-dark)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--secondary-dark)',
    fontSize: '1rem'
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column'
  },
  userName: {
    fontWeight: '600',
    fontSize: '0.9rem'
  },
  userRole: {
    fontSize: '0.75rem',
    opacity: '0.8'
  },
  logoutBtn: {
    backgroundColor: 'var(--accent-red)',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  }
};

export default Navbar;