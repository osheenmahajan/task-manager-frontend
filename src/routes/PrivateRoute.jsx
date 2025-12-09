import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Assuming role is stored in localStorage on login

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Role not authorized
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;