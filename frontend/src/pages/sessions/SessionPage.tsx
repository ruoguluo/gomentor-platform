import React from 'react'
import { useParams } from 'react-router-dom'

export const SessionPage: React.FC = () => {
  const { id } = useParams()
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Video Area */}
        <div className="aspect-video bg-gray-900 flex items-center justify-center">
          <p className="text-white">Video Call Interface (Session ID: {id})</p>
        </div>
        
        {/* Controls */}
        <div className="p-4 flex justify-center gap-4 border-b">
          <button className="p-3 bg-red-500 text-white rounded-full">End Call</button>
          <button className="p-3 bg-gray-200 rounded-full">Mute</button>
          <button className="p-3 bg-gray-200 rounded-full">Video</button>
        </div>
        
        {/* Chat */}
        <div className="h-64 p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Session Notes</h3>
          <div className="space-y-2">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">AI Summary will appear here...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
