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
                scale: 0.5,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Scribble Animation
            gsap.to('.scribble-path', {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                },
            });

            // Parallax Images
            cardsRef.current.forEach((card) => {
                const img = card?.querySelector('img');
                if (img) {
                    gsap.fromTo(img,
                        { yPercent: -15, scale: 1.2 },
                        {
                            yPercent: 15,
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
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.03,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
            transformPerspective: 800,
        });
    };

    const handleMouseLeave = (index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: true,
        });
    };

    return (
        <section ref={containerRef} className="pt-16 pb-0 md:pb-8 bg-[#FFFBF5] paper-warm">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="relative inline-block mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-[#2D2D2D] text-center relative z-10">
                        Ways to Travel
                    </h2>
                    <svg
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-12 z-0 pointer-events-none"
                        viewBox="0 0 200 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 30 C 40 10, 60 50, 90 30 C 120 10, 140 50, 170 30"
                            stroke="#4ECDC4"
                            strokeWidth="4"
                            strokeLinecap="round"
                            pathLength="1"
                            className="scribble-path"
                            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                        />
                    </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[340px] mt-16">
                    {/* Card 1: Flight Bookings (Wide - Top Left) */}
                    <div
                        ref={(el) => { cardsRef.current[0] = el; }}
                        onMouseMove={(e) => handleMouseMove(e, 0)}
                        onMouseLeave={() => handleMouseLeave(0)}
                        className="group relative col-span-1 md:col-span-2 rounded-3xl overflow-hidden cursor-pointer shadow-ambient-lg border border-white/10"
                    >
                        {/* Stronger Gradient for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
                        {/* Number Badge */}
                        <span className="absolute top-6 left-8 z-20 font-handwriting text-5xl text-white/20 select-none">01</span>
                        <Image
                            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
                            alt="Flight Bookings"
                            fill
                            className="object-cover transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 66vw"
                        />

                        {/* Content */}
                        <div className="absolute bottom-8 left-8 z-20">
                            <div className="bg-brand-teal/20 backdrop-blur-md border border-white/20 p-3 rounded-full w-fit mb-4">
                                <Plane className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-white font-heading tracking-tight leading-none">
                                Flight Bookings
                            </h3>
                            <p className="text-white/80 mt-3 font-body text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                To anywhere in the world.
                            </p>
                        </div>

                        {/* Hover Icon */}
                        <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <div className="bg-white p-3 rounded-full shadow-lg">
                                <ArrowUpRight className="text-black w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Solo Adventures (Tall/Vertical - Right) */}
                    <div
                        ref={(el) => { cardsRef.current[1] = el; }}
                        onMouseMove={(e) => handleMouseMove(e, 1)}
                        onMouseLeave={() => handleMouseLeave(1)}
                        className="group relative col-span-1 md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden cursor-pointer shadow-ambient-lg bg-brand-yellow flex flex-col pt-10"
                    >
                        {/* Number Badge */}
                        <span className="absolute top-6 left-8 z-20 font-handwriting text-5xl text-black/10 select-none">02</span>
                        {/* Subtle Topographic Pattern */}
                        <div className="absolute inset-0 opacity-[0.1]"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />

                        {/* Top Content */}
                        <div className="relative z-10 px-8 transform transition-transform duration-500 group-hover:-translate-y-1">
                            <div className="bg-black/5 p-3 rounded-full w-fit mb-4">
                                <User className="text-text-navy w-6 h-6" />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black text-text-navy font-heading leading-[1.1] tracking-tight">
                                Solo<br />Adventures
                            </h3>
                            <p className="mt-4 text-text-navy/60 font-black uppercase text-[10px] tracking-[0.2em]">Find yourself.</p>
                        </div>

                        {/* White Arrow Icon (Bottom Right) */}
                        <div className="absolute bottom-8 right-8 z-20 bg-white p-3 rounded-full shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <ArrowRight className="text-black w-5 h-5" />
                        </div>

                        {/* Visual - Cutout Image */}
                        <div className="relative flex-1 mt-10 w-full overflow-hidden">
                            <div className="absolute inset-x-6 bottom-0 h-[92%] transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-1">
                                <Image
                                    src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80"
                                    alt="Solo Traveler"
                                    fill
                                    className="object-cover rounded-t-[2.5rem] shadow-2xl border-x-[6px] border-t-[6px] border-white/30"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Luxury Resorts (Wide - Bottom Left) */}
                    <div
                        ref={(el) => { cardsRef.current[2] = el; }}
                        onMouseMove={(e) => handleMouseMove(e, 2)}
                        onMouseLeave={() => handleMouseLeave(2)}
                        className="group relative col-span-1 md:col-span-2 rounded-3xl overflow-hidden cursor-pointer shadow-ambient-lg border border-white/10"
                    >
                        {/* Enhanced Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
                        {/* Number Badge */}
                        <span className="absolute top-6 left-8 z-20 font-handwriting text-5xl text-white/20 select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">03</span>
                        <Image
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                            alt="Luxury Resorts"
                            fill
                            className="object-cover transition-transform duration-700"
                            sizes="100vw"
                        />

                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-0">
                            <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                <div className="bg-brand-coral/20 backdrop-blur-md border border-white/20 p-3 rounded-full w-fit mb-4">
                                    <Bed className="text-white w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black text-white font-heading tracking-tight leading-none">
                                    Luxury Resorts
                                </h3>
                                <p className="text-white/80 font-body text-sm md:text-lg mt-2 md:mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                    Hand-picked stays for maximum relaxation.
                                </p>
                            </div>

                            {/* Price Tag - Glassmorphism Refinement */}
                            <div className="bg-white/10 backdrop-blur-xl border border-white/30 text-white px-5 py-3 md:px-6 md:py-4 rounded-2xl md:rounded-3xl font-black shadow-2xl transform md:rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 flex flex-col items-end self-end md:self-auto">
                                <span className="text-[9px] md:text-[10px] uppercase text-white/60 block tracking-[0.2em] mb-1">From</span>
                                <span className="text-xl md:text-3xl font-black">₹24,999</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
