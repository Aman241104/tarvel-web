"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Globe, Map, Plane, BedDouble } from "lucide-react";
import clsx from "clsx";

const services = [
    {
        id: "01",
        title: "International Tour Packages",
        description: "Borderless adventures tailored to your pace. From the Swiss Alps to the Maldives.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop",
        icon: Globe
    },
    {
        id: "02",
        title: "Domestic Tour Packages",
        description: "Rediscover the hidden gems of your homeland with curated local experiences.",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop",
        icon: Map
    },
    {
        id: "03",
        title: "Flight Ticket Bookings",
        description: "First-class service before you even take off. Seamless connections, every time.",
        image: "https://images.unsplash.com/photo-1540962351-710f52813a7c?q=80&w=2574&auto=format&fit=crop",
        icon: Plane
    },
    {
        id: "04",
        title: "Hotel Reservations",
        description: "Sleep in clouds. We secure the best suites in the world's most exclusive properties.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop",
        icon: BedDouble
    }
];

export default function Services() {
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
        <section className="py-16 md:py-32 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark relative transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="mb-8 md:mb-16 border-b border-black/10 dark:border-white/10 pb-4">
                    <h2 className="text-sm font-bold tracking-widest uppercase text-accent-gold">Our Expertise</h2>
                </div>

                <div className="flex flex-col">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            onMouseEnter={() => setActiveId(service.id)}
                            onMouseLeave={() => setActiveId(null)}
                            onClick={() => setActiveId(activeId === service.id ? null : service.id)}
                            className={clsx(
                                "group relative border-t border-black/10 dark:border-white/10 py-6 md:py-12 cursor-pointer transition-all duration-500",
                                activeId && activeId !== service.id ? "opacity-30" : "opacity-100"
                            )}
                        >
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-3 md:gap-8 min-w-0">
                                    <span className="hidden md:inline text-sm font-mono opacity-50">/{service.id}</span>
                                    <div className="flex items-center gap-2 md:gap-4 min-w-0">
                                        <service.icon className="w-5 h-5 md:w-8 md:h-8 text-accent-gold flex-shrink-0" />
                                        <h3 className="text-xl md:text-6xl font-heading font-medium group-hover:translate-x-4 transition-transform duration-500 truncate">
                                            {service.title}
                                        </h3>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-2 group-hover:-translate-y-2 text-accent-gold flex-shrink-0" />
                            </div>

                            <AnimatePresence>
                                {activeId === service.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-8 pl-4 md:pl-14 flex flex-col md:flex-row gap-8 items-start">
                                            <div className="md:w-1/3">
                                                <p className="text-lg opacity-70 font-body leading-relaxed max-w-sm">
                                                    {service.description}
                                                </p>
                                            </div>
                                            <motion.div
                                                initial={{ scale: 0.95 }}
                                                animate={{ scale: 1 }}
                                                className="md:w-1/2 h-64 rounded-card overflow-hidden border border-black/10 dark:border-white/10"
                                            >
                                                <img
                                                    src={service.image}
                                                    alt={service.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                    <div className="border-t border-black/10 dark:border-white/10" />
                </div>
            </div>

            {/* Curved Divider Transition to Contact Section */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[80px] md:h-[120px] block fill-bg-light dark:fill-bg-dark transition-colors duration-500">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                </svg>
            </div>
        </section>
    );
}
