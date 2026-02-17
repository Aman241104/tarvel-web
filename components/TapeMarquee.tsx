'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TapeMarquee() {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const marqueeContent = marqueeRef.current?.children;
        if (marqueeContent) {
            gsap.to(marqueeContent, {
                xPercent: -50,
                ease: 'none',
                duration: 20,
                repeat: -1,
            });
        }
    }, { scope: marqueeRef });

    return (
        <div className="relative z-20 w-[110%] -ml-[5%] md:w-[105%] md:-ml-[2.5%] -rotate-1 py-4 bg-[#FACC15] shadow-[4px_4px_0px_rgba(0,0,0,1)] border-y-2 border-black overflow-hidden transform transition-transform hover:rotate-0 hover:scale-105 duration-300">
            <div
                ref={marqueeRef}
                className="flex items-center whitespace-nowrap will-change-transform"
            >
                {[...Array(6)].map((_, i) => (
                    <span key={i} className="text-black font-black font-heading text-xl md:text-2xl mx-8 uppercase tracking-widest flex items-center gap-4">
                        YOUR JOURNEY • YOUR RULES • NO TOURIST TRAPS • LOCAL VIBES •
                    </span>
                ))}
            </div>
        </div>
    );
}
