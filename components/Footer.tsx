'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Instagram, Twitter, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const containerRef = useRef<HTMLElement>(null);
    const planeRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Paper Plane Animation
            gsap.fromTo(
                planeRef.current,
                { x: '-20vw', y: 100, rotate: 10 },
                {
                    x: '100vw',
                    y: -100,
                    rotate: -10,
                    duration: 4,
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        // play once
                    },
                }
            );

            // Infinite Marquee Animation
            const marqueeContent = marqueeRef.current?.children;
            if (marqueeContent) {
                gsap.to(marqueeContent, {
                    xPercent: -50,
                    ease: 'none',
                    duration: 25,
                    repeat: -1,
                });
            }
        },
        { scope: containerRef }
    );

    return (
        <footer ref={containerRef} className="relative bg-[#4ECDC4] pt-32 pb-0 overflow-hidden z-10">
            {/* Wave Divider (Top) */}
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
                        className="fill-[#FF6B6B]" // Matches CTA Section above
                    ></path>
                </svg>
            </div>

            {/* Paper Plane */}
            <div
                ref={planeRef}
                className="absolute top-20 left-0 text-white w-24 h-24 md:w-32 md:h-32 z-20 pointer-events-none drop-shadow-lg"
            >
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>


            <div className="container mx-auto px-6 relative z-10 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-white">

                    {/* Col 1: Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-3xl font-black font-heading mb-6 tracking-tighter">PopVoyager</h3>
                        <div className="flex gap-4">
                            <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white hover:text-[#4ECDC4] transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white hover:text-[#4ECDC4] transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Col 2: Company */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 opacity-80">Company</h4>
                        <ul className="space-y-4 font-medium">
                            <li><Link href="#about" className="hover:opacity-70 transition-opacity block">About Sujal</Link></li>
                            <li><Link href="#" className="hover:opacity-70 transition-opacity block">The Crew</Link></li>
                            <li><Link href="#" className="hover:opacity-70 transition-opacity block">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Support */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 opacity-80">Support</h4>
                        <ul className="space-y-4 font-medium">
                            <li><Link href="#" className="hover:opacity-70 transition-opacity block">FAQ</Link></li>
                            <li><Link href="#" className="hover:opacity-70 transition-opacity block">Contact Us</Link></li>
                            <li><Link href="#" className="hover:opacity-70 transition-opacity block">Travel Insurance</Link></li>
                        </ul>
                    </div>

                    {/* Col 4: Newsletter (Box) */}
                    <div className="col-span-1 bg-yellow-300 text-[#2D2D2D] p-6 rounded-2xl rotate-2 shadow-lg transform transition-transform hover:rotate-0">
                        <h4 className="font-bold font-heading text-xl mb-2">Get the Good Stuff</h4>
                        <p className="text-sm font-medium mb-4 opacity-80">Deals, guides, and zero spam.</p>
                        <div className="flex flex-col md:flex-row gap-2 bg-white rounded-2xl md:rounded-full p-2 md:p-1 shadow-inner">
                            <input type="email" placeholder="Email" className="bg-transparent pl-2 md:pl-4 py-2 w-full text-sm outline-none" />
                            <button className="bg-[#2D2D2D] text-white p-3 md:p-2 rounded-xl md:rounded-full hover:scale-105 transition-transform flex justify-center items-center">
                                <Send className="w-4 h-4 ml-1 md:ml-0" />
                                <span className="md:hidden ml-2 font-bold text-sm">Subscribe</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar: Infinite Marquee */}
            <div className="bg-[#2D2D2D] py-4 overflow-hidden w-full border-t border-white/10">
                <div
                    ref={marqueeRef}
                    className="flex items-center whitespace-nowrap will-change-transform"
                >
                    {[...Array(6)].map((_, i) => (
                        <span key={i} className="text-white/50 font-bold tracking-[0.2em] text-xs md:text-sm mx-8 uppercase">
                            Let&apos;s Go • Pop Viewer • Explore • Escape •
                        </span>
                    ))}
                </div>
            </div>
        </footer>
    );
}
