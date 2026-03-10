"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const waLink = "https://wa.me/918511071506?text=Hi%20Sujal,%20I%20want%20to%20plan%20a%20trip!";

    return (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60] flex items-center gap-4">
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }} // Zappier spring
                        className="bg-white/80 backdrop-blur-md text-text-navy px-5 py-3 rounded-2xl shadow-ambient-lg font-black text-[10px] uppercase tracking-widest hidden md:block border border-white/50"
                    >
                        Chat with us
                    </motion.div>
                )}
            </AnimatePresence>

            <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="relative group bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
            >
                {/* Pulse Effect */}
                <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75 group-hover:opacity-100 duration-1000" />

                <div className="relative z-10 text-white">
                    <MessageCircle size={32} fill="white" />
                </div>
            </a>
        </div>
    );
}
