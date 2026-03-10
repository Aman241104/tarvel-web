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
            { rotate: 10, opacity: 0, scale: 0.85 },
            {
                rotate: -3,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // Text Stagger
        gsap.from(textRef.current?.children || [], {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
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
                    duration: 1.2,
                    ease: 'power2.out',
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
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
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sigPath,
                        start: 'top 90%',
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
        <section id="about" ref={containerRef} className="bg-bg-light text-text-light py-16 md:py-32 relative overflow-hidden">
            {/* Background Decor - Subtle Grid or organic shape could go here */}

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">

                    {/* Left: Typography */}
                    <div ref={textRef} className="w-full md:w-1/2 relative z-10">
                        <div className="inline-block px-5 py-2 bg-brand-coral/10 border border-brand-coral/20 text-brand-coral rounded-full text-xs font-black tracking-[0.3em] mb-8">
                            MEET THE CAPTAIN
                        </div>

                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-10 leading-[0.85] tracking-tighter text-text-navy">
                            Sujal<br />
                            <span className="relative inline-block px-4 mt-4 py-1">
                                <span className="absolute inset-0 bg-brand-yellow -rotate-1 rounded-sm opacity-90" />
                                <span className="relative z-10 text-text-navy">Soni</span>
                            </span>
                        </h2>

                        <p className="text-xl md:text-2xl text-gray-600 font-body leading-relaxed mb-10 max-w-md italic opacity-90 border-l-4 border-brand-teal pl-6">
                            "I don't just book tickets; I curate memories. Every journey is a story waiting to be written."
                        </p>

                        <div className="flex flex-col gap-5 text-gray-500 font-medium">
                            <div className="flex items-center gap-4">
                                <div className="w-2.5 h-2.5 bg-brand-teal rounded-full shadow-[0_0_15px_rgba(46,196,182,0.6)]" />
                                <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-black text-black/40">Founder</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-2.5 h-2.5 bg-brand-coral rounded-full shadow-[0_0_15px_rgba(255,107,107,0.6)]" />
                                <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-black text-black/40">Travel Boutique & Co.</span>
                            </div>
                        </div>

                        {/* Stat Counters */}
                        <div className="flex justify-between md:justify-start gap-4 md:gap-16 mt-12 mb-10">
                            <div className="text-left group/stat">
                                <div className="flex items-baseline">
                                    <span className="stat-number text-5xl sm:text-6xl md:text-7xl font-heading font-black text-text-navy tabular-nums" data-target="9">9</span>
                                    <span className="text-2xl font-black text-brand-teal ml-1">+</span>
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-2 group-hover/stat:text-brand-teal transition-colors">Years XP</p>
                            </div>
                            <div className="text-left group/stat">
                                <div className="flex items-baseline">
                                    <span className="stat-number text-5xl sm:text-6xl md:text-7xl font-heading font-black text-text-navy tabular-nums" data-target="15">15</span>
                                    <span className="text-2xl font-black text-brand-coral ml-1">+</span>
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-2 group-hover/stat:text-brand-coral transition-colors">Countries</p>
                            </div>
                            <div className="text-left group/stat">
                                <div className="flex items-baseline">
                                    <span className="stat-number text-5xl sm:text-6xl md:text-7xl font-heading font-black text-text-navy tabular-nums" data-target="500">500</span>
                                    <span className="text-2xl font-black text-brand-yellow ml-1">+</span>
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-2 group-hover/stat:text-brand-yellow transition-colors">Clients</p>
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
                                <div className="absolute left-1 top-4 bottom-20 w-3 flex flex-col justify-between items-center py-2 z-30 opacity-10">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="w-2 h-4 bg-gray-900 rounded-full" />
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
