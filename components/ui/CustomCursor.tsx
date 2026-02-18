'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState('');

    // Refs for quick evaluation without re-render
    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);
    const xToFollower = useRef<gsap.QuickToFunc | null>(null);
    const yToFollower = useRef<gsap.QuickToFunc | null>(null);

    useGSAP(() => {
        if (!cursorRef.current || !followerRef.current) return;

        // 1. Main Dot: Almost instant response (High performance)
        xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.01, ease: "power3.out" });
        yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.01, ease: "power3.out" });

        // 2. Follower: "Magnetic" feel (snappy but fluid)
        // Decreased duration from 0.6 to 0.25 for less "drag"
        xToFollower.current = gsap.quickTo(followerRef.current, "x", { duration: 0.25, ease: "power3.out" });
        yToFollower.current = gsap.quickTo(followerRef.current, "y", { duration: 0.25, ease: "power3.out" });

        // Initial Hide
        gsap.set([cursorRef.current, followerRef.current], { xPercent: -50, yPercent: -50, opacity: 0 });

        // Reveal on first move
        const showCursor = () => {
            gsap.to([cursorRef.current, followerRef.current], { opacity: 1, duration: 0.5 });
            window.removeEventListener('mousemove', showCursor);
        };
        window.addEventListener('mousemove', showCursor);

    }, { scope: cursorRef, dependencies: [] });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Direct GSAP update - NO state changes here
            if (xTo.current) xTo.current(e.clientX);
            if (yTo.current) yTo.current(e.clientY);
            if (xToFollower.current) xToFollower.current(e.clientX);
            if (yToFollower.current) yToFollower.current(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for interactive elements
            const isLink = target.closest('a, button, .cursor-pointer, input');
            const isCard = target.closest('.group'); // Cards usually have 'group'
            const isCTA = target.closest('button');
            const isImage = target.closest('img, .story-image, [class*="aspect-"]');

            if (isCTA) {
                setIsHovering(true);
                setCursorText('✈️');
            } else if (isImage && isCard) {
                setIsHovering(true);
                setCursorText('Explore →');
            } else if (isCard && !isLink) {
                setIsHovering(true);
                setCursorText('View');
            } else if (isLink) {
                setIsHovering(true);
                setCursorText(''); // Just expand
            } else {
                setIsHovering(false);
                setCursorText('');
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <div className="hidden md:block">
            {/* Main Dot - The Anchor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#FF6B6B] rounded-full pointer-events-none z-[9999] mix-blend-difference"
            />

            {/* Follower - The Magnetic Field */}
            <div
                ref={followerRef}
                className={`fixed top-0 left-0 rounded-full border border-[#FF6B6B] pointer-events-none z-[9998] flex items-center justify-center transition-all duration-300 ease-out mix-blend-difference
            ${isHovering
                        ? 'w-20 h-20 bg-[#FF6B6B] border-transparent opacity-30 text-white'
                        : 'w-6 h-6 opacity-40 bg-transparent'
                    }
        `}
            >
                <span className={`font-bold text-[10px] uppercase tracking-widest transition-opacity duration-200 ${cursorText ? 'opacity-100' : 'opacity-0'}`}>
                    {cursorText}
                </span>
            </div>
        </div>
    );
}
