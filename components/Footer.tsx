'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Instagram, Twitter, Send, Linkedin, Mail, Phone, MapPin, Award, Star } from 'lucide-react';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import Magnetic from '@/components/ui/Magnetic';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const containerRef = useRef<HTMLElement>(null);
    const planeRef = useRef<HTMLDivElement>(null);
    const { openWhatsApp } = useWhatsApp();

    useGSAP(
        () => {
            // Mega Type Parallax - slower and deeper
            gsap.to('.mega-type', {
                yPercent: -15,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: 1.5,
                },
            });

            // Floating contact items stagger
            gsap.from('.footer-contact-item', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                }
            });
        },
        { scope: containerRef }
    );

    const handleFlyPlane = () => {
        if (!planeRef.current) return;

        gsap.fromTo(planeRef.current,
            { x: '-10vw', y: 50, opacity: 1, rotate: 10 },
            {
                x: '110vw',
                y: -150,
                rotate: -20,
                duration: 2.5,
                ease: 'power2.inOut',
                overwrite: true
            }
        );
    };

    return (
        <footer ref={containerRef} className="relative bg-[#0b0b0b] pt-56 pb-12 overflow-hidden z-10 text-white">
            {/* Organic Wave Divider (Double Layered) */}
            <div className="absolute -top-1 left-0 w-full overflow-hidden leading-none z-0">
                <svg className="relative block w-full h-[120px] md:h-[180px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#FF5A5F" opacity="0.3"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.51,22.43-10.89,44.78-22.1,66.66-33.33V0Z" fill="#FF5A5F"></path>
                </svg>
            </div>

            {/* Floating Paper Plane */}
            <div
                ref={planeRef}
                className="absolute top-40 left-0 text-white w-24 h-24 md:w-48 md:h-48 z-20 cursor-pointer drop-shadow-2xl"
                onMouseEnter={handleFlyPlane}
                onClick={handleFlyPlane}
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="opacity-60 hover:opacity-100 transition-opacity">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 items-start">

                    {/* Col 1: The Boutique Identity (4 cols) */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="flex flex-col gap-6">
                            <div className="relative w-16 h-16 rounded-3xl overflow-hidden border-4 border-white/20 bg-white shadow-2xl">
                                <Image src="/assets/logo.png" alt="Destination Anywhere Logo" fill className="object-cover p-2" />
                            </div>
                            <div>
                                <h3 className="text-3xl md:text-4xl font-black font-heading tracking-tighter text-white leading-tight">
                                    Destination<br />Anywhere & Co.
                                </h3>
                                <p className="text-white/50 font-body text-xs uppercase tracking-[0.4em] mt-2 font-black">Luxury Travel Boutique</p>
                            </div>
                        </div>
                        
                        <p className="text-white/70 font-body text-lg leading-relaxed italic max-w-sm">
                            "We don't just book trips; we protect your most precious asset—your time. Every stamp in your passport is a story we help you write."
                        </p>

                        <div className="flex gap-4">
                            {[
                                { icon: Instagram, label: "Instagram", href: "#" },
                                { icon: Linkedin, label: "LinkedIn", href: "#" },
                                { icon: Twitter, label: "Twitter", href: "#" }
                            ].map((social) => (
                                <Magnetic key={social.label}>
                                    <a 
                                        href={social.href} 
                                        aria-label={`Visit our ${social.label} page`}
                                        className="bg-white/10 border border-white/10 p-4 rounded-2xl hover:bg-white hover:text-brand-teal transition-all duration-300 flex items-center justify-center group shadow-xl"
                                    >
                                        <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                                    </a>
                                </Magnetic>
                            ))}
                        </div>
                    </div>

                    {/* Col 2: The Journey Links (2 cols) */}
                    <div className="lg:col-span-2 pt-4">
                        <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-white/40 border-l-2 border-brand-yellow/30 pl-4">The Journey</h4>
                        <ul className="space-y-5 font-black text-sm uppercase tracking-widest text-white/80">
                            {['About Us', 'Bespoke Services', 'Private Stories', 'Contact Sujal'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-brand-yellow transition-all flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-4 h-px bg-brand-yellow transition-all overflow-hidden" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Contact & HQ (3 cols) */}
                    <div className="lg:col-span-3 pt-4">
                        <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-white/40 border-l-2 border-brand-yellow/30 pl-4">Boutique HQ</h4>
                        <div className="space-y-8">
                            <div className="footer-contact-item flex items-start gap-4 group cursor-pointer">
                                <div className="bg-white/10 p-3 rounded-xl group-hover:bg-brand-yellow group-hover:text-text-navy transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Email Us</p>
                                    <p className="text-sm font-bold tracking-wide">concierge@destanywhere.com</p>
                                </div>
                            </div>
                            
                            <div className="footer-contact-item flex items-start gap-4 group cursor-pointer">
                                <div className="bg-white/10 p-3 rounded-xl group-hover:bg-brand-yellow group-hover:text-text-navy transition-colors">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Direct Line</p>
                                    <p className="text-sm font-bold tracking-wide">+91 85110 71506</p>
                                </div>
                            </div>

                            <div className="footer-contact-item flex items-start gap-4 group cursor-pointer">
                                <div className="bg-white/10 p-3 rounded-xl group-hover:bg-brand-yellow group-hover:text-text-navy transition-colors">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Office</p>
                                    <p className="text-sm font-bold tracking-wide">Ahmedabad, Gujarat, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Col 4: Newsletter & Accolades (3 cols) */}
                    <div className="lg:col-span-3 pt-4">
                        <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-white/40 border-l-2 border-brand-yellow/30 pl-4">Stay Inspired</h4>
                        <p className="text-white/70 font-body text-sm mb-8 leading-relaxed italic">
                            Join our inner circle for secret destinations and curated travel insights delivered to your inbox.
                        </p>
                        <form className="relative group mb-12">
                            <label htmlFor="footer-newsletter" className="sr-only">Email Address</label>
                            <input
                                id="footer-newsletter"
                                type="email"
                                placeholder="Your Email Address"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:bg-white/10 focus:border-white/30 transition-all text-white placeholder:text-white/30 font-bold text-sm"
                            />
                            <button type="submit" aria-label="Subscribe" className="absolute right-3 top-3 bg-brand-yellow text-text-navy p-3 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
                                <Send className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </form>

                        {/* Brand Accolades */}
                        <div className="flex items-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                            <div className="flex items-center gap-2">
                                <Award className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Boutique<br/>certified</span>
                            </div>
                            <div className="w-px h-8 bg-white/20" />
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none">5-Star<br/>Service</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Legal bar */}
                <div className="border-t border-white/5 mt-24 pt-12 pb-8 flex flex-col md:flex-row justify-between items-center text-white/30 text-[9px] uppercase font-black tracking-[0.3em] text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 mb-6 md:mb-0">
                        <p>&copy; {new Date().getFullYear()} Destination Anywhere & Co.</p>
                        <p className="hidden md:block opacity-20">|</p>
                        <div className="flex gap-8">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 italic font-handwriting text-lg text-white/20">
                        Made with love for the curious <Heart className="w-4 h-4 fill-white/10 border-none" />
                    </div>
                </div>
            </div>

            {/* MEGA TYPE SIGNATURE */}
            <div className="absolute bottom-[-1vw] left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.02]">
                <h1 className="mega-type text-[12vw] md:text-[18vw] font-black font-heading text-white whitespace-nowrap text-center leading-[0.7] tracking-tighter uppercase">
                    Destination Anywhere
                </h1>
            </div>
        </footer>
    );
}

function Heart({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    );
}
