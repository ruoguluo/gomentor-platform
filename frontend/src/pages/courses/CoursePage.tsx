import React from 'react'

export const CoursePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Engineering Leadership Fundamentals</h3>
            <p className="text-gray-600 text-sm mb-4">Comprehensive course for engineers transitioning into leadership roles.</p>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-gray-500 text-sm">4.7 (12 reviews)</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">$499</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Enroll
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
