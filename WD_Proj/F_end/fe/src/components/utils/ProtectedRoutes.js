import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ allowedRoles }) => {
  //console.log(`Logged In: ${loggedIn}, Role: ${role}`);

  const { loggedIn, role } = useSelector((state) => state.user);
  useEffect(() => {
    console.log(`Authentication status: ${loggedIn}, Role: ${role}`);
  }, [loggedIn, role]);
  if (!loggedIn) {
    // If not logged in, redirect to the login page
    return <Navigate to="/" replace />;
  } else if (allowedRoles.includes(role)) {
    
    // If the user's role is in the allowed roles, render the child component
    return <Outlet />;
  } else {
    // If the user's role is not allowed, redirect or show an unauthorized message
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoutes;
