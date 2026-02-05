"use client";
import { links } from "../data/links";
import type { ILink } from "../../types";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import AnimatedContent from "./animated-content";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const handleLinkClick = (href: string) => {
        setIsMenuOpen(false);
        // If it's an anchor link and we're on the same page, smooth scroll
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            
                <nav className='fixed w-full top-0 z-50 px-4 md:px-16 lg:px-24 xl:px-32  border-b transition-all duration-300 border-neutral-300 backdrop-blur-md bg-white/25'>
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3">
                            <img
                                src="/assets/logo.png"
                                alt="TruQual Logo"
                                width={48}
                                height={48}
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="flex flex-col">
                                <span className="font-bold text-lg tracking-tight text-slate-900">TruQual</span>
                                <span className="text-xs text-slate-600 font-medium">Validation Expert Service</span>
                            </div>
                        </Link>

                        <div className="hidden md:flex gap-6">
                            {links.map((link: ILink) => (
                                link.href.startsWith('#') ? (
                                    <a 
                                        key={link.name} 
                                        href={link.href} 
                                        className={`group flex flex-col gap-0.5 text-slate-900 font-medium`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLinkClick(link.href);
                                        }}
                                    >
                                        {link.name}
                                        <div className={`bg-teal-600 h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                                    </a>
                                ) : (
                                    <Link 
                                        key={link.name} 
                                        to={link.href} 
                                        className={`group flex flex-col gap-0.5 ${location.pathname === link.href ? 'text-teal-600' : 'text-slate-900'} font-medium`}
                                    >
                                        {link.name}
                                        <div className={`bg-teal-600 h-0.5 w-0 group-hover:w-full transition-all duration-300 ${location.pathname === link.href ? 'w-full' : ''}`} />
                                    </Link>
                                )
                            ))}
                        </div>

                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <MenuIcon className="size-6.5" />
                        </button>

                        <Link to="/contact" className="hidden md:inline-block py-2.5 px-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors">
                            Get a Consultation
                        </Link>
                    </div>
                </nav>
            
            <div
                className={`fixed top-0 right-0 z-60 w-full bg-white shadow-xl shadow-black/5 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "max-h-screen overflow-y-auto" : "max-h-0 overflow-hidden"
                }`}
            >
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                        <img
                            src="/assets/logo.png"
                            alt="TruQual Logo"
                            width={36}
                            height={36}
                            loading="lazy"
                            decoding="async"
                        />
                        <span className="font-bold text-base text-slate-900">TruQual</span>
                    </div>
                    <XIcon className="size-6.5" onClick={() => setIsMenuOpen(false)} />
                </div>
                <div className="flex flex-col gap-4 p-4 text-base">
                    {links.map((link: ILink) => (
                        link.href.startsWith('#') ? (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                className="py-1 px-3"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLinkClick(link.href);
                                }}
                            >
                                {link.name}
                            </a>
                        ) : (
                            <Link 
                                key={link.name} 
                                to={link.href} 
                                className="py-1 px-3" 
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                    <Link to="/contact" className="py-2.5 px-6 w-max text-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] bg-linear-to-tl from-teal-600 to-teal-500 text-white rounded-full" onClick={() => setIsMenuOpen(false)}>
                        Get a Consultation
                    </Link>
                </div>
            </div>
        </>
    );
}
