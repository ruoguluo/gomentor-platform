import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { mentorApi, MentorProfile } from '../../services/mentor'
import { Search, Star, Briefcase, Zap, Phone, Clock, ChevronUp } from 'lucide-react'

export const MentorSearchPage: React.FC = () => {
  const [mentors, setMentors] = useState<MentorProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    expertise: '',
    industry: '',
    minRating: 0,
    maxRate: 1000,
    isOnline: false,
    servicePattern: ''
  })

  useEffect(() => {
    searchMentors()
  }, [])

  const searchMentors = async () => {
    setLoading(true)
    try {
      const response = await mentorApi.searchMentors({
        expertise: filters.expertise || undefined,
        industry: filters.industry || undefined,
        minRating: filters.minRating || undefined,
        maxRate: filters.maxRate || undefined,
        isOnline: filters.isOnline || undefined,
        servicePattern: filters.servicePattern || undefined
      })
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Find a Mentor</h1>

        {/* Online Mentors Count */}
        {!loading && mentors.filter(m => m.isInstantAvailable).length > 0 && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium">
              {mentors.filter(m => m.isInstantAvailable).length} online now
            </span>
          </div>
        )}
      </div>

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

          <div className="md:w-40">
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

          <div className="md:w-44">
            <select
              value={filters.servicePattern}
              onChange={(e) => setFilters({ ...filters, servicePattern: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
            >
              <option value="">All Services</option>
              <option value="instant">⚡ Instant Call</option>
              <option value="scheduled">📅 Scheduled</option>
              <option value="workshop">👥 Workshops</option>
              <option value="consulting">💼 Consulting</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Search
          </button>
        </form>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => {
              const newIsOnline = !filters.isOnline
              setFilters({ ...filters, isOnline: newIsOnline })
              // Trigger search with updated filter
              setLoading(true)
              mentorApi.searchMentors({
                expertise: filters.expertise || undefined,
                industry: filters.industry || undefined,
                minRating: filters.minRating || undefined,
                maxRate: filters.maxRate || undefined,
                isOnline: newIsOnline || undefined,
                servicePattern: filters.servicePattern || undefined
              }).then(response => {
                if (response.success) {
                  setMentors(response.data)
                }
              }).catch(error => {
                console.error('Failed to search mentors', error)
              }).finally(() => {
                setLoading(false)
              })
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${filters.isOnline
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            <div className={`w-2 h-2 rounded-full ${filters.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
            Online Only
          </button>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : mentors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className={`bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all block group relative ${mentor.isInstantAvailable
                  ? 'border-green-200 ring-1 ring-green-100'
                  : 'border-gray-100'
                }`}
            >
              {/* Online Badge - Top Right */}
              {mentor.isInstantAvailable && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  ONLINE
                </div>
              )}

              {/* Rank Badge for Online Mentors */}
              {mentor.isInstantAvailable && mentor.instantSettings?.rankBoost && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1">
                  <ChevronUp className="w-3 h-3" />
                  TOP
                </div>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  {mentor.user.avatar ? (
                    <img src={mentor.user.avatar} alt={mentor.user.firstName} className="w-14 h-14 rounded-full object-cover" />
                  ) : (
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                      {mentor.user.firstName[0]}{mentor.user.lastName[0]}
                    </div>
                  )}

                  {/* Online Indicator Dot on Avatar */}
                  {mentor.isInstantAvailable && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <Link to={`/mentors/${mentor.id}`}>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {mentor.user.firstName} {mentor.user.lastName}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Briefcase className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{mentor.currentTitle} at {mentor.currentCompany}</span>
                  </div>

                  {/* Rating */}
                  {mentor.averageRating > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold text-gray-700">{mentor.averageRating.toFixed(1)}</span>
                      <span className="text-xs text-gray-400">({mentor.totalSessions} sessions)</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {mentor.user.profile?.headline || `Expert in ${mentor.industry}`}
              </p>

              {/* Service Patterns */}
              {mentor.servicePatterns && mentor.servicePatterns.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mentor.servicePatterns.includes('instant') && mentor.isInstantAvailable && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 border border-green-200 text-xs rounded-md font-medium">
                      <Zap className="w-3 h-3" />
                      Instant
                    </span>
                  )}
                  {mentor.servicePatterns.includes('scheduled') && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs rounded-md font-medium">
                      <Clock className="w-3 h-3" />
                      Scheduled
                    </span>
                  )}
                  {mentor.servicePatterns.includes('workshop') && (
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 border border-purple-200 text-xs rounded-md font-medium">
                      Workshop
                    </span>
                  )}
                  {mentor.servicePatterns.includes('consulting') && (
                    <span className="px-2 py-1 bg-orange-50 text-orange-700 border border-orange-200 text-xs rounded-md font-medium">
                      Consulting
                    </span>
                  )}
                </div>
              )}

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.expertiseTags?.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md">
                    {tag}
                  </span>
                ))}
                {mentor.expertiseTags?.length > 3 && (
                  <span className="px-2 py-1 bg-gray-50 text-gray-400 text-xs rounded-md">
                    +{mentor.expertiseTags.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div>
                  <span className="text-lg font-bold text-gray-900">${mentor.instantRate || mentor.scheduledRate}</span>
                  <span className="text-xs text-gray-500">/hr</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Link
                    to={`/mentors/${mentor.id}`}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    View
                  </Link>

                  {/* Call Now Button for Online Mentors */}
                  {mentor.isInstantAvailable && mentor.servicePatterns?.includes('instant') && (
                    <button
                      onClick={() => {
                        // Navigate to instant call page or open modal
                        window.location.href = `/call/instant/${mentor.id}`
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </button>
                  )}
                </div>
              </div>
            </div>
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
