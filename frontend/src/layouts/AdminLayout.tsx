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
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-gray-900 text-white min-h-screen">
          <div className="p-4 border-b border-gray-800">
            <h1 className="text-xl font-bold">Admin Portal</h1>
          </div>
          <nav className="p-4 space-y-2">
            <a href="/admin" className="block px-4 py-2 rounded hover:bg-gray-800">Dashboard</a>
            <a href="/admin/users" className="block px-4 py-2 rounded hover:bg-gray-800">Users</a>
            <a href="/admin/verification" className="block px-4 py-2 rounded hover:bg-gray-800">Verification</a>
            <a href="/admin/compliance" className="block px-4 py-2 rounded hover:bg-gray-800">Compliance</a>
            <a href="/admin/finance" className="block px-4 py-2 rounded hover:bg-gray-800">Finance</a>
          </nav>
        </aside>
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
