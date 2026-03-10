'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&w=800&q=80',
        alt: 'Desert Expedition',
        rotation: '-rotate-3',
        x: '10%',
        y: '5%'
    },
    {
        src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80',
        alt: 'Venice Waterways',
        rotation: 'rotate-6',
        x: '55%',
        y: '10%'
    },
    {
        src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
        alt: 'Beach Sunset',
        rotation: '-rotate-2',
        x: '30%',
        y: '45%'
    },
    {
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
        alt: 'Mountain Lake',
        rotation: 'rotate-3',
        x: '70%',
        y: '50%'
    }
];

const partners = [
    'Aman Resorts', 'Four Seasons', 'Rosewood', 'Belmond', 'One&Only', 'Six Senses', 'Ritz-Carlton'
];

export default function TravelGallery() {
    const constraintsRef = useRef(null);

    return (
        <section id="gallery" className="py-24 md:py-32 bg-bg-light relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-brand-coral font-black text-xs uppercase tracking-[0.3em] mb-4 block">The Memory Vault</span>
                    <p className="mt-6 text-gray-500 font-body text-lg max-w-xl mx-auto italic opacity-80">
                        Drag to rearrange our favorite memories from the field.
                    </p>
                </div>

                {/* Draggable Gallery Area */}
                <div 
                    ref={constraintsRef}
                    className="relative w-full min-h-[500px] md:h-[800px] bg-black/[0.02] rounded-[3rem] border-2 border-dashed border-black/5 flex flex-col md:block gap-8 p-8 md:p-0 overflow-hidden md:overflow-visible"
                >
                    {galleryImages.map((img, i) => (
                        <motion.div
                            key={i}
                            drag={typeof window !== 'undefined' && window.innerWidth > 768}
                            dragConstraints={constraintsRef}
                            dragDirectionLock
                            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                            whileDrag={{ zIndex: 50, scale: 1.05, rotate: 0 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            style={{ 
                                left: typeof window !== 'undefined' && window.innerWidth > 768 ? img.x : 'auto', 
                                top: typeof window !== 'undefined' && window.innerWidth > 768 ? img.y : 'auto',
                                position: typeof window !== 'undefined' && window.innerWidth > 768 ? 'absolute' : 'relative'
                            }}
                            className={`p-3 pb-12 bg-white shadow-ambient-lg md:cursor-grab active:cursor-grabbing group ${img.rotation} w-full max-w-[280px] md:w-72 mx-auto md:mx-0 transition-shadow hover:shadow-2xl z-10`}
                        >
                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    draggable={false}
                                />
                                <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
                            </div>
                            <div className="mt-4 font-handwriting text-xl md:text-2xl text-center text-gray-400 group-hover:text-brand-teal transition-colors">
                                {img.alt}
                            </div>
                            
                            {/* Tape Decoration */}
                            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 washi-tape ${i % 2 === 0 ? 'washi-tape-yellow' : 'washi-tape-teal'} opacity-40 group-hover:opacity-100 rotate-[-2deg]`} />
                        </motion.div>
                    ))}
                    
                    {/* Background Decorative "Stamp" */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none hidden md:block">
                         <h3 className="text-[20vw] font-black font-heading uppercase text-text-navy rotate-[-15deg]">Memories</h3>
                    </div>
                </div>

                {/* Partner Row: Passport Stamps Style */}
                <div className="mt-32 border-t border-black/5 pt-16">
                    <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-12">Authorized Partner & Curator For</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-30 grayscale hover:opacity-60 hover:grayscale-0 transition-all duration-700">
                        {partners.map((partner) => (
                            <div key={partner} className="font-heading text-xl md:text-2xl font-black text-text-navy tracking-tighter border-2 border-text-navy/20 px-4 py-2 rounded-lg rotate-[-5deg] hover:rotate-0 transition-transform cursor-default select-none">
                                {partner}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
