import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  BookOpen, 
  GraduationCap, 
  UserCircle, 
  UserCog,
  Settings,
  HelpCircle,
  Sparkles
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const { user } = useAuthStore()
  
  const isActive = (path: string) => location.pathname === path

  const mainLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/mentors', label: 'Find Mentors', icon: Users },
    { path: '/projects', label: 'My Projects', icon: FolderKanban },
    { path: '/courses', label: 'Courses', icon: BookOpen },
  ]

  const portalLinks = [
    { path: '/portal/mentee', label: 'Mentee Portal', icon: GraduationCap },
    { path: '/portal/mentor', label: 'Mentor Portal', icon: UserCog },
  ]

  const otherLinks = [
    { path: '/profile', label: 'Profile', icon: UserCircle },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/help', label: 'Help & Support', icon: HelpCircle },
  ]

  return (
    <aside className="w-64 bg-white min-h-screen border-r border-gray-100 flex flex-col">
      {/* Logo Area */}
      <div className="p-6 border-b border-gray-100">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-gray-900">GoMentor</span>
            <p className="text-xs text-gray-500">Learn & Grow</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Main
          </p>
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${isActive(link.path) ? 'active' : ''}`}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Portals */}
        <div className="space-y-1">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Portals
          </p>
          {portalLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${isActive(link.path) ? 'active' : ''}`}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Other */}
        <div className="space-y-1">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Account
          </p>
          {otherLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${isActive(link.path) ? 'active' : ''}`}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* User Card */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-lg font-bold text-blue-600">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 capitalize truncate">
                {user?.primaryRole} Account
              </p>
            </div>
          </div>
          
          <div className="mt-3 flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-gray-600">Online</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
