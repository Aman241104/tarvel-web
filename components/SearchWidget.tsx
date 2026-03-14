'use client';

import { useRef, useState } from 'react';
import { MapPin, Calendar, Users, Plane } from 'lucide-react';
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
            className="absolute bottom-4 md:bottom-12 left-1/2 -translate-x-1/2 z-30 w-[94%] md:w-[90%] max-w-4xl"
        >
            <div className="bg-white/95 backdrop-blur-2xl border border-black/5 rounded-[2.5rem] md:rounded-full p-4 md:p-3 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-0 relative">
                
                {/* Concierge Badge */}
                <div className="absolute -top-10 left-8 md:left-12 bg-white/90 backdrop-blur-xl px-4 py-1.5 rounded-full border border-black/5 text-[10px] font-black uppercase tracking-[0.2em] text-text-navy/50 flex items-center gap-2.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                    Concierge Online
                </div>

                {/* Location Input - Full width on mobile */}
                <div className={`relative flex-[1.5] p-3 md:p-4 rounded-3xl md:rounded-full transition-all duration-500 ${activeInput === 'location' ? 'bg-brand-teal/5 shadow-[inset_0_0_0_2px_rgba(46,196,182,0.2)] scale-[1.01] z-10' : 'hover:bg-black/5'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`transition-all duration-500 p-2.5 rounded-full shrink-0 ${activeInput === 'location' ? 'bg-brand-teal text-white' : 'bg-brand-teal/10 text-brand-teal'}`}>
                            <MapPin className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col w-full text-left">
                            <label htmlFor="location-input" className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-1 cursor-pointer transition-colors duration-300 ${activeInput === 'location' ? 'text-brand-teal' : 'text-brand-teal/60'}`}>Where to?</label>
                            <input
                                id="location-input"
                                type="text"
                                placeholder="Japan, Bali, Paris..."
                                className="bg-transparent outline-none text-text-navy font-black text-sm md:text-base placeholder:text-text-navy/20 w-full"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onFocus={() => setActiveInput('location')}
                                onBlur={() => setActiveInput(null)}
                            />
                        </div>
                    </div>
                </div>

                <div className="hidden md:block w-px h-10 bg-black/10 mx-2" />

                {/* Mobile: Vertical Stack for Date and Guests */}
                <div className="flex flex-col md:flex-row w-full md:w-auto md:flex-2 gap-3 md:gap-0">
                    {/* Date Input */}
                    <div className={`relative flex-1 p-3 md:p-4 rounded-3xl md:rounded-full transition-all duration-500 ${activeInput === 'date' ? 'bg-brand-coral/5 shadow-[inset_0_0_0_2px_rgba(255,107,107,0.2)] scale-[1.01] z-10' : 'hover:bg-black/5'}`}>
                        <div className="flex items-center gap-4">
                            <div className={`transition-all duration-500 p-2.5 rounded-full shrink-0 ${activeInput === 'date' ? 'bg-brand-coral text-white' : 'bg-brand-coral/10 text-brand-coral'}`}>
                                <Calendar className="w-5 h-5" aria-hidden="true" />
                            </div>
                            <div className="flex flex-col w-full text-left">
                                <label htmlFor="date-input" className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-1 cursor-pointer transition-colors duration-300 ${activeInput === 'date' ? 'text-brand-coral' : 'text-brand-coral/60'}`}>When?</label>
                                <input
                                    id="date-input"
                                    type="text"
                                    placeholder="Spring '26"
                                    className="bg-transparent outline-none text-text-navy font-black text-sm md:text-base placeholder:text-text-navy/20 w-full"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    onFocus={() => setActiveInput('date')}
                                    onBlur={() => setActiveInput(null)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-10 bg-black/10 mx-2" />

                    {/* Guests Input */}
                    <div className={`relative flex-1 p-3 md:p-4 rounded-3xl md:rounded-full transition-all duration-500 ${activeInput === 'guests' ? 'bg-brand-yellow/5 shadow-[inset_0_0_0_2px_rgba(255,191,0,0.2)] scale-[1.01] z-10' : 'hover:bg-black/5'}`}>
                        <div className="flex items-center gap-4">
                            <div className={`transition-all duration-500 p-2.5 rounded-full shrink-0 ${activeInput === 'guests' ? 'bg-brand-yellow text-white' : 'bg-brand-yellow/10 text-brand-yellow'}`}>
                                <Users className="w-5 h-5" aria-hidden="true" />
                            </div>
                            <div className="flex flex-col w-full text-left">
                                <label htmlFor="guests-input" className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-1 cursor-pointer transition-colors duration-300 ${activeInput === 'guests' ? 'text-brand-yellow' : 'text-brand-yellow/60'}`}>Who?</label>
                                <input
                                    id="guests-input"
                                    type="text"
                                    placeholder="4 People"
                                    className="bg-transparent outline-none text-text-navy font-black text-sm md:text-base placeholder:text-text-navy/20 w-full"
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    onFocus={() => setActiveInput('guests')}
                                    onBlur={() => setActiveInput(null)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plan Button */}
                <button
                    ref={buttonRef}
                    onClick={handlePlanTrip}
                    aria-label="Submit trip details"
                    className="bg-text-navy text-white p-5 md:p-6 rounded-2xl md:rounded-full shadow-2xl transition-all duration-700 hover:scale-[1.02] active:scale-95 mt-4 md:mt-0 w-full md:w-auto flex justify-center items-center gap-4 md:min-w-[220px] group relative overflow-hidden"
                >
                    <span className="relative z-10 font-black text-[11px] md:text-[12px] uppercase tracking-[0.25em] whitespace-nowrap">Plan Journey</span>
                    <Plane className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>

            </div>
        </div>
    );
}
