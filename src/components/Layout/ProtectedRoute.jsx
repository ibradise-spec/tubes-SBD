import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const ProtectedRoute = ({ children, requiredRole, requiredPermission }) => {
  const { user, hasPermission, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/403" replace />;
  }
  
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/403" replace />;
  }
  
  return children;
};

export default ProtectedRoute;