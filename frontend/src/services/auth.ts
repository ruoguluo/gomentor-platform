import { api } from './api'

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  data: {
    user: {
      id: string
      email: string
      firstName: string
      lastName: string
      roles: string[]
      primaryRole: string
      avatar?: string
    }
    accessToken: string
    refreshToken: string
  }
}

export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  register: async (data: {
    email: string
    password: string
    firstName: string
    lastName: string
    roles?: string[]
  }) => {
    const response = await api.post('/auth/register', data)
    return response.data
  }
}
