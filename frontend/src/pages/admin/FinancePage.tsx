import React from 'react'

export const FinancePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Finance Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Revenue (MTD)</p>
          <p className="text-3xl font-bold">$45,230</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Platform Commission</p>
          <p className="text-3xl font-bold">$9,046</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Mentor Payouts</p>
          <p className="text-3xl font-bold">$36,184</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Pending Payouts</p>
          <p className="text-3xl font-bold text-orange-600">$5,420</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold p-6 border-b">Pending Payouts</h2>
        
        <div className="divide-y">
          {[
            { mentor: 'Sarah Chen', amount: 3200, status: 'Pending' },
            { mentor: 'Marcus Johnson', amount: 2800, status: 'Processing' },
          ].map((payout) => (
            <div key={payout.mentor} className="p-6 flex justify-between items-center">
              <div>
                <p className="font-semibold">{payout.mentor}</p>
                <span className={`px-2 py-1 rounded text-xs ${
                  payout.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {payout.status}
                </span>
              </div>
              
              <p className="text-xl font-bold">${payout.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
