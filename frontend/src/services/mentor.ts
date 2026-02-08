import { api } from './api'

export interface MentorProfile {
  id: string
  yearsOfExperience: number
  currentCompany: string
  currentTitle: string
  industry: string
  expertiseTags: string[]
  industryTags: string[]
  skillTags: string[]
  instantRate: number
  scheduledRate: number
  isVerified: boolean
  totalSessions: number
  totalEarnings: number
  averageRating: number
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    avatar?: string
    profile?: {
      headline?: string
      bio?: string
      country?: string
      city?: string
    }
  }
  education: Education[]
  workExperience: WorkExperience[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startYear: number
  endYear?: number
}

export interface WorkExperience {
  id: string
  company: string
  title: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  location?: string
  description?: string
}

export interface UpdateMentorProfileData {
  yearsOfExperience?: number
  currentCompany?: string
  currentTitle?: string
  industry?: string
  expertiseTags?: string[]
  industryTags?: string[]
  skillTags?: string[]
  instantRate?: number
  scheduledRate?: number
  headline?: string
  bio?: string
}

export const mentorApi = {
  // Get my mentor profile
  getMyProfile: async (): Promise<{ success: boolean; data: MentorProfile }> => {
    const response = await api.get('/mentors/me/profile')
    return response.data
  },

  // Update mentor profile
  updateProfile: async (data: UpdateMentorProfileData) => {
    const response = await api.put('/mentors/me/profile', data)
    return response.data
  },

  // Add education
  addEducation: async (data: {
    institution: string
    degree: string
    fieldOfStudy: string
    startYear: number
    endYear?: number
    achievements?: string
  }) => {
    const response = await api.post('/mentors/me/education', data)
    return response.data
  },

  // Add work experience
  addWorkExperience: async (data: {
    company: string
    title: string
    startDate: string
    endDate?: string
    isCurrent: boolean
    location?: string
    description?: string
    achievements?: string
  }) => {
    const response = await api.post('/mentors/me/experience', data)
    return response.data
  },

  // Get public mentor profile
  getPublicProfile: async (id: string): Promise<{ success: boolean; data: MentorProfile }> => {
    const response = await api.get(`/mentors/${id}`)
    return response.data
  },

  // Search mentors
  searchMentors: async (params?: {
    expertise?: string[]
    industry?: string[]
    minRating?: number
    maxRate?: number
  }) => {
    const response = await api.get('/mentors/search', { params })
    return response.data
  }
}
