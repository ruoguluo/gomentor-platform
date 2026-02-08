 

import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { mentorApi, MentorProfile } from '../../services/mentor'
import { Star, MapPin, Briefcase, GraduationCap, Clock, Award, CheckCircle } from 'lucide-react'

export const MentorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [mentor, setMentor] = useState<MentorProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      loadProfile(id)
    }
  }, [id])

  const loadProfile = async (mentorId: string) => {
    try {
      setLoading(true)
      const response = await mentorApi.getPublicProfile(mentorId)
      if (response.success) {
        setMentor(response.data)
      } else {
        setError('Failed to load mentor profile')
      }
    } catch (err) {
      setError('Failed to load mentor profile')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !mentor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
        <p className="text-gray-600 mb-6">{error || "The mentor profile you're looking for doesn't exist."}</p>
        <Link to="/mentors" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Browse Mentors
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {mentor.user.avatar ? (
            <img 
              src={mentor.user.avatar} 
              alt={`${mentor.user.firstName} ${mentor.user.lastName}`} 
              className="w-32 h-32 rounded-2xl object-cover shadow-sm"
            />
          ) : (
            <div className="w-32 h-32 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-3xl shadow-sm">
              {mentor.user.firstName[0]}{mentor.user.lastName[0]}
            </div>
          )}
          
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {mentor.user.firstName} {mentor.user.lastName}
                </h1>
                {mentor.isVerified && (
                  <CheckCircle className="w-6 h-6 text-blue-500 fill-blue-50" />
                )}
              </div>
              <p className="text-xl text-gray-600 font-medium">
                {mentor.currentTitle} at {mentor.currentCompany}
              </p>
              <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                <Briefcase className="w-4 h-4" />
                <span>{mentor.yearsOfExperience} years exp.</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full mx-1"></span>
                <MapPin className="w-4 h-4" />
                <span>{mentor.user.profile?.city || 'Remote'}, {mentor.user.profile?.country || 'Global'}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {mentor.averageRating > 0 && (
                <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-yellow-700">{mentor.averageRating.toFixed(1)}</span>
                  <span className="text-yellow-600 text-sm">({mentor.totalSessions} sessions)</span>
                </div>
              )}
              {mentor.industry && (
                <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700 font-medium">{mentor.industry}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-3 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div>
              <p className="text-sm text-gray-500 mb-1">Session Rate</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">${mentor.scheduledRate}</span>
                <span className="text-gray-500">/hr</span>
              </div>
            </div>
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium shadow-sm hover:shadow transition-all active:scale-95">
              Book Session
            </button>
            <button className="w-full px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
            <div className="prose prose-blue max-w-none text-gray-600 whitespace-pre-line">
              {mentor.user.profile?.bio || mentor.user.profile?.headline || "No bio available."}
            </div>
          </div>

          {/* Experience */}
          {mentor.workExperience && mentor.workExperience.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Work Experience</h2>
              <div className="space-y-8">
                {mentor.workExperience.map((exp) => (
                  <div key={exp.id} className="relative pl-8 border-l-2 border-gray-100 last:border-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-white ring-2 ring-blue-500/20"></div>
                    <div className="mb-1">
                      <h3 className="font-bold text-gray-900">{exp.title}</h3>
                      <div className="text-blue-600 font-medium">{exp.company}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(exp.startDate).getFullYear()} - 
                        {exp.isCurrent ? 'Present' : (exp.endDate ? new Date(exp.endDate).getFullYear() : '')}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-600 text-sm mt-2">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {mentor.education && mentor.education.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Education</h2>
              <div className="space-y-6">
                {mentor.education.map((edu) => (
                  <div key={edu.id} className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                      <p className="text-gray-600">{edu.degree} in {edu.fieldOfStudy}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {edu.startYear} - {edu.endYear || 'Present'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills & Expertise */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Expertise</h2>
            <div className="space-y-6">
              {mentor.expertiseTags && mentor.expertiseTags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Core Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertiseTags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {mentor.skillTags && mentor.skillTags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.skillTags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm border border-gray-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {mentor.industryTags && mentor.industryTags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Industries</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.industryTags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm border border-purple-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
