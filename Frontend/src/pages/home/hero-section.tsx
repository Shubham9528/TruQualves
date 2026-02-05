import AnimatedContent from "../../components/animated-content";
import { SparkleIcon, StarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import CustomIcon from "../../components/custom-icon";

export default function HeroSection() {
    return (
        <section className="bg-[url('/assets/hero-gradient-bg.png')] bg-cover bg-center bg-no-repeat px-4 md:px-16 lg:px-24 xl:px-32">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center h-screen">
                <AnimatedContent reverse distance={30} className="flex items-center gap-2 bg-white/50 backdrop-blur p-1 rounded-full">
                    <div className="flex items-center -space-x-3">
                        <img
                            className="size-7 rounded-full border-2 border-white"
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=50"
                            alt="clientImage1"
                            loading="lazy"
                            decoding="async"
                        />
                        <img
                            className="size-7 rounded-full border-2 border-white"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=50"
                            alt="clientImage2"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    <span>500+</span>
                    <div className="h-5 w-px mx-1 bg-white rounded-full" />
                    <span>Clients Served</span>
                    <div className="h-5 w-px mx-1 bg-white rounded-full" />
                    <div className="flex items-center gap-1 pr-3">
                        <StarIcon className="size-4.5 fill-teal-500 stroke-teal-500" />
                        <span>98%</span>
                    </div>
                </AnimatedContent>
                <AnimatedContent distance={30} delay={0.1} className="relative">
                    <h1 className="text-center font-urbanist text-5xl/15 md:text-6xl/18 mt-4 font-bold max-w-2xl">
                        Ensuring Compliance & Validation Excellence
                    </h1>
                    <div className="absolute -top-5 right-13 hidden md:block">
                        <CustomIcon icon={SparkleIcon} dir="right" />
                    </div>
                </AnimatedContent>
                <AnimatedContent distance={30} delay={0.2}>
                    <p className="text-center text-base/7 text-zinc-500 max-w-lg mt-4">
                        Accelerate your validation lifecycle with TruQual's expert CSV services. We navigate complex regulatory landscapes so you can focus on innovation.
                    </p>
                </AnimatedContent>
                <AnimatedContent className="flex flex-col md:flex-row items-center gap-4 mt-6 w-full md:w-auto">
                    <Link to="/contact" className="py-3 md:py-2.5 w-full md:w-auto px-8 border border-teal-200 bg-linear-to-tl from-teal-600 to-teal-500 text-white text-center rounded-full hover:bg-teal-600 transition-colors">
                        Get a Consultation
                    </Link>
                    <Link to="/services" className="relative py-3 md:py-2.5 w-full md:w-auto px-8 bg-white/50 text-gray-600 font-medium text-center border border-white rounded-full hover:bg-white transition-colors">
                        Explore Services
                        <AnimatedContent direction="horizontal" className="absolute size-8 pointer-events-none right-0 top-full -translate-y-1/2">
                            <img
                                src="/assets/mouse-arrow.svg"
                                alt="mouse-arrow"
                                width={24}
                                height={24}
                                loading="lazy"
                                decoding="async"
                            />
                        </AnimatedContent>
                    </Link>
                </AnimatedContent>
            </div>
        </section>
    );
}
