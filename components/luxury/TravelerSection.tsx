"use client";

import { useRef } from 'react';
import { motion } from "framer-motion";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TravelerSection() {
    const containerRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Image Swing & Reveal
        gsap.fromTo(imageRef.current,
            { rotate: 10, opacity: 0, scale: 0.8 },
            {
                rotate: -3,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: 'back.out(1.2)',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // Text Stagger
        gsap.from(textRef.current?.children || [], {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 60%',
            }
        });

        // Stat Counters
        const statNumbers = containerRef.current?.querySelectorAll('.stat-number');
        statNumbers?.forEach((el) => {
            const target = parseInt(el.getAttribute('data-target') || '0');
            gsap.fromTo(
                el,
                { innerText: 0 },
                {
                    innerText: target,
                    duration: 2,
                    ease: 'power1.out',
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        once: true,
                    }
                }
            );
        });

        // Signature path draw
        const sigPath = containerRef.current?.querySelector('.signature-path');
        if (sigPath) {
            gsap.fromTo(
                sigPath,
                { strokeDashoffset: 500 },
                {
                    strokeDashoffset: 0,
                    duration: 2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sigPath,
                        start: 'top 85%',
                    }
                }
            );
        }

        // Backdrop shapes parallax
        const tealShape = containerRef.current?.querySelector('.backdrop-teal');
        const coralShape = containerRef.current?.querySelector('.backdrop-coral');
        if (tealShape) {
            gsap.to(tealShape, {
                y: -20,
                rotation: -8,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }
        if (coralShape) {
            gsap.to(coralShape, {
                y: 15,
                rotation: 7,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-white text-[#2D2D2D] py-16 md:py-24 relative overflow-hidden">
            {/* Background Decor - Subtle Grid or organic shape could go here */}

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">

                    {/* Left: Typography */}
                    <div ref={textRef} className="w-full md:w-1/2 relative z-10">
                        <div className="inline-block px-4 py-1 bg-black text-white rounded-full text-sm font-bold tracking-wider mb-6">
                            MEET THE CAPTAIN
                        </div>

                        <h2 className="text-4xl md:text-7xl lg:text-8xl font-heading font-black mb-8 leading-[0.9]">
                            Sujal<br />
                            <span className="relative inline-block px-2 mt-2">
                                <span className="absolute inset-0 bg-[#FACC15] -skew-x-3 transform -rotate-1 rounded-sm mix-blend-multiply" />
                                <span className="relative z-10 text-black">Soni</span>
                            </span>
                        </h2>

                        <p className="text-xl text-gray-600 font-body leading-relaxed mb-8 max-w-md">
                            "I don't just book tickets; I curate memories. Every journey is a story waiting to be written."
                        </p>

                        <div className="flex flex-col gap-4 text-gray-500 font-medium">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-black rounded-full" />
                                <span className="text-sm md:text-base">Founder</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-black rounded-full" />
                                <span className="text-sm md:text-base">Tours & Travels Company</span>
                            </div>
                        </div>

                        {/* Stat Counters */}
                        <div className="flex gap-8 mt-8 mb-6">
                            <div className="text-center">
                                <span className="stat-number text-3xl md:text-4xl font-heading font-black text-[#2D2D2D]" data-target="250">0</span>
                                <span className="text-3xl md:text-4xl font-heading font-black text-[#2D2D2D]">+</span>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Trips</p>
                            </div>
                            <div className="text-center">
                                <span className="stat-number text-3xl md:text-4xl font-heading font-black text-[#2D2D2D]" data-target="15">0</span>
                                <span className="text-3xl md:text-4xl font-heading font-black text-[#2D2D2D]">+</span>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Countries</p>
                            </div>
                            <div className="text-center">
                                <span className="stat-number text-3xl md:text-4xl font-heading font-black text-[#2D2D2D]" data-target="1000">0</span>
                                <span className="text-3xl md:text-4xl font-heading font-black text-[#2D2D2D]">+</span>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Travelers</p>
                            </div>
                        </div>

                        {/* Signature: SVG handwriting path draw */}
                        <div className="mt-8 opacity-100 rotate-[-4deg]">
                            <svg viewBox="0 0 300 40" className="w-64 h-10" fill="none">
                                <path
                                    className="signature-path"
                                    d="M5 25 C 20 5, 35 35, 50 20 C 65 5, 80 35, 95 20 C 110 5, 125 35, 140 20 C 155 5, 170 30, 185 20 C 200 10, 215 30, 230 20 C 245 10, 260 25, 275 20"
                                    stroke="#6B7280"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    style={{ strokeDasharray: 500, strokeDashoffset: 500 }}
                                />
                            </svg>
                            <span className="font-handwriting text-2xl md:text-3xl text-gray-400 block mt-1">
                                Let's get lost together.
                            </span>
                        </div>
                    </div>

                    {/* Right: The Polaroid */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
                        <div ref={imageRef} className="relative z-10 group w-[85%] md:w-auto">
                            {/* Tape Sticker */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-12 bg-[#e6e6e6] opacity-80 rotate-[-2deg] z-20 shadow-sm backdrop-blur-sm"
                                style={{
                                    clipPath: "polygon(2% 0, 98% 0, 100% 100%, 0% 100%)", // Rough edges can be SVG, for now simple box
                                    backgroundImage: "radial-gradient(#00000005 20%, transparent 20%)",
                                    backgroundSize: "4px 4px"
                                }}
                            />

                            {/* Polaroid Frame */}
                            <div className="bg-white p-4 pb-16 shadow-2xl rotate-1 md:rotate-3 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105 relative">
                                {/* Film Strip Sprocket Holes */}
                                <div className="absolute left-0 top-4 bottom-16 w-4 flex flex-col justify-between items-center py-2 z-30">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="w-2.5 h-4 bg-black/10 rounded-sm" />
                                    ))}
                                </div>
                                <div className="relative overflow-hidden w-full aspect-[3/4] md:w-[400px] md:h-[450px] bg-gray-200">
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
                                        alt="Sujal Soni"
                                        className="w-full h-full object-cover filter contrast-110 saturate-110 transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Film Grain/Dust Overlay */}
                                    <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
                                </div>
                                <div className="mt-4 font-handwriting text-2xl text-center text-gray-400 rotate-[-1deg] font-bold">
                                    Patagonia, 2023
                                </div>
                            </div>

                            {/* Backdrop Shape (Coral/Teal) — parallax targets */}
                            <div className="backdrop-teal absolute inset-0 bg-[#4ECDC4] -z-10 rotate-[-6deg] translate-y-4 rounded-xl scale-95" />
                            <div className="backdrop-coral absolute inset-0 bg-[#FF6B6B] -z-20 rotate-[5deg] translate-x-4 rounded-xl scale-95 opacity-50" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
