'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, ArrowRight } from 'lucide-react';
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
                    start: '120vh top',
                    toggleActions: 'play none none reverse',
                }
            }
        );
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] w-[92%] md:hidden translate-y-full opacity-0"
        >
            <button
                onClick={() => openWhatsApp('Sticky Mobile CTA')}
                aria-label="Contact us via WhatsApp"
                className="w-full bg-[#25D366] text-white py-4 rounded-2xl shadow-[0_20px_50px_rgba(37,211,102,0.4)] flex items-center justify-between px-6 border border-white/20 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md">
                        <MessageCircle className="w-6 h-6 fill-current" />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="font-black text-[10px] uppercase tracking-[0.2em] opacity-70 leading-none mb-1">Online Now</span>
                        <span className="font-black text-sm uppercase tracking-widest leading-none">WhatsApp Us</span>
                    </div>
                </div>
                <div className="bg-white/10 p-2 rounded-lg">
                    <ArrowRight className="w-5 h-5 text-white" />
                </div>
            </button>
        </div>
    );
}
