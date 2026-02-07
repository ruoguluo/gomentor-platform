import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Users, 
  Video, 
  Target, 
  TrendingUp, 
  Shield,
  ArrowRight,
  Star,
  Quote
} from 'lucide-react'

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: "AI-Powered Matching",
      description: "Our intelligent system pairs you with mentors based on your goals, personality, and learning style."
    },
    {
      icon: Video,
      title: "Real-Time Sessions",
      description: "Connect instantly via video, audio, or chat. AI transcription and notes included."
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set milestones, track progress, and measure outcomes with structured mentorship."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Learn from industry leaders who are actively working in top companies right now."
    },
    {
      icon: Shield,
      title: "Verified Mentors",
      description: "Every mentor is AI-verified with background checks and credentials validation."
    },
    {
      icon: Sparkles,
      title: "Smart Guidance",
      description: "AI helps structure your questions and prepares you for productive sessions."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content: "GoMentor helped me transition from a bootcamp grad to a senior role in just 18 months.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager",
      content: "The AI matching is incredible. My mentor understood exactly what I needed to work on.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Startup Founder",
      content: "I've had 3 mentors through GoMentor. Each one brought unique insights that shaped my business.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden animated-gradient">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl float animation-delay-400" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl float animation-delay-200" />
        </div>
        
        {/* Navigation */}
        <nav className="relative z-10 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-white">GoMentor</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="px-6 py-2.5 text-white font-medium hover:text-blue-100 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="px-6 py-2.5 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </nav>
        
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-green-400 pulse-ring" />
            Over 10,000 successful mentorship connections
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance leading-tight">
            Learn from the World's{' '}
            <span className="text-blue-200">Top Professionals</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-2xl text-blue-100 leading-relaxed">
            Connect with active industry leaders, not retired coaches. 
            AI-powered mentorship that accelerates your career growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/register" 
              className="group px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl hover:shadow-white/25 flex items-center gap-2"
            >
              Find Your Mentor
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/register" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Become a Mentor
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-200 font-medium">Expert Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">10k+</div>
              <div className="text-blue-200 font-medium">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">4.9</div>
              <div className="text-blue-200 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path 
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="white"
            />
          </svg>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">Why Choose GoMentor?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to accelerate your career with world-class mentorship
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-sm card-hover"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in three simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create Your Profile", desc: "Tell us about your goals, skills, and what you're looking for in a mentor." },
              { step: "02", title: "Get Matched", desc: "Our AI analyzes your profile and suggests the perfect mentors for you." },
              { step: "03", title: "Start Learning", desc: "Book sessions, get guidance, and track your progress over time." }
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20">
                  <span className="text-3xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">Loved by Professionals</h2>
          <p className="text-xl text-gray-600">See what our community has to say</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg relative">
              <Quote className="w-10 h-10 text-blue-200 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Accelerate Your Career?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of professionals who are leveling up with personalized mentorship.
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">GoMentor</span>
            </div>
            <p className="text-sm leading-relaxed">
              AI-powered mentorship platform connecting professionals with world-class mentors.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mentors" className="hover:text-white transition-colors">Find a Mentor</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Become a Mentor</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          © 2026 GoMentor. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
