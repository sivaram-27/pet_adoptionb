import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // Not the required role, redirect to home page
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
