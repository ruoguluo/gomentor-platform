import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { mentorApi, MentorProfile } from '../../services/mentor'
import { Search, Star, Briefcase } from 'lucide-react'

export const MentorSearchPage: React.FC = () => {
  const [mentors, setMentors] = useState<MentorProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    expertise: '',
    industry: '',
    minRating: 0,
    maxRate: 1000
  })

  useEffect(() => {
    searchMentors()
  }, [])

  const searchMentors = async () => {
    setLoading(true)
    try {
      const response = await mentorApi.searchMentors(filters)
      if (response.success) {
        setMentors(response.data)
      }
    } catch (error) {
      console.error('Failed to search mentors', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchMentors()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Find a Mentor</h1>
      
      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by expertise (e.g. React, Leadership)..."
              value={filters.expertise}
              onChange={(e) => setFilters({ ...filters, expertise: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>
          
          <div className="md:w-48">
            <select 
              value={filters.industry}
              onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
            >
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          
          <button 
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Search
          </button>
        </form>
      </div>
      
      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : mentors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <Link 
              key={mentor.id} 
              to={`/mentors/${mentor.id}`}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow block group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  {mentor.user.avatar ? (
                    <img src={mentor.user.avatar} alt={mentor.user.firstName} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                      {mentor.user.firstName[0]}{mentor.user.lastName[0]}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {mentor.user.firstName} {mentor.user.lastName}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Briefcase className="w-3 h-3" />
                      <span>{mentor.currentTitle} at {mentor.currentCompany}</span>
                    </div>
                  </div>
                </div>
                {mentor.averageRating > 0 && (
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-yellow-700">{mentor.averageRating.toFixed(1)}</span>
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {mentor.user.profile?.headline || `Expert in ${mentor.industry}`}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.expertiseTags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium">
                    {tag}
                  </span>
                ))}
                {mentor.expertiseTags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-md">
                    +{mentor.expertiseTags.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <div>
                  <span className="text-lg font-bold text-gray-900">${mentor.scheduledRate}</span>
                  <span className="text-xs text-gray-500">/hr</span>
                </div>
                <span className="px-4 py-2 bg-gray-50 text-gray-900 rounded-lg text-sm font-medium group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  View Profile
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No mentors found</h3>
          <p className="text-gray-500">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  )
}
