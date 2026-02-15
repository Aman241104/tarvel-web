"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Services", link: "#services" },
    { name: "Stories", link: "#stories" },
    { name: "Contact", link: "#contact" },
];

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const scrollTo = (id: string) => {
        setIsOpen(false);
        setTimeout(() => {
            const element = document.querySelector(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }, 300); // Wait for close animation
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 right-4 z-50 md:hidden p-2.5 bg-black/50 backdrop-blur-lg border border-white/30 rounded-full text-white shadow-lg"
            >
                <Menu size={24} />
            </button>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Custom ease
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center text-white"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 p-3 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X size={32} />
                        </button>

                        {/* Links */}
                        <ul className="space-y-8 text-center">
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    <button
                                        onClick={() => scrollTo(item.link)}
                                        className="font-heading text-4xl md:text-5xl hover:text-accent-gold transition-colors"
                                    >
                                        {item.name}
                                    </button>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Decoration */}
                        <div className="absolute bottom-12 text-white/20 text-sm tracking-widest uppercase">
                            Destination Anywhere
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
