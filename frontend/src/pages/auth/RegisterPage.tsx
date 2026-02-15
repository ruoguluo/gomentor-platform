import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '../../services/auth'
import { useAuthStore } from '../../store/authStore'
import { AlertCircle, Loader2 } from 'lucide-react'

export const RegisterPage: React.FC = () => {
  const { setAuth } = useAuthStore()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'MENTEE' // Default role
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authApi.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        roles: [formData.role]
      })

      if (response.success) {
        const { user, accessToken } = response.data
        setAuth(user, accessToken)
        // Redirect happens automatically via AuthLayout or we can force it
        // navigate('/dashboard') // Optional, but AuthLayout usually handles it
      } else {
        setError('Registration failed')
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string; details?: Array<{ message: string }> } } }
      const errorData = axiosErr.response?.data
      
      let errorMessage = errorData?.error ?? 'Registration failed. Please try again.'
      
      if (errorData?.details && Array.isArray(errorData.details) && errorData.details.length > 0) {
        errorMessage = errorData.details.map(d => d.message).join(', ')
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
      <p className="text-gray-600 text-center mb-8">Join PhxNorth and start your growth journey</p>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Doe"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
          <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">I want to be:</p>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input 
                type="radio" 
                name="role"
                checked={formData.role === 'MENTEE'}
                onChange={() => setFormData({ ...formData, role: 'MENTEE' })}
                className="mr-2" 
              />
              <span>Mentee</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input 
                type="radio" 
                name="role"
                checked={formData.role === 'MENTOR'}
                onChange={() => setFormData({ ...formData, role: 'MENTOR' })}
                className="mr-2" 
              />
              <span>Mentor</span>
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
