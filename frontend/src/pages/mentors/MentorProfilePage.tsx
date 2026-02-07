 

export const MentorProfilePage: React.FC = () => {
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-sm border">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Sarah Chen</h1>
            <p className="text-gray-600">Former VP Engineering at Google</p>
            
            <div className="flex gap-2 mt-2">
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-gray-500">4.8 (45 reviews)</span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-bold">$200/hr</p>
            <button className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Book Session
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-600">15+ years in tech leadership. Passionate about helping engineers grow into leaders. I've managed teams of 200+ engineers at Google and love mentoring the next generation.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {['Leadership', 'Engineering Management', 'System Design', 'Career Growth', 'Team Building'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
