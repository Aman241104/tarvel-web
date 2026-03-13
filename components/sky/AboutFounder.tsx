"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function AboutFounder() {
    return (
        <section className="py-24 relative overflow-hidden bg-[#FFFBF5]">
            {/* Background Scribble */}
            <div className="absolute top-10 right-0 w-96 h-96 opacity-10 pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#F59E0B" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.7C91.4,-34.3,98.1,-19.6,95.8,-6.2C93.5,7.2,82.2,19.3,71,30.4C59.8,41.5,48.7,51.6,36.3,60.6C23.9,69.6,10.2,77.5,-2.3,81.5C-14.8,85.5,-26.1,85.6,-36.8,80.1C-47.5,74.6,-57.6,63.5,-66.3,51.1C-75,38.7,-82.3,25,-83.4,10.6C-84.5,-3.8,-79.4,-18.9,-70.6,-31.4C-61.8,-43.9,-49.3,-53.8,-36.3,-61.6C-23.3,-69.4,-9.8,-75.1,4.9,-83.6L44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative bg-white border-2 border-gray-100 rounded-[40px] p-8 md:p-12 shadow-[12px_12px_0px_#F59E0B]"
                >
                    {/* Tape Effect */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-12 bg-gray-100/50 rotate-2 backdrop-blur-sm border-l border-r border-white/50 shadow-sm z-20"></div>

                    <div className="flex flex-col md:flex-row items-center gap-12">

                        {/* Left Side: Image */}
                        <div className="w-full md:w-1/3 flex justify-center relative">
                            <motion.div
                                className="relative w-72 h-80 bg-gray-200 rotate-2 border-8 border-white shadow-xl overflow-hidden"
                                whileHover={{ scale: 1.02, rotate: 0 }}
                                transition={{ duration: 0.4, ease: "backOut" }}
                            >
                                <img 
                                    src="/assets/owner-image.png" 
                                    alt="Sujal Soni - Your Captain"
                                    className="w-full h-full object-cover"
                                />
                                {/* Caption */}
                                <div className="absolute -bottom-10 left-0 w-full text-center">
                                    <span className="font-handwriting text-2xl text-gray-400 -rotate-2 inline-block">Sujal Soni</span>
                                </div>
                            </motion.div>

                            {/* Doodle Arrow pointing to image */}
                            <svg className="absolute -right-8 top-10 w-24 h-24 text-brand-coral rotate-12 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10,50 Q40,10 90,50" strokeDasharray="5,5" />
                                <path d="M80,45 L90,50 L85,60" />
                            </svg>
                        </div>

                        {/* Right Side: Story */}
                        <div className="w-full md:w-2/3">
                            <div className="flex items-start gap-4 mb-6">
                                <Quote className="text-brand-coral w-10 h-10 opacity-80" />
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-black font-heading text-text-navy mb-4 leading-tight">
                                        Meet Your Captain <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-accent-gold">
                                            Curating Your Story
                                        </span>
                                    </h2>
                                </div>
                            </div>

                            <div className="space-y-6 text-lg text-slate-600 font-body leading-relaxed pl-14">
                                <p>
                                    <strong className="text-brand-coral">Sujal Soni</strong> isn't just a travel agent; he's a curator of experiences. His deep-rooted passion for global exploration led to the birth of Destination Anywhere & Co.
                                </p>
                                <p>
                                    He believes that travel is the ultimate investment in oneself. With a focus on seamless, stress-free journeys, Sujal personally ensures that every itinerary he crafts tells a unique story—your story.
                                </p>

                                {/* Captain's Top Picks Addition */}
                                <div className="pt-6 mt-6 border-t border-black/5 flex flex-wrap items-center gap-6">
                                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Captain's Favorites:</span>
                                     <div className="flex gap-4">
                                          {['Kyoto', 'Maldives', 'Swiss Alps'].map((place) => (
                                               <div key={place} className="flex items-center gap-1.5 px-3 py-1 bg-brand-teal/5 rounded-full border border-brand-teal/10">
                                                    <div className="w-1 h-1 rounded-full bg-brand-teal" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-teal">{place}</span>
                                               </div>
                                          ))}
                                     </div>
                                </div>
                            </div>

                            {/* Signature */}
                            <motion.div
                                className="mt-10 pl-14 flex items-center gap-6"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <div>
                                    <p className="font-handwriting text-4xl text-brand-coral rotate-[-2deg]">Sujal Soni</p>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                                        Chief Curator & Your Captain
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
