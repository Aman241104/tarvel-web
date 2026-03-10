'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Plane, User, Bed, ArrowUpRight, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesGrid() {
    const containerRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            // Staggered Entrance Animation
            gsap.from(cardsRef.current, {
                y: 80,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Scribble Animation
            gsap.to('.scribble-path', {
                strokeDashoffset: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
            });

            // Parallax Images
            cardsRef.current.forEach((card) => {
                const img = card?.querySelector('img');
                if (img) {
                    gsap.fromTo(img,
                        { scale: 1.1, yPercent: -5 },
                        {
                            scale: 1,
                            yPercent: 5,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true
                            }
                        }
                    );
                }
            });
        },
        { scope: containerRef }
    );

    const handleMouseMove = (e: React.MouseEvent, index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
            transformPerspective: 1000,
        });
    };

    const handleMouseLeave = (index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            overwrite: true,
        });
    };

    return (
        <section ref={containerRef} className="pt-24 pb-12 md:pb-20 bg-bg-light relative z-20">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-20 md:mb-32">
                    <span className="text-brand-coral font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 block">The Collection</span>
                    <h2 className="text-4xl md:text-6xl font-black font-heading text-text-navy relative inline-block tracking-tight">
                        Curated Experiences
                        <svg
                            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 md:w-64 h-8 z-0 pointer-events-none opacity-40"
                            viewBox="0 0 200 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 30 C 40 10, 60 50, 90 30 C 120 10, 140 50, 170 30"
                                stroke="#FFBF00"
                                strokeWidth="3"
                                strokeLinecap="round"
                                pathLength="1"
                                className="scribble-path"
                                style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                            />
                        </svg>
                    </h2>
                </div>

                {/* Editorial Layout Grid */}
                <div className="flex flex-col gap-16 md:gap-24">
                    
                    {/* Top Row: Flight & Solo (Asymmetrical) */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                        
                        {/* Card 1: Flight Bookings (Wide) */}
                        <div
                            ref={(el) => { cardsRef.current[0] = el; }}
                            onMouseMove={(e) => handleMouseMove(e, 0)}
                            onMouseLeave={() => handleMouseLeave(0)}
                            className="group relative w-full md:w-[60%] h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden cursor-pointer shadow-ambient border-[8px] border-white/5"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
                            <Image
                                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
                                alt="Flight Bookings"
                                fill
                                className="object-cover filter-printed transition-transform duration-1000"
                                sizes="(max-width: 768px) 100vw, 60vw"
                            />
                            
                            {/* Editorial Content Overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                                <div className="flex items-center gap-4 mb-4 transform transition-transform duration-700 group-hover:-translate-y-2">
                                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                                        <Plane className="text-white w-5 h-5" strokeWidth={2.5} />
                                    </div>
                                    <span className="text-white/60 font-black text-[10px] uppercase tracking-[0.3em]">Global Access</span>
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black text-white font-heading tracking-tighter leading-none mb-3 transform transition-transform duration-700 group-hover:-translate-y-1">
                                    Flight Concierge
                                </h3>
                                <p className="text-white/70 font-body text-sm md:text-base max-w-sm opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                                    Bypass the algorithms. We secure premium routing, upgrades, and private charters.
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Solo Adventures (Tall/Narrow) */}
                        <div
                            ref={(el) => { cardsRef.current[1] = el; }}
                            onMouseMove={(e) => handleMouseMove(e, 1)}
                            onMouseLeave={() => handleMouseLeave(1)}
                            className="group relative w-full md:w-[40%] h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden cursor-pointer shadow-ambient-lg bg-[#FFBF00] flex flex-col p-8 md:p-10 -mt-0 md:-mt-24 border-[8px] border-white/5"
                        >
                            {/* Graphic Pattern */}
                            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2h2v2h20v2H22v2.5h-2zm0 0' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />

                            <div className="relative z-10 flex-1 flex flex-col justify-start transform transition-transform duration-700 group-hover:-translate-y-2">
                                <div className="bg-bg-dark p-3 rounded-full w-fit mb-6 shadow-xl">
                                    <User className="text-brand-yellow w-5 h-5" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black text-bg-dark font-heading leading-[1] tracking-tighter mb-4">
                                    Solo<br />Journeys
                                </h3>
                                <p className="text-bg-dark/70 font-body text-sm font-medium leading-relaxed max-w-[200px]">
                                    Curated independence. Safe, deeply personal itineraries for the intrepid traveler.
                                </p>
                            </div>

                            <div className="relative w-full h-[50%] mt-auto rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-700 group-hover:scale-105 origin-bottom">
                                <Image
                                    src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80"
                                    alt="Solo Traveler"
                                    fill
                                    className="object-cover filter-printed"
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Bottom Row: Luxury Resorts (Full Width Hero-style) */}
                    <div
                        ref={(el) => { cardsRef.current[2] = el; }}
                        onMouseMove={(e) => handleMouseMove(e, 2)}
                        onMouseLeave={() => handleMouseLeave(2)}
                        className="group relative w-full h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden cursor-pointer shadow-ambient border-[8px] border-white/5"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-95" />
                        
                        <Image
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
                            alt="Luxury Resorts"
                            fill
                            className="object-cover filter-printed transition-transform duration-1000"
                            sizes="100vw"
                        />

                        <div className="absolute inset-0 p-8 md:p-16 z-20 flex flex-col justify-end">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full">
                                <div className="max-w-xl transform transition-transform duration-700 group-hover:-translate-y-2">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="bg-brand-coral/90 backdrop-blur-md p-3 rounded-full shadow-lg">
                                            <Bed className="text-white w-5 h-5" strokeWidth={2.5} />
                                        </div>
                                        <span className="text-brand-coral font-black text-[10px] uppercase tracking-[0.3em] bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">Sanctuary</span>
                                    </div>
                                    <h3 className="text-4xl md:text-6xl font-black text-white font-heading tracking-tighter leading-none mb-4">
                                        Hushpitality & Retreats
                                    </h3>
                                    <p className="text-white/70 font-body text-sm md:text-lg opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                                        Vetted, ultra-private villas and wellness retreats designed for absolute restoration and quiet luxury.
                                    </p>
                                </div>

                                {/* Refined Price Tag */}
                                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 text-white px-8 py-5 rounded-2xl shadow-2xl transform md:rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 flex flex-col items-end shrink-0">
                                    <span className="text-[9px] uppercase text-white/50 block tracking-[0.3em] mb-1 font-black">Curations From</span>
                                    <span className="text-2xl md:text-4xl font-black font-heading">₹24,999</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}
