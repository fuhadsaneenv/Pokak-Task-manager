// src/Components/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export function PublicRoute({ children }) {
  const token = localStorage.getItem("token"); // get JWT from localStorage

  if (token) {
    // if token exists, user is logged in -> redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // else allow access
  return children;
}
