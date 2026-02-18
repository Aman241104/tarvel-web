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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {/* Card 1: Flight Bookings (Wide - Top Left) */}
                    <div
                        ref={(el) => { cardsRef.current[0] = el; }}
                        onMouseMove={(e) => handleMouseMove(e, 0)}
                        onMouseLeave={() => handleMouseLeave(0)}
                        className="group relative col-span-1 md:col-span-2 rounded-3xl overflow-hidden cursor-pointer shadow-ambient"
                    >
                        {/* Stronger Gradient for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
                        {/* Number Badge */}
                        <span className="absolute top-6 left-6 z-20 font-handwriting text-4xl text-white/30 select-none">01</span>
                        <Image
                            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
                            alt="Flight Bookings"
                            fill
                            className="object-cover transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 66vw"
                        />

                        {/* Content */}
                        <div className="absolute bottom-8 left-8 z-20">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full w-fit mb-4">
                                <Plane className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-2xl md:text-4xl font-bold text-white font-heading shadow-sm">
                                Flight Bookings
                            </h3>
                            <p className="text-white/90 mt-2 font-sans text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 font-medium">
                                To anywhere in the world.
                            </p>
                        </div>

                        {/* Hover Icon */}
                        <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
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
                        className="group relative col-span-1 md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden cursor-pointer shadow-ambient bg-[#FACC15] flex flex-col pt-12"
                    >
                        {/* Number Badge */}
                        <span className="absolute top-6 left-6 z-20 font-handwriting text-4xl text-[#2D2D2D]/20 select-none">02</span>
                        {/* Subtle Topographic Pattern */}
                        <div className="absolute inset-0 opacity-[0.08]"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />

                        {/* Top Content */}
                        <div className="relative z-10 px-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                            <div className="bg-black/5 p-3 rounded-full w-fit mb-4">
                                <User className="text-[#2D2D2D] w-6 h-6" />
                            </div>
                            <h3 className="text-4xl font-bold text-[#2D2D2D] font-heading leading-none">
                                Solo<br />Adventures
                            </h3>
                            <p className="mt-4 text-[#2D2D2D]/80 font-medium">Find yourself.</p>
                        </div>

                        {/* White Arrow Icon (Bottom Right) */}
                        <div className="absolute bottom-6 right-6 z-20 bg-white p-3 rounded-full shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <ArrowRight className="text-black w-5 h-5" />
                        </div>

                        {/* Visual - Cutout Image */}
                        <div className="relative flex-1 mt-8 w-full overflow-hidden">
                            <div className="absolute inset-x-4 bottom-0 h-[90%] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2">
                                <Image
                                    src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80"
                                    alt="Solo Traveler"
                                    fill
                                    className="object-cover rounded-t-3xl shadow-2xl border-x-4 border-t-4 border-white"
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
                        className="group relative col-span-1 md:col-span-2 rounded-3xl overflow-hidden cursor-pointer shadow-ambient"
                    >
                        {/* Enhanced Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
                        {/* Number Badge */}
                        <span className="absolute top-6 left-6 z-20 font-handwriting text-4xl text-white/50 select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">03</span>
                        <Image
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                            alt="Luxury Resorts"
                            fill
                            className="object-cover transition-transform duration-700"
                            sizes="100vw"
                        />

                        <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex items-end justify-between transform transition-transform duration-500 group-hover:-translate-y-2">
                            <div>
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full w-fit mb-4">
                                    <Bed className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-2xl md:text-5xl font-bold text-white font-heading shadow-sm">
                                    Luxury Resorts
                                </h3>
                                <p className="text-white/90 font-sans text-lg mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 font-medium">
                                    Hand-picked stays for maximum relaxation.
                                </p>
                            </div>

                            {/* Price Tag */}
                            <div className="bg-white text-[#2D2D2D] px-4 py-2 md:px-6 md:py-3 rounded-full font-bold shadow-lg transform rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300">
                                <span className="text-xs uppercase text-gray-400 block tracking-wider">From</span>
                                <span className="text-xl md:text-2xl">₹24,999</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
