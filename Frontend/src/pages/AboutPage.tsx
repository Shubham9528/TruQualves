import AnimatedContent from "../components/animated-content";
import { ShieldCheckIcon, TargetIcon, EyeIcon, AwardIcon, UsersIcon, TrendingUpIcon, CheckCircleIcon } from "lucide-react";

export default function AboutPage() {
    const values = [
        {
            icon: ShieldCheckIcon,
            title: "Regulatory Excellence",
            description: "Unwavering commitment to FDA, EMA, and global regulatory compliance standards."
        },
        {
            icon: TargetIcon,
            title: "Precision & Accuracy",
            description: "Meticulous attention to detail in every validation protocol and documentation."
        },
        {
            icon: UsersIcon,
            title: "Client Partnership",
            description: "Collaborative approach that aligns with your business objectives and timelines."
        },
        {
            icon: TrendingUpIcon,
            title: "Continuous Improvement",
            description: "Staying ahead of regulatory changes and industry best practices."
        }
    ];

    const certifications = [
        "FDA 21 CFR Part 11 Compliance",
        "EU Annex 11 Expertise",
        "GAMP 5 Certified Professionals",
        "ISO 9001:2015 Quality Management",
        "GxP Compliance Specialists",
        "Data Integrity (ALCOA+) Experts"
    ];

    const stats = [
        { number: "500+", label: "Projects Completed" },
        { number: "98%", label: "Audit Pass Rate" },
        { number: "15+", label: "Years Experience" },
        { number: "50+", label: "Expert Consultants" }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-linear-to-br from-teal-50 via-blue-50 to-slate-50 px-4 md:px-16 lg:px-24 xl:px-32 pt-32 pb-20 border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <AnimatedContent>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 border border-teal-200 mb-6">
                                <ShieldCheckIcon className="w-4 h-4 text-teal-600" />
                                <span className="text-sm font-semibold text-teal-700">About TruQual</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-urbanist">
                                Your Trusted Partner in Validation Excellence
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                TruQual is a leading provider of Computer System Validation (CSV) services, 
                                helping pharmaceutical and biotech companies achieve and maintain regulatory compliance 
                                with confidence.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="#contact" className="px-8 py-3 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/30">
                                    Get in Touch
                                </a>
                                <a href="/services" className="px-8 py-3 bg-white border-2 border-teal-500 text-teal-600 rounded-full font-semibold hover:bg-teal-50 transition-colors">
                                    Our Services
                                </a>
                            </div>
                        </AnimatedContent>
                        <AnimatedContent delay={0.2} className="flex justify-center">
                            <div className="relative max-w-md">
                                <img 
                                    src="https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=800&q=80" 
                                    alt="Validation Team"
                                    className="rounded-3xl shadow-2xl w-full"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                                            <AwardIcon className="w-6 h-6 text-teal-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-2xl text-slate-900">15+</p>
                                            <p className="text-sm text-gray-600">Years of Excellence</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedContent>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-16 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <AnimatedContent key={index} delay={index * 0.1} className="text-center">
                                <p className="text-4xl md:text-5xl font-bold  mb-2">{stat.number}</p>
                                <p className="text-gray-600 font-medium">{stat.label}</p>
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-20 border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <AnimatedContent className="flex justify-center">
                            <img 
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" 
                                alt="Team Collaboration"
                                className="rounded-3xl shadow-xl max-w-md w-full"
                            />
                        </AnimatedContent>
                        <AnimatedContent delay={0.2}>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6 font-urbanist">Our Story</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Founded in 2010, TruQual emerged from a vision to bridge the gap between 
                                    regulatory requirements and practical implementation in the life sciences industry. 
                                    Our founders, seasoned validation professionals with decades of combined experience, 
                                    recognized the need for a specialized service provider that truly understands both 
                                    the technical and regulatory aspects of computer system validation.
                                </p>
                                <p>
                                    Over the years, we've grown from a small team of consultants to a comprehensive 
                                    validation services provider, serving pharmaceutical, biotech, and medical device 
                                    companies across the globe. Our success is built on a foundation of technical 
                                    expertise, regulatory knowledge, and an unwavering commitment to quality.
                                </p>
                                <p>
                                    Today, TruQual stands as a trusted partner for organizations navigating the complex 
                                    landscape of GxP compliance, helping them achieve their validation goals efficiently 
                                    and effectively.
                                </p>
                            </div>
                        </AnimatedContent>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-20 bg-linear-to-br from-teal-50 to-blue-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AnimatedContent className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
                            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                                <TargetIcon className="w-8 h-8 text-teal-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-urbanist">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To empower life sciences organizations with world-class validation services that ensure 
                                regulatory compliance, protect patient safety, and enable business success. We strive to 
                                be the most trusted partner in validation excellence.
                            </p>
                        </AnimatedContent>
                        <AnimatedContent delay={0.2} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                                <EyeIcon className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-urbanist">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To set the global standard for validation services by continuously innovating our 
                                methodologies, expanding our expertise, and delivering exceptional value to our clients. 
                                We envision a future where validation is seamless, efficient, and adds strategic value.
                            </p>
                        </AnimatedContent>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-20 border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <AnimatedContent className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4 font-urbanist">Our Core Values</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </AnimatedContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <AnimatedContent 
                                key={index} 
                                delay={index * 0.1}
                                className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 bg-linear-to-br from-teal-100 to-blue-100 rounded-xl flex items-center justify-center mb-4">
                                    <value.icon className="w-7 h-7 text-teal-600" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications & Expertise */}
            <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-20 bg-linear-to-br from-slate-50 to-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <AnimatedContent className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4 font-urbanist">Certifications & Expertise</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our team holds industry-leading certifications and expertise
                        </p>
                    </AnimatedContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((cert, index) => (
                            <AnimatedContent 
                                key={index} 
                                delay={index * 0.1}
                                className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4 hover:shadow-lg transition-all"
                            >
                                <CheckCircleIcon className="w-6 h-6 text-teal-500 shrink-0" />
                                <span className="font-semibold text-slate-900">{cert}</span>
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-20 bg-linear-to-br from-teal-500 to-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedContent>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-urbanist">
                            Ready to Work with Us?
                        </h2>
                        <p className="text-xl text-teal-50 mb-8 max-w-2xl mx-auto">
                            Let's discuss how TruQual can help you achieve your validation and compliance goals.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="#contact" className="px-8 py-4 bg-white text-teal-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-xl">
                                Schedule a Consultation
                            </a>
                            <a href="/services" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors">
                                Explore Our Services
                            </a>
                        </div>
                    </AnimatedContent>
                </div>
            </section>
        </div>
    );
}
