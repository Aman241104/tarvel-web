'use client';

import { useRef, useState } from 'react';
import { Search, MapPin, Calendar, Users, Plane } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

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

    const handlePlanTrip = () => {
        const baseUrl = "https://wa.me/918511071506";
        const message = `Hi Sujal, I want to plan a trip! 
        
Location: ${location || 'Not specified'}
Date: ${date || 'Not specified'}
Guests: ${guests || 'Not specified'}

Can you help me with the itinerary?`;

        const encodedMessage = encodeURIComponent(message);
        const finalUrl = `${baseUrl}?text=${encodedMessage}`;

        window.open(finalUrl, '_blank');
    };

    return (
        <div
            ref={containerRef}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-4xl"
        >
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] md:rounded-full p-4 md:p-2 shadow-2xl shadow-black/5 flex flex-col md:flex-row items-center gap-4 md:gap-0">

                {/* Location Input */}
                <div className={`relative flex-1 w-full md:w-auto p-4 rounded-3xl transition-colors ${activeInput === 'location' ? 'bg-white shadow-lg' : 'hover:bg-white/50'}`}>
                    <div className="flex items-center gap-3">
                        <div className="bg-[#FFFBF5] p-2 rounded-full">
                            <MapPin className="text-[#2D2D2D] w-5 h-5" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</label>
                            <input
                                type="text"
                                placeholder="Where to?"
                                className="bg-transparent outline-none text-[#2D2D2D] font-medium placeholder:text-gray-400 w-full"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onFocus={() => setActiveInput('location')}
                                onBlur={() => setActiveInput(null)}
                            />
                        </div>
                    </div>
                </div>

                <div className="hidden md:block w-px h-10 bg-gray-200 mx-2" />

                {/* Date Input */}
                <div className={`relative flex-1 w-full md:w-auto p-4 rounded-3xl transition-colors ${activeInput === 'date' ? 'bg-white shadow-lg' : 'hover:bg-white/50'}`}>
                    <div className="flex items-center gap-3">
                        <div className="bg-[#FFFBF5] p-2 rounded-full">
                            <Calendar className="text-[#2D2D2D] w-5 h-5" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Date</label>
                            <input
                                type="text"
                                placeholder="Add dates"
                                className="bg-transparent outline-none text-[#2D2D2D] font-medium placeholder:text-gray-400 w-full"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                onFocus={() => setActiveInput('date')}
                                onBlur={() => setActiveInput(null)}
                            />
                        </div>
                    </div>
                </div>

                <div className="hidden md:block w-px h-10 bg-gray-200 mx-2" />

                {/* Guests Input */}
                <div className={`relative flex-1 w-full md:w-auto p-4 rounded-3xl transition-colors ${activeInput === 'guests' ? 'bg-white shadow-lg' : 'hover:bg-white/50'}`}>
                    <div className="flex items-center gap-3">
                        <div className="bg-[#FFFBF5] p-2 rounded-full">
                            <Users className="text-[#2D2D2D] w-5 h-5" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Guests</label>
                            <input
                                type="text"
                                placeholder="Add guests"
                                className="bg-transparent outline-none text-[#2D2D2D] font-medium placeholder:text-gray-400 w-full"
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
                    className="bg-[#FF6B6B] hover:bg-[#ff5252] text-white p-5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 m-1 md:m-0 w-full md:w-auto flex justify-center items-center gap-3 md:min-w-[180px]"
                >
                    <Plane className="w-6 h-6" />
                    <span className="font-bold text-lg whitespace-nowrap">Plan My Trip</span>
                </button>

            </div>
        </div>
    );
}
