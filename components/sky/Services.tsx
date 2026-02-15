"use client";

import { motion } from "framer-motion";
import { Globe, Map, Plane, Building } from "lucide-react";

const services = [
    {
        title: "International Tours",
        description: "Explore the world with our tailored international packages.",
        icon: Globe,
    },
    {
        title: "Domestic Tours",
        description: "Discover the beauty of your own country with our best domestic deals.",
        icon: Map,
    },
    {
        title: "Flight Bookings",
        description: "Book flights to any destination with ease and best prices.",
        icon: Plane,
    },
    {
        title: "Hotel Reservations",
        description: "Comfortable and luxurious stays at the best hotels worldwide.",
        icon: Building,
    },
];

export default function Services() {
    return (
        <section className="py-24 bg-sky-light/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold font-heading text-slate-900 mb-4"
                    >
                        Our Premium Services
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        className="h-1 w-24 bg-sky-primary mx-auto rounded-full"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 25px 50px -12px rgba(14, 165, 233, 0.25)" // Cloud shadow effect
                            }}
                            className="bg-white/70 backdrop-blur-xl border border-white/60 p-8 rounded-[30px] flex flex-col items-center text-center shadow-md cursor-pointer group transition-colors hover:bg-white/90"
                        >
                            <div className="mb-6 p-4 bg-sky-50 rounded-full group-hover:bg-sky-100 transition-colors duration-300">
                                <service.icon
                                    size={40}
                                    className="text-slate-400 group-hover:text-sky-primary transition-colors duration-300"
                                />
                            </div>
                            <h3 className="text-xl font-bold font-heading text-text-dark mb-3">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 font-body text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
