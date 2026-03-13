'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Plane, User, Bed, ArrowUpRight, Sparkles } from 'lucide-react';
import ServiceModal from './ui/ServiceModal';

gsap.registerPlugin(ScrollTrigger);

const gridServices = [
    {
        id: 'flights',
        icon: Plane,
        title: 'Flight Concierge',
        badge: 'Global Access',
        desc: 'Bypass the algorithms. We secure premium routing, upgrades, and private charters.',
        details: [
            'Priority Upgrades & Routing',
            'Private Jet & Charter Services',
            '24/7 Flight Monitoring',
            'Corporate & Group Travel'
        ],
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
        color: 'brand-teal'
    },
    {
        id: 'solo',
        icon: User,
        title: 'Solo Journeys',
        badge: 'Intrepid',
        desc: 'Curated independence. Safe, deeply personal itineraries for the intrepid traveler.',
        details: [
            'Safe & Vetted Accommodations',
            'Personal Connection Guides',
            'Flexible Discovery Routes',
            '24/7 Solo Support Sync'
        ],
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80',
        color: 'brand-teal'
    },
    {
        id: 'retreats',
        icon: Bed,
        title: 'Hushpitality & Retreats',
        badge: 'Sanctuary',
        desc: 'Vetted, ultra-private villas and wellness retreats designed for absolute restoration and quiet luxury.',
        details: [
            'Ultra-Private Villa Access',
            'Holistic Wellness Retreats',
            'Michelin-Star In-Villa Dining',
            'Absolute Discretion Assured'
        ],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
        color: 'brand-coral'
    }
];

export default function ServicesGrid() {
    const containerRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [selectedService, setSelectedService] = useState<any>(null);

    useGSAP(
        () => {
            // Staggered Entrance Animation
            gsap.from(cardsRef.current, 
                {
                    y: 80,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                    },
                }
            );

            // Scribble Animation
            gsap.to('.scribble-path', {
                strokeDashoffset: 0,
                duration: 1.2,
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
                        { scale: 1.2, yPercent: -10 },
                        {
                            scale: 1.2,
                            yPercent: 10,
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

            setTimeout(() => ScrollTrigger.refresh(), 500);
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
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.01,
            duration: 0.5,
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
            duration: 0.8,
            ease: 'power3.out',
            overwrite: true,
        });
    };

    return (
        <section ref={containerRef} className="pt-24 pb-32 md:pb-48 bg-bg-light relative z-20 overflow-visible">
            <ServiceModal 
                isOpen={!!selectedService} 
                onClose={() => setSelectedService(null)} 
                service={selectedService} 
            />

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-20 md:mb-32">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-coral/5 rounded-full border border-brand-coral/10 mb-6 group hover:bg-brand-coral/10 transition-colors">
                        <Sparkles className="w-3 h-3 text-brand-coral" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-coral">The Signature Collection</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black font-heading text-text-navy relative inline-block tracking-tight mb-6">
                        Experience Suite
                        <svg
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 md:w-64 h-6 z-0 pointer-events-none opacity-40"
                            viewBox="0 0 200 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 25 C 40 5, 60 45, 90 25 C 120 5, 140 45, 170 25"
                                stroke="#FFBF00"
                                strokeWidth="4"
                                strokeLinecap="round"
                                pathLength="1"
                                className="scribble-path"
                                style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                            />
                        </svg>
                    </h2>
                    <p className="text-gray-500 font-body text-lg max-w-2xl mx-auto mt-4">
                        From private sky-high transfers to silent retreats, we curate every detail of your escape.
                    </p>
                </div>

                {/* Editorial Layout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 lg:gap-24">
                    
                    {/* Card 1: Flight Concierge */}
                    <div
                        ref={(el) => { cardsRef.current[0] = el; }}
                        onMouseMove={(e) => handleMouseMove(e, 0)}
                        onMouseLeave={() => handleMouseLeave(0)}
                        onClick={() => setSelectedService(gridServices[0])}
                        data-cursor="view"
                        className="md:col-span-7 group relative w-full h-[400px] md:h-[550px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border-[10px] md:border-[16px] border-white active:scale-95 transition-transform"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/95 via-bg-dark/20 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-100" />
                        <Image
                            src={gridServices[0].image}
                            alt={gridServices[0].title}
                            fill
                            className="object-cover filter-printed transition-transform duration-1000 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 60vw"
                        />
                        
                        <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-20px] group-hover:translate-y-0">
                            <div className="bg-white/95 backdrop-blur-md p-4 rounded-full shadow-2xl border border-white/20">
                                <ArrowUpRight className="text-brand-teal w-6 h-6" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                            <div className="flex items-center gap-4 mb-4 transform transition-transform duration-700 group-hover:-translate-y-2">
                                <div className="bg-brand-teal p-3 rounded-full border border-white/20 shadow-xl shadow-brand-teal/20">
                                    <Plane className="text-white w-5 h-5" strokeWidth={2.5} />
                                </div>
                                <span className="text-white/80 font-black text-[10px] uppercase tracking-[0.3em] bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">{gridServices[0].badge}</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-white font-heading tracking-tighter leading-none mb-4 transform transition-transform duration-700 group-hover:-translate-y-1">
                                {gridServices[0].title}
                            </h3>
                            <p className="text-white/70 font-body text-sm md:text-base max-w-md opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0 line-clamp-2">
                                {gridServices[0].desc}
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Solo Journeys */}
                    <div
                        ref={(el) => { cardsRef.current[1] = el; }}
                        onMouseMove={(e) => handleMouseMove(e, 1)}
                        onMouseLeave={() => handleMouseLeave(1)}
                        onClick={() => setSelectedService(gridServices[1])}
                        data-cursor="view"
                        className="md:col-span-5 group relative w-full h-[450px] md:h-[550px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl bg-white flex flex-col p-8 md:p-10 border-[10px] md:border-[16px] border-white active:scale-95 transition-transform"
                    >
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2h2v2h20v2H22v2.5h-2zm0 0' fill='%232EC4B6' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />

                        <div className="relative z-10 flex-1 flex flex-col justify-start transform transition-transform duration-700 group-hover:-translate-y-2">
                            <div className="flex items-center justify-between mb-8">
                                <div className="bg-brand-teal p-3.5 rounded-2xl shadow-xl shadow-brand-teal/20">
                                    <User className="text-white w-6 h-6" strokeWidth={2.5} />
                                </div>
                                <div className="bg-brand-teal/5 border border-brand-teal/10 px-3 py-1 rounded-full">
                                    <span className="text-brand-teal font-black text-[9px] uppercase tracking-widest">{gridServices[1].badge}</span>
                                </div>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black text-text-navy font-heading leading-[0.9] tracking-tighter mb-5">
                                Solo<br />Journeys
                            </h3>
                            <p className="text-text-navy/60 font-body text-sm font-medium leading-relaxed">
                                {gridServices[1].desc}
                            </p>
                            
                            <div className="mt-8 flex items-center gap-2 text-brand-teal font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                                Explore Details <ArrowUpRight className="w-3 h-3" />
                            </div>
                        </div>

                        <div className="relative w-full h-56 md:h-[40%] mt-auto rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-1000 group-hover:scale-105 origin-bottom">
                            <Image
                                src={gridServices[1].image}
                                alt={gridServices[1].title}
                                fill
                                className="object-cover object-center filter-printed transition-transform duration-1000 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                        </div>
                    </div>

                    {/* Bottom Row: Luxury Resorts (Full Width) */}
                    <div
                        ref={(el) => { cardsRef.current[2] = el; }}
                        onMouseMove={(e) => handleMouseMove(e, 2)}
                        onMouseLeave={(e) => handleMouseLeave(2)}
                        onClick={() => setSelectedService(gridServices[2])}
                        data-cursor="view"
                        className="md:col-span-12 group relative w-full h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl border-[10px] md:border-[20px] border-white active:scale-95 transition-transform"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/95 via-bg-dark/10 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-100" />
                        
                        <Image
                            src={gridServices[2].image}
                            alt={gridServices[2].title}
                            fill
                            className="object-cover filter-printed transition-transform duration-[2000ms] group-hover:scale-110"
                            sizes="100vw"
                        />

                        <div className="absolute top-12 right-12 z-20 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-[20px] group-hover:translate-x-0">
                            <div className="bg-brand-coral p-5 rounded-full shadow-2xl">
                                <ArrowUpRight className="text-white w-8 h-8" />
                            </div>
                        </div>

                        <div className="absolute inset-0 p-8 md:p-20 z-20 flex flex-col justify-end">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 w-full">
                                <div className="max-w-2xl transform transition-transform duration-700 group-hover:-translate-y-4">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="bg-brand-coral p-4 rounded-2xl shadow-xl shadow-brand-coral/20">
                                            <Bed className="text-white w-7 h-7" strokeWidth={2.5} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-brand-coral font-black text-[10px] uppercase tracking-[0.4em] mb-1">Sanctuary</span>
                                            <div className="h-0.5 w-12 bg-brand-coral/30" />
                                        </div>
                                    </div>
                                    <h3 className="text-4xl sm:text-5xl md:text-7xl font-black text-white font-heading tracking-tighter leading-[0.85] mb-8">
                                        Hushpitality <br className="hidden md:block"/>& Retreats
                                    </h3>
                                    <p className="text-white/70 font-body text-sm md:text-xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0 max-w-xl">
                                        {gridServices[2].desc}
                                    </p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-3xl border border-white/20 text-white px-10 py-6 rounded-3xl shadow-2xl transform md:rotate-2 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 flex flex-col items-start md:items-end shrink-0 self-start md:self-auto">
                                    <span className="text-[10px] uppercase text-white/50 block tracking-[0.4em] mb-2 font-black">Curations From</span>
                                    <span className="text-4xl md:text-5xl font-black font-heading tracking-tighter">₹24,999</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
