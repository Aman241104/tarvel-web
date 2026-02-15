"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface FloatingInputProps {
    label: string;
    type?: string;
    placeholder?: string;
    className?: string;
}

export default function FloatingInput({ label, type = "text", placeholder, className }: FloatingInputProps) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");

    return (
        <div className={clsx("relative pt-6", className)}>
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={focused ? placeholder : ""}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl outline-none text-text-light dark:text-text-dark transition-colors z-10 relative"
                />

                {/* Floating Label */}
                <motion.label
                    initial={false}
                    animate={{
                        y: focused || value ? -24 : 0,
                        scale: focused || value ? 0.8 : 1,
                        opacity: focused || value ? 0.7 : 0.5,
                        originX: 0
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 top-4 text-sm md:text-base uppercase tracking-widest text-text-light dark:text-text-dark pointer-events-none z-0"
                >
                    {label}
                </motion.label>

                {/* Animated Bottom Border */}
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: focused ? "100%" : "0%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 h-[2px] bg-accent-gold z-20"
                />
            </div>
        </div>
    );
}
