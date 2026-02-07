import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore()

  return (
    <nav className="bg-white border-b px-6 py-3">
      <div className="flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-blue-600">GoMentor</Link>
        
        <div className="flex items-center gap-4">
          <Link to="/notifications" className="text-gray-600 hover:text-gray-900">
            🔔
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{user?.firstName} {user?.lastName}</span>
            <button 
              onClick={logout}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
