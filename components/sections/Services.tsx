'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaGlobeAmericas, FaMapMarkedAlt, FaPlaneDeparture, FaHotel } from 'react-icons/fa';

const services = [
    {
        title: 'International Tour Packages',
        description: 'Explore exotic destinations across the globe with our curated international packages.',
        icon: FaGlobeAmericas,
    },
    {
        title: 'Domestic Tour Packages',
        description: 'Discover the hidden gems of our beautiful country with tailored domestic tours.',
        icon: FaMapMarkedAlt,
    },
    {
        title: 'Flight Tickets',
        description: 'Seamless flight bookings for domestic and international travel at competitive rates.',
        icon: FaPlaneDeparture,
    },
    {
        title: 'Hotel Bookings',
        description: 'Comfortable and luxurious stays handpicked to suit your budget and preferences.',
        icon: FaHotel,
    },
];

export default function Services() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.service-card', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={sectionRef} className="py-24 bg-sky-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-2">
                        Where To Next?
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-bold font-heading text-sky-900">
                        Choose Your Adventure
                    </h3>
                </div>

                <div className="flex flex-col md:flex-row gap-4 h-[600px] w-full max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card relative flex-1 bg-white rounded-[2rem] overflow-hidden shadow-lg transition-all duration-500 hover:flex-[2] group cursor-pointer border border-sky-100"
                        >
                            {/* Background Image Placeholder */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-sky-900/90 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity`}></div>
                            <div className="absolute inset-0 bg-gray-200 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('https://source.unsplash.com/random/600x800?travel,${index}')` }}></div>

                            <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xl mb-4">
                                    <service.icon />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-2 leading-tight">
                                    {service.title}
                                </h4>
                                <p className="text-sky-200 text-sm opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 delay-100 overflow-hidden">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
