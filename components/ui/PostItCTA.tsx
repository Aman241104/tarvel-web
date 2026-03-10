"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { useWhatsApp } from '@/hooks/useWhatsApp';

export default function PostItCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const { openWhatsApp } = useWhatsApp();

    useEffect(() => {
        // Check if user has already closed it in this session
        const closed = sessionStorage.getItem('post-it-closed');
        if (closed) {
            setIsClosed(true);
            return;
        }

        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 40 && !isClosed) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isClosed]);

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsVisible(false);
        setIsClosed(true);
        sessionStorage.setItem('post-it-closed', 'true');
    };

    return (
        <AnimatePresence>
            {isVisible && !isClosed && (
                <motion.div
                    initial={{ x: 100, y: 100, rotate: 15, scale: 0.5, opacity: 0 }}
                    animate={{ x: 0, y: 0, rotate: -5, scale: 1, opacity: 1 }}
                    exit={{ x: 100, y: 100, rotate: 15, scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-24 right-6 md:bottom-32 md:right-10 z-[100] cursor-pointer group"
                    onClick={() => openWhatsApp('Post-it Note')}
                >
                    {/* The Post-it Note */}
                    <div className="bg-[#FEF08A] p-6 shadow-2xl relative w-48 h-48 md:w-56 md:h-56 flex flex-col justify-between overflow-hidden group-hover:rotate-0 transition-transform duration-300">
                        {/* Shadow corner peel effect */}
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-black/5 rounded-tl-full shadow-inner" />
                        
                        {/* Close Button */}
                        <button 
                            onClick={handleClose}
                            className="absolute top-2 right-2 p-1 text-black/30 hover:text-black/60 transition-colors"
                        >
                            <X size={16} />
                        </button>

                        <div className="relative z-10 pt-2">
                            <MessageCircle className="text-sky-primary mb-3" size={24} />
                            <p className="font-handwriting text-2xl md:text-3xl text-gray-800 leading-tight">
                                Have a destination in mind?
                            </p>
                        </div>

                        <div className="relative z-10 border-t border-black/5 pt-3">
                             <p className="font-body font-bold text-xs uppercase tracking-widest text-gray-500">
                                Text Sujal now
                             </p>
                        </div>

                        {/* Tape effect on top */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 rotate-[-2deg] -translate-y-2 z-20" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
