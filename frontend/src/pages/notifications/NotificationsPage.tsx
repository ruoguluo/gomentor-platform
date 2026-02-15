import React from 'react'

export const NotificationsPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Notifications</h1>
      
      <div className="bg-white rounded-xl shadow-sm border divide-y">
        {[
          { title: 'Upcoming Session', message: 'Your session with Sarah Chen starts in 15 minutes', time: '15 min ago', unread: true },
          { title: 'Welcome to PhxNorth!', message: 'Complete your profile to get better mentor matches', time: '2 hours ago', unread: true },
          { title: 'Session Completed', message: 'Your session with Marcus Johnson has ended', time: '1 day ago', unread: false },
        ].map((notif, i) => (
          <div key={i} className={`p-4 ${notif.unread ? 'bg-blue-50' : ''}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{notif.title}</h3>
                <p className="text-gray-600 text-sm">{notif.message}</p>
              </div>
              <span className="text-xs text-gray-400">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
