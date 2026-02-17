'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Map, LifeBuoy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesList() {
    const containerRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            gsap.from(cardsRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
            });
        },
        { scope: containerRef }
    );

    const services = [
        {
            icon: FileText,
            title: 'Visa & Paperwork',
            desc: "We handle the boring stuff so you can just fly.",
        },
        {
            icon: Map,
            title: 'Custom Itineraries',
            desc: "No cookie-cutter trips. Your journey, your rules.",
        },
        {
            icon: LifeBuoy,
            title: '24/7 Support',
            desc: "Lost? Confused? We are one text away.",
        },
    ];

    return (
        <section ref={containerRef} className="pt-24 pb-24 mb-12 md:-mb-16 bg-[#FFFBF5] relative z-30 rounded-b-[50px] overflow-visible">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                    {services.map((service, i) => (
                        <div key={i} className="relative group perspective-1000">
                            {/* String/Cord */}
                            <div className="hidden md:block absolute -top-24 left-1/2 -ml-[1px] w-[2px] h-24 bg-gray-300 z-0 origin-bottom transition-transform duration-500 group-hover:rotate-2" />

                            {/* Luggage Tag Card */}
                            <div
                                ref={(el) => { cardsRef.current[i] = el; }}
                                className="relative bg-white border-2 border-gray-100 p-8 pt-12 text-center shadow-lg transition-transform duration-500 transform origin-top group-hover:rotate-2 group-hover:shadow-2xl"
                                style={{
                                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 10%, 100% 100%, 0% 100%, 0% 10%)',
                                    borderRadius: '0 0 1rem 1rem'
                                }}
                            >
                                {/* Hole Punch */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FFFBF5] rounded-full border-2 border-gray-200 shadow-inner z-20" />
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-black/10 z-20" />


                                <div className="bg-yellow-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <service.icon className="w-8 h-8 text-black" />
                                </div>

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
