import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import '../styles/App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Demo login logic
    setTimeout(() => {
      let role = 'viewer';
      let name = 'User';
      
      if (email.includes('fahmi') || email === 'fahmi@ultaratie.com') {
        role = 'owner';
        name = 'Fahmi';
      } else if (email.includes('kelvin') || email === 'kelvin@ultaratie.com') {
        role = 'cs_manager';
        name = 'Kelvin';
      } else if (email.includes('ibra') || email === 'ibra@ultaratie.com') {
        role = 'logistics_manager';
        name = 'Ibra';
      }
      
      login({ 
        email, 
        role, 
        name,
        permissions: getPermissionsByRole(role)
      });
      
      navigate('/dashboard');
      setIsLoading(false);
    }, 800);
  };

  const demoLogin = (role, name, email) => {
    setEmail(email);
    setPassword('password123');

    const userData = { 
    email, 
    role, 
    name, // ← NAMA DISIMPAN DI SINI
    permissions: getPermissionsByRole(role)
    };
    
    // Auto submit setelah 100ms
    setTimeout(() => {
        login(userData); // ← AuthContext menyimpan data ini
        navigate('/dashboard');
        setIsLoading(false);
        }, 100);
    };

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--neutral-light) 0%, #FEF9F3 100%)'
    },
    brandPanel: {
      flex: 1,
      background: 'linear-gradient(135deg, var(--secondary-dark) 0%, var(--neutral-dark) 100%)',
      padding: '3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    formPanel: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    },
    formWrapper: {
      maxWidth: '450px',
      width: '100%',
      padding: '3rem',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 40px var(--shadow)'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '2rem'
    },
    logoIcon: {
      backgroundColor: 'var(--primary-dark)',
      width: '60px',
      height: '60px',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      color: 'var(--secondary-dark)'
    },
    demoButton: {
      width: '100%',
      padding: '0.875rem',
      marginBottom: '0.75rem',
      border: 'none',
      borderRadius: '10px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Panel - Brand */}
      <div style={styles.brandPanel}>
        <div className="brand-content">
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <i className="fas fa-utensils"></i>
            </div>
            <h1 style={{ color: 'var(--text-light)', fontSize: '3rem' }}>Ultaratie</h1>
          </div>
          <p style={{ color: 'var(--primary-light)', fontSize: '1.2rem', marginBottom: '3rem' }}>
            Premium Restaurant Management System
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div style={styles.formPanel}>
        <div style={styles.formWrapper}>
          <h2 style={{ color: 'var(--secondary-dark)', marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--neutral-dark)', marginBottom: '2rem' }}>Sign in to your account</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" style={{ color: 'var(--secondary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-envelope" style={{ color: 'var(--secondary-light)' }}></i> 
                Enter Your E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@ultaratie.com"
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" style={{ color: 'var(--secondary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-lock" style={{ color: 'var(--secondary-light)' }}></i> 
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                </button>
              </div>
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" style={{ color: 'var(--neutral-dark)' }}>Remember me</label>
              </div>
              <button 
                type="button" 
                className="forgot-password"
                onClick={() => alert('Forgot password feature coming soon!')}
              >
                Forgot Password?
              </button>
            </div>
            
            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
              style={{
                backgroundColor: 'var(--primary-dark)',
                color: 'var(--secondary-dark)'
              }}
            >
              {isLoading ? (
                <><i className="fas fa-spinner fa-spin"></i> Logging in...</>
              ) : (
                <><i className="fas fa-sign-in-alt"></i> Login</>
              )}
            </button>
            
            {/* Demo Login Buttons */}
            <div className="demo-login-section">
              <p className="demo-title">Quick Demo Access</p>
              <div className="demo-buttons">
                <button 
                  type="button"
                  style={{...styles.demoButton, backgroundColor: 'var(--primary-light)', color: 'var(--secondary-dark)'}}
                  onClick={() => demoLogin('owner', 'Fahmi', 'fahmi@ultaratie.com')}
                >
                  <i className="fas fa-crown"></i> Owner (Fahmi)
                </button>
                <button 
                  type="button"
                  style={{...styles.demoButton, backgroundColor: 'var(--accent-blue)', color: 'white'}}
                  onClick={() => demoLogin('cs_manager', 'Kelvin', 'kelvin@ultaratie.com')}
                >
                  <i className="fas fa-headset"></i> CS Manager (Kelvin)
                </button>
                <button 
                  type="button"
                  style={{...styles.demoButton, backgroundColor: 'var(--accent-green)', color: 'white'}}
                  onClick={() => demoLogin('logistics_manager', 'Ibra', 'ibra@ultaratie.com')}
                >
                  <i className="fas fa-truck-loading"></i> Logistics (Ibra)
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const getPermissionsByRole = (role) => {
  const permissions = {
    owner: ['all'],
    cs_manager: ['view', 'create', 'update'],
    logistics_manager: ['view', 'create', 'update', 'delete']
  };
  return permissions[role] || ['view'];
};

export default Login;