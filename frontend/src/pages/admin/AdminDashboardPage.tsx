import React from 'react'

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Users</p>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Pending Verifications</p>
          <p className="text-3xl font-bold text-orange-600">12</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Compliance Alerts</p>
          <p className="text-3xl font-bold text-red-600">3</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Monthly Revenue</p>
          <p className="text-3xl font-bold">$45,230</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm"><strong>New mentor registration:</strong> Sarah Chen</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm"><strong>Session completed:</strong> Alex Kim & Marcus Johnson</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/admin/verification" className="block w-full py-3 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700">Review Verifications</a>
            <a href="/admin/compliance" className="block w-full py-3 text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50">View Compliance Alerts</a>
          </div>
        </div>
      </div>
    </div>
  )
}
