import React, { useState, useEffect } from 'react'
import { mentorApi, ServicePatternInfo } from '../services/mentor'
import { 
  Zap, 
  Calendar, 
  Users, 
  Briefcase,
  Clock,
  Check,
  Loader2,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react'

interface ServicePatternsSectionProps {
  onUpdate?: () => void
}

export const ServicePatternsSection: React.FC<ServicePatternsSectionProps> = ({ onUpdate }) => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([])
  const [patternInfo, setPatternInfo] = useState<ServicePatternInfo[]>([])
  
  // Settings for each pattern
  const [instantSettings, setInstantSettings] = useState({
    isOnlineNow: false,
    rankBoost: true
  })
  const [consultingRate, setConsultingRate] = useState<number>(0)
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // Load pattern info and current profile in parallel
      const [infoRes, profileRes] = await Promise.all([
        mentorApi.getServicePatternInfo(),
        mentorApi.getMyProfile()
      ])
      
      if (infoRes.success) {
        setPatternInfo(infoRes.data)
      }
      
      if (profileRes.success) {
        const profile = profileRes.data
        setSelectedPatterns(profile.servicePatterns || [])
        setConsultingRate(profile.consultingRate || 0)
        if (profile.instantSettings) {
          setInstantSettings({
            isOnlineNow: profile.instantSettings.isOnlineNow || false,
            rankBoost: profile.instantSettings.rankBoost !== false
          })
        }
      }
    } catch (err: any) {
      setError('Failed to load service patterns')
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePattern = (patternId: string) => {
    setSelectedPatterns(prev => 
      prev.includes(patternId)
        ? prev.filter(p => p !== patternId)
        : [...prev, patternId]
    )
  }

  const handleSave = async () => {
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      const response = await mentorApi.updateServicePatterns({
        patterns: selectedPatterns,
        instantSettings: selectedPatterns.includes('instant') ? instantSettings : undefined,
        consultingRate: selectedPatterns.includes('consulting') ? consultingRate : undefined
      })

      if (response.success) {
        setSuccess('Service patterns saved successfully!')
        onUpdate?.()
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save service patterns')
    } finally {
      setSaving(false)
    }
  }

  const handleSetOnlineStatus = async (isOnline: boolean) => {
    try {
      const response = await mentorApi.setOnlineStatus(isOnline)
      if (response.success) {
        setInstantSettings(prev => ({ ...prev, isOnlineNow: isOnline }))
        setSuccess(isOnline ? 'You are now online! Mentees can call you directly.' : 'You are now offline.')
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update online status')
    }
  }

  const getPatternIcon = (id: string) => {
    switch (id) {
      case 'instant': return Zap
      case 'scheduled': return Calendar
      case 'workshop': return Users
      case 'consulting': return Briefcase
      default: return Check
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Service Patterns</h2>
          <p className="text-gray-500 text-sm mt-1">Choose how you want to provide mentorship services</p>
        </div>
        
        {selectedPatterns.includes('instant') && (
          <button
            onClick={() => handleSetOnlineStatus(!instantSettings.isOnlineNow)}
            className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
              instantSettings.isOnlineNow
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${instantSettings.isOnlineNow ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            {instantSettings.isOnlineNow ? 'Online' : 'Go Online'}
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-700">
          <Check className="w-5 h-5" />
          {success}
        </div>
      )}

      {/* Pattern Cards */}
      <div className="grid gap-4">
        {patternInfo.map((pattern) => {
          const Icon = getPatternIcon(pattern.id)
          const isSelected = selectedPatterns.includes(pattern.id)
          const isExpanded = expandedPattern === pattern.id

          return (
            <div
              key={pattern.id}
              className={`border rounded-2xl transition-all ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50/50' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Main Card */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => handleTogglePattern(pattern.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </button>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSelected 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">{pattern.name}</h3>
                      <button
                        onClick={() => setExpandedPattern(isExpanded ? null : pattern.id)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{pattern.description}</p>

                    {/* Quick Status */}
                    {isSelected && pattern.id === 'instant' && (
                      <div className="mt-3 flex items-center gap-2 text-sm">
                        <span className={`w-2 h-2 rounded-full ${instantSettings.isOnlineNow ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <span className={instantSettings.isOnlineNow ? 'text-green-700 font-medium' : 'text-gray-500'}>
                          {instantSettings.isOnlineNow ? 'You are online - mentees can call you now' : 'You are offline'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  <div className="ml-16 space-y-4">
                    {/* Features */}
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Features</p>
                      <ul className="space-y-1">
                        {pattern.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Requirements</p>
                      <ul className="space-y-1">
                        {pattern.requirements.map((req: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pattern-specific Settings */}
                    {isSelected && pattern.id === 'instant' && (
                      <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Instant Mentorship Settings</p>
                        
                        <div className="space-y-3">
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={instantSettings.rankBoost}
                              onChange={(e) => setInstantSettings(prev => ({ ...prev, rankBoost: e.target.checked }))}
                              className="w-4 h-4 text-blue-600 rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-700">Rank higher in search results when online</span>
                          </label>
                          
                          <p className="text-xs text-gray-500">
                            <Clock className="w-3 h-3 inline mr-1" />
                            You can set your schedule 1-4 weeks in advance in the Availability tab
                          </p>
                        </div>
                      </div>
                    )}

                    {isSelected && pattern.id === 'consulting' && (
                      <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Consulting Rate</p>
                        <div className="relative max-w-xs">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            value={consultingRate}
                            onChange={(e) => setConsultingRate(parseFloat(e.target.value) || 0)}
                            placeholder="Hourly rate"
                            className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">/hour</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              Save Patterns
            </>
          )}
        </button>
      </div>
    </div>
  )
}
