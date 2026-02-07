import React from 'react'

export const MentorSearchPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Find a Mentor</h1>
      
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by expertise, industry..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Industries</option>
            <option>Technology</option>
            <option>Finance</option>
            <option>Healthcare</option>
          </select>
          
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Mentor Cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <h3 className="font-semibold">Mentor {i}</h3>
                <p className="text-sm text-gray-500">Ex-Google VP</p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">15+ years in tech leadership. Passionate about helping engineers grow.</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Leadership</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Engineering</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">$200/hr</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
