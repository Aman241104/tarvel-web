'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';

const destinations = [
    {
        name: 'Dubai',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
        tag: 'Luxury Shopping',
        price: '₹45,000'
    },
    {
        name: 'Bali',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
        tag: 'Tropical Escape',
        price: '₹35,000'
    },
    {
        name: 'Switzerland',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
        tag: 'Alpine Luxury',
        price: '₹1,20,000'
    },
    {
        name: 'Thailand',
        image: 'https://images.unsplash.com/photo-1528181304800-2f140819898f?auto=format&fit=crop&w=800&q=80',
        tag: 'Exotic Beaches',
        price: '₹28,000'
    }
];

export default function PopularDestinations() {
    return (
        <section id="destinations" className="py-24 bg-bg-light relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="text-left">
                        <span className="text-brand-coral font-black text-xs uppercase tracking-[0.3em] mb-4 block">Trending Now</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-text-navy">
                            Popular Destinations
                        </h2>
                    </div>
                    <a href="#contact" className="group flex items-center gap-2 text-gray-400 hover:text-brand-coral transition-colors font-black uppercase tracking-widest text-xs">
                        View All Packages <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {destinations.map((dest, i) => (
                        <motion.div
                            key={dest.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ 
                                duration: 0.6,
                                delay: i * 0.08,
                                ease: [0.25, 1, 0.5, 1] 
                            }}
                            className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={dest.image}
                                alt={dest.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                            
                            <div className="absolute top-6 left-6">
                                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                                    {dest.tag}
                                </span>
                            </div>

                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="flex items-center gap-2 text-brand-teal mb-2">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-xs font-black uppercase tracking-widest">{dest.name}</span>
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                                    {dest.name} Expedition
                                </h3>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">Starting from</span>
                                        <span className="text-xl font-black text-white">{dest.price}</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-brand-coral flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
