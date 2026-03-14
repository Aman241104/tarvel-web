'use client';

import { useState } from 'react';
import { ShieldCheck, Sparkles, Map, ClipboardCheck, ArrowRight, CheckCircle2, MessageCircle, Crown, Palmtree, UtensilsCrossed, ShieldAlert, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceModal from '../ui/ServiceModal';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import ReservedCard from '../ui/ReservedCard';

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
        <section id="usp" className="py-16 md:py-20 bg-bg-light relative overflow-hidden">
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
                                    <h3 className="text-base font-heading font-black text-text-navy tracking-tight mb-1.5 group-hover:text-brand-teal transition-colors duration-300">
                                        {usp.title}
                                    </h3>
                                    <p className="text-gray-400 text-[11px] leading-relaxed mb-4">
                                        {usp.desc}
                                    </p>

                                    <ul className="flex flex-col gap-1.5 mb-5 mt-auto">
                                        {usp.details.map((detail) => (
                                            <li key={detail} className="flex items-center gap-2 text-[10px] text-gray-600 font-bold">
                                                <CheckCircle2
                                                    className="w-3 h-3 shrink-0"
                                                    style={{ color: usp.accentHex }}
                                                />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
                                        <div className="flex flex-col">
                                            <span className="text-[7px] font-black uppercase tracking-widest text-black/20 mb-0.5">Service Tier</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: usp.accentHex }}>Boutique</span>
                                        </div>
                                        <div 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleWhatsAppClick(usp);
                                            }}
                                            className="px-4 py-2 rounded-xl text-white text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg flex items-center gap-2 group/btn cursor-pointer z-30"
                                            style={{ backgroundColor: usp.accentHex, boxShadow: `0 8px 16px -4px ${usp.accentHex}66` }}
                                        >
                                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                                            Chat on WhatsApp
                                        </div>
                                    </div>
                                </div>

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

                {/* Implementation 1.C: The "Reserved" Table Card Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 md:mt-20 bg-white rounded-[2rem] overflow-hidden border border-black/5 shadow-2xl flex flex-col items-center"
                >
                    <div className="flex flex-col lg:flex-row items-center w-full">
                        <div className="w-full lg:w-1/2 h-[400px] md:h-[450px] relative overflow-hidden group">
                            <img 
                                src="https://images.unsplash.com/photo-1515362778563-6a8d0e44bc0b?auto=format&fit=crop&w=1200&q=80" 
                                alt="Luxury Beach Club Table" 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500" />
                            <ReservedCard />
                            <div className="absolute bottom-10 right-10 w-28 h-28 border-4 border-dashed border-brand-teal/40 rounded-full flex flex-col items-center justify-center -rotate-12 opacity-60 z-10 pointer-events-none backdrop-blur-[2px]">
                                <Star className="w-4 h-4 text-brand-teal fill-brand-teal mb-1" />
                                <span className="text-brand-teal font-black text-[9px] uppercase tracking-[0.2em] text-center leading-tight">OFFICIALLY<br/>CONFIRMED</span>
                            </div>
                        </div>
                        
                        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col items-start bg-gradient-to-br from-white to-bg-light h-full min-h-[400px] md:min-h-[450px] justify-center">
                            <div className="inline-flex items-center gap-2 bg-brand-teal/10 text-brand-teal text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-6">
                                <Crown className="w-3 h-3" />
                                Exclusive Concierge
                            </div>
                            <h3 className="text-3xl md:text-4xl font-heading font-black text-text-navy mb-6 leading-[1.1] tracking-tighter">
                                The Table is Yours,<br />
                                <span className="text-brand-teal">Anywhere</span> in the World.
                            </h3>
                            <p className="text-gray-500 font-body text-base mb-8 leading-relaxed max-w-lg">
                                Aman, Marriott Bonvoy, or that hidden beach club in Mykonos—we don't just find you a spot; we ensure it's the best one in the house with <span className="text-brand-teal font-black underline decoration-brand-teal/30 underline-offset-4">priority VIP access</span>.
                            </p>
                            
                            <div className="flex flex-wrap gap-2.5 mb-10">
                                {[
                                    { label: 'Beach Clubs', icon: Palmtree },
                                    { label: 'Michelin Stays', icon: UtensilsCrossed },
                                    { label: 'Priority Access', icon: ShieldAlert },
                                    { label: 'VIP Lounges', icon: Crown }
                                ].map((tag) => (
                                    <div key={tag.label} className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-xl border border-black/5 text-[10px] font-black text-text-navy uppercase tracking-[0.15em] shadow-sm hover:shadow-md hover:border-brand-teal/20 transition-all cursor-default group/tag">
                                        <tag.icon className="w-3.5 h-3.5 text-brand-teal group-hover/tag:scale-110 transition-transform" />
                                        {tag.label}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="flex items-center gap-5 pt-6 border-t border-black/5 w-full">
                                <div className="flex -space-x-2.5">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100 shadow-md ring-1 ring-black/5">
                                            <img src={`https://i.pravatar.cc/100?img=${i+15}`} alt="User" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-navy leading-none mb-1">
                                        Joined by <span className="text-brand-teal">500+ Luxury Travelers</span>
                                    </p>
                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Global Community</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Micro CTA */}
                <div className="mt-12 text-center">
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
