
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export const LandingFooter = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-2xl font-bold text-white">PhxNorth</span>
                    </div>
                    <p className="text-sm leading-relaxed max-w-xs">
                        AI-powered mentorship platform connecting professionals with world-class mentors.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-6">Platform</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/mentors" className="hover:text-white transition-colors">Find a Mentor</Link></li>
                        <li><Link to="/register" className="hover:text-white transition-colors">Become a Mentor</Link></li>
                        <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
                        <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-6">Company</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-6">Legal</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-sm">
                <p>© 2026 PhxNorth. All rights reserved.</p>
            </div>
        </footer>
    )
}
