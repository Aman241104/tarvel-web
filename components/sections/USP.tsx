'use client';

import { useState } from 'react';
import { ShieldCheck, Sparkles, Map, ClipboardCheck, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceModal from '../ui/ServiceModal';
import { useWhatsApp } from '@/hooks/useWhatsApp';

const usps = [
    {
        title: 'Global Travel Network',
        desc: 'Verified worldwide partners providing exclusive access and unmatched reliability.',
        icon: ShieldCheck,
        accentHex: '#2EC4B6',
        accentClass: 'brand-teal',
        image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=800&q=80',
        details: [
            'Verified Worldwide Partners',
            'Exclusive Access to Hidden Gems',
            '24/7 Global Support Network',
            'Local Insights & Secret Spots',
        ],
    },
    {
        title: 'Curated Luxury Trips',
        desc: 'Handpicked stays and exclusive experiences designed for the discerning traveler.',
        icon: Sparkles,
        accentHex: '#FFBF00',
        accentClass: 'brand-yellow',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        details: [
            'Bespoke Hotel Partnerships',
            'Private Villa Collections',
            'Michelin-Star Dining Access',
            'Elite Transportation Services',
        ],
    },
    {
        title: 'Personalized Itineraries',
        desc: 'Every trip is unique. We craft journeys that match your soul, not a template.',
        icon: Map,
        accentHex: '#FF6B6B',
        accentClass: 'brand-coral',
        image: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=800&q=80',
        details: [
            'Tailored Daily Adventures',
            'Cultural Immersion Tours',
            'Adventure & Relaxation Balance',
            'Flexibility for Spontaneous Moments',
        ],
    },
    {
        title: 'End-to-End Planning',
        desc: 'From visas to local secrets, we handle everything. You just pack.',
        icon: ClipboardCheck,
        accentHex: '#2EC4B6',
        accentClass: 'brand-teal',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
        details: [
            'Visa & Documentation Support',
            'Seamless Flight & Transfer Booking',
            'Activity & Tour Coordination',
            'Post-Trip Concierge Follow-up',
        ],
    },
];

export default function USP() {
    const [selectedUSP, setSelectedUSP] = useState<typeof usps[0] | null>(null);
    const { openWhatsApp } = useWhatsApp();

    const handleWhatsAppClick = (usp: typeof usps[0]) => {
        const message = `Hi Sujal, I'm interested in learning more about your ${usp.title} service. Can you help me?`;
        openWhatsApp('Service Inquiry', message);
    };

    return (
        <section id="usp" className="py-6 md:py-10 bg-bg-light relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-teal/5 rounded-full border border-brand-teal/10 mb-5 hover:bg-brand-teal/10 transition-colors">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal" />
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal">Trusted by 500+ Luxury Travelers</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-black text-text-navy mb-3">
                        Why Travel With Us
                    </h2>
                    <p className="text-gray-500 font-body text-base md:text-lg max-w-2xl mx-auto">
                        We don't just book trips; we protect your most precious asset—your time.
                    </p>
                </div>

                {/* USP Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
                    {usps.map((usp, i) => {
                        const Icon = usp.icon;
                        return (
                            <motion.div
                                key={usp.title}
                                initial={{ y: 40, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                onClick={() => setSelectedUSP(usp)}
                                data-cursor="view"
                                className="group relative bg-white rounded-[1.5rem] overflow-hidden cursor-pointer flex flex-col shadow-md hover:shadow-2xl transition-all duration-500 active:scale-[0.98] border border-black/5 hover:border-black/0"
                                style={{
                                    boxShadow: `0 4px 24px -8px ${usp.accentHex}22`,
                                }}
                            >
                                {/* Image area */}
                                <div className="relative h-40 w-full overflow-hidden">
                                    <img
                                        src={usp.image}
                                        alt={usp.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                    <div
                                        className="absolute bottom-3 left-3 w-10 h-10 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-sm border border-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                                        style={{ backgroundColor: `${usp.accentHex}dd` }}
                                    >
                                        <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="flex flex-col flex-1 p-5">
                                    <h3 className="text-lg md:text-xl font-heading font-black text-text-navy tracking-tight mb-2 group-hover:text-brand-teal transition-colors duration-300">
                                        {usp.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 font-medium">
                                        {usp.desc}
                                    </p>

                                    <ul className="flex flex-col gap-2.5 mb-6 mt-auto">
                                        {usp.details.map((detail) => (
                                            <li key={detail} className="flex items-center gap-2.5 text-xs md:text-sm text-gray-700 font-bold">
                                                <CheckCircle2
                                                    className="w-4 h-4 shrink-0"
                                                    style={{ color: usp.accentHex }}
                                                />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center justify-end mt-auto pt-6 border-t border-black/5">
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleWhatsAppClick(usp);
                                            }}
                                            className="px-6 py-3 rounded-2xl text-white text-[10px] md:text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg flex items-center gap-2.5 group/btn cursor-pointer z-30"
                                            style={{ backgroundColor: usp.accentHex, boxShadow: `0 12px 24px -6px ${usp.accentHex}66` }}
                                        >
                                            <MessageCircle className="w-4 h-4 fill-current" />
                                            Chat on WhatsApp
                                        </div>
                                    </div>                                </div>

                                <div
                                    className="h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                                    style={{ backgroundColor: usp.accentHex }}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                <ServiceModal 
                    isOpen={!!selectedUSP} 
                    onClose={() => setSelectedUSP(null)} 
                    service={selectedUSP} 
                />

                {/* Micro CTA */}                <div className="mt-12 text-center">
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-coral text-white font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl shadow-brand-coral/20 group"
                    >
                        <span>Plan Your Trip</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
