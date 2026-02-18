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
            // Base animation
            const tween = gsap.to(marqueeContent, {
                xPercent: -50,
                ease: 'none',
                duration: 20,
                repeat: -1,
            });

            // Velocity listener
            ScrollTrigger.create({
                onUpdate: (self) => {
                    const velocity = Math.abs(self.getVelocity());
                    const timeScale = 1 + (velocity / 500);

                    gsap.to(tween, {
                        timeScale: timeScale,
                        duration: 0.2,
                        overwrite: true
                    });

                    gsap.to(tween, {
                        timeScale: 1,
                        duration: 0.5,
                        delay: 0.1,
                        overwrite: 'auto'
                    });
                }
            });
        }
    }, { scope: marqueeRef });

    return (
        <div className="relative z-20 w-[110%] -ml-[5%] md:w-[105%] md:-ml-[2.5%] -rotate-1 transform transition-transform hover:rotate-0 hover:scale-105 duration-300">
            {/* Top ripped edge */}
            <div
                className="absolute -top-2 left-0 right-0 h-3 z-10"
                style={{
                    clipPath: 'polygon(0% 100%, 2% 40%, 5% 80%, 8% 30%, 12% 70%, 15% 20%, 19% 60%, 22% 10%, 26% 50%, 30% 0%, 34% 60%, 38% 20%, 42% 70%, 46% 30%, 50% 80%, 54% 10%, 58% 60%, 62% 0%, 66% 50%, 70% 20%, 74% 70%, 78% 30%, 82% 60%, 86% 0%, 90% 50%, 94% 20%, 97% 70%, 100% 100%)',
                    background: '#FACC15',
                }}
            />

            {/* Tape body with washi pattern */}
            <div
                className="relative py-4 border-y-2 border-black/30 overflow-hidden"
                style={{
                    backgroundColor: 'rgba(250, 204, 21, 0.85)',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L20 20M20 0L0 20' stroke='%23F59E0B' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
                    backgroundSize: '12px 12px',
                    boxShadow: '0 4px 0px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
            >
                <div
                    ref={marqueeRef}
                    className="flex items-center whitespace-nowrap will-change-transform"
                >
                    {[...Array(6)].map((_, i) => (
                        <span key={i} className="text-black/80 font-black font-heading text-xl md:text-2xl mx-8 uppercase tracking-widest flex items-center gap-4">
                            YOUR JOURNEY ✈️ YOUR RULES 🌴 NO TOURIST TRAPS 📸 LOCAL VIBES 🗺 •
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom ripped edge */}
            <div
                className="absolute -bottom-2 left-0 right-0 h-3 z-10"
                style={{
                    clipPath: 'polygon(0% 0%, 3% 60%, 7% 20%, 11% 70%, 15% 30%, 19% 80%, 23% 40%, 27% 90%, 31% 50%, 35% 100%, 39% 40%, 43% 80%, 47% 30%, 51% 70%, 55% 10%, 59% 60%, 63% 100%, 67% 40%, 71% 80%, 75% 20%, 79% 60%, 83% 30%, 87% 70%, 91% 100%, 95% 50%, 98% 80%, 100% 0%)',
                    background: '#FACC15',
                }}
            />
        </div>
    );
}

