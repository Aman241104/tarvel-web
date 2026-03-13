'use client';

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import React, { useRef } from 'react';

export default function ReservedCard() {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Heavier, "expensive" spring physics (less bouncy)
    const springConfig = { stiffness: 100, damping: 20, mass: 1.5 };
    const mouseXSpring = useSpring(x, springConfig);
    const mouseYSpring = useSpring(y, springConfig);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    // Dynamic glare effect based on mouse position
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);
    const backgroundGlare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.45) 0%, transparent 65%)`;

    // Reactive border highlight (simulates light catching the edge)
    const borderGlare = useMotionTemplate`linear-gradient(${useTransform(mouseXSpring, [-0.5, 0.5], ["120deg", "240deg"])}, rgba(255,255,255,0.8), transparent, rgba(255,255,255,0.4))`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
            whileInView={{ rotate: -4, scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2, type: "spring", stiffness: 60, damping: 15 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="bg-white/80 backdrop-blur-2xl px-12 py-8 shadow-[0_30px_60px_rgba(0,0,0,0.3)] rounded-sm flex flex-col items-center gap-2 relative group overflow-hidden"
            >
                {/* Reactive Metallic Border Layer */}
                <motion.div 
                    className="absolute inset-0 rounded-sm pointer-events-none z-40 p-[1px]"
                    style={{ background: borderGlare }}
                >
                    <div className="w-full h-full bg-transparent rounded-[inherit]" />
                </motion.div>

                {/* Dynamic Glare Effect */}
                <motion.div 
                    className="absolute inset-0 pointer-events-none mix-blend-overlay z-30"
                    style={{ background: backgroundGlare }}
                />

                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')] z-0" />
                
                {/* Elegant Corner Folds */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-brand-yellow/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-brand-teal/5 to-transparent pointer-events-none" />

                <motion.span 
                    style={{ 
                        transform: "translateZ(30px)",
                        textShadow: "0.5px 0.5px 0px rgba(0,0,0,0.05)"
                    }}
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-yellow mb-1 z-10"
                >
                    Table for Two
                </motion.span>
                
                <motion.h4 
                    style={{ 
                        transform: "translateZ(80px)",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.1), -1px -1px 2px rgba(255,255,255,0.6)"
                    }}
                    className="text-4xl font-heading font-black text-text-navy uppercase tracking-[-0.02em] leading-none mb-2 z-10"
                >
                    RESERVED
                </motion.h4>
                
                <motion.div 
                    style={{ transform: "translateZ(40px)" }}
                    className="w-16 h-[2.5px] bg-brand-teal/80 rounded-full z-10 shadow-inner" 
                />

                {/* Subtitle/Location */}
                <motion.div 
                    style={{ transform: "translateZ(20px)" }}
                    className="mt-4 flex flex-col items-center z-10"
                >
                    <span className="text-[8px] font-bold text-text-navy/50 uppercase tracking-[0.2em]">Boutique No. 851</span>
                    <span className="text-[7px] font-medium text-text-navy/40 uppercase tracking-[0.1em] mt-0.5">Verified Concierge</span>
                </motion.div>
            </div>

            {/* Deep, Soft "Drop Shadow" */}
            <motion.div
                style={{
                    rotateY,
                    rotateX,
                    transform: "translateZ(-30px) translateY(30px) scale(0.9)",
                    filter: "blur(25px)",
                }}
                className="absolute inset-0 bg-black/40 -z-10 rounded-sm"
            />
        </motion.div>
    );
}
