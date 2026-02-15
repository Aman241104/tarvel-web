"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
    "Personalized Planning",
    "24/7 Support",
    "Trusted Assistance",
    "Premium Comfort"
];

export default function VerticalFeatures() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-12 md:py-32 bg-bg-light dark:bg-bg-dark border-y border-black/10 dark:border-white/10 relative overflow-hidden transition-colors duration-500">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h3 className="text-lg md:text-4xl font-light text-text-light/50 dark:text-text-dark/50 font-body leading-relaxed">
                    We provide{" "}
                    <span className="inline-block relative h-[1.3em] w-[14ch] md:w-[22ch] align-bottom overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={index}
                                initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                                exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                                className="absolute inset-0 text-text-light dark:text-text-dark font-heading font-bold italic text-left"
                            >
                                {features[index]}
                            </motion.span>
                        </AnimatePresence>
                    </span>{" "}
                    for your journey.
                </h3>
            </div>
        </section>
    );
}
