
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'

export const HeroSection = () => {
    const [query, setQuery] = useState('')

    return (
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
                        Learn faster with your <span className="text-primary">best mentor</span>
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                        We’ll connect you with a mentor who motivates, challenges, and supports you — from first session to success.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                        <div className="flex-1">
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Try “System Design”, “React”, or a name"
                                className="h-12 rounded-full px-6 shadow-sm border-gray-200 focus-visible:ring-primary"
                            />
                        </div>
                        <Link to="/mentors">
                            <Button size="lg" className="w-full sm:w-auto h-12 rounded-full px-8 shadow-md hover:shadow-lg transition-all">
                                Find mentors
                            </Button>
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {['Software Engineering', 'Product', 'Data', 'Design', 'Leadership'].map((c) => (
                            <Badge key={c} variant="secondary" className="px-3 py-1 text-sm font-normal bg-secondary/50 hover:bg-secondary">
                                {c}
                            </Badge>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                        <div>
                            <p className="text-2xl font-bold text-foreground">100k+</p>
                            <p className="text-sm text-muted-foreground">Mentors</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">300k+</p>
                            <p className="text-sm text-muted-foreground">Sessions</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">4.8</p>
                            <p className="text-sm text-muted-foreground">Rating</p>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-3xl transform rotate-3 scale-105 -z-10 blur-xl"></div>
                    <div className="rounded-2xl border border-gray-100 p-6 bg-white/50 backdrop-blur-sm shadow-xl">
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'Sarah', title: 'Engineering Leader', rating: 4.9, initial: 'S', color: 'bg-blue-100 text-blue-700' },
                                { name: 'James', title: 'Staff Engineer', rating: 4.8, initial: 'J', color: 'bg-emerald-100 text-emerald-700' },
                                { name: 'Amira', title: 'Product Manager', rating: 4.9, initial: 'A', color: 'bg-purple-100 text-purple-700' },
                                { name: 'Diego', title: 'UX Lead', rating: 4.7, initial: 'D', color: 'bg-orange-100 text-orange-700' },
                            ].map((m, i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
                                    <div className={`w-12 h-12 rounded-full ${m.color} font-bold flex items-center justify-center mb-3 text-lg`}>
                                        {m.initial}
                                    </div>
                                    <p className="font-semibold text-gray-900">{m.name}</p>
                                    <p className="text-xs text-gray-500 mb-2">{m.title}</p>
                                    <div className="flex items-center gap-1 text-xs font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded-full w-fit">
                                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                        {m.rating}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
