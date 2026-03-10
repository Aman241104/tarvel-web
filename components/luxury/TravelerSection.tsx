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
        <section id="about" ref={containerRef} className="bg-white text-[#2D2D2D] py-16 md:py-24 relative overflow-hidden">
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
                                <span className="absolute inset-x-0 bottom-1 top-2 bg-brand-yellow -skew-x-3 transform -rotate-1 rounded-sm mix-blend-multiply" />
                                <span className="relative z-10 text-black">Soni</span>
                            </span>
                        </h2>

                        <p className="text-xl text-gray-600 font-body leading-relaxed mb-8 max-w-md italic opacity-90">
                            "I don't just book tickets; I curate memories. Every journey is a story waiting to be written."
                        </p>

                        <div className="flex flex-col gap-4 text-gray-500 font-medium">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-brand-teal rounded-full" />
                                <span className="text-sm md:text-base tracking-wide uppercase font-bold text-gray-400">Founder</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-brand-coral rounded-full" />
                                <span className="text-sm md:text-base tracking-wide uppercase font-bold text-gray-400">Tours & Travels Company</span>
                            </div>
                        </div>

                        {/* Stat Counters */}
                        <div className="flex justify-between md:justify-start gap-4 md:gap-12 mt-10 mb-8">
                            <div className="text-left">
                                <div className="flex items-baseline">
                                    <span className="stat-number text-3xl sm:text-4xl md:text-5xl font-heading font-black text-text-navy tabular-nums" data-target="9">0</span>
                                    <span className="text-xl md:text-2xl font-black text-brand-teal ml-1">+</span>
                                </div>
                                <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">Years XP</p>
                            </div>
                            <div className="text-left">
                                <div className="flex items-baseline">
                                    <span className="stat-number text-3xl sm:text-4xl md:text-5xl font-heading font-black text-text-navy tabular-nums" data-target="15">0</span>
                                    <span className="text-xl md:text-2xl font-black text-brand-coral ml-1">+</span>
                                </div>
                                <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">Countries</p>
                            </div>
                            <div className="text-left">
                                <div className="flex items-baseline">
                                    <span className="stat-number text-3xl sm:text-4xl md:text-5xl font-heading font-black text-text-navy tabular-nums" data-target="500">0</span>
                                    <span className="text-xl md:text-2xl font-black text-brand-yellow ml-1">+</span>
                                </div>
                                <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">Clients</p>
                            </div>
                        </div>

                        {/* Signature: SVG handwriting path draw */}
                        <div className="mt-8 opacity-100 rotate-[-2deg]">
                            <svg viewBox="0 0 300 40" className="w-64 h-10" fill="none">
                                <path
                                    className="signature-path"
                                    d="M5 25 C 20 5, 35 35, 50 20 C 65 5, 80 35, 95 20 C 110 5, 125 35, 140 20 C 155 5, 170 30, 185 20 C 200 10, 215 30, 230 20 C 245 10, 260 25, 275 20"
                                    stroke="#2EC4B6"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    style={{ strokeDasharray: 500, strokeDashoffset: 500 }}
                                />
                            </svg>
                            <span className="font-handwriting text-3xl md:text-4xl text-gray-500 block mt-2 opacity-80">
                                Let's get lost together.
                            </span>
                        </div>
                    </div>

                    {/* Right: The Polaroid */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
                        <div ref={imageRef} className="relative z-10 group w-[85%] md:w-auto">
                            {/* Tape Sticker */}
                            <div className="washi-tape washi-tape-teal -top-4 left-1/2 -translate-x-1/2 w-40 h-14 -rotate-2 opacity-70" />

                            {/* Polaroid Frame */}
                            <div className="bg-white p-4 pb-20 shadow-ambient-lg rotate-1 md:rotate-3 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105 relative rounded-sm">
                                {/* Film Strip Sprocket Holes */}
                                <div className="absolute left-1 top-4 bottom-20 w-3 flex flex-col justify-between items-center py-2 z-30 opacity-20">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="w-2 h-4 bg-black rounded-full" />
                                    ))}
                                </div>
                                <div className="relative overflow-hidden w-full aspect-[3/4] md:w-[380px] md:h-[440px] bg-gray-100 shadow-inner">
                                    <img
                                        src="/assets/owner-image.png"
                                        alt="Sujal Soni"
                                        className="w-full h-full object-cover filter contrast-[1.05] saturate-[1.1] transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Film Grain/Dust Overlay */}
                                    <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
                                </div>
                                <div className="mt-6 font-handwriting text-2xl text-center text-gray-400 rotate-[-1deg] font-bold">
                                    Founder, Destination Anywhere
                                </div>
                            </div>

                            {/* Backdrop Shape (Coral/Teal) — parallax targets */}
                            <div className="backdrop-teal absolute inset-0 bg-brand-teal -z-10 rotate-[-6deg] translate-y-4 rounded-3xl scale-95 opacity-20" />
                            <div className="backdrop-coral absolute inset-0 bg-brand-coral -z-20 rotate-[5deg] translate-x-4 rounded-3xl scale-95 opacity-10" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
