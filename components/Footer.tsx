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
        <footer ref={containerRef} className="relative bg-[#4ECDC4] pt-32 pb-12 overflow-hidden z-10 text-white">
            {/* Wave Divider (Top) - Transitions from Red CTA to Teal Footer */}
            <div className="absolute -top-1 left-0 w-full overflow-hidden leading-none z-0">
                <svg
                    className="relative block w-full h-[80px] md:h-[120px]"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-[#FF6B6B]"
                    ></path>
                </svg>
            </div>

            {/* Paper Plane - Interactive */}
            <div
                ref={planeRef}
                className="absolute top-20 left-0 text-white w-24 h-24 md:w-32 md:h-32 z-20 cursor-pointer drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                onMouseEnter={handleFlyPlane}
                onClick={handleFlyPlane}
            >
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>


            {/* Compass Rose Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] pointer-events-none z-0 opacity-[0.04]">
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

            <div className="container mx-auto px-6 relative z-10 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Col 1: Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-3xl font-black font-heading mb-6 tracking-tighter text-white">Destination<br />Anywhere & Co.</h3>
                        <div className="flex gap-4">
                            <Magnetic>
                                <a href="#" className="bg-white/20 border border-white/30 p-3 rounded-full hover:bg-white hover:text-[#4ECDC4] transition-all duration-300 flex items-center justify-center">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="#" className="bg-white/20 border border-white/30 p-3 rounded-full hover:bg-white hover:text-[#4ECDC4] transition-all duration-300 flex items-center justify-center">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </Magnetic>
                        </div>
                    </div>

                    {/* Col 2: Company */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white/90">Company</h4>
                        <ul className="space-y-4 font-medium text-white/80">
                            <li><Link href="/about" className="hover:text-white hover:translate-x-2 transition-transform inline-block">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-white hover:translate-x-2 transition-transform inline-block">Services</Link></li>
                            <li><Link href="/destinations" className="hover:text-white hover:translate-x-2 transition-transform inline-block">Destinations</Link></li>
                            <li><Link href="/contact" className="hover:text-white hover:translate-x-2 transition-transform inline-block">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Services */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white/90">Services</h4>
                        <ul className="space-y-4 font-medium text-white/80">
                            <li><Link href="#" className="hover:text-white hover:translate-x-2 transition-transform inline-block">Flight Booking</Link></li>
                            <li><Link href="#" className="hover:text-white hover:translate-x-2 transition-transform inline-block">Hotel Reservations</Link></li>
                            <li><Link href="#" className="hover:text-white hover:translate-x-2 transition-transform inline-block">Tour Packages</Link></li>
                            <li><Link href="#" className="hover:text-white hover:translate-x-2 transition-transform inline-block">Visa Assistance</Link></li>
                        </ul>
                    </div>

                    {/* Col 4: Newsletter */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white/90">Newsletter</h4>
                        <p className="text-white/80 mb-6 leading-relaxed">
                            Subscribe to get the latest travel updates and secret deals.
                        </p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/20 border border-white/30 rounded-full px-6 py-4 outline-none focus:bg-white/30 transition-all text-white placeholder:text-white/60"
                            />
                            <button className="absolute right-2 top-2 bg-white text-[#4ECDC4] p-2 rounded-full hover:scale-110 transition-all shadow-lg">
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-white/70 text-sm">
                    <p>&copy; {new Date().getFullYear()} Destination Anywhere & Co. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>

            {/* MEGA TYPE */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.1]">
                <h1 className="mega-type text-[12vw] md:text-[14vw] font-black font-heading text-white whitespace-nowrap text-center leading-[0.8] tracking-tighter">
                    DESTINATION ANYWHERE
                </h1>
            </div>
        </footer>
    );
}
