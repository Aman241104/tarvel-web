"use client";

import { motion } from "framer-motion";

export default function Ticker() {
    return (
        <div className="py-8 bg-white/5 border-y border-white/10 overflow-hidden whitespace-nowrap backdrop-blur-sm">
            <div className="flex animate-marquee group">
                {Array(6).fill("").map((_, i) => (
                    <span
                        key={i}
                        className="mx-8 font-heading font-black tracking-widest uppercase text-4xl md:text-6xl text-transparent transition-colors duration-300 group-hover:text-white"
                        style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)" }}
                    >
                        PERSONALIZED PLANNING • 24/7 SUPPORT • COMPETITIVE PRICING • EXPERT GUIDES •
                    </span>
                ))}
            </div>
        </div>
    );
}
