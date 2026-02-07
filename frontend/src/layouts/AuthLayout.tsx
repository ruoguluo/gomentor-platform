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
    <div className="min-h-screen flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden animated-gradient">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl float animation-delay-400" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white rounded-full blur-3xl float animation-delay-200" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-6">
              <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" />
                <path d="M12 12L20 7.5" />
                <path d="M12 12V21" />
                <path d="M12 12L4 7.5" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
            Unlock Your Potential with Expert Mentorship
          </h2>
          
          <p className="text-xl text-blue-100 mb-10 max-w-lg leading-relaxed">
            Connect with industry leaders who have walked the path you're on. 
            Get personalized guidance to accelerate your career growth.
          </p>
          
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-blue-200 text-sm">Expert Mentors</div>
            </div>
            
            <div className="w-px h-12 bg-white/30" />
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10k+</div>
              <div className="text-blue-200 text-sm">Sessions</div>
            </div>
            
            <div className="w-px h-12 bg-white/30" />
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.9</div>
              <div className="text-blue-200 text-sm">Rating</div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
