'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Instagram, Twitter, Send } from 'lucide-react';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import Magnetic from '@/components/ui/Magnetic'; // Import Magnetic

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
        <footer ref={containerRef} className="relative bg-brand-teal pt-40 pb-16 overflow-hidden z-10 text-white">
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
                        fill="#FF6B6B"
                    ></path>
                </svg>
            </div>

            {/* Paper Plane - Interactive */}
            <div
                ref={planeRef}
                className="absolute top-24 left-0 text-white w-24 h-24 md:w-40 md:h-40 z-20 cursor-pointer drop-shadow-2xl"
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24">

                    {/* Col 1: Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-4xl font-black font-heading mb-10 tracking-tighter text-white leading-none">Destination<br />Anywhere & Co.</h3>
                        <div className="flex gap-6">
                            <Magnetic>
                                <a href="#" className="bg-white/10 border border-white/20 p-5 rounded-full hover:bg-white hover:text-brand-teal transition-all duration-500 flex items-center justify-center group shadow-xl">
                                    <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="#" className="bg-white/10 border border-white/20 p-5 rounded-full hover:bg-white hover:text-brand-teal transition-all duration-500 flex items-center justify-center group shadow-xl">
                                    <Twitter className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </a>
                            </Magnetic>
                        </div>
                    </div>

                    {/* Col 2: Company */}
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-10 text-white/50">Company</h4>
                        <ul className="space-y-6 font-bold text-lg text-white">
                            <li><Link href="/about" className="hover:text-brand-yellow hover:translate-x-3 transition-all inline-block">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-brand-yellow hover:translate-x-3 transition-all inline-block">Services</Link></li>
                            <li><Link href="/destinations" className="hover:text-brand-yellow hover:translate-x-3 transition-all inline-block">Destinations</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-yellow hover:translate-x-3 transition-all inline-block">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Services */}
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-10 text-white/50">Services</h4>
                        <ul className="space-y-6 font-bold text-lg text-white">
                            <li><Link href="#" className="hover:text-brand-yellow hover:translate-x-3 transition-all inline-block">Flight Booking</Link></li>
                            <li><Link href="#" className="hover:text-brand-yellow hover:translate-x-3 transition-all inline-block">Hotel Reservations</Link></li>
                            <li><Link href="#" className="hover:text-brand-yellow hover:translate-x-3 transition-all inline-block">Tour Packages</Link></li>
                            <li><Link href="#" className="hover:text-brand-yellow hover:translate-x-3 transition-all inline-block">Visa Assistance</Link></li>
                        </ul>
                    </div>

                    {/* Col 4: Newsletter */}
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-10 text-white/50">Newsletter</h4>
                        <p className="text-white font-body text-lg mb-8 leading-relaxed italic opacity-80">
                            Subscribe to get the latest travel updates and secret deals.
                        </p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-black/10 border border-white/20 rounded-2xl px-8 py-5 outline-none focus:bg-black/20 focus:border-white/40 transition-all text-white placeholder:text-white/40 font-bold"
                            />
                            <button className="absolute right-3 top-3 bg-brand-yellow text-text-navy p-3 rounded-xl hover:scale-110 transition-all shadow-2xl">
                                <Send className="w-6 h-6" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-24 pt-10 flex flex-col md:flex-row justify-between items-center text-white/40 text-[10px] uppercase font-black tracking-[0.2em]">
                    <p>&copy; {new Date().getFullYear()} Destination Anywhere & Co. All rights reserved.</p>
                    <div className="flex gap-10 mt-6 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>

            {/* MEGA TYPE */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.04]">
                <h1 className="mega-type text-[12vw] md:text-[16vw] font-black font-heading text-white whitespace-nowrap text-center leading-[0.6] tracking-tighter">
                    DESTINATION ANYWHERE
                </h1>
            </div>
        </footer>
    );
}
