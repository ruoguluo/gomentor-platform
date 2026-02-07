import React from 'react'

export const MenteePortalPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mentee Portal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">My Score</p>
          <p className="text-3xl font-bold">1,250</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Sessions Completed</p>
          <p className="text-3xl font-bold">8</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Active Projects</p>
          <p className="text-3xl font-bold">2</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">My Topics & Question Plans</h2>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-medium">Big Tech Interview Preparation</p>
              <p className="text-sm text-gray-600">3 questions planned</p>
            </div>
            <button className="w-full py-2 text-blue-600 hover:underline">+ Start New Topic</button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Active Task Cards</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Complete Leadership Assessment</p>
              <p className="text-sm text-gray-500">Due: Feb 10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
