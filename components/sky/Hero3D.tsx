"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Destination Images
const destinations = [
    {
        id: 1,
        title: "Santorini, Greece",
        img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Kyoto, Japan",
        img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Swiss Alps",
        img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Bali, Indonesia",
        img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Machu Picchu, Peru",
        img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000&auto=format&fit=crop",
    },
];

export default function Hero3D() {
    const [activeIndex, setActiveIndex] = useState(2); // Start at center

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % destinations.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
    };

    // Helper to determine card state based on index distance relative to active
    const getCardStyle = (index: number) => {
        const diff = (index - activeIndex); // Simple diff, doesn't handle wrap-around visuals perfectly in a simple map, 
        // but for a 5-item carousel, we often reorder array or just handle fixed slots. 
        // To keep it simple and robust for this prompt: we'll render all and transform based on visual position.
        // For a true infinite loop visually, we need a circular bufer, but let's stick to a centered view logic.

        // Better logic for 3D coverflow:
        // We render the array. calculated "visual index" relative to active.

        // Let's constrain the display to show 5 items always, centering the active one.
        // Actually, `destinations` length is 5.

        // Let's just handle standard carousel logic with wrap around indices? 
        // Simpler: Just map all 5, calculate shortest distance in circular array.

        const length = destinations.length;
        // Calculate shortest distance handling wrap-around
        let distance = index - activeIndex;
        if (distance > length / 2) distance -= length;
        if (distance < -length / 2) distance += length;

        // Config from JSON (approx)
        // Active
        if (distance === 0) {
            return {
                zIndex: 10,
                x: 0,
                scale: 1.1,
                rotateY: 0,
                opacity: 1,
                brightness: 1,
            };
        }
        // Sibling (+/- 1)
        if (Math.abs(distance) === 1) {
            return {
                zIndex: 5,
                x: distance * 220, // 200px offset
                scale: 0.85,
                rotateY: distance > 0 ? -45 : 45, // Rotate inwards
                opacity: 0.7,
                brightness: 0.7,
            };
        }
        // Distant (+/- 2 or more)
        return {
            zIndex: 0,
            x: distance * 150, // tighter squeeze
            scale: 0.6,
            rotateY: distance > 0 ? -65 : 65,
            opacity: 0, // Fade out distant ones as per request "distant: opacity: 0"
            brightness: 0.5,
        };
    };

    return (
        <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-sky-primary/5 perspective-1000">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-300/20 via-sky-100/10 to-white/80 -z-10" />

            {/* Headline - Navy Blue as requested */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12 z-20 relative px-4"
            >
                <h1 className="text-5xl md:text-7xl font-bold font-heading text-slate-900 drop-shadow-sm mb-4">
                    Uncover The Extraordinary
                </h1>
                <p className="text-xl text-slate-700 font-medium">
                    Select your next adventure.
                </p>
            </motion.div>

            {/* 3D Carousel Container */}
            <div className="relative w-full max-w-5xl h-[500px] flex items-center justify-center perspective-container">
                {destinations.map((item, index) => {
                    const style = getCardStyle(index);
                    return (
                        <motion.div
                            key={item.id}
                            className="absolute w-[300px] md:w-[400px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
                            animate={style}
                            transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
                            style={{
                                transformStyle: "preserve-3d",
                                filter: `brightness(${style.brightness})`,
                            }}
                        >
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url('${item.img}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Cloud/Mist Layer (Foreground) */}
            <div className="absolute bottom-0 left-0 w-full h-64 z-20 pointer-events-none bg-gradient-to-t from-white via-white/80 to-transparent" />

            {/* Controls */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 z-30 pointer-events-none">
                <button
                    onClick={prevSlide}
                    className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all pointer-events-auto text-slate-900"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all pointer-events-auto text-slate-900"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

        </section>
    );
}
