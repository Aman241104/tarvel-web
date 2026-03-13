'use client';

import { useState } from 'react';
import { ShieldCheck, Sparkles, Map, ClipboardCheck, ArrowRight, CheckCircle2, Palmtree, UtensilsCrossed, ShieldAlert, Crown, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceModal from '../ui/ServiceModal';
import ReservedCard from '../ui/ReservedCard';

const usps = [
    {
        title: 'Global Travel Network',
        desc: 'Verified worldwide partners providing exclusive access and unmatched reliability.',
        icon: ShieldCheck,
        color: 'text-brand-teal',
        bg: 'bg-brand-teal/10',
        details: [
            'Verified Worldwide Partners',
            'Exclusive Access to Hidden Gems',
            '24/7 Global Support Network',
            'Local Insights & Secret Spots'
        ]
    },
    {
        title: 'Curated Luxury Trips',
        desc: 'Handpicked stays and exclusive experiences designed for the elite.',
        icon: Sparkles,
        color: 'text-brand-yellow',
        bg: 'bg-brand-yellow/10',
        details: [
            'Bespoke Hotel Partnerships',
            'Private Villa Collections',
            'Michelin-Star Dining Access',
            'Elite Transportation Services'
        ]
    },
    {
        title: 'Personalized Itineraries',
        desc: 'Every trip is unique. We craft journeys that match your soul.',
        icon: Map,
        color: 'text-brand-coral',
        bg: 'bg-brand-coral/10',
        details: [
            'Tailored Daily Adventures',
            'Cultural Immersion Tours',
            'Adventure & Relaxation Balance',
            'Flexibility for Spontaneous Moments'
        ]
    },
    {
        title: 'End-to-End Planning',
        desc: 'From visas to local secrets, we handle everything. You just pack.',
        icon: ClipboardCheck,
        color: 'text-brand-teal',
        bg: 'bg-brand-teal/5',
        details: [
            'Visa & Documentation Support',
            'Seamless Flight & Transfer Booking',
            'Activity & Tour Coordination',
            'Post-Trip Concierge Follow-up'
        ]
    }
];

export default function USP() {
    const [selectedUSP, setSelectedUSP] = useState<typeof usps[0] | null>(null);

    return (
        <section id="usp" className="py-24 bg-bg-light relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-teal/5 rounded-full border border-brand-teal/10 mb-6 group hover:bg-brand-teal/10 transition-colors">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal">Trusted by 500+ Luxury Travelers</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-text-navy mb-4">
                        Why Travel With Us
                    </h2>
                    <p className="text-gray-500 font-body text-lg max-w-2xl mx-auto">
                        We don't just book trips; we protect your most precious asset—your time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
                    {usps.map((usp, i) => (
                        <motion.div
                            key={usp.title}
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                                duration: 0.6,
                                delay: i * 0.08,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            onClick={() => setSelectedUSP(usp)}
                            data-cursor="view"
                            className="bg-white p-8 rounded-[2rem] border border-black/5 hover:border-brand-teal/20 transition-all group shadow-sm hover:shadow-2xl relative overflow-hidden cursor-pointer flex flex-col h-full active:scale-95 w-full"
                        >
                            {/* Decorative Background Element */}
                            <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${usp.bg} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`} />

                            {/* 24/7 Support Badge for the 1st item */}
                            {i === 0 && (
                                <div className="absolute top-6 right-6 z-20 hidden sm:block">
                                     <div className="flex items-center gap-1.5 bg-brand-teal text-white text-[7px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-lg">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                                        </span>
                                        24/7 Live Support
                                     </div>
                                </div>
                            )}

                            {/* Decorative "Reserved" Table Card for the 2nd item (Curated Luxury) */}
                            {i === 1 && (
                                <div className="absolute top-6 -right-10 w-36 text-center bg-white border border-black/5 shadow-ambient-sm py-1.5 rotate-45 z-20 pointer-events-none origin-center scale-90 md:scale-100">
                                     <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-coral font-bold">Reserved</span>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 relative z-10">
                                <div className={`${usp.bg} w-16 h-16 rounded-2xl flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-sm`}>
                                    <usp.icon className={`${usp.color} w-8 h-8`} />
                                </div>
                                {/* Mobile 24/7 Badge */}
                                {i === 0 && (
                                    <div className="sm:hidden mt-4 inline-flex items-center gap-2 bg-brand-teal text-white text-[8px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full shadow-lg self-start">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                        </span>
                                        24/7 Live Support
                                    </div>
                                )}
                            </div>

                            <div className="relative z-10 flex-1">
                                <h3 className="text-xl font-heading font-black text-text-navy mb-3 group-hover:text-brand-teal transition-colors">
                                    {usp.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    {usp.desc}
                                </p>
                            </div>
                            
                            <div className="relative z-10 flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2 text-[10px] font-black text-brand-teal uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                    Explore Details <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all duration-300">
                                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
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
                    className="mt-24 bg-white rounded-[2.5rem] overflow-hidden border border-black/5 shadow-2xl flex flex-col items-center"
                >
                    <div className="flex flex-col lg:flex-row items-center w-full">
                        <div className="w-full lg:w-1/2 h-[500px] relative overflow-hidden group">
                            <img 
                                src="https://images.unsplash.com/photo-1515362778563-6a8d0e44bc0b?auto=format&fit=crop&w=1200&q=80" 
                                alt="Luxury Beach Club Table" 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500" />
                            
                            {/* Physical "Reserved" Card overlay effect */}
                            <ReservedCard />

                            {/* Decorative "Confirmed" Stamp - Enhanced with authentic look */}
                            <div className="absolute bottom-10 right-10 w-28 h-28 border-4 border-dashed border-brand-teal/40 rounded-full flex flex-col items-center justify-center -rotate-12 opacity-60 z-10 pointer-events-none backdrop-blur-[2px]">
                                <Star className="w-4 h-4 text-brand-teal fill-brand-teal mb-1" />
                                <span className="text-brand-teal font-black text-[9px] uppercase tracking-[0.2em] text-center leading-tight">OFFICIALLY<br/>CONFIRMED</span>
                            </div>
                        </div>
                        
                        <div className="w-full lg:w-1/2 p-12 md:p-20 flex flex-col items-start bg-gradient-to-br from-white to-bg-light h-full min-h-[500px] justify-center">
                            <div className="inline-flex items-center gap-2 bg-brand-teal/10 text-brand-teal text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8">
                                <Crown className="w-3 h-3" />
                                Exclusive Concierge
                            </div>
                            <h3 className="text-4xl md:text-5xl font-heading font-black text-text-navy mb-8 leading-[1.1] tracking-tighter">
                                The Table is Yours,<br />
                                <span className="text-brand-teal">Anywhere</span> in the World.
                            </h3>
                            <p className="text-gray-500 font-body text-lg mb-10 leading-relaxed max-w-lg">
                                Aman, Marriott Bonvoy, or that hidden beach club in Mykonos—we don't just find you a spot; we ensure it's the best one in the house with <span className="text-brand-teal font-black underline decoration-brand-teal/30 underline-offset-4">priority VIP access</span>.
                            </p>
                            
                            <div className="flex flex-wrap gap-3 mb-12">
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
                            
                            <div className="flex items-center gap-6 pt-8 border-t border-black/5 w-full">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-100 shadow-md ring-1 ring-black/5">
                                            <img src={`https://i.pravatar.cc/100?img=${i+15}`} alt="User" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[11px] font-black uppercase tracking-widest text-text-navy leading-none mb-1">
                                        Joined by <span className="text-brand-teal">500+ Luxury Travelers</span>
                                    </p>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Global Community</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resorts & Partners Marquee */}
                    <div className="w-full py-10 bg-black/[0.02] border-t border-black/5 overflow-hidden">
                        <div className="flex gap-12 md:gap-24 animate-marquee-fast hover:pause items-center">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="flex shrink-0 gap-12 md:gap-24 items-center">
                                    {['Aman', 'Belmond', 'Four Seasons', 'Rosewood', 'Marriott Bonvoy', 'Six Senses', 'One&Only', 'Auberge'].map((partner) => (
                                        <div key={partner} className="flex items-center gap-4 group cursor-default">
                                            <span className="text-xl md:text-2xl font-heading font-black text-black/10 group-hover:text-brand-teal transition-colors duration-500 uppercase tracking-tighter">
                                                {partner}
                                            </span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-teal opacity-20" />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

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
