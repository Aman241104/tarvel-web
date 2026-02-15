"use client";

import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import FloatingInput from "./FloatingInput";

export default function ContactCard() {
    const [name, setName] = useState("");
    const [destination, setDestination] = useState("");
    const [dates, setDates] = useState("");

    const handleSend = () => {
        const text = `Hi Sujal, I'm ${name || "a traveler"}. I want to go to ${destination || "somewhere amazing"} around ${dates || "soon"}.`;
        const url = `https://wa.me/918511071506?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    return (
        <section className="bg-bg-light dark:bg-bg-dark pb-16 md:pb-32 px-4 transition-colors duration-500 relative z-20">
            <div className="container mx-auto max-w-7xl">
                <div className="relative w-full mx-auto bg-gradient-to-br from-white/10 to-black/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-[3rem] p-5 md:p-20 overflow-hidden shadow-2xl">

                    {/* Glass Shine */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-20">
                        {/* Left: Info */}
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl md:text-7xl font-heading font-bold mb-6 md:mb-10 text-text-light dark:text-text-dark">
                                Get In Touch
                            </h2>
                            <p className="text-base md:text-xl text-text-light/70 dark:text-text-dark/70 mb-8 md:mb-16 leading-relaxed">
                                Ready to design the journey of a lifetime? Our team is standing by to craft your itinerary.
                            </p>

                            <div className="space-y-5 md:space-y-8">
                                <div className="flex items-start gap-4 md:gap-6">
                                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center text-accent-gold border border-white/10 flex-shrink-0">
                                        <MapPin size={18} className="md:hidden" />
                                        <MapPin size={24} className="hidden md:block" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs md:text-sm uppercase tracking-widest text-text-light/40 dark:text-text-dark/40 mb-1">Visit Us</p>
                                        <p className="text-sm md:text-lg font-medium text-text-light dark:text-text-dark leading-relaxed">
                                            Shop-106, Shayona Tilak-1,<br />
                                            New SG Road, Gota,<br />
                                            Ahmedabad – 382481
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center text-accent-gold border border-white/10 flex-shrink-0">
                                        <Phone size={18} className="md:hidden" />
                                        <Phone size={24} className="hidden md:block" />
                                    </div>
                                    <div>
                                        <p className="text-xs md:text-sm uppercase tracking-widest text-text-light/40 dark:text-text-dark/40 mb-1">Call Us</p>
                                        <p className="text-base md:text-xl font-medium text-text-light dark:text-text-dark">+91 85110 71506</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center text-accent-gold border border-white/10 flex-shrink-0">
                                        <Mail size={18} className="md:hidden" />
                                        <Mail size={24} className="hidden md:block" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs md:text-sm uppercase tracking-widest text-text-light/40 dark:text-text-dark/40 mb-1">Email Us</p>
                                        <p className="text-sm md:text-xl font-medium text-text-light dark:text-text-dark break-all">destinationanywhereo@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Floating Form */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                            <form className="space-y-8">
                                <div className="relative pt-6">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your Name"
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none text-text-light dark:text-text-dark placeholder-text-light/30 dark:placeholder-text-dark/30"
                                    />
                                </div>
                                <div className="relative pt-6">
                                    <input
                                        type="text"
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        placeholder="Dream Destination"
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none text-text-light dark:text-text-dark placeholder-text-light/30 dark:placeholder-text-dark/30"
                                    />
                                </div>
                                <div className="relative pt-6">
                                    <input
                                        type="text"
                                        value={dates}
                                        onChange={(e) => setDates(e.target.value)}
                                        placeholder="Preferred Dates"
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none text-text-light dark:text-text-dark placeholder-text-light/30 dark:placeholder-text-dark/30"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleSend}
                                    className="group mt-12 inline-flex items-center gap-6 text-2xl font-bold text-accent-gold hover:text-text-light dark:hover:text-text-dark transition-colors"
                                >
                                    Send Request
                                    <ArrowRight className="group-hover:translate-x-4 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
