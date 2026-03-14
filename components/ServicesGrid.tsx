'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Plane, User, Bed, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import ServiceModal from './ui/ServiceModal';

gsap.registerPlugin(ScrollTrigger);

const gridServices = [
    {
        id: 'flights',
        icon: Plane,
        title: 'Flight Concierge',
        badge: 'Global Access',
        tagline: 'Fly smarter, not harder.',
        desc: 'Bypass the algorithms. We secure premium routing, upgrades, and private charters tailored precisely to you.',
        details: [
            'Priority Upgrades & Routing',
            'Private Jet & Charter Services',
            '24/7 Flight Monitoring',
            'Corporate & Group Travel',
        ],
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
        accentColor: 'brand-teal',
        accentHex: '#2EC4B6',
    },
    {
        id: 'solo',
        icon: User,
        title: 'Solo Journeys',
        badge: 'Intrepid',
        tagline: 'Your adventure, your rules.',
        desc: 'Curated independence. Safe, deeply personal itineraries for the intrepid traveler who craves authenticity.',
        details: [
            'Safe & Vetted Accommodations',
            'Personal Connection Guides',
            'Flexible Discovery Routes',
            '24/7 Solo Support Sync',
        ],
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
        accentColor: 'brand-coral',
        accentHex: '#FF6B6B',
    },
    {
        id: 'retreats',
        icon: Bed,
        title: 'Hushpitality & Retreats',
        badge: 'Sanctuary',
        tagline: 'Silence. Serenity. Luxury.',
        desc: 'Ultra-private villas and wellness retreats designed for absolute restoration and quiet luxury living.',
        details: [
            'Ultra-Private Villa Access',
            'Holistic Wellness Retreats',
            'Michelin-Star In-Villa Dining',
            'Absolute Discretion Assured',
        ],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        accentColor: 'brand-yellow',
        accentHex: '#FFBF00',
    },
];

export default function ServicesGrid() {
    const containerRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [selectedService, setSelectedService] = useState<any>(null);

    useGSAP(
        () => {
            gsap.from(cardsRef.current, {
                y: 60,
                opacity: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 82%',
                },
            });

            // Scribble underline animation
            gsap.to('.scribble-path', {
                strokeDashoffset: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
            });

            // Parallax images
            cardsRef.current.forEach((card) => {
                const img = card?.querySelector('img');
                if (img) {
                    gsap.fromTo(
                        img,
                        { yPercent: -8 },
                        {
                            yPercent: 8,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true,
                            },
                        }
                    );
                }
            });

            setTimeout(() => ScrollTrigger.refresh(), 500);
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="pt-24 pb-32 bg-bg-light relative z-20 overflow-visible">
            <ServiceModal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                service={selectedService}
            />

            <div className="container mx-auto px-6 max-w-6xl">

                {/* Section Header */}
                <div className="flex flex-col items-center mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-teal/5 rounded-full border border-brand-teal/15 mb-5 hover:bg-brand-teal/10 transition-colors">
                        <Sparkles className="w-3 h-3 text-brand-teal" />
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-teal">What We Offer</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black font-heading text-text-navy tracking-tighter leading-none mb-4 relative">
                        Our{' '}
                        <span className="relative inline-block">
                            Services
                            <svg
                                className="absolute -bottom-3 left-0 w-full h-5 pointer-events-none opacity-50"
                                viewBox="0 0 200 20"
                                fill="none"
                            >
                                <path
                                    d="M5 15 C 50 3, 100 18, 150 8 C 175 3, 190 12, 198 10"
                                    stroke="#2EC4B6"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    pathLength="1"
                                    className="scribble-path"
                                    style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                                />
                            </svg>
                        </span>
                    </h2>

                    <p className="text-gray-500 text-lg max-w-xl mt-6 font-body leading-relaxed">
                        From private sky-high transfers to silent retreats, we curate every detail of your perfect escape.
                    </p>
                </div>

                {/* Service Cards — 3-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {gridServices.map((service, i) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.id}
                                ref={(el) => { cardsRef.current[i] = el; }}
                                onClick={() => setSelectedService(service)}
                                data-cursor="view"
                                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col border border-black/5 hover:border-black/10 active:scale-[0.98]"
                            >
                                {/* Image */}
                                <div className="relative w-full h-56 overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                                    {/* Badge on image */}
                                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md">
                                        <Icon className="w-3.5 h-3.5" style={{ color: service.accentHex }} strokeWidth={2.5} />
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-navy">{service.badge}</span>
                                    </div>

                                    {/* Arrow on image hover */}
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 p-2.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                                        <ArrowUpRight className="w-4 h-4 text-white" />
                                    </div>

                                    {/* Tagline on image */}
                                    <div className="absolute bottom-4 left-4">
                                        <p className="text-white/90 font-handwriting text-lg">{service.tagline}</p>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="flex flex-col flex-1 p-7">
                                    {/* Icon + Title */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                                            style={{ backgroundColor: `${service.accentHex}18` }}
                                        >
                                            <Icon className="w-5 h-5" style={{ color: service.accentHex }} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-heading font-black text-text-navy tracking-tight leading-tight group-hover:text-brand-teal transition-colors duration-300">
                                                {service.title}
                                            </h3>
                                            <p className="text-gray-400 text-xs font-medium mt-1 leading-snug">{service.desc}</p>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px bg-black/5 mb-5" />

                                    {/* Feature list */}
                                    <ul className="flex flex-col gap-2.5 mt-auto">
                                        {service.details.map((detail) => (
                                            <li key={detail} className="flex items-center gap-2.5 text-sm text-gray-600 font-medium">
                                                <CheckCircle2
                                                    className="w-4 h-4 shrink-0"
                                                    style={{ color: service.accentHex }}
                                                />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <div
                                        className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 translate-x-0 group-hover:translate-x-1"
                                        style={{ color: service.accentHex }}
                                    >
                                        Explore Details
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>

                                {/* Subtle bottom accent bar */}
                                <div
                                    className="h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
                                    style={{ backgroundColor: service.accentHex }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
