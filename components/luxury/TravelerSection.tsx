"use client";

import { motion } from "framer-motion";

export default function TravelerSection() {
    return (
        <section className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark pb-12 md:pb-24 relative overflow-hidden transition-colors duration-500">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center">

                    {/* Left: Typography */}
                    <div className="w-full md:w-1/2 px-4 py-10 md:p-24 z-10 mb-4 md:mb-0">
                        <span className="text-accent-gold tracking-widest uppercase text-xs md:text-sm font-bold block mb-4 md:mb-6">
                            About The Founder
                        </span>
                        <h2 className="text-4xl md:text-8xl font-heading font-bold mb-6 md:mb-8 leading-none">
                            Sujal <br /> Soni
                        </h2>
                        <div className="w-16 md:w-20 h-1 bg-accent-gold mb-6 md:mb-8" />
                        <p className="text-base md:text-xl opacity-70 font-body leading-relaxed max-w-lg">
                            From passion-driven traveler to professional planner.
                            <br /><br />
                            Sujal Soni turned a lifelong obsession with the world&apos;s most remote corners into a curated art form.
                            From the bustling souks of Marrakech to the silent peaks of Patagonia, he designs journeys for those who seek to lose themselves, only to find something greater.
                        </p>
                    </div>

                    {/* Right: Full Height Image */}
                    <div className="w-full md:w-1/2 h-[50vh] md:h-[90vh] relative overflow-hidden group">
                        {/* Left edge blend — hidden on mobile to avoid visible strip */}
                        <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-light dark:from-bg-dark to-transparent z-10 transition-colors duration-500" />

                        {/* Bottom edge blend */}
                        <div className="absolute inset-x-0 bottom-0 h-20 md:h-32 bg-gradient-to-t from-bg-light dark:from-bg-dark to-transparent z-10 transition-colors duration-500" />

                        {/* The Image */}
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
                            alt="Sujal Soni - Founder"
                            className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
                        />

                        {/* Signature Animation */}
                        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20 w-24 md:w-56 opacity-80 mix-blend-difference pointer-events-none">
                            <motion.svg
                                viewBox="0 0 200 100"
                                className="w-full h-full text-white"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                            >
                                <path
                                    d="M10,80 Q50,10 80,60 T150,50"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <text x="20" y="90" fontFamily="cursive" fontSize="24" fill="currentColor">Sujal</text>
                            </motion.svg>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
