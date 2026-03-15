'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TapeMarquee() {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (marqueeRef.current) {
            // Base animation for the whole track
            const tween = gsap.to(marqueeRef.current, {
                x: "-50%",
                ease: 'none',
                duration: 25,
                repeat: -1,
            });

            // Velocity listener for scroll speed interaction
            ScrollTrigger.create({
                onUpdate: (self) => {
                    const velocity = Math.abs(self.getVelocity());
                    const targetTimeScale = 1 + (velocity / 1500);

                    gsap.to(tween, {
                        timeScale: targetTimeScale,
                        duration: 0.5,
                        ease: 'power2.out',
                        overwrite: true
                    });

                    gsap.to(tween, {
                        timeScale: 1,
                        duration: 1.2,
                        delay: 0.1,
                        ease: 'power1.inOut',
                        overwrite: 'auto'
                    });
                }
            });
        }
    }, { scope: marqueeRef });

    const marqueeText = "YOUR JOURNEY ✈️ YOUR RULES 🌴 NO TOURIST TRAPS 📸 LOCAL VIBES 🗺 • ";

    return (
        <div className="relative z-20 w-[110%] -ml-[5%] -rotate-1 transform transition-transform md:hover:rotate-0 md:hover:scale-[1.02] duration-500 py-4">
            {/* Top ripped edge */}
            <div
                className="absolute top-2 left-0 right-0 h-3 z-10"
                style={{
                    clipPath: 'polygon(0% 100%, 2% 40%, 5% 80%, 8% 30%, 12% 70%, 15% 20%, 19% 60%, 22% 10%, 26% 50%, 30% 0%, 34% 60%, 38% 20%, 42% 70%, 46% 30%, 50% 80%, 54% 10%, 58% 60%, 62% 0%, 66% 50%, 70% 20%, 74% 70%, 78% 30%, 82% 60%, 86% 0%, 90% 50%, 94% 20%, 97% 70%, 100% 100%)',
                    background: '#FACC15',
                }}
            />

            {/* Tape body with washi pattern */}
            <div
                className="relative py-4 md:py-6 border-y-2 border-black/20 overflow-hidden shadow-2xl"
                style={{
                    backgroundColor: 'rgba(250, 204, 21, 0.95)',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L20 20M20 0L0 20' stroke='%23F59E0B' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
                    backgroundSize: '12px 12px',
                }}
            >
                <div
                    ref={marqueeRef}
                    className="flex items-center whitespace-nowrap will-change-transform w-fit"
                >
                    {/* Render twice for seamless loop */}
                    {[...Array(2)].map((_, groupIndex) => (
                        <div key={groupIndex} className="flex items-center">
                            {[...Array(4)].map((_, i) => (
                                <span key={i} className="text-black font-black font-heading text-xl md:text-3xl uppercase tracking-tighter flex items-center gap-4 px-4 md:px-8">
                                    {marqueeText}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom ripped edge */}
            <div
                className="absolute bottom-2 left-0 right-0 h-3 z-10"
                style={{
                    clipPath: 'polygon(0% 0%, 3% 60%, 7% 20%, 11% 70%, 15% 30%, 19% 80%, 23% 40%, 27% 90%, 31% 50%, 35% 100%, 39% 40%, 43% 80%, 47% 30%, 51% 70%, 55% 10%, 59% 60%, 63% 100%, 67% 40%, 71% 80%, 75% 20%, 79% 60%, 83% 30%, 87% 70%, 91% 100%, 95% 50%, 98% 80%, 100% 0%)',
                    background: '#FACC15',
                }}
            />
        </div>
    );
}

