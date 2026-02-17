'use client';

import { useRef, ReactElement, cloneElement } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticProps {
    children: ReactElement;
    strength?: number; // How strong the pull is (default 0.5)
}

export default function Magnetic({ children, strength = 0.5 }: MagneticProps) {
    const magneticData = useRef({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    // Initialize QuickTo for performance
    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);

    useGSAP(() => {
        if (!ref.current) return;

        xTo.current = gsap.quickTo(ref.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        yTo.current = gsap.quickTo(ref.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    }, { scope: ref, dependencies: [] });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        // Calculate center of the element
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        // Move the element
        if (xTo.current) xTo.current(x * strength);
        if (yTo.current) yTo.current(y * strength);
    };

    const handleMouseLeave = () => {
        // Reset position
        if (xTo.current) xTo.current(0);
        if (yTo.current) yTo.current(0);
    };

    // Clone the child to attach the ref and event listeners
    // We wrap it in a div to ensure we capture the events correctly without messing up child props
    // Actually, distinct wrapper is safer for composition
    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-fit h-fit" // Ensure it wraps tightly
        >
            {children}
        </div>
    );
}
