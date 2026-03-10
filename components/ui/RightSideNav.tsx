'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const sections = [
    { id: 'home', label: 'Home' },
    { id: 'usp', label: 'Why Us' },
    { id: 'about', label: 'Captain' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
];

export default function RightSideNav() {
    const [activeSection, setActiveSection] = useState('home');
    const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

    useEffect(() => {
        const observers = sections.map(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
            );
            observer.observe(el);
            return observer;
        });

        return () => observers.forEach(o => o?.disconnect());
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-6 items-end">
            {sections.map((section) => (
                <div
                    key={section.id}
                    className="group relative flex items-center gap-4 cursor-pointer"
                    onMouseEnter={() => setHoveredLabel(section.id)}
                    onMouseLeave={() => setHoveredLabel(null)}
                    onClick={() => scrollToSection(section.id)}
                >
                    {/* Label */}
                    <AnimatePresence>
                        {(hoveredLabel === section.id || activeSection === section.id) && (
                            <motion.span
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full backdrop-blur-md border ${
                                    activeSection === section.id 
                                    ? 'bg-brand-coral text-white border-brand-coral' 
                                    : 'bg-white/10 text-white/60 border-white/10'
                                } shadow-sm`}
                            >
                                {section.label}
                            </motion.span>
                        )}
                    </AnimatePresence>

                    {/* Dot */}
                    <div className="relative flex items-center justify-center w-4 h-4">
                        <motion.div
                            animate={{
                                scale: activeSection === section.id ? 1.2 : 1,
                                backgroundColor: activeSection === section.id ? '#FF6B6B' : 'rgba(255, 255, 255, 0.2)'
                            }}
                            className="w-2 h-2 rounded-full transition-colors duration-300"
                        />
                        {activeSection === section.id && (
                            <motion.div
                                layoutId="nav-ring"
                                className="absolute inset-0 border border-brand-coral rounded-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
