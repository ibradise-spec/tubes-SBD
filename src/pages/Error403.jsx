import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error403 = () => {
  const navigate = useNavigate();
  
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">
          <i className="fas fa-lock"></i>
        </div>
        <h1>403 - Access Denied</h1>
        <p className="error-message">
          You don't have permission to access this page. 
          Please contact the system administrator if you believe this is an error.
        </p>
        <div className="error-actions">
          <button onClick={() => navigate(-1)} className="back-btn">
            <i className="fas fa-arrow-left"></i> Go Back
          </button>
          <button onClick={() => navigate('/dashboard')} className="home-btn">
            <i className="fas fa-home"></i> Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error403;