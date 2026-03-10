'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function CursorStamper() {
    const [stamps, setStamps] = useState<{ id: number, x: number, y: number, rotation: number, color: string }[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // Only stamp if clicking on something that isn't a button/link
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a')) return;

            const newStamp = {
                id: Date.now(),
                x: e.pageX,
                y: e.pageY,
                rotation: Math.random() * 40 - 20,
                color: Math.random() > 0.5 ? 'rgba(46, 196, 182, 0.2)' : 'rgba(255, 107, 107, 0.2)'
            };
            setStamps(prev => [...prev, newStamp]);

            // Remove after 2 seconds
            setTimeout(() => {
                setStamps(prev => prev.filter(s => s.id !== newStamp.id));
            }, 2000);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[9999] overflow-hidden hidden md:block">
            <AnimatePresence>
                {stamps.map(stamp => (
                    <motion.div
                        key={stamp.id}
                        initial={{ opacity: 1, scale: 3 }}
                        animate={{ opacity: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            left: stamp.x,
                            top: stamp.y,
                            pointerEvents: 'none',
                            marginLeft: '-50px', // Center offset
                            marginTop: '-50px'
                        }}
                    >
                        <div 
                            style={{ 
                                transform: `rotate(${stamp.rotation}deg)`,
                                borderColor: stamp.color,
                                color: stamp.color
                            }} 
                            className="w-24 h-24 border-4 rounded-full flex items-center justify-center mix-blend-multiply"
                        >
                            <div className="w-20 h-20 border-2 border-dashed border-inherit rounded-full flex items-center justify-center">
                                <span className="text-xs font-black uppercase tracking-widest -rotate-12 select-none opacity-80">
                                    {Math.random() > 0.5 ? 'APPROVED' : 'VISITED'}
                                </span>
                            </div>
                            {/* Ink splatter effects (tiny circles) */}
                            <div className="absolute -top-2 -left-2 w-1 h-1 bg-current rounded-full opacity-30" />
                            <div className="absolute bottom-4 -right-1 w-2 h-2 bg-current rounded-full opacity-20" />
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
