import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Users, 
  Video, 
  Target, 
  TrendingUp, 
  Shield,
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

  const [query, setQuery] = useState('')

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">GoMentor</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/mentors" className="text-sm font-medium text-gray-700 hover:text-gray-900">Find mentors</Link>
            <Link to="/register" className="text-sm font-medium text-gray-700 hover:text-gray-900">Become a mentor</Link>
            <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">Sign in</Link>
            <Link to="/register" className="btn-primary">Sign up</Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Learn faster with your best mentor
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              We’ll connect you with a mentor who motivates, challenges, and supports you — from first session to success.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try “System Design”, “Leadership”, “React”, or a mentor name"
                  className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none input-focus"
                />
              </div>
              <Link to="/mentors" className="btn-primary">
                Find mentors
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Software Engineering', 'Product', 'Data', 'Design', 'Leadership'].map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl font-bold text-gray-900">100,000+</p>
                <p className="text-sm text-gray-500">Experienced mentors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">300,000+</p>
                <p className="text-sm text-gray-500">5‑star session reviews</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-sm text-gray-500">on the App Store</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Sarah', title: 'Engineering Leader', rating: 4.9 },
                { name: 'James', title: 'Staff Engineer', rating: 4.8 },
                { name: 'Amira', title: 'Product Manager', rating: 4.9 },
                { name: 'Diego', title: 'UX Lead', rating: 4.7 },
              ].map((m, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mb-3">
                    {m.name[0]}
                  </div>
                  <p className="font-semibold text-gray-900">{m.name}</p>
                  <p className="text-sm text-gray-600">{m.title}</p>
                  <div className="mt-2 flex items-center gap-1 text-sm text-gray-700">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {m.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Guarantee */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-gray-900">Sessions you’ll love. Guaranteed.</p>
            <p className="text-sm text-gray-600">Try another mentor for free if you’re not satisfied.</p>
          </div>
          <Link to="/mentors" className="btn-outline">Learn more</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose GoMentor?</h2>
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
      
      {/* Corporate Training */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto rounded-2xl border border-gray-200 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Corporate mentorship training for teams</h3>
            <p className="text-gray-600">Personalized mentorship for businesses. Book a demo to learn more.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/register" className="btn-primary">Book a demo</Link>
            <Link to="/register" className="btn-outline">Refer your company</Link>
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
