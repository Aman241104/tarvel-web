'use client';

import { useRef, useState } from 'react';
import { Search, MapPin, Calendar, Users, Plane } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useWhatsApp } from '@/hooks/useWhatsApp';

export default function SearchWidget() {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [activeInput, setActiveInput] = useState<string | null>(null);

    // Form State
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [guests, setGuests] = useState('');

    useGSAP(() => {
        // Entrance animation
        gsap.from(containerRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out',
        });
    }, { scope: containerRef });

    const { openWhatsApp } = useWhatsApp();

    const handlePlanTrip = () => {
        const message = `Hi Sujal, I want to plan a trip! 
        
Location: ${location || 'Not specified'}
Date: ${date || 'Not specified'}
Guests: ${guests || 'Not specified'}

Can you help me with the itinerary?`;

        openWhatsApp(undefined, message);
    };

    return (
        <div
            ref={containerRef}
            className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-30 w-[94%] md:w-[90%] max-w-4xl"
        >
            <div className="bg-white/90 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] md:rounded-full p-3 md:p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-center gap-3 md:gap-0 relative">
                
                {/* Concierge Badge */}
                <div className="absolute -top-10 left-6 md:left-12 bg-white/60 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/50 text-[10px] font-black uppercase tracking-widest text-text-navy/40 hidden md:flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                    Concierge Online
                </div>

                {/* Location Input */}
                <div className={`relative flex-1 w-full md:w-auto p-3 md:p-4 rounded-3xl md:rounded-full transition-all duration-500 ${activeInput === 'location' ? 'bg-white shadow-lg scale-[1.02] z-10' : 'hover:bg-white/40'}`}>
                    <div className="flex items-center gap-4">
                        <div className="bg-brand-teal/5 p-2 rounded-full shrink-0">
                            <MapPin className="text-brand-teal w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div className="flex flex-col w-full text-left">
                            <label className="text-[10px] md:text-[11px] font-black text-brand-teal/50 uppercase tracking-[0.15em] mb-0.5">Where to?</label>
                            <input
                                type="text"
                                placeholder="Japan, Bali, Paris..."
                                className="bg-transparent outline-none text-text-navy font-black text-sm md:text-base placeholder:text-text-navy/30 w-full"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onFocus={() => setActiveInput('location')}
                                onBlur={() => setActiveInput(null)}
                            />
                        </div>
                    </div>
                </div>

                <div className="hidden md:block w-px h-8 bg-black/5 mx-2" />

                {/* Date Input */}
                <div className={`relative flex-1 w-full md:w-auto p-3 md:p-4 rounded-3xl md:rounded-full transition-all duration-500 ${activeInput === 'date' ? 'bg-white shadow-lg scale-[1.02] z-10' : 'hover:bg-white/40'}`}>
                    <div className="flex items-center gap-4">
                        <div className="bg-brand-coral/5 p-2 rounded-full shrink-0">
                            <Calendar className="text-brand-coral w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div className="flex flex-col w-full text-left">
                            <label className="text-[10px] md:text-[11px] font-black text-brand-coral/50 uppercase tracking-[0.15em] mb-0.5">When?</label>
                            <input
                                type="text"
                                placeholder="Spring 2026"
                                className="bg-transparent outline-none text-text-navy font-black text-sm md:text-base placeholder:text-text-navy/30 w-full"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                onFocus={() => setActiveInput('date')}
                                onBlur={() => setActiveInput(null)}
                            />
                        </div>
                    </div>
                </div>

                <div className="hidden md:block w-px h-8 bg-black/5 mx-2" />

                {/* Guests Input */}
                <div className={`relative flex-1 w-full md:w-auto p-3 md:p-4 rounded-3xl md:rounded-full transition-all duration-500 ${activeInput === 'guests' ? 'bg-white shadow-lg scale-[1.02] z-10' : 'hover:bg-white/40'}`}>
                    <div className="flex items-center gap-4">
                        <div className="bg-brand-yellow/5 p-2 rounded-full shrink-0">
                            <Users className="text-brand-yellow w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div className="flex flex-col w-full text-left">
                            <label className="text-[10px] md:text-[11px] font-black text-brand-yellow/50 uppercase tracking-[0.15em] mb-0.5">Guests?</label>
                            <input
                                type="text"
                                placeholder="Group of 4"
                                className="bg-transparent outline-none text-text-navy font-black text-sm md:text-base placeholder:text-text-navy/30 w-full"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                onFocus={() => setActiveInput('guests')}
                                onBlur={() => setActiveInput(null)}
                            />
                        </div>
                    </div>
                </div>

                {/* Plan Button */}
                <button
                    ref={buttonRef}
                    onClick={handlePlanTrip}
                    className="bg-text-navy hover:bg-brand-coral text-white p-4 md:p-5 rounded-3xl md:rounded-full shadow-2xl transition-all duration-700 hover:scale-105 active:scale-95 mt-2 md:mt-0 w-full md:w-auto flex justify-center items-center gap-3 md:min-w-[200px] group relative overflow-hidden"
                >
                    <span className="relative z-10 font-black text-[11px] uppercase tracking-[0.2em] whitespace-nowrap">Plan Journey</span>
                    <Plane className="w-5 h-5 md:w-5 md:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-brand-coral translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>

            </div>
        </div>
    );
}
