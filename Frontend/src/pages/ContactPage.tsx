import AnimatedContent from "../components/animated-content";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/contact`,
                formData
            );

            toast.success(
                data.message || "Message sent successfully! Our team will contact you within 24 hours."
            );

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                company: "",
                phone: "",
                service: "",
                message: "",
            });
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data?.message
                : "Failed to send message. Please try again later.";

            toast.error(errorMessage || "Failed to send message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-linear-to-br from-teal-50 via-blue-50 to-slate-50 px-4 md:px-16 lg:px-24 xl:px-32 pt-32 pb-20 border-b border-gray-200">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedContent>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 mb-6">
                            <span className="text-sm font-semibold text-teal-700">Contact Us</span>
                        </div>
                        {/* <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-urbanist">
                            Let's Start a Conversation
                        </h1> */}
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Have questions about our validation services? Ready to ensure compliance for your next project? We're here to help.
                        </p>
                    </AnimatedContent>
                </div>
            </section>

            {/* Content Section */}
            
            <section className='relative flex flex-col md:flex-row justify-center px-4 py-20 gap-20 overflow-hidden'>
                
                {/* Background Decor */}
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mb-10 size-140  rounded-full blur-[100px]'></div>
                
                <div className='text-center md:text-left mt-12 relative z-10'>
                    <div className="flex items-center p-1.5 rounded-full border border-teal-100 bg-white/50 backdrop-blur-sm text-xs w-fit mx-auto md:mx-0 shadow-sm">
                        <div className="flex items-center">
                            <img className="size-7 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50" alt="userImage1" />
                            <img className="size-7 rounded-full border-2 border-white -translate-x-2" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50" alt="userImage2" />
                            <img className="size-7 rounded-full border-2 border-white -translate-x-4" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop" alt="userImage3" />
                        </div>
                        <p className="-translate-x-2 text-xs text-slate-600 font-medium">Join community of 1m+ founders </p>
                    </div>
                    <h1 className='font-bold text-3xl md:text-5xl/15 text-slate-900 max-w-[470px] mt-4 font-urbanist'>
                        Ready to Transform Your Digital Experience?
                    </h1>
                    <p className='text-base text-gray-600 max-w-[345px] mt-4 mx-auto md:mx-0 leading-relaxed'>
                     Accelerate your GxP compliance journey. Our experts are ready to streamline your validation processes with precision.                    </p>

                    {/* Map */}
                    <div className='mt-8 max-w-[470px] rounded-2xl overflow-hidden border border-gray-200 shadow-lg'>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.70906062597!2d73.69814965!3d18.52461405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
                        
                <div className='w-full max-w-lg max-md:mx-auto bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-8 shadow-xl shadow-teal-900/5 relative z-10'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className='block text-slate-700 text-sm font-medium mb-2'>First Name *</label>
                                <input 
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    placeholder="John" 
                                    className='w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-gray-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300'
                                />
                            </div>

                            <div>
                                <label className='block text-slate-700 text-sm font-medium mb-2'>Last Name *</label>
                                <input 
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Doe" 
                                    className='w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-gray-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300'
                                />
                            </div>
                        </div>
            
                        <div>
                            <label className='block text-slate-700 text-sm font-medium mb-2'>Business Email *</label>
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@company.com" 
                                className='w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-gray-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300'
                            />
                        </div>

                        <div>
                            <label className='block text-slate-700 text-sm font-medium mb-2'>Company *</label>
                            <input 
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                required
                                placeholder="Company Name" 
                                className='w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-gray-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300'
                            />
                        </div>

                        <div>
                            <label className='block text-slate-700 text-sm font-medium mb-2'>Phone Number</label>
                            <input 
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 123-4567" 
                                className='w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-gray-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300'
                            />
                        </div>

                        <div>
                            <label className='block text-slate-700 text-sm font-medium mb-2'>Service Interested In *</label>
                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                required
                                className='w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300'
                            >
                                <option value="">Select a service</option>
                                <option value="21 CFR Part 11 Compliance">21 CFR Part 11 Compliance</option>
                                <option value="GAMP5 Validation">GAMP5 Validation</option>
                                <option value="Data Integrity Assessment">Data Integrity Assessment</option>
                                <option value="Vendor Audit">Vendor Audit</option>
                                <option value="System Validation">System Validation</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
            
                        <div>
                            <label className='block text-slate-700 text-sm font-medium mb-2'>How Can We Help? *</label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us about your validation needs, timeline, and any specific regulatory requirements..." 
                                rows={4}
                                required
                                className='w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-gray-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300 resize-none'
                            ></textarea>
                        </div>
            
                        <div className='flex items-center justify-between pt-2'>
                            <p className='text-xs text-gray-500 max-w-[200px] leading-tight'>
                                By submitting, you agree to our <a href="#" className='text-teal-600 hover:text-teal-700 font-medium hover:underline'>Terms</a> and <a href="#" className='text-teal-600 hover:text-teal-700 font-medium hover:underline'>Privacy Policy</a>.
                            </p>
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className='bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-8 py-3 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                            >
                                {isSubmitting ? "Sending..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
