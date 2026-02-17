'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from(textRef.current, {
                scale: 0.9,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="pt-16 pb-32 mt-0 md:-mt-32 md:pt-48 bg-[#FF6B6B] relative z-10 overflow-hidden">
            {/* Ticket Stubs Decoration */}
            <div className="absolute top-10 left-0 -translate-x-1/2 rotate-12 opacity-20 md:opacity-100">
                <div className="w-64 h-32 bg-white border-dashed border-4 border-black/10 rounded-lg transform -rotate-12" />
            </div>
            <div className="absolute bottom-10 right-0 translate-x-1/2 -rotate-12 opacity-20 md:opacity-100">
                <div className="w-64 h-32 bg-yellow-300 border-dashed border-4 border-black/10 rounded-lg transform rotate-12" />
            </div>


            <div className="container mx-auto px-6 text-center relative z-10" ref={textRef}>
                <h2 className="text-4xl md:text-7xl font-black font-heading text-white mb-6 leading-tight">
                    Don&apos;t just like the photos.
                </h2>
                <div className="inline-block relative mb-12 transform -rotate-2">
                    <span className="absolute inset-0 bg-yellow-300 skew-x-[-10deg]" />
                    <span className="relative z-10 text-4xl md:text-6xl font-black font-heading italic text-[#2D2D2D] px-4 py-2 block">
                        Live the story.
                    </span>
                </div>

                <div>
                    <button className="group bg-white text-[#2D2D2D] px-10 py-5 rounded-full text-xl font-bold font-heading shadow-[8px_8px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 flex items-center gap-3 mx-auto">
                        <span>Start Planning</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
