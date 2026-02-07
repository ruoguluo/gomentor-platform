import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '../../services/auth'
import { useAuthStore } from '../../store/authStore'
import { 
  Sparkles, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  AlertCircle,
  Loader2
} from 'lucide-react'

export const LoginPage: React.FC = () => {
  const { setAuth } = useAuthStore()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authApi.login(formData)
      
      if (response.success) {
        const { user, accessToken } = response.data
        setAuth(user, accessToken)
        // Redirect happens automatically via AuthLayout
      } else {
        setError('Login failed')
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } }
      setError(axiosErr.response?.data?.error ?? 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCredentials = (email: string, password: string) => {
    setFormData({ email, password })
  }

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">GoMentor</span>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500">Sign in to continue your mentorship journey</p>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl input-focus outline-none"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl input-focus outline-none"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
            Create one
          </Link>
        </p>
      </div>
      
      {/* Demo Credentials */}
      <div className="mt-8 p-5 bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl border border-gray-100">
        <p className="text-sm font-semibold text-gray-700 text-center mb-4">Demo Credentials</p>
        
        <div className="space-y-2">
          {[
            { email: 'admin@gomentor.com', password: 'demo123', role: 'Admin' },
            { email: 'sarah.chen@gomentor.com', password: 'demo123', role: 'Mentor' },
            { email: 'alex.kim@gomentor.com', password: 'demo123', role: 'Mentee' },
          ].map((cred, index) => (
            <button
              key={index}
              type="button"
              onClick={() => fillDemoCredentials(cred.email, cred.password)}
              className="w-full p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{cred.role}</p>
                  <p className="text-xs text-gray-500">{cred.email}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
