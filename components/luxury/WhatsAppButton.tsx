"use client";


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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="white">
                        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.74 5.494 2.034 7.806L0 32l8.418-2.007A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.77-1.848l-.486-.29-5.001 1.193 1.222-4.867-.317-.501A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667c7.364 0 13.333 5.969 13.333 13.333 0 7.364-5.969 13.333-13.333 13.333zm7.303-9.988c-.4-.2-2.366-1.167-2.732-1.3-.367-.133-.633-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.688-.622-3.215-1.983-1.188-1.06-1.99-2.37-2.223-2.77-.233-.4-.025-.617.175-.817.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.655-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5s-1.4 1.367-1.4 3.333 1.433 3.867 1.633 4.133c.2.267 2.82 4.307 6.833 6.033.955.413 1.7.66 2.28.845.958.305 1.83.262 2.52.159.768-.115 2.366-.967 2.7-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467z" />
                    </svg>
                </div>
            </a>
        </div>
    );
}
