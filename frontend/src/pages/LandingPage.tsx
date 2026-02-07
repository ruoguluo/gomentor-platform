import React from 'react'
import { LandingNavbar } from '../components/landing/LandingNavbar'
import { HeroSection } from '../components/landing/HeroSection'
import { FeaturesSection } from '../components/landing/FeaturesSection'
import { HowItWorksSection } from '../components/landing/HowItWorksSection'
import { TestimonialsSection } from '../components/landing/TestimonialsSection'
import { LandingFooter } from '../components/landing/LandingFooter'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/10 selection:text-primary">
      <LandingNavbar />

      <main>
        <HeroSection />

        <FeaturesSection />

        <HowItWorksSection />

        <TestimonialsSection />

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2"></div>
            </div>

            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Ready to accelerate your career?
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Join 100,000+ professionals who are already learning from the best mentors in the industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/register">
                  <Button size="lg" className="h-14 px-8 rounded-full text-lg w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/mentors">
                  <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg w-full sm:w-auto border-slate-700 text-white hover:bg-slate-800 hover:text-white bg-transparent">
                    Browse Mentors
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}
