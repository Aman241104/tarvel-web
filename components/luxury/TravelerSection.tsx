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
            { rotate: 10, scale: 0.85 },
            {
                rotate: -3,
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
        gsap.fromTo(textRef.current?.children || [], 
            { y: 30 },
            {
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                }
            }
        );

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

        // Refresh triggers after a short delay to account for dynamic imports and fonts
        setTimeout(() => ScrollTrigger.refresh(), 500);

    }, { scope: containerRef });

    return (
        <section id="about-captain" ref={containerRef} className="bg-bg-light text-text-light pt-6 md:pt-10 pb-0 relative overflow-hidden">
            {/* Background Decor - Subtle Grid or organic shape could go here */}

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">

                    {/* Left: Typography */}
                    <div ref={textRef} className="w-full md:w-1/2 relative z-10">
                        <div className="inline-block px-5 py-2 bg-brand-coral/10 border border-brand-coral/20 text-brand-coral rounded-full text-xs font-black tracking-[0.3em] mb-6 transform -rotate-1">
                            MEET THE CAPTAIN
                        </div>

                        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-8 mb-6">
                            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black leading-[0.75] tracking-tighter text-text-navy">
                                Sujal<br />
                                <span className="relative inline-block mt-4">
                                    <span className="absolute inset-0 bg-brand-yellow -rotate-2 -skew-x-6 scale-110 z-0 shadow-lg"></span>
                                    <span className="relative z-10 px-2">Soni</span>
                                </span>
                            </h2>
                            <div className="flex flex-col gap-4 pb-2 ml-2">
                                <div className="flex items-center gap-4">
                                    <div className="w-2.5 h-2.5 bg-brand-teal rounded-full shadow-[0_0_15px_rgba(46,196,182,0.6)]" />
                                    <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-black text-black/40">Founder</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-2.5 h-2.5 bg-brand-coral rounded-full shadow-[0_0_15px_rgba(255,107,107,0.6)]" />
                                    <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-black text-black/40">Travel Boutique & Co.</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-xl md:text-2xl text-gray-600 font-body leading-relaxed mb-6 max-w-md italic opacity-90 border-l-4 border-brand-teal pl-6">
                            "I don't just book tickets; I curate memories. Every journey is a story waiting to be written."
                        </p>

                        {/* Stat Counters */}
                        <div className="flex justify-between md:justify-start gap-4 md:gap-8 lg:gap-16 mt-12 mb-6">
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

                        {/* 9-Year Journey: Film Strip Timeline */}
                        <div className="mt-10 md:mt-12 relative">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-black/30 mb-6 border-l-2 border-brand-teal pl-4">The 9-Year Journey</h4>
                            
                            <div className="flex flex-col sm:flex-row gap-12 sm:gap-8 md:gap-12 items-start relative pl-10 sm:pl-0">
                                {/* Connector Line (Desktop) */}
                                <div className="absolute top-12 left-10 right-10 h-0.5 bg-black/[0.08] hidden sm:block z-0" />
                                {/* Connector Line (Mobile) */}
                                <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-black/[0.08] sm:hidden z-0" />
                                
                                {[
                                    { year: '2015', label: 'Passion Project', desc: 'Started with a single flight booking.' },
                                    { year: '2019', label: '100+ Families', desc: 'Curating global summer escapes.' },
                                    { year: '2024', label: '500+ Clients', desc: 'A boutique luxury standard.' }
                                ].map((milestone, i) => (
                                    <div key={milestone.year} className="relative z-10 flex-1 group w-full">
                                        <div className="bg-white p-2.5 shadow-2xl group-hover:shadow-brand-teal/20 transition-all duration-500 rounded-sm mb-6 inline-block transform rotate-[-3deg] group-hover:rotate-0 relative">
                                             {/* Mobile Line Connector dot */}
                                             <div className="absolute top-1/2 -left-[30px] w-3 h-3 rounded-full bg-brand-teal sm:hidden transform -translate-y-1/2 shadow-[0_0_10px_rgba(46,196,182,0.5)] z-20" />
                                             {/* Desktop Line Connector dot */}
                                             <div className="hidden sm:block absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-teal shadow-[0_0_10px_rgba(46,196,182,0.5)] z-20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                             
                                             <div className="w-20 h-20 md:w-24 md:h-24 bg-bg-light flex items-center justify-center font-heading font-black text-2xl md:text-3xl text-brand-teal/30 group-hover:text-brand-teal transition-colors border border-black/5">
                                                 {milestone.year}
                                             </div>
                                        </div>
                                        <h5 className="font-heading font-bold text-text-navy text-xl mb-2">{milestone.label}</h5>
                                        <p className="text-sm text-gray-500 font-body leading-relaxed max-w-[180px]">{milestone.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Signature: SVG handwriting path draw */}
                        <div className="mt-8 md:mt-24 lg:mt-12 opacity-100 rotate-[-2deg]">
                            <span className="font-handwriting text-3xl md:text-4xl text-gray-500 block mt-2 opacity-80">
                                Curating your next great story.
                            </span>
                        </div>
                    </div>

                    {/* Right: The Polaroid */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
                        <div ref={imageRef} className="relative z-10 group w-full sm:w-[90%] md:w-auto mt-12 md:mt-0 max-w-[480px]">
                            {/* Tape Sticker */}
                            <div className="washi-tape washi-tape-teal -top-5 left-1/2 -translate-x-1/2 w-44 h-16 -rotate-2 opacity-80 shadow-sm" />

                            {/* Polaroid Frame */}
                            <div className="bg-white p-4 md:p-5 pb-[5px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] rotate-1 md:rotate-3 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-[1.02] relative rounded-sm border border-black/5">
                                
                                {/* Film Strip Holes */}
                                <div className="absolute left-3 md:left-4 top-10 bottom-12 md:bottom-16 w-3 md:w-4 flex flex-col justify-between items-center z-30 opacity-40 pointer-events-none">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="w-2 md:w-2.5 h-2 md:h-2.5 bg-black/80 rounded-sm shadow-[0_1px_1px_rgba(255,255,255,0.1)]" />
                                    ))}
                                </div>

                                <div className="relative overflow-hidden w-full aspect-[2/3.5] md:w-[420px] md:h-[560px] bg-gray-100 shadow-inner">
                                    <img
                                        src="/assets/owner-image.png"
                                        alt="Sujal Soni"
                                        className="w-full h-full object-cover filter contrast-[1.02] saturate-[1.1] transition-transform duration-1000 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 500px"
                                    />
                                    {/* Subtle Gradient Overlay for holes visibility */}
                                    <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-20" />
                                    
                                    {/* Film Grain/Dust Overlay */}
                                    <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10" />
                                </div>
                                <div className="mt-6 md:mt-8 font-handwriting text-2xl md:text-3xl text-center text-gray-400 rotate-[-1deg] font-bold tracking-tight px-4 leading-none pb-[5px]">
                                    Founder, Destination Anywhere
                                </div>
                            </div>

                            {/* Backdrop Shape (Coral/Teal) — parallax targets */}
                            <div className="backdrop-teal absolute inset-0 bg-brand-teal -z-10 rotate-[-8deg] translate-y-6 rounded-[3rem] scale-95 opacity-[0.15] blur-2xl" />
                            <div className="backdrop-coral absolute inset-0 bg-brand-coral -z-20 rotate-[6deg] translate-x-6 rounded-[3rem] scale-95 opacity-[0.1] blur-2xl" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
