'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Map, LifeBuoy, Globe, Plane, Hotel, Camera, Banknote, Star } from 'lucide-react';
import Magnetic from './ui/Magnetic';
import ServiceModal from './ui/ServiceModal';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesList() {
    const containerRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [selectedService, setSelectedService] = useState<any>(null);

    useGSAP(
        () => {
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(
                    card,
                    { rotateZ: -10, y: 40 },
                    {
                        rotateZ: 0,
                        y: 0,
                        duration: 0.8,
                        delay: i * 0.05,
                        ease: 'elastic.out(1, 0.6)',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 85%',
                        },
                    }
                );
            });
            setTimeout(() => ScrollTrigger.refresh(), 500);
        },
        { scope: containerRef }
    );

    const services = [
        {
            icon: Globe,
            title: 'Tour Packages',
            desc: "End-to-end curated domestic and international packages.",
            details: ["Custom Itineraries", "Local Guides", "24/7 Support", "Zero Stress"]
        },
        {
            icon: Star,
            title: 'Concierge Booking',
            desc: "Exclusive restaurant and beach club reservations.",
            details: ["Fine Dining", "Beach Clubs", "VIP Access", "Event Tickets"]
        },
        {
            icon: Plane,
            title: 'Flight Tickets',
            desc: "Seamless booking for domestic and international flights.",
            details: ["Best Price Guarantee", "Seat Selection", "Web Check-in", "Corporate Fares"]
        },
        {
            icon: Hotel,
            title: 'Hotel Bookings',
            desc: "Luxury stays and handpicked accommodations worldwide.",
            details: ["Luxury Resorts", "Boutique Stays", "Villas", "Verified Properties"]
        },
        {
            icon: Camera,
            title: 'Sightseeings',
            desc: "Immersive local experiences and guided tours.",
            details: ["Private Tours", "Hidden Gems", "Group Excursions", "Cultural Immersions"]
        },
        {
            icon: FileText,
            title: 'Visa Services',
            desc: "Hassle-free visa processing and documentation support.",
            details: ["Tourist Visas", "Business Visas", "Document Review", "Interview Prep"]
        },
        {
            icon: Banknote,
            title: 'Currency Exchange',
            desc: "Secure and competitive forex services for your trip.",
            details: ["Best Rates", "Multi-Currency Cards", "Cash Delivery", "Secure Transactions"]
        },
        {
            icon: Map,
            title: 'Custom Holidays',
            desc: "100% personalized itineraries crafted for your unique style.",
            details: ["Honeymoons", "Anniversaries", "Solo Travel", "Family Trips"]
        }
    ];

    return (
        <section ref={containerRef} className="pt-0 md:pt-12 pb-24 mb-0 md:-mb-16 bg-bg-light relative z-30 overflow-visible">
            <ServiceModal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                service={selectedService}
            />

            <div className="container mx-auto px-6 max-w-6xl relative">
                {/* Visual Rod/Horizontal Line for Strings to hang from */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent z-0 hidden md:block" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="relative group perspective-1000 cursor-pointer pt-16 md:pt-24"
                            onClick={() => setSelectedService(service)}
                        >
                            {/* String/Cord - wobbles on hover */}
                            <div 
                                className="absolute top-0 left-1/2 -ml-[1px] w-[2px] h-16 md:h-24 border-l-2 border-dashed border-black/30 z-0 origin-top transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[5deg] group-hover:scale-y-[1.02]" 
                            />

                            {/* Mobile Rod Segment (Small dot at top of each string on mobile) */}
                            <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black/10 z-10" />

                            {/* Luggage Tag Card */}
                            <div
                                ref={(el) => { cardsRef.current[i] = el; }}
                                className="relative bg-white border border-black/5 p-5 pt-8 md:p-8 md:pt-12 text-center shadow-2xl transition-all duration-700 transform origin-top group-hover:rotate-x-12 group-hover:rotate-y-12 group-hover:scale-[1.02] group-hover:shadow-brand-coral/20 rounded-xl"
                                style={{
                                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 12%, 100% 100%, 0% 100%, 0% 12%)',
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                {/* Hole Punch with Metal Eyelet Effect */}
                                <div className="absolute top-3 md:top-5 left-1/2 -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-black/10 via-black/5 to-black/20 rounded-full border-[1.5px] border-black/10 shadow-inner z-20 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 md:w-3 md:h-3 bg-bg-light rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
                                </div>


                                <Magnetic strength={0.4}>
                                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500 ${
                                        i % 3 === 0 ? 'bg-brand-yellow/20 text-brand-yellow' : 
                                        i % 3 === 1 ? 'bg-brand-coral/20 text-brand-coral' : 
                                        'bg-brand-teal/20 text-brand-teal'
                                    }`}>
                                        <service.icon className="w-5 h-5 md:w-8 md:h-8" />
                                    </div>
                                </Magnetic>

                                <h3 className="text-base md:text-xl font-black font-heading text-text-navy mb-2 md:mb-4 tracking-tight leading-tight">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500 font-body text-[10px] md:text-sm leading-relaxed max-w-[180px] mx-auto mb-4">
                                    {service.desc}
                                </p>

                                {/* Preview Details */}
                                <div className="flex flex-wrap justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                    {service.details.slice(0, 2).map((detail, idx) => (
                                        <span key={idx} className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-gray-50 text-gray-400 rounded-full border border-black/5 whitespace-nowrap">
                                            • {detail}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
