// src/ProtectedRoute/ProtectedRoute.jsx
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
  // Example: token stored in localStorage after login
  const token = localStorage.getItem('token')

  if (!token) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />
  }

  // Logged in → render the child page
  return <Outlet />
}
