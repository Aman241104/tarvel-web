'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Instagram, Twitter, Send, Linkedin } from 'lucide-react';
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
            // Mega Type Parallax
            gsap.to('.mega-type', {
                yPercent: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: 1,
                },
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
        <footer ref={containerRef} className="relative bg-brand-teal pt-48 pb-16 overflow-hidden z-10 text-white">
            {/* Wave Divider (Top) - Transitions from Red CTA to Teal Footer */}
            <div className="absolute -top-1 left-0 w-full overflow-hidden leading-none z-0">
                <svg
                    className="relative block w-full h-[100px] md:h-[160px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        fill="#FF5A5F"
                    ></path>
                </svg>
            </div>

            {/* Paper Plane - Interactive */}
            <div
                ref={planeRef}
                className="absolute top-32 left-0 text-white w-24 h-24 md:w-40 md:h-40 z-20 cursor-pointer drop-shadow-2xl"
                onMouseEnter={handleFlyPlane}
                onClick={handleFlyPlane}
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>


            {/* Compass Rose Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] pointer-events-none z-0 opacity-[0.03]">
                <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
                    {/* Outer circle */}
                    <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    {/* Cardinal points */}
                    <polygon points="100,5 108,80 100,70 92,80" /> {/* N */}
                    <polygon points="195,100 120,108 130,100 120,92" /> {/* E */}
                    <polygon points="100,195 92,120 100,130 108,120" /> {/* S */}
                    <polygon points="5,100 80,92 70,100 80,108" /> {/* W */}
                    {/* Intercardinal points */}
                    <polygon points="167,33 115,85 120,80 125,85" opacity="0.6" /> {/* NE */}
                    <polygon points="167,167 115,115 120,120 125,115" opacity="0.6" /> {/* SE */}
                    <polygon points="33,167 85,115 80,120 85,125" opacity="0.6" /> {/* SW */}
                    <polygon points="33,33 85,85 80,80 75,85" opacity="0.6" /> {/* NW */}
                    {/* Center */}
                    <circle cx="100" cy="100" r="6" />
                    <circle cx="100" cy="100" r="3" fill="none" stroke="white" strokeWidth="1" />
                    {/* Labels */}
                    <text x="100" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="serif">N</text>
                    <text x="100" y="188" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="serif">S</text>
                    <text x="12" y="104" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="serif">W</text>
                    <text x="188" y="104" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="serif">E</text>
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10 pb-32">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 items-start">

                    {/* Col 1: Brand */}
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 bg-white">
                                <Image src="/assets/logo.png" alt="Logo" fill className="object-cover" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black font-heading tracking-tighter text-white leading-tight">Destination<br />Anywhere & Co.</h3>
                        </div>
                        <p className="text-white/60 font-body text-sm mb-8 max-w-xs italic leading-relaxed">
                            Crafting boutique travel experiences that turn your dreams into stamped passports.
                        </p>
                        <div className="flex gap-4">
                            <Magnetic>
                                <a href="#" aria-label="Visit our Instagram page" className="bg-white/10 border border-white/20 p-4 rounded-full hover:bg-white hover:text-brand-teal transition-all duration-500 flex items-center justify-center group shadow-xl">
                                    <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="#" aria-label="Visit our LinkedIn page" className="bg-white/10 border border-white/20 p-4 rounded-full hover:bg-white hover:text-brand-teal transition-all duration-500 flex items-center justify-center group shadow-xl">
                                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="#" aria-label="Visit our Twitter page" className="bg-white/10 border border-white/20 p-4 rounded-full hover:bg-white hover:text-brand-teal transition-all duration-500 flex items-center justify-center group shadow-xl">
                                    <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                                </a>
                            </Magnetic>
                        </div>
                    </div>

                    {/* Col 2: Company */}
                    <div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-white/40">Company</h4>
                        <ul className="space-y-4 font-black text-sm uppercase tracking-widest text-white">
                            <li><Link href="/about" className="hover:text-brand-yellow hover:translate-x-2 transition-all inline-block">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-brand-yellow hover:translate-x-2 transition-all inline-block">Services</Link></li>
                            <li><Link href="/destinations" className="hover:text-brand-yellow hover:translate-x-2 transition-all inline-block">Destinations</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-yellow hover:translate-x-2 transition-all inline-block">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Services */}
                    <div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-white/40">Our Craft</h4>
                        <ul className="space-y-4 font-black text-sm uppercase tracking-widest text-white">
                            <li><Link href="#" className="hover:text-brand-yellow hover:translate-x-2 transition-all inline-block">Flight Booking</Link></li>
                            <li><Link href="#" className="hover:text-brand-yellow hover:translate-x-2 transition-all inline-block">Luxury Stays</Link></li>
                            <li><Link href="#" className="hover:text-brand-yellow hover:translate-x-2 transition-all inline-block">Tour Packages</Link></li>
                            <li><Link href="#" className="hover:text-brand-yellow hover:translate-x-2 transition-all inline-block">Concierge</Link></li>
                        </ul>
                    </div>

                    {/* Col 4: Newsletter */}
                    <div className="col-span-2 lg:col-span-1">
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-white/40">Newsletter</h4>
                        <p className="text-white font-body text-sm mb-6 leading-relaxed italic opacity-80">
                            Join our inner circle for secret deals and travel updates.
                        </p>
                        <form className="relative group max-w-xs">
                            <label htmlFor="newsletter-email" className="sr-only">Enter your email address to subscribe</label>
                            <input
                                id="newsletter-email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:bg-white/10 focus:border-white/30 transition-all text-white placeholder:text-white/30 font-bold text-sm"
                            />
                            <button type="submit" aria-label="Subscribe to newsletter" className="absolute right-2 top-2 bg-brand-yellow text-text-navy p-2.5 rounded-lg hover:scale-105 active:scale-95 transition-all shadow-xl">
                                <Send className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-24 pt-10 flex flex-col md:flex-row justify-between items-center text-white/40 text-[10px] uppercase font-black tracking-[0.2em] text-center md:text-left">
                    <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Destination Anywhere & Co. All rights reserved.</p>
                    <div className="flex gap-6 md:gap-10">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>

            {/* MEGA TYPE */}
            <div className="absolute bottom-[-2vw] left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.03]">
                <h1 className="mega-type text-[12vw] md:text-[16vw] font-black font-heading text-white whitespace-nowrap text-center leading-[0.6] tracking-tighter">
                    DESTINATION ANYWHERE
                </h1>
            </div>
        </footer>
    );
}
