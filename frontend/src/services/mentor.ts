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
  servicePatterns: string[]
  instantSettings?: {
    isOnlineNow: boolean
    rankBoost: boolean
  }
  consultingRate?: number
  isInstantAvailable: boolean
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

export interface ServicePatternInfo {
  id: string
  name: string
  description: string
  features: string[]
  requirements: string[]
}

export interface ServicePattern {
  id: string
  name: string
  description: string
}

export interface UpdateServicePatternsData {
  patterns: string[]
  instantSettings?: {
    isOnlineNow?: boolean
    weeklySchedule?: any[]
    rankBoost?: boolean
  }
  consultingRate?: number
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

  // Upload Resume
  uploadResume: async (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await api.post('/mentors/me/resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Search mentors
  searchMentors: async (filters: {
    expertise?: string | string[];
    industry?: string | string[];
    minRating?: number;
    maxRate?: number;
    isOnline?: boolean;
    servicePattern?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters.expertise) {
        if (Array.isArray(filters.expertise)) {
            filters.expertise.forEach(e => params.append('expertise', e));
        } else {
            params.append('expertise', filters.expertise);
        }
    }
    if (filters.industry) {
        if (Array.isArray(filters.industry)) {
            filters.industry.forEach(i => params.append('industry', i));
        } else {
            params.append('industry', filters.industry);
        }
    }
    if (filters.minRating) params.append('minRating', filters.minRating.toString());
    if (filters.maxRate) params.append('maxRate', filters.maxRate.toString());
    if (filters.isOnline) params.append('isOnline', 'true');
    if (filters.servicePattern) params.append('servicePattern', filters.servicePattern);

    const response = await api.get(`/mentors/search?${params.toString()}`);
    return response.data;
  },
  
  // Get public profile
  getPublicProfile: async (id: string) => {
    const response = await api.get(`/mentors/${id}`);
    return response.data;
  },

  // ==================== SERVICE PATTERNS ====================

  // Get service pattern info
  getServicePatternInfo: async (): Promise<{ success: boolean; data: ServicePatternInfo[] }> => {
    const response = await api.get('/mentors/service-patterns');
    return response.data;
  },

  // Update service patterns
  updateServicePatterns: async (data: UpdateServicePatternsData) => {
    const response = await api.put('/mentors/me/service-patterns', data);
    return response.data;
  },

  // Set online status for instant mentorship
  setOnlineStatus: async (isOnline: boolean) => {
    const response = await api.post('/mentors/me/online-status', { isOnline });
    return response.data;
  },

  // Get online schedules
  getOnlineSchedules: async (weeksAhead = 4) => {
    const response = await api.get(`/mentors/me/online-schedules?weeksAhead=${weeksAhead}`);
    return response.data;
  },

  // Create online schedule
  createOnlineSchedule: async (data: { weekStart: string; dailySlots: any[] }) => {
    const response = await api.post('/mentors/me/online-schedules', data);
    return response.data;
  },

  // Delete online schedule
  deleteOnlineSchedule: async (scheduleId: string) => {
    const response = await api.delete(`/mentors/me/online-schedules/${scheduleId}`);
    return response.data;
  }
}
