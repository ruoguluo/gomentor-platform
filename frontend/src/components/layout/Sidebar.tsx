import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-50 min-h-screen border-r p-4">
      <nav className="space-y-2">
        <Link 
          to="/dashboard" 
          className="block px-4 py-2 rounded-lg hover:bg-gray-200 text-gray-700"
        >
          Dashboard
        </Link>
        
        <Link 
          to="/mentors" 
          className="block px-4 py-2 rounded-lg hover:bg-gray-200 text-gray-700"
        >
          Find Mentors
        </Link>
        
        <Link 
          to="/projects" 
          className="block px-4 py-2 rounded-lg hover:bg-gray-200 text-gray-700"
        >
          My Projects
        </Link>
        
        <Link 
          to="/courses" 
          className="block px-4 py-2 rounded-lg hover:bg-gray-200 text-gray-700"
        >
          Courses
        </Link>
        
        <hr className="my-4"></hr>
        
        <p className="px-4 text-xs font-semibold text-gray-500 uppercase">Portals</p>
        
        <Link 
          to="/portal/mentee" 
          className="block px-4 py-2 rounded-lg hover:bg-gray-200 text-gray-700"
        >
          Mentee Portal
        </Link>
        
        <Link 
          to="/portal/mentor" 
          className="block px-4 py-2 rounded-lg hover:bg-gray-200 text-gray-700"
        >
          Mentor Portal
        </Link>
        
        <hr className="my-4"></hr>
        
        <Link 
          to="/profile" 
          className="block px-4 py-2 rounded-lg hover:bg-gray-200 text-gray-700"
        >
          Profile
        </Link>
      </nav>
    </aside>
  )
}
