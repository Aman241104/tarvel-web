'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&w=800&q=80',
        alt: 'Desert Expedition',
        span: 'col-span-1 row-span-2'
    },
    {
        src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80',
        alt: 'Venice Waterways',
        span: 'col-span-1 row-span-1'
    },
    {
        src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
        alt: 'Beach Sunset',
        span: 'col-span-2 row-span-1'
    },
    {
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
        alt: 'Mountain Lake',
        span: 'col-span-1 row-span-1'
    }
];

export default function TravelGallery() {
    return (
        <section id="gallery" className="py-24 bg-bg-light relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <span className="text-brand-yellow font-black text-xs uppercase tracking-[0.3em] mb-4 block">Recent Expeditions</span>
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-text-navy">
                        Memories in Frames
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 h-[600px] md:h-[800px]">
                    {galleryImages.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                                duration: 0.5,
                                delay: i * 0.05,
                                ease: [0.16, 1, 0.3, 1] 
                            }}
                            className={`relative rounded-[2rem] overflow-hidden group shadow-2xl ${img.span}`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                                <span className="text-white font-handwriting text-2xl rotate-[-2deg]">{img.alt}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
