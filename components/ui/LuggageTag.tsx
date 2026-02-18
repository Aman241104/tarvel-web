'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

interface LuggageTagProps {
    label: string;
    sublabel: string;
    color: string;
    rotation: number;
    onClick: () => void;
}

export default function LuggageTag({ label, sublabel, color, rotation, onClick }: LuggageTagProps) {
    const tagRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    useGSAP(() => {
        if (!tagRef.current) return;

        Draggable.create(tagRef.current, {
            type: 'x,y',
            edgeResistance: 0.65,
            bounds: document.body,
            inertia: true,
            onDragStart: () => setIsDragging(true),
            onDragEnd: function () {
                setIsDragging(false);
                // Snap back to origin with elasticity
                gsap.to(this.target, {
                    x: 0,
                    y: 0,
                    rotation: rotation,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.3)'
                });
            }
        });
    }, { scope: tagRef });

    const handleClick = () => {
        if (!isDragging) {
            // "Snap" animation before action
            gsap.to(tagRef.current, {
                scale: 1.1,
                rotation: 0,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: onClick
            });
        }
    };

    return (
        <div
            ref={tagRef}
            className="relative cursor-grab active:cursor-grabbing inline-block m-4 transform-gpu"
            style={{ transform: `rotate(${rotation}deg)` }}
            onMouseUp={handleClick}
        >
            {/* String/Hole */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-1 h-12 bg-gray-400/50 z-0"></div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full z-10 shadow-sm"></div>

            {/* Tag Body */}
            <div
                className={`relative w-48 h-28 ${color} rounded-lg shadow-xl border-4 border-white flex flex-col items-center justify-center p-4 transition-shadow hover:shadow-2xl`}
            >
                <span className="font-heading font-bold text-2xl text-white uppercase tracking-tighter leading-none text-center">
                    {label}
                </span>
                <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest mt-2 border-t border-white/30 pt-1">
                    {sublabel}
                </span>

                {/* Barcode Decor */}
                <div className="absolute bottom-2 left-0 w-full flex justify-center opacity-30">
                    <div className="h-3 w-32 bg-repeat-x" style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, white 50%)', backgroundSize: '4px 100%' }}></div>
                </div>
            </div>
        </div>
    );
}
