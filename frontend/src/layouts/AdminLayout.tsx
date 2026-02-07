import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Check if user is admin
  if (!user?.roles.includes('ADMIN')) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="flex">
        <aside className="w-64 glass min-h-screen border-r border-white/20">
          <div className="p-4 border-b border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50">
            <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
          </div>
          <nav className="p-4 space-y-2">
            <a href="/admin" className="sidebar-link">Dashboard</a>
            <a href="/admin/users" className="sidebar-link">Users</a>
            <a href="/admin/verification" className="sidebar-link">Verification</a>
            <a href="/admin/compliance" className="sidebar-link">Compliance</a>
            <a href="/admin/finance" className="sidebar-link">Finance</a>
          </nav>
        </aside>
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
