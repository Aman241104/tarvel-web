"use client";
import React from 'react';
import { FaPlane, FaHotel, FaGlobeAmericas, FaMapMarkedAlt, FaArrowRight } from 'react-icons/fa';

const services = [
    {
        title: "International Packages",
        icon: FaGlobeAmericas,
        image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1368&auto=format&fit=crop",
        desc: "Explore the world around you."
    },
    {
        title: "Domestic Travel",
        icon: FaMapMarkedAlt,
        image: "https://images.unsplash.com/photo-1471623432079-b009d30b6729?q=80&w=1470&auto=format&fit=crop",
        desc: "Discover your home's beauty."
    },
    {
        title: "Flight Bookings",
        icon: FaPlane,
        image: "https://images.unsplash.com/photo-1559268950-2d7ceb2eee3a?q=80&w=1470&auto=format&fit=crop",
        desc: "Fly anywhere, anytime."
    },
    {
        title: "Hotel Reservations",
        icon: FaHotel,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop",
        desc: "Stay in comfort and style."
    }
];

export default function ActivitiesPreview() {
    return (
        <section className="py-24 bg-arctic-white">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="font-primary font-bold text-4xl text-arctic-dark">What Awaits You?</h2>
                    <div className="hidden md:block text-arctic-grey font-secondary">Our premium services</div>
                </div>

                {/* Grid of Tall Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative h-[500px] rounded-card overflow-hidden shadow-card transition-all duration-300 cursor-pointer"
                        >
                            {/* Background Image (Passive State) */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url('${service.image}')` }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-arctic-orange group-hover:via-arctic-orange/90 group-hover:to-arctic-orange/80 transition-colors duration-300"></div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="text-4xl mb-4 text-arctic-gold group-hover:text-white transition-colors">
                                        <service.icon />
                                    </div>
                                    <h3 className="font-primary font-bold text-2xl mb-2 leading-tight">
                                        {service.title}
                                    </h3>
                                    <p className="font-secondary text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        {service.desc}
                                    </p>

                                    {/* Hover Arrow Icon */}
                                    <div className="absolute top-8 right-8 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <FaArrowRight className="transform -rotate-45" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
