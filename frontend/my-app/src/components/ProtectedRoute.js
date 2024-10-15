import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Update the import path

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, login, logout } = useAuth();
  const location = useLocation();

  const handleLogin = () => {
    login(); // Call login when needed
  };

  const handleLogout = () => {
    logout(); // Call logout when needed
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      {children}
      <button onClick={handleLogin}>login</button> {/* Example usage */}
      <button onClick={handleLogout}>Logout</button> {/* Example usage */}
    </>
  );
};

export default ProtectedRoute;