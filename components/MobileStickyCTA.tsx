'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, ArrowRight } from 'lucide-react';
import { useWhatsApp } from '@/hooks/useWhatsApp';

gsap.registerPlugin(ScrollTrigger);

export default function MobileStickyCTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { openWhatsApp } = useWhatsApp();

    useGSAP(() => {
        // Show after scrolling past 100vh (Hero)
        gsap.fromTo(containerRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: 'body',
                    start: '100vh top',
                    toggleActions: 'play none none reverse',
                }
            }
        );
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] md:hidden translate-y-full opacity-0"
        >
            <button
                onClick={() => openWhatsApp('Sticky Mobile CTA')}
                className="w-full bg-[#2D2D2D] text-white py-4 rounded-full shadow-2xl flex items-center justify-between px-6 border border-white/10 active:scale-95 transition-transform"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#4ECDC4] rounded-full flex items-center justify-center text-[#2D2D2D]">
                        <Phone className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm">Plan Your Trip</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
            </button>
        </div>
    );
}
