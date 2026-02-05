import AnimatedContent from "../../components/animated-content";
import SectionTitle from "../../components/section-title";
import { testimonials } from "../../data/testimonials";
import { ShieldCheckIcon, StarIcon } from "lucide-react";

export default function TestimonialSection() {
    return (
        <section id="testimonials" className="px-4 md:px-16 lg:px-24 xl:px-32 border-b border-gray-200">
            <div className="p-4 pt-20 md:p-20 flex flex-col items-center max-w-7xl mx-auto justify-center border-x border-gray-200">
                <SectionTitle
                    icon={ShieldCheckIcon}
                    title="What Our Clients Say"
                    subtitle="Pharmaceutical and biotech companies trust TruQual for regulatory compliance excellence and validation expertise."
                />
                <div className="flex flex-wrap gap-8 items-center justify-center mt-24">
                    {testimonials.map((testimonial, index) => (
                        <AnimatedContent delay={index * 0.10} key={index} className={`p-6 rounded-xl max-w-80 shadow-[0_4px_20px_rgba(0,0,0,0.10)] ${index === 1 ? 'bg-linear-to-br from-teal-50 to-blue-50 border border-gray-200' : 'bg-white'}`}>
                            <div className="flex items-center gap-1">
                                {Array(testimonial.rating).fill(0).map((_, i) => (
                                    <StarIcon key={i} className={`size-5 ${index === 1 ? 'fill-teal-500 text-teal-500' : 'fill-teal-500 text-teal-500'}`} />
                                ))}
                            </div>
                            <p className="my-4 text-base/7 text-zinc-500">
                                {testimonial.quote}
                            </p>
                            <div className='flex items-center gap-2 pt-3'>
                                <img
                                    className="size-10 rounded-full object-cover"
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div>
                                    <p className="font-medium text-gray-800">{testimonial.name}</p>
                                    <p className="text-xs text-zinc-500">{testimonial.handle}</p>
                                </div>
                            </div>
                        </AnimatedContent>
                    ))}
                </div>
                <a href="#contact" className="mt-20 px-8 py-2.5 rounded-full bg-teal-50 border border-teal-200 text-teal-600">
                    See more
                </a>
            </div>
        </section>
    )
}
