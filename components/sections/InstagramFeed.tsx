'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram, ArrowUpRight, Camera } from 'lucide-react';
import Magnetic from '../ui/Magnetic';

const INSTA_POSTS = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop",
        caption: "Azure horizons in Maldives",
        rotation: -3,
        delay: 0.1,
        tapeColor: 'bg-brand-teal/40'
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop",
        caption: "Venetian canals at dawn",
        rotation: 2,
        delay: 0.2,
        tapeColor: 'bg-brand-coral/40'
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop",
        caption: "Cliffside serenity",
        rotation: -1,
        delay: 0.3,
        tapeColor: 'bg-brand-yellow/40'
    },
    {
        id: 4,
        url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
        caption: "Santorini sunsets",
        rotation: 4,
        delay: 0.4,
        tapeColor: 'bg-brand-teal/40'
    },
    {
        id: 5,
        url: "https://images.unsplash.com/photo-1512100356956-c1b47ef49410?q=80&w=800&auto=format&fit=crop",
        caption: "Swiss Alp adventures",
        rotation: -2,
        delay: 0.5,
        tapeColor: 'bg-brand-coral/40'
    }
];

export default function InstagramFeed() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    return (
        <section 
            id="instagram" 
            ref={containerRef}
            className="py-24 md:py-32 bg-bg-light relative overflow-hidden"
        >
            {/* Background Text Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-black/[0.02] uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
                Travel Log
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-teal/10 text-brand-teal rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-6"
                    >
                        <Camera className="w-3.5 h-3.5" />
                        Stay Connected
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-heading font-black text-text-navy mb-8 tracking-tighter"
                    >
                        Capturing the World, <br />
                        <span className="text-brand-coral italic">One Story</span> at a Time.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Magnetic>
                            <a 
                                href="https://www.instagram.com/destnation_anywhere/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-3 bg-white border border-black/5 rounded-full shadow-lg shadow-black/5 group hover:scale-105 transition-all duration-300"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white">
                                    <Instagram className="w-4 h-4" />
                                </div>
                                <span className="font-bold text-text-navy text-sm tracking-tight">@destnation_anywhere</span>
                                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-brand-coral transition-colors" />
                            </a>
                        </Magnetic>
                    </motion.div>
                </div>

                {/* The Polaroid Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 items-center lg:px-12">
                    {INSTA_POSTS.map((post, index) => (
                        <motion.a
                            key={post.id}
                            href="https://www.instagram.com/destnation_anywhere/"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 40, rotate: post.rotation * 2 }}
                            animate={isInView ? { opacity: 1, y: 0, rotate: post.rotation } : {}}
                            transition={{ duration: 0.8, delay: post.delay, ease: "easeOut" }}
                            whileHover={{ 
                                y: -15, 
                                rotate: 0, 
                                scale: 1.05,
                                zIndex: 50,
                                transition: { duration: 0.3 }
                            }}
                            className={`group relative bg-white p-3 pb-10 md:pb-12 shadow-xl shadow-black/5 border border-black/[0.03] transition-all duration-500 flex flex-col ${
                                index % 2 !== 0 ? 'mt-8 md:mt-16' : ''
                            } ${index === 2 ? 'md:-mt-8' : ''}`}
                        >
                            {/* Tape Decor */}
                            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 ${post.tapeColor} backdrop-blur-sm -rotate-2 z-20 group-hover:scale-110 transition-transform duration-500`} 
                                 style={{ clipPath: 'polygon(0% 10%, 100% 0%, 95% 90%, 5% 100%)' }} />

                            {/* Image Container */}
                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 mb-4">
                                <img 
                                    src={post.url} 
                                    alt={post.caption}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-text-navy flex items-center gap-2">
                                            View on IG <ArrowUpRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Caption */}
                            <p className="font-handwriting text-lg md:text-xl text-gray-500 text-center line-clamp-1 px-1">
                                {post.caption}
                            </p>

                            {/* Film Grain Texture Overlay */}
                            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                        </motion.a>
                    ))}
                </div>

                {/* Bottom Decor */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 }}
                    className="mt-24 text-center"
                >
                    <p className="text-[10px] font-black text-black/20 uppercase tracking-[0.5em]">
                        Your Journey • Your Memories • Destination Anywhere
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
