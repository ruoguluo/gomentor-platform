import React from 'react'

export const CompliancePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Compliance Monitoring</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-200">
          <p className="text-red-600 font-semibold">High Priority Alerts</p>
          <p className="text-3xl font-bold text-red-600">3</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-yellow-200">
          <p className="text-yellow-600 font-semibold">Medium Priority</p>
          <p className="text-3xl font-bold text-yellow-600">7</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500">Resolved Today</p>
          <p className="text-3xl font-bold">12</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold p-6 border-b">Recent Alerts</h2>
        
        <div className="divide-y">
          {[
            { type: 'Contact Sharing', user: 'mentor_123', severity: 'High', status: 'Open' },
            { type: 'Inappropriate Content', user: 'user_456', severity: 'Medium', status: 'Under Review' },
          ].map((alert, i) => (
            <div key={i} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{alert.type}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      alert.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">User: {alert.user}</p>
                </div>
                
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-blue-600 hover:underline">View Details</button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Mark Resolved</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
