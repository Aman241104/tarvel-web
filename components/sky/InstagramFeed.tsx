"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const instaImages = [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&auto=format&fit=crop",
];

export default function InstagramFeed() {
    return (
        <section className="py-24 bg-sky-light/20">
            <div className="container mx-auto px-6 text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold font-heading text-text-dark mb-4">
                    Travel Stories & Destinations
                </h2>
                <a
                    href="https://www.instagram.com/destinationanywhere_co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-primary font-bold text-lg hover:underline flex items-center justify-center gap-2"
                >
                    <Instagram size={20} /> @destinationanywhere_co
                </a>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {instaImages.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group overflow-hidden rounded-2xl cursor-pointer aspect-square"
                        >
                            <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url('${src}')` }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                                <Instagram size={32} className="mb-2" />
                                <span className="font-bold tracking-wide text-sm uppercase">View Post</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
