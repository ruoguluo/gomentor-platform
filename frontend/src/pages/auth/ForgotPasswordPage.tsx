import React from 'react'
import { Link } from 'react-router-dom'

export const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center mb-2">Reset Password</h2>
      <p className="text-gray-600 text-center mb-8">Enter your email to receive reset instructions</p>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Send Reset Link
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <Link to="/login" className="text-blue-600 hover:underline">Back to Login</Link>
      </div>
    </div>
  )
}
