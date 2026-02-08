import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mentorApi, UpdateMentorProfileData } from '../../services/mentor'
import { 
  User, 
  DollarSign, 
  Tag, 
  Save,
  Loader2,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
  FileText,
  Upload
} from 'lucide-react'

export const MentorProfileEditPage: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isUploadingResume, setIsUploadingResume] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState<UpdateMentorProfileData>({
    yearsOfExperience: 0,
    currentCompany: '',
    currentTitle: '',
    industry: '',
    expertiseTags: [],
    industryTags: [],
    skillTags: [],
    instantRate: 0,
    scheduledRate: 0,
    headline: '',
    bio: ''
  })

  const [newTag, setNewTag] = useState('')
  const [tagType, setTagType] = useState<'expertise' | 'industry' | 'skill'>('expertise')

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const response = await mentorApi.getMyProfile()
      if (response.success) {
        setFormData({
          yearsOfExperience: response.data.yearsOfExperience || 0,
          currentCompany: response.data.currentCompany || '',
          currentTitle: response.data.currentTitle || '',
          industry: response.data.industry || '',
          expertiseTags: response.data.expertiseTags || [],
          industryTags: response.data.industryTags || [],
          skillTags: response.data.skillTags || [],
          instantRate: response.data.instantRate || 0,
          scheduledRate: response.data.scheduledRate || 0,
          headline: response.data.user?.profile?.headline || '',
          bio: response.data.user?.profile?.bio || ''
        })
      }
    } catch (err: any) {
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      const response = await mentorApi.updateProfile(formData)
      if (response.success) {
        setSuccess('Profile saved successfully!')
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingResume(true)
    setError('')
    try {
      const response = await mentorApi.uploadResume(file)
      if (response.success) {
        setSuccess('Resume uploaded and processed successfully!')
        // Merge generated tags
        setFormData(prev => ({
          ...prev,
          expertiseTags: [...new Set([...(prev.expertiseTags || []), ...(response.data.extractedTags.expertise || [])])],
          industryTags: [...new Set([...(prev.industryTags || []), ...(response.data.extractedTags.industry || [])])],
          skillTags: [...new Set([...(prev.skillTags || []), ...(response.data.extractedTags.skills || [])])],
        }))
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to upload resume')
    } finally {
      setIsUploadingResume(false)
    }
  }

  const addTag = () => {
    if (!newTag.trim()) return
    
    const tagKey = `${tagType}Tags` as keyof UpdateMentorProfileData
    const currentTags = (formData[tagKey] as string[]) || []
    
    if (!currentTags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        [tagKey]: [...currentTags, newTag.trim()]
      })
    }
    setNewTag('')
  }

  const removeTag = (type: 'expertise' | 'industry' | 'skill', tag: string) => {
    const tagKey = `${type}Tags` as keyof UpdateMentorProfileData
    const currentTags = (formData[tagKey] as string[]) || []
    
    setFormData({
      ...formData,
      [tagKey]: currentTags.filter(t => t !== tag)
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Mentor Profile</h1>
          <p className="text-gray-500 mt-1">Complete your profile to attract more mentees</p>
        </div>
        
        <button
          onClick={() => navigate('/portal/mentor')}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-700">
          <CheckCircle className="w-5 h-5" />
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Resume Upload */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Resume</h2>
              <p className="text-sm text-gray-500">Upload your resume to auto-fill tags and expertise</p>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-500 transition-colors bg-gray-50/50">
            {isUploadingResume ? (
              <div className="flex flex-col items-center justify-center py-4">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
                <p className="text-gray-600 font-medium">Analyzing your resume...</p>
                <p className="text-sm text-gray-500 mt-1">This might take a few seconds</p>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-gray-900 font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF only (max 5MB)</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Headline</label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                placeholder="e.g., Former VP Engineering at Google | Helping engineers grow into leaders"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about your background, experience, and what you can help mentees with..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Company</label>
              <input
                type="text"
                value={formData.currentCompany}
                onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                placeholder="e.g., Google"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Title</label>
              <input
                type="text"
                value={formData.currentTitle}
                onChange={(e) => setFormData({ ...formData, currentTitle: e.target.value })}
                placeholder="e.g., VP Engineering"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="e.g., Technology"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
              <input
                type="number"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })}
                min="0"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Pricing</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Instant Session Rate (per hour)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.instantRate}
                  onChange={(e) => setFormData({ ...formData, instantRate: parseFloat(e.target.value) || 0 })}
                  min="0"
                  step="5"
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">For on-demand calls</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Scheduled Session Rate (per hour)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.scheduledRate}
                  onChange={(e) => setFormData({ ...formData, scheduledRate: parseFloat(e.target.value) || 0 })}
                  min="0"
                  step="5"
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">For booked sessions</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Tag className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Tags & Expertise</h2>
          </div>

          {/* Add Tag */}
          <div className="flex gap-3 mb-6">
            <select
              value={tagType}
              onChange={(e) => setTagType(e.target.value as any)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            >
              <option value="expertise">Expertise</option>
              <option value="industry">Industry</option>
              <option value="skill">Skill</option>
            </select>
            
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Add a tag..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
            
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add
            </button>
          </div>

          {/* Display Tags */}
          <div className="space-y-4">
            {(['expertise', 'industry', 'skill'] as const).map((type) => {
              const tags = formData[`${type}Tags` as keyof UpdateMentorProfileData] as string[] || []
              if (tags.length === 0) return null
              
              return (
                <div key={type}>
                  <p className="text-sm font-semibold text-gray-700 mb-2 capitalize">{type} Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(type, tag)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Profile
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
