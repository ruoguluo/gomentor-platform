
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { Button } from '../ui/button'

export const LandingNavbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl">
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        GoMentor
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <Link to="/mentors" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                        Find mentors
                    </Link>
                    <Link to="/companies" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                        For Companies
                    </Link>
                    <Link to="/mentors/apply" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                        Become a mentor
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 hidden sm:block">
                        Sign in
                    </Link>
                    <Link to="/register">
                        <Button className="rounded-full px-6 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all">
                            Sign up
                        </Button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}
