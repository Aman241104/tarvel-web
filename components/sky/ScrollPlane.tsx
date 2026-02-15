"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Plane } from "lucide-react";

export default function ScrollPlane() {
    const { scrollYProgress } = useScroll();

    // Map scroll progress (0 to 1) to horizontal position (-10% to 110% of viewport width)
    const x = useTransform(scrollYProgress, [0, 1], ["-10vw", "110vw"]);

    // Add some banking/rotation based on scroll velocity (optional polish, simplified here)
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

    return (
        <motion.div
            style={{ x, rotate, top: "20%" }}
            className="fixed z-50 pointer-events-none drop-shadow-2xl"
        >
            {/* Reverting to Icon as requested */}
            <Plane
                size={64}
                className="text-slate-900 fill-white"
                strokeWidth={1.5}
            />
        </motion.div>
    );
}
