"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
// Using a simple svg for whatsapp or importing from react-icons if available, 
// keeping it dependency-free by using an SVG or text for now, but user likely has react-icons installed from previous steps. 
// Actually, I can use lucide MessageCircle as a proxy or just an SVG.
// Using inline SVG for WhatsApp to ensure specific brand look.

export default function ContactSection() {
    return (
        <section className="py-24 bg-white relative" id="contact">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 bg-sky-50 rounded-[40px] overflow-hidden shadow-xl">

                    {/* Left: Info */}
                    <div className="lg:w-1/2 p-12 bg-sky-primary text-white flex flex-col justify-center">
                        <h2 className="text-4xl font-bold font-heading mb-8">Get In Touch</h2>
                        <div className="space-y-8 font-body text-lg">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <a href="tel:+918511071506" className="hover:text-sky-100 transition">+91 85110 71506</a>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <a href="mailto:destinationanywhereo@gmail.com" className="hover:text-sky-100 transition">destinationanywhereo@gmail.com</a>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <p className="max-w-xs">
                                    Shop-106, Shayona Tilak-1 Complex, New SG Road, Vandematram, Gota, Ahmedabad – 382481.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:w-1/2 p-12 bg-white">
                        <h3 className="text-2xl font-bold font-heading text-text-dark mb-6">Start Your Journey</h3>
                        <form className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-6 py-4 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-primary transition"
                                />
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full px-6 py-4 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-primary transition"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Destination"
                                    className="w-full px-6 py-4 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-primary transition"
                                />
                                <input
                                    type="text"
                                    placeholder="Travel Dates"
                                    className="w-full px-6 py-4 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-primary transition"
                                />
                            </div>
                            <button className="w-full py-4 bg-sky-primary text-white font-bold rounded-full shadow-lg hover:bg-sky-600 transition flex items-center justify-center gap-2">
                                Send Inquiry <Send size={20} />
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            {/* Sticky WhatsApp Button */}
            <motion.a
                href="https://wa.me/918511071506"
                target="_blank"
                className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                title="Chat on WhatsApp"
            >
                <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
            </motion.a>
        </section>
    );
}
