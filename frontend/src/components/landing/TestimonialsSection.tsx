
import { Quote, Star } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

export const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Software Engineer at Google",
            content: "GoMentor helped me transition from a bootcamp grad to a senior role in just 18 months. The guidance was indispensable.",

            rating: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        },
        {
            name: "Michael Rodriguez",
            role: "Product Manager",
            content: "The AI matching is incredible. My mentor understood exactly what I needed to work on from day one.",
            rating: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
        },
        {
            name: "Emily Watson",
            role: "Startup Founder",
            content: "I've had 3 mentors through GoMentor. Each one brought unique insights that shaped my business strategy.",
            rating: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
        }
    ]

    return (
        <section className="py-24 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by Professionals</h2>
                    <p className="text-xl text-muted-foreground">See what our community has to say</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-8 relative">
                                <Quote className="w-12 h-12 text-blue-100 absolute top-8 right-8" />

                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-gray-700 mb-8 leading-loose text-lg font-medium">"{testimonial.content}"</p>

                                <div className="flex items-center gap-4">
                                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full bg-slate-100" />
                                    <div>
                                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
