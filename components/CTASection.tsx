'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useWhatsApp } from '@/hooks/useWhatsApp';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { openWhatsApp } = useWhatsApp();

    useGSAP(
        () => {
            gsap.from(textRef.current, {
                scale: 0.85,
                opacity: 0,
                duration: 1.2,
                ease: 'back.out(2)',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                },
            });
        },
        { scope: containerRef }
    );

    const handleMouseEnter = () => {
        if (!buttonRef.current) return;
        gsap.to(buttonRef.current, {
            scale: 1.1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.3)',
            overwrite: true,
        });
    };

    const handleMouseLeave = () => {
        if (!buttonRef.current) return;
        gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: true,
        });
    };

    return (
        <section ref={containerRef} className="pt-32 pb-32 -mt-24 md:-mt-32 md:pt-48 bg-[#FF6B6B] relative z-10 overflow-hidden">
            {/* Ticket Stubs Decoration */}
            <div className="absolute top-10 left-0 -translate-x-1/2 rotate-12 opacity-20 md:opacity-100 mix-blend-overlay">
                <div className="w-64 h-32 bg-white border-dashed border-4 border-white/50 rounded-lg transform -rotate-12" />
            </div>
            <div className="absolute bottom-10 right-0 translate-x-1/2 -rotate-12 opacity-20 md:opacity-100 mix-blend-overlay">
                <div className="w-64 h-32 bg-yellow-300 border-dashed border-4 border-white/50 rounded-lg transform rotate-12" />
            </div>

            {/* Postage Stamp Decoration */}
            <div className="absolute top-12 right-12 hidden md:block rotate-12 opacity-50">
                <svg viewBox="0 0 80 100" className="w-20 h-24" fill="none">
                    <rect x="4" y="4" width="72" height="92" rx="2" fill="white" stroke="white" strokeWidth="2" />
                    <rect x="8" y="8" width="64" height="60" rx="1" fill="#FF6B6B" opacity="0.3" />
                    <text x="40" y="82" textAnchor="middle" fill="white" fontSize="7" fontFamily="serif" fontWeight="bold">VIA AIR MAIL</text>
                    <text x="40" y="94" textAnchor="middle" fill="white" fontSize="6" fontFamily="sans-serif">PAR AVION</text>
                    <path d="M20 30 L40 20 L60 30 L40 40Z" fill="white" opacity="0.5" />
                    <circle cx="40" cy="48" r="8" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
                </svg>
            </div>

            {/* Doodles */}
            <svg className="absolute top-1/4 left-1/4 w-12 h-12 text-yellow-300 animate-pulse hidden md:block" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>


            <div className="container mx-auto px-6 text-center relative z-10" ref={textRef}>
                <h2 className="text-4xl md:text-7xl font-black font-heading text-white mb-6 leading-tight select-none">
                    Don&apos;t just like the photos.
                </h2>
                <div className="inline-block relative mb-12 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    {/* Hand-drawn Highlight Effect */}
                    <svg className="absolute inset-0 w-full h-full -z-10 scale-110 text-yellow-300" viewBox="0 0 300 60" preserveAspectRatio="none" fill="currentColor">
                        <path d="M5,10 Q150,5 295,15 Q280,50 10,45 Q20,25 5,10 Z" />
                    </svg>

                    <span className="relative z-10 text-4xl md:text-6xl font-black font-heading italic text-[#2D2D2D] px-6 py-2 block">
                        Live the story.
                    </span>
                </div>

                <div>
                    <button
                        ref={buttonRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => openWhatsApp('CTA Section - "Live the Story"')}
                        className="group relative bg-white text-[#2D2D2D] px-10 py-5 rounded-full text-xl font-bold font-heading shadow-[8px_8px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 flex items-center gap-3 mx-auto inline-flex"
                    >
                        {/* Pulse Ring */}
                        <span className="absolute inset-0 rounded-full border-2 border-white/60 animate-pulse-ring pointer-events-none" />
                        <span>Start Planning</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="mt-4 text-white/80 font-handwriting text-xl rotate-2">
                        It's about time!
                    </p>
                </div>
            </div>
        </section>
    );
}
