import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export const AuthLayout: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore()

  if (isAuthenticated) {
    // Role-based redirect after login
    const primaryRole = user?.primaryRole
    if (primaryRole === 'mentor') {
      return <Navigate to="/portal/mentor" replace />
    } else if (primaryRole === 'admin') {
      return <Navigate to="/admin" replace />
    }
    // Default for mentee and others
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <Outlet />
      </div>
    </div>
  )
}
