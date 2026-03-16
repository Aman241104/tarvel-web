'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Map, LifeBuoy, Globe, Plane, Hotel, Camera, Banknote, Star, ShieldCheck, Ticket, Palmtree, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import Magnetic from './ui/Magnetic';
import ServiceModal from './ui/ServiceModal';
import { useWhatsApp } from '@/hooks/useWhatsApp';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        icon: Globe,
        title: 'Tour Packages',
        desc: "End-to-end curated domestic and international packages.",
        details: ["Custom Itineraries", "Local Guides", "24/7 Support", "Zero Stress"],
        stamp: 'GLOBAL\nTOUR',
        color: 'brand-coral'
    },
    {
        icon: CrownIcon,
        title: 'Concierge Booking',
        desc: "Exclusive restaurant and beach club reservations.",
        details: ["Fine Dining", "Beach Clubs", "VIP Access", "Event Tickets"],
        stamp: 'VIP\nACCESS',
        color: 'brand-teal'
    },
    {
        icon: Plane,
        title: 'Flight Tickets',
        desc: "Seamless booking for domestic and international flights.",
        details: ["Best Price Guarantee", "Seat Selection", "Web Check-in", "Corporate Fares"],
        stamp: 'SKY\nHIGH',
        color: 'brand-yellow'
    },
    {
        icon: Hotel,
        title: 'Hotel Bookings',
        desc: "Luxury stays and handpicked accommodations worldwide.",
        details: ["Luxury Resorts", "Boutique Stays", "Villas", "Verified Properties"],
        stamp: 'RESERVED\nSTAY',
        color: 'brand-teal'
    },
    {
        icon: Camera,
        title: 'Sightseeings',
        desc: "Immersive local experiences and guided tours.",
        details: ["Private Tours", "Hidden Gems", "Group Excursions", "Cultural Immersions"],
        stamp: 'LOCAL\nGUIDE',
        color: 'brand-coral'
    },
    {
        icon: FileText,
        title: 'Visa Services',
        desc: "Hassle-free visa processing and documentation support.",
        details: ["Tourist Visas", "Business Visas", "Document Review", "Interview Prep"],
        stamp: 'VISA\nREADY',
        color: 'brand-teal'
    },
    {
        icon: Banknote,
        title: 'Currency Exchange',
        desc: "Secure and competitive forex services for your trip.",
        details: ["Best Rates", "Multi-Currency Cards", "Cash Delivery", "Secure Transactions"],
        stamp: 'SECURE\nCASH',
        color: 'brand-yellow'
    },
    {
        icon: Map,
        title: 'Custom Holidays',
        desc: "100% personalized itineraries crafted for your unique style.",
        details: ["Honeymoons", "Anniversaries", "Solo Travel", "Family Trips"],
        stamp: 'YOUR\nSTORY',
        color: 'brand-coral'
    }
];

function CrownIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
        </svg>
    );
}

export default function ServicesList() {
    const containerRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [selectedService, setSelectedService] = useState<any>(null);
    const { openWhatsApp } = useWhatsApp();

    const handleWhatsAppClick = (service: typeof services[0]) => {
        const message = `Hi Sujal, I'm interested in the ${service.title} service. Can you provide more details?`;
        openWhatsApp('Service Inquiry', message);
    };

    useGSAP(
        () => {
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

            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(
                    card,
                    { rotateZ: -15, y: 100, opacity: 0 },
                    {
                        rotateZ: i % 2 === 0 ? -2 : 2,
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        delay: i * 0.1,
                        ease: 'elastic.out(1, 0.75)',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

            // Added refresh for better ScrollTrigger calculation
            ScrollTrigger.refresh();
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="py-6 md:py-10 bg-bg-light relative z-30 overflow-visible">
            <ServiceModal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                service={selectedService}
            />

            <div className="container mx-auto px-6 max-w-7xl relative">
                {/* Section Header */}
                <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-teal/5 rounded-full border border-brand-teal/15 mb-4 hover:bg-brand-teal/10 transition-colors">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-teal">What We Offer</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black font-heading text-text-navy tracking-tighter leading-none mb-3 relative">
                        Our{' '}
                        <span className="relative inline-block">
                            Services
                            <svg
                                className="absolute -bottom-3 left-0 w-full h-5 pointer-events-none opacity-50 md:-bottom-4"
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

                    <p className="text-gray-500 text-sm md:text-base max-w-xl mt-4 font-body leading-relaxed">
                        From private sky-high transfers to silent retreats, we curate every detail of your perfect escape.
                    </p>
                </div>

                {/* Visual "Hanging Rod" (Editorial Line) */}
                <div className="absolute top-[320px] md:top-[380px] left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-black/10 to-transparent z-0 hidden md:block" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="relative group pt-8 md:pt-10"
                            onClick={() => setSelectedService(service)}
                        >
                            {/* Realistic "Twine" Cord (SVG Path for natural curve) */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-6 md:h-12 pointer-events-none overflow-visible z-10 origin-top">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path 
                                        d="M50,0 Q50,50 50,100" 
                                        stroke="currentColor" 
                                        strokeWidth="1" 
                                        strokeDasharray="2,2" 
                                        className="text-black/30 transition-all duration-700 group-hover:text-brand-teal"
                                        fill="none"
                                    />
                                    {/* Hook Point */}
                                    <circle cx="50" cy="0" r="2" className="fill-black/10" />
                                </svg>
                            </div>

                            {/* Luggage Tag Card */}
                            <div
                                ref={(el) => { cardsRef.current[i] = el; }}
                                className="relative bg-[#FDFDFD] p-4 pt-6 md:pt-8 text-center shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-700 origin-top group-hover:rotate-0 group-hover:scale-[1.03] group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-sm border border-black/10"
                                style={{
                                    clipPath: 'polygon(35% 0%, 65% 0%, 100% 15%, 100% 100%, 0% 100%, 0% 15%)',
                                }}
                            >
                                {/* Paper Texture Overlay */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]" />

                                {/* Metal Eyelet / Hole Punch */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 border-[2px] border-white shadow-lg flex items-center justify-center z-20">
                                    <div className="w-3 h-3 bg-bg-light rounded-full shadow-inner" />
                                </div>

                                {/* Stamp Accent (Partially visible by default, pops on hover) */}
                                <div className={`absolute top-12 right-2 w-14 h-14 border-2 rounded-full flex items-center justify-center -rotate-12 opacity-20 group-hover:opacity-100 transition-all duration-700 transform scale-110 group-hover:scale-100 ${
                                    service.color === 'brand-yellow' ? 'border-brand-yellow/10 group-hover:border-brand-yellow/30' : 
                                    service.color === 'brand-teal' ? 'border-brand-teal/10 group-hover:border-brand-teal/30' : 
                                    'border-brand-coral/10 group-hover:border-brand-coral/30'
                                }`}>
                                    <span className={`font-black text-[6px] uppercase tracking-widest text-center whitespace-pre-line ${
                                        service.color === 'brand-yellow' ? 'text-brand-yellow' : 
                                        service.color === 'brand-teal' ? 'text-brand-teal' : 
                                        'text-brand-coral'
                                    }`}>
                                        {service.stamp}
                                    </span>
                                </div>

                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:scale-110 ${
                                    service.color === 'brand-yellow' ? 'bg-brand-yellow/10 text-brand-yellow' : 
                                    service.color === 'brand-teal' ? 'bg-brand-teal/10 text-brand-teal' : 
                                    'bg-brand-coral/10 text-brand-coral'
                                }`}>
                                    <service.icon className="w-6 h-6" strokeWidth={1.5} />
                                </div>

                                <h3 className="text-base md:text-lg font-heading font-black text-text-navy mb-1.5 tracking-tighter leading-none group-hover:text-brand-teal transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500 font-body text-[10px] leading-relaxed max-w-[150px] mx-auto mb-3">
                                    {service.desc}
                                </p>

                                {/* Bottom Detail Strip (CTA Button) */}
                                <div className="pt-2 mt-auto flex flex-col items-center gap-2">
                                    <div 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleWhatsAppClick(service);
                                        }}
                                        className={`px-5 py-2 rounded-xl text-white text-[9px] font-black uppercase tracking-widest opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 shadow-lg flex items-center gap-2 group/btn cursor-pointer z-30 ${
                                            service.color === 'brand-yellow' ? 'bg-brand-yellow shadow-brand-yellow/30' : 
                                            service.color === 'brand-teal' ? 'bg-brand-teal shadow-brand-teal/30' : 
                                            'bg-brand-coral shadow-brand-coral/30'
                                        }`}
                                    >
                                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                                        WhatsApp
                                    </div>
                                </div>

                                {/* Dynamic Lighting Glare */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            </div>

                            {/* "Shadow" below the tag for depth */}
                            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
