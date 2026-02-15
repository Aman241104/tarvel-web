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
        <div className="fixed bottom-8 right-8 z-[50] flex items-center gap-4">
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-white text-black px-4 py-2 rounded-lg shadow-xl font-medium text-sm hidden md:block"
                    >
                        Chat with us
                    </motion.div>
                )}
            </AnimatePresence>

            <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
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
