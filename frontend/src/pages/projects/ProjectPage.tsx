import React from 'react'

export const ProjectPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leadership Development Program</h1>
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Active</span>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Project Overview</h2>
        <p className="text-gray-600 mb-4">6-month program to develop engineering leadership skills and transition from Senior Engineer to Engineering Manager.</p>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">15% Complete</p>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Phases</h2>
        
        {['Discovery & Assessment', 'Skill Building', 'Practice & Application', 'Review & Next Steps'].map((phase, i) => (
          <div key={phase} className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">Phase {i + 1}</span>
                <h3 className="font-semibold">{phase}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                i === 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {i === 0 ? 'Active' : 'Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
