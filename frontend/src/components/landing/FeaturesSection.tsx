
import {
    Users,
    Video,
    Target,
    TrendingUp,
    Shield,
    Sparkles
} from 'lucide-react'
import { Card, CardContent } from '../ui/card'

export const FeaturesSection = () => {
    const features = [
        {
            icon: Users,
            title: "AI-Powered Matching",
            description: "Our intelligent system pairs you with mentors based on your goals, personality, and learning style.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Video,
            title: "Real-Time Sessions",
            description: "Connect instantly via video, audio, or chat. AI transcription and notes included.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Target,
            title: "Goal Tracking",
            description: "Set milestones, track progress, and measure outcomes with structured mentorship.",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: TrendingUp,
            title: "Career Growth",
            description: "Learn from industry leaders who are actively working in top companies right now.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Shield,
            title: "Verified Mentors",
            description: "Every mentor is AI-verified with background checks and credentials validation.",
            color: "from-indigo-500 to-blue-500"
        },
        {
            icon: Sparkles,
            title: "Smart Guidance",
            description: "AI helps structure your questions and prepares you for productive sessions.",
            color: "from-yellow-400 to-orange-500"
        }
    ]

    return (
        <section className="py-24 px-6 bg-gray-50/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Why Choose PhxNorth?</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to accelerate your career with world-class mentorship
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-gray-100 overflow-hidden">
                            <CardContent className="p-8">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
