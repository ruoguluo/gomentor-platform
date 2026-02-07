import React from 'react'
import { 
  DollarSign, 
  Users, 
  Star, 
  Clock, 
  Calendar, 
  Settings, 
  Edit3, 
  TrendingUp,
  Video,
  MessageSquare,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react'

export const MentorPortalPage: React.FC = () => {
  const stats = [
    { 
      label: 'Total Earnings', 
      value: '$8,500', 
      change: '+12% this month',
      icon: DollarSign, 
      color: 'green',
      trend: 'up'
    },
    { 
      label: 'Sessions Completed', 
      value: '45', 
      change: '+5 this week',
      icon: Users, 
      color: 'blue',
      trend: 'up'
    },
    { 
      label: 'Average Rating', 
      value: '4.8', 
      change: 'Top 10%',
      icon: Star, 
      color: 'yellow',
      trend: 'stable'
    },
    { 
      label: 'Availability', 
      value: 'Online', 
      change: 'Accepting bookings',
      icon: Clock, 
      color: 'purple',
      trend: 'active'
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      mentee: "Alex Kim",
      topic: "Career Transition Strategy",
      time: "Today, 2:00 PM",
      duration: "45 min",
      type: "video",
      status: "confirmed"
    },
    {
      id: 2,
      mentee: "Maria Garcia",
      topic: "Technical Interview Prep",
      time: "Tomorrow, 10:00 AM",
      duration: "60 min",
      type: "video",
      status: "confirmed"
    },
    {
      id: 3,
      mentee: "John Smith",
      topic: "Resume Review",
      time: "Feb 10, 3:00 PM",
      duration: "30 min",
      type: "chat",
      status: "pending"
    }
  ]

  const recentMessages = [
    { name: "Alex Kim", message: "Thank you for the session! It was really helpful.", time: "2h ago", unread: false },
    { name: "Maria Garcia", message: "Can we reschedule our session to next week?", time: "5h ago", unread: true },
    { name: "David Lee", message: "I have a question about the resources you shared.", time: "1d ago", unread: true },
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      green: 'from-green-500 to-emerald-600 shadow-green-500/25',
      blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
      yellow: 'from-yellow-500 to-orange-500 shadow-yellow-500/25',
      purple: 'from-purple-500 to-violet-600 shadow-purple-500/25',
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mentor Portal</h1>
          <p className="text-gray-500 mt-1">Manage your mentorship activities and track your impact.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25">
            <Calendar className="w-4 h-4" />
            Set Availability
          </button>
          
          <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
            <Settings className="w-5 h-5" />
          </button>
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
            
            <p className="text-sm text-green-600 mt-4 font-medium">
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
            
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="divide-y divide-gray-100">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      {session.type === 'video' ? (
                        <Video className="w-6 h-6 text-white" />
                      ) : (
                        <MessageSquare className="w-6 h-6 text-white" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">{session.topic}</h3>
                      <p className="text-gray-500 text-sm">with {session.mentee}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
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
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      session.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                    
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium hover:bg-blue-100 transition-all">
                <Calendar className="w-5 h-5" />
                Update Schedule
              </button>
              
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all">
                <Edit3 className="w-5 h-5" />
                Edit Profile
              </button>
              
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all">
                <TrendingUp className="w-5 h-5" />
                View Analytics
              </button>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Messages</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentMessages.map((msg, index) => (
                <div key={index} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-xl transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-gray-600">
                      {msg.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900 text-sm">{msg.name}</p>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{msg.message}</p>
                  </div>
                  
                  {msg.unread && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Earnings Summary */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">This Month</span>
            </div>
            
            <p className="text-4xl font-bold mb-1">$2,450</p>
            <p className="text-green-100 text-sm">+23% from last month</p>
            
            <button className="mt-4 w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors">
              View Earnings Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
