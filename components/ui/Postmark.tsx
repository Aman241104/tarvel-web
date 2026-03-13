'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollToPlugin);
}

export default function Postmark() {
    const postmarkRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    useGSAP(() => {
        if (isVisible) {
            gsap.to(postmarkRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        } else {
            gsap.to(postmarkRef.current, {
                opacity: 0,
                scale: 0.5,
                y: 20,
                duration: 0.3,
                ease: 'power2.in'
            });
        }
    }, [isVisible]);

    const handleBackToTop = () => {
        if (!postmarkRef.current) return;

        const tl = gsap.timeline();

        // 1. The "Stamp" Press
        tl.to(postmarkRef.current, {
            scale: 0.9,
            duration: 0.1,
            ease: 'power2.out'
        })
        // 2. The "Flight" Launch
        .to(postmarkRef.current, {
            y: -1000,
            x: 200,
            rotate: 45,
            scale: 1.2,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.in',
            onStart: () => {
                gsap.to(window, {
                    scrollTo: 0,
                    duration: 1.5,
                    ease: 'power4.inOut'
                });
            }
        })
        // 3. Reset Position (hidden)
        .set(postmarkRef.current, {
            y: 100,
            x: 0,
            rotate: 0,
            scale: 0.5,
            opacity: 0
        });
    };

    return (
        <div
            ref={postmarkRef}
            onClick={handleBackToTop}
            className="fixed bottom-10 right-10 z-50 cursor-pointer group select-none opacity-0 scale-50"
            role="button"
            aria-label="Back to top"
        >
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
                {/* Rotating Text Border */}
                <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                    <defs>
                        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                    </defs>
                    <text className="text-[7.5px] font-black uppercase tracking-[0.2em] fill-brand-yellow/80">
                        <textPath xlinkHref="#circlePath">
                            Destination Anywhere • Luxury Travel Boutique • 
                        </textPath>
                    </text>
                </svg>

                {/* Inner Stamp Detail */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed border-brand-teal/40 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm shadow-2xl">
                    <span className="text-[10px] font-black text-brand-yellow leading-none">2026</span>
                    <div className="h-px w-8 bg-brand-yellow/30 my-1" />
                    <span className="text-[8px] font-black text-white/60 tracking-widest uppercase">AHM, IN</span>
                    
                    {/* Tiny Plane Icon */}
                    <svg className="w-4 h-4 text-brand-teal mt-2 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                    </svg>
                </div>

                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border border-white/10 scale-95 group-hover:scale-110 transition-transform duration-700" />
            </div>
        </div>
    );
}
