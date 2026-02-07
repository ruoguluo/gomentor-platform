import React from 'react'

export const VerificationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mentor Verification Queue</h1>
      
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-yellow-50">
          <p className="text-sm"><strong>12 mentors</strong> pending verification</p>
        </div>
        
        <div className="divide-y">
          {[
            { name: 'Dr. Michael Chen', company: 'Former Director at Microsoft', status: 'Pending Review', flags: [] },
            { name: 'Lisa Rodriguez', company: 'CEO at TechStart', status: 'Flagged', flags: ['Company website not found'] },
          ].map((mentor) => (
            <div key={mentor.name} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{mentor.name}</h3>
                  <p className="text-gray-600">{mentor.company}</p>
                  
                  {mentor.flags.length > 0 && (
                    <div className="mt-2">
                      {mentor.flags.map((flag) => (
                        <span key={flag} className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm">
                          ⚠️ {flag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Reject
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    Request Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
