'use client';

import { ShieldCheck, Sparkles, Map, ClipboardCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const usps = [
    {
        title: 'Trusted BNI Network',
        desc: 'Leverage our global network of verified partners for ultimate reliability.',
        icon: ShieldCheck,
        color: 'text-brand-teal',
        bg: 'bg-brand-teal/10'
    },
    {
        title: 'Curated Luxury Trips',
        desc: 'Handpicked stays and exclusive experiences designed for the elite.',
        icon: Sparkles,
        color: 'text-brand-yellow',
        bg: 'bg-brand-yellow/10'
    },
    {
        title: 'Personalized Itineraries',
        desc: 'Every trip is unique. We craft journeys that match your soul.',
        icon: Map,
        color: 'text-brand-coral',
        bg: 'bg-brand-coral/10'
    },
    {
        title: 'End-to-End Planning',
        desc: 'From visas to local secrets, we handle everything. You just pack.',
        icon: ClipboardCheck,
        color: 'text-white',
        bg: 'bg-white/10'
    }
];

export default function USP() {
    return (
        <section id="usp" className="py-24 bg-bg-light relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-text-navy mb-4">
                        Why Travel With Us
                    </h2>
                    <p className="text-gray-500 font-body text-lg max-w-2xl mx-auto">
                        We don't just book trips; we protect your most precious asset—your time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {usps.map((usp, i) => (
                        <motion.div
                            key={usp.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ 
                                duration: 0.6,
                                delay: i * 0.08,
                                ease: [0.16, 1, 0.3, 1] // Custom snappy easing
                            }}
                            className="bg-white p-8 rounded-3xl border border-black/5 hover:border-black/10 transition-all group shadow-sm hover:shadow-xl relative overflow-hidden"
                        >
                            {/* Decorative "Reserved" Table Card for the 2nd item (Curated Luxury) */}
                            {i === 1 && (
                                <div className="absolute top-2 right-[-20px] bg-white border border-black/5 shadow-ambient-sm px-6 py-1 rotate-45 z-20 pointer-events-none">
                                     <span className="text-[8px] font-black uppercase tracking-widest text-brand-coral">Reserved</span>
                                </div>
                            )}

                            <div className={`${usp.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <usp.icon className={`${usp.color} w-7 h-7`} />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-text-navy mb-3">
                                {usp.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {usp.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Micro CTA */}
                <div className="mt-16 text-center">
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-coral text-white font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl shadow-brand-coral/20 group"
                    >
                        <span>Plan Your Trip</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
