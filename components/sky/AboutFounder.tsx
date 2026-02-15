"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function AboutFounder() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Elements - Floating Clouds/Orbs */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-sky-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 md:p-12 shadow-xl overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row items-center gap-12">

                        {/* Left Side: Image */}
                        <div className="w-full md:w-1/3 flex justify-center">
                            <motion.div
                                className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl"
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(14, 165, 233, 0.4)" }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Glowing Border Effect using pseudo-element or box-shadow on parent, here inline style for simplicity */}
                                <div className="absolute inset-0 rounded-full border-4 border-sky-primary/30 z-10 pointer-events-none"></div>

                                <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526772662000-3f88f107f500?q=80&w=1335&auto=format&fit=crop')" }}
                                />
                            </motion.div>
                        </div>

                        {/* Right Side: Story */}
                        <div className="w-full md:w-2/3">
                            <div className="flex items-start gap-4 mb-6">
                                <Quote className="text-sky-primary w-8 h-8 opacity-50 rotate-180" />
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-2">
                                        Meet The Traveler Behind The Brand
                                    </h2>
                                    <div className="h-1 w-20 bg-accent-gold rounded-full"></div>
                                </div>
                            </div>

                            <div className="space-y-6 text-lg text-slate-600 font-body leading-relaxed">
                                <p>
                                    <strong className="text-sky-primary">Sujal Soni</strong> is deeply passionate about travelling and exploring new destinations.
                                    His love for travel inspired him to start Destination Anywhere & Co., with the vision of helping people
                                    explore the world seamlessly and stress-free.
                                </p>
                                <p>
                                    Believing that every journey tells a story, Sujal curated a team of experts dedicated to crafting
                                    unforgettable experiences. From the mountains of the north to the beaches of the south,
                                    his mission is to make the world accessible to everyone.
                                </p>
                            </div>

                            {/* Signature or subtle interactive element */}
                            <motion.div
                                className="mt-8 flex items-center gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-sky-primary to-sky-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                    S
                                </div>
                                <div>
                                    <p className="font-bold text-text-dark">Sujal Soni</p>
                                    <p className="text-sm text-sky-500 font-medium">Founder & Explorer</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
