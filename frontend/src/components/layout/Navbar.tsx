import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { Sparkles, Bell, User, LogOut } from 'lucide-react'

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore()
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="glass sticky top-0 z-50 rounded-b-2xl">
      <div className="px-6 py-3 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/40 transition-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">PhxNorth</span>
          </Link>
          
          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { path: '/dashboard', label: 'Dashboard' },
              { path: '/mentors', label: 'Find Mentors' },
              { path: '/projects', label: 'Projects' },
              { path: '/courses', label: 'Courses' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            
            {/* User Menu */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.primaryRole}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border border-blue-100">
                  <User className="w-5 h-5 text-blue-700" />
                </div>
                
                <button 
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
