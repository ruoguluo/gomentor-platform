import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'

// Layouts
import { MainLayout } from './layouts/MainLayout'
import { AuthLayout } from './layouts/AuthLayout'
import { AdminLayout } from './layouts/AdminLayout'

// Public pages
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'

// Protected pages
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { MentorSearchPage } from './pages/mentors/MentorSearchPage'
import { MentorProfilePage } from './pages/mentors/MentorProfilePage'
import { SessionPage } from './pages/sessions/SessionPage'
import { ProjectPage } from './pages/projects/ProjectPage'
import { CoursePage } from './pages/courses/CoursePage'
import { ProfilePage } from './pages/profile/ProfilePage'
import { NotificationsPage } from './pages/notifications/NotificationsPage'

// Role-specific portals
import { MentorPortalPage } from './pages/portal/MentorPortalPage'
import { MenteePortalPage } from './pages/portal/MenteePortalPage'

// Admin pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { UserManagementPage } from './pages/admin/UserManagementPage'
import { VerificationPage } from './pages/admin/VerificationPage'
import { CompliancePage } from './pages/admin/CompliancePage'
import { FinancePage } from './pages/admin/FinancePage'

function App() {
  const { checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/mentors" element={<MentorSearchPage />} />
        <Route path="/mentors/:id" element={<MentorProfilePage />} />
        <Route path="/sessions/:id" element={<SessionPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        
        {/* Portals */}
        <Route path="/portal/mentor" element={<MentorPortalPage />} />
        <Route path="/portal/mentee" element={<MenteePortalPage />} />
      </Route>

      {/* Admin routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/verification" element={<VerificationPage />} />
        <Route path="/admin/compliance" element={<CompliancePage />} />
        <Route path="/admin/finance" element={<FinancePage />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
