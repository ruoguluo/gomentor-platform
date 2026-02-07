import React from 'react'

export const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
          <div>
            <h2 className="text-xl font-semibold">Alex Kim</h2>
            <p className="text-gray-600">alex.kim@gomentor.com</p>
          </div>
        </div>
        
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" defaultValue="Alex" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" defaultValue="Kim" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea 
              defaultValue="Software Engineer seeking leadership growth"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24"
            />
          </div>
          
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
