import React from 'react'

export const MentorPortalPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mentor Portal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Earnings</p>
          <p className="text-3xl font-bold">$8,500</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Sessions Completed</p>
          <p className="text-3xl font-bold">45</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Average Rating</p>
          <p className="text-3xl font-bold">4.8</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Availability</p>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Online</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Set Availability</button>
            <button className="w-full py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Edit Profile</button>
            <button className="w-full py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">View Earnings</button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Alex Kim</p>
              <p className="text-sm text-gray-500">Tomorrow at 2:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
