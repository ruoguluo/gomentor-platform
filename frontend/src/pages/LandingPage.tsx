import React from 'react'
import { Link } from 'react-router-dom'

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
      <nav className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold">GoMentor</div>
        <div className="space-x-4">
          <Link to="/login" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400">Get Started</Link>
        </div>
      </nav>
      
      <div className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Learn from the World's Top Professionals
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-blue-100">
          Connect with active industry leaders, not retired coaches. 
          AI-powered mentorship for your career growth.
        </p>
        
        <div className="flex gap-4">
          <Link to="/register" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100">
            Find Your Mentor
          </Link>
          <Link to="/register" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10">
            Become a Mentor
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold">500+</div>
            <div className="text-blue-200">Expert Mentors</div>
          </div>
          <div>
            <div className="text-4xl font-bold">10k+</div>
            <div className="text-blue-200">Sessions Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold">4.9</div>
            <div className="text-blue-200">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  )
}
