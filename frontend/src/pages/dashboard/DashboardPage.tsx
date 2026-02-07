import React from 'react'
import { 
  Calendar, 
  FolderKanban, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  ArrowRight,
  Sparkles,
  Users
} from 'lucide-react'
import { Link } from 'react-router-dom'

export const DashboardPage: React.FC = () => {
  const stats = [
    { 
      label: 'Upcoming Sessions', 
      value: '2', 
      icon: Calendar, 
      color: 'blue',
      change: '+1 this week'
    },
    { 
      label: 'Active Projects', 
      value: '1', 
      icon: FolderKanban, 
      color: 'purple',
      change: 'On track'
    },
    { 
      label: 'Unread Messages', 
      value: '3', 
      icon: MessageSquare, 
      color: 'orange',
      change: '2 new today'
    },
    { 
      label: 'Progress Score', 
      value: '85%', 
      icon: TrendingUp, 
      color: 'green',
      change: '+12% vs last month'
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      mentor: "Dr. Sarah Chen",
      topic: "Career Strategy Review",
      time: "Today, 2:00 PM",
      duration: "45 min",
      avatar: "SC",
      status: "confirmed"
    },
    {
      id: 2,
      mentor: "James Wilson",
      topic: "Technical Architecture Discussion",
      time: "Tomorrow, 10:00 AM",
      duration: "60 min",
      avatar: "JW",
      status: "pending"
    }
  ]

  const quickActions = [
    { label: 'Find a Mentor', path: '/mentors', icon: Users, color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'View Schedule', path: '/dashboard', icon: Clock, color: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50' },
    { label: 'My Projects', path: '/projects', icon: FolderKanban, color: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50' },
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
      purple: 'from-purple-500 to-purple-600 shadow-purple-500/25',
      orange: 'from-orange-500 to-orange-600 shadow-orange-500/25',
      green: 'from-green-500 to-green-600 shadow-green-500/25',
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI Insights Available</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="stat-card card-hover"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getColorClasses(stat.color)} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-4 flex items-center gap-1">
              <span className="text-green-600 font-medium"></span>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Upcoming Sessions</h2>
              <p className="text-gray-500 text-sm mt-1">Your scheduled mentorship calls</p>
            </div>
            
            <Link 
              to="/sessions" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="divide-y divide-gray-100">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {session.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{session.topic}</h3>
                        <p className="text-gray-500 text-sm">with {session.mentor}</p>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {session.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${action.color}`}
                >
                  <action.icon className="w-5 h-5" />
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Recommended Mentors */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">AI Recommended</span>
            </div>
            
            <h3 className="text-lg font-bold mb-2">Find Your Perfect Mentor</h3>
            <p className="text-indigo-100 text-sm mb-4">
              Our AI has found 5 mentors that match your career goals.
            </p>
            
            <Link 
              to="/mentors" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition-colors"
            >
              Explore Matches
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
            
            <div className="space-y-4">
              {[
                { text: "Completed session with Sarah Chen", time: "2 hours ago" },
                { text: "New message from James Wilson", time: "5 hours ago" },
                { text: "Project milestone achieved", time: "1 day ago" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <p className="text-sm text-gray-700">{item.text}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
