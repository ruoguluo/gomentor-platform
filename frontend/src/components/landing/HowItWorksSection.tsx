
export const HowItWorksSection = () => {
    const steps = [
        {
            step: "01",
            title: "Create Your Profile",
            desc: "Tell us about your goals, skills, and what you're looking for in a mentor.",
            color: "from-blue-600 to-indigo-600"
        },
        {
            step: "02",
            title: "Get Matched",
            desc: "Our AI analyzes your profile and suggests the perfect mentors for you.",
            color: "from-indigo-600 to-purple-600"
        },
        {
            step: "03",
            title: "Start Learning",
            desc: "Book sessions, get guidance, and track your progress over time.",
            color: "from-purple-600 to-pink-600"
        }
    ]

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
                    <p className="text-xl text-muted-foreground">Get started in three simple steps</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop only) */}
                    <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 -z-10"></div>

                    {steps.map((item, index) => (
                        <div key={index} className="relative text-center group">
                            <div className={`w-20 h-20 mx-auto mb-8 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300 z-10 relative`}>
                                <span className="text-3xl font-bold text-white">{item.step}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed px-4">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
