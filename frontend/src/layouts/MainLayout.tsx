import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Navbar } from '../components/layout/Navbar'
import { Sidebar } from '../components/layout/Sidebar'

export const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
