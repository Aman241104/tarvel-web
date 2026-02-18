'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Map, LifeBuoy, Globe, Plane, Hotel } from 'lucide-react';
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
                    { rotateZ: -15, y: 60, opacity: 0 },
                    {
                        rotateZ: 0,
                        y: 0,
                        opacity: 1,
                        duration: 1.5,
                        delay: i * 0.15,
                        ease: 'elastic.out(1, 0.4)',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            });
        },
        { scope: containerRef }
    );

    const services = [
        {
            icon: Globe,
            title: 'International Tour Packages',
            desc: "Discover the world with our curated international journeys.",
            details: ["Custom Itineraries", "Visa Assistance", "Local Guides", "24/7 Support"]
        },
        {
            icon: Map,
            title: 'Domestic Tour Packages',
            desc: "Explore the hidden gems of our beautiful country.",
            details: ["Weekend Getaways", "Family Packages", "Honeymoon Specials", "Group Tours"]
        },
        {
            icon: Plane,
            title: 'Flight Tickets',
            desc: "Seamless booking for your next adventure.",
            details: ["Best Price Guarantee", "Zero Cancellation", "Seat Selection", "Web Check-in"]
        },
        {
            icon: Hotel,
            title: 'Hotel Bookings',
            desc: "Luxury stays and comfortable accommodations worldwide.",
            details: ["Luxury Resorts", "Boutique Stays", "Homestays", "Verified Reviews"]
        },
    ];

    return (
        <section ref={containerRef} className="pt-0 md:pt-12 pb-24 mb-0 md:-mb-16 bg-[#FFFBF5] paper-warm relative z-30 overflow-visible">
            <ServiceModal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                service={selectedService}
            />

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="relative group perspective-1000 cursor-pointer pt-0 md:pt-24"
                            onClick={() => setSelectedService(service)}
                        >
                            {/* String/Cord - wobbles on hover */}
                            <div className="hidden md:block absolute top-0 left-1/2 -ml-[1px] w-[2px] h-24 bg-gray-300 z-0 origin-top transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[5deg] group-hover:scale-y-[1.02]" />

                            {/* Luggage Tag Card */}
                            <div
                                ref={(el) => { cardsRef.current[i] = el; }}
                                className="relative bg-white border-2 border-gray-100 p-8 pt-12 text-center shadow-ambient transition-transform duration-500 transform origin-top group-hover:rotate-2 group-hover:shadow-2xl"
                                style={{
                                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 10%, 100% 100%, 0% 100%, 0% 10%)',
                                    borderRadius: '0 0 1rem 1rem'
                                }}
                            >
                                {/* Hole Punch */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FFFBF5] rounded-full border-2 border-gray-200 shadow-inner z-20" />
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-black/10 z-20" />


                                <Magnetic strength={0.4}>
                                    <div className="bg-yellow-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <service.icon className="w-8 h-8 text-black" />
                                    </div>
                                </Magnetic>

                                <h3 className="text-2xl font-bold font-heading text-[#2D2D2D] mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500 font-medium">
                                    {service.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
