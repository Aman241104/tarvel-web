"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Plane, ArrowRight } from "lucide-react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax effect for background
    const yBg = useTransform(scrollY, [0, 500], ["0%", "20%"]);
    const yText = useTransform(scrollY, [0, 300], ["0%", "50%"]);

    // Airplane Path Animation Configuration
    const pathVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 3,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1
            }
        }
    };

    const planeVariants: Variants = {
        hidden: { offsetDistance: "0%", opacity: 0 },
        visible: {
            offsetDistance: "100%",
            opacity: 1,
            transition: {
                duration: 3,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-sky-primary/10"
        >
            {/* Parallax Background */}
            <motion.div
                style={{ y: yBg }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="w-full h-[120%] bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1595287436214-41d19859f77f?q=80&w=2672&auto=format&fit=crop')"
                        // "Blue Sky" High quality image
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-sky-primary/20 via-transparent to-white/90" />
            </motion.div>

            {/* Content Layer */}
            <motion.div
                style={{ y: yText }}
                className="relative z-10 text-center px-6 max-w-5xl mx-auto"
            >
                {/* Animated Airplane Element */}
                <div className="relative w-64 h-32 mx-auto mb-8 hidden md:block">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 150">
                        {/* Dashed Path */}
                        <motion.path
                            d="M 0 100 C 50 100, 100 0, 150 50 C 200 100, 250 150, 300 50"
                            fill="transparent"
                            stroke="white"
                            strokeWidth="4"
                            strokeDasharray="10 10"
                            variants={pathVariants}
                            initial="hidden"
                            animate="visible"
                        />
                        {/* Moving Plane Icon (using MotionPathPlugin equivalent logic via CSS offset-path if favored, or simple Framer path following)
                Simpler approach: Just animate a plane with similar bezier or use offset-path css module 
                For robustness without extra plugins, we'll use a separate motion div tracking the layout or simpler float
            */}
                    </svg>
                    <motion.div
                        className="absolute top-0 left-0 text-white"
                        style={{ offsetPath: 'path("M 0 100 C 50 100, 100 0, 150 50 C 200 100, 250 150, 300 50")' }}
                        animate={{ offsetDistance: ["0%", "100%"] }}
                        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                    >
                        <Plane className="w-8 h-8 rotate-45 fill-accent-gold text-accent-gold drop-shadow-lg" />
                    </motion.div>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-8xl font-bold font-heading text-white drop-shadow-xl mb-6 tracking-tight"
                >
                    Explore The World. <br />
                    <span className="text-sky-light">Travel Anywhere.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl md:text-2xl text-sky-50 font-medium mb-10 drop-shadow-md max-w-3xl mx-auto"
                >
                    International & Domestic Tour Packages | Flights | Hotels – All In One Place.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col md:flex-row gap-6 justify-center items-center"
                >
                    {/* Main Button - Lift Off */}
                    <motion.button
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-sky-primary text-white font-bold rounded-full shadow-lg flex items-center gap-3 transition-colors hover:bg-sky-600"
                    >
                        Plan Your Trip <Plane className="w-5 h-5" />
                    </motion.button>

                    {/* Secondary Button - Glassmorphism */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-glass-white backdrop-blur-md border border-white/50 text-text-dark font-bold rounded-full shadow-sm hover:bg-white transition-colors"
                    >
                        View Services
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Decorative floating clouds/elements could go here */}
        </div>
    );
}
