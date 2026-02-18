'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function CursorStamper() {
    const [stamps, setStamps] = useState<{ id: number, x: number, y: number, rotation: number }[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // Only stamp if clicking on something that isn't a button/link (optional, but for now stamp everywhere is fun)
            const newStamp = {
                id: Date.now(),
                x: e.pageX,
                y: e.pageY,
                rotation: Math.random() * 60 - 30
            };
            setStamps(prev => [...prev, newStamp]);

            // Remove after 1.5 seconds
            setTimeout(() => {
                setStamps(prev => prev.filter(s => s.id !== newStamp.id));
            }, 1500);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        // Render Portal-like at the body level to ensure it overlays everything correctly with page coordinates
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[9999] overflow-hidden">
            <AnimatePresence>
                {stamps.map(stamp => (
                    <motion.div
                        key={stamp.id}
                        initial={{ opacity: 0.8, scale: 2 }}
                        animate={{ opacity: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            left: stamp.x,
                            top: stamp.y,
                            pointerEvents: 'none',
                            marginLeft: '-40px', // Center offset
                            marginTop: '-40px'
                        }}
                    >
                        <div style={{ transform: `rotate(${stamp.rotation}deg)` }} className="w-20 h-20 border-4 border-sky-primary/20 rounded-full flex items-center justify-center">
                            <div className="w-16 h-16 border-2 border-dashed border-sky-primary/20 rounded-full flex items-center justify-center">
                                <span className="text-[10px] font-black text-sky-primary/30 uppercase tracking-widest -rotate-12">
                                    VISITED
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
