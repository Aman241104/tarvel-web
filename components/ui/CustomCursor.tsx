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

    useGSAP((context) => {
        if (!cursorRef.current || !followerRef.current) return;

        // 1. Main Dot: Almost instant response (High performance)
        xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.01, ease: "power3.out" });
        yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.01, ease: "power3.out" });

        // 2. Follower: "Magnetic" feel (snappy but fluid)
        xToFollower.current = gsap.quickTo(followerRef.current, "x", { duration: 0.15, ease: "power2.out" });
        yToFollower.current = gsap.quickTo(followerRef.current, "y", { duration: 0.15, ease: "power2.out" });

        // Initial Hide
        gsap.set([cursorRef.current, followerRef.current], { xPercent: -50, yPercent: -50, opacity: 0 });

        const showCursor = () => {
            gsap.to([cursorRef.current, followerRef.current], { opacity: 1, duration: 0.5 });
            window.removeEventListener('mousemove', showCursor);
        };
        window.addEventListener('mousemove', showCursor);

        const handleMouseMove = (e: MouseEvent) => {
            if (xTo.current) xTo.current(e.clientX);
            if (yTo.current) yTo.current(e.clientY);
            if (xToFollower.current) xToFollower.current(e.clientX);
            if (yToFollower.current) yToFollower.current(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;

            // NEW: Ignore Navbar and specific elements
            if (target.closest('nav') || target.closest('[data-no-cursor]')) {
                setCursorText('');
                setIsHovering(false);
                return;
            }

            // Cache attributes or use specific data-attributes for faster lookup
            const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor');
            
            let newText = '';
            let hovering = false;

            if (cursorType === 'close') {
                newText = 'Close Window ✕';
                hovering = true;
            } else if (cursorType === 'view') {
                newText = 'Unlock Experience';
                hovering = true;
            } else if (target.closest('button')) {
                newText = 'Plan Your Journey ✈️';
                hovering = true;
            } else if (target.closest('a, .cursor-pointer, input, select, textarea')) {
                newText = 'Continue →';
                hovering = true;
            } else if (target.closest('.group') && !target.closest('.customer-card')) {
                const isImage = target.closest('img, .story-image, [class*="aspect-"]');
                newText = isImage ? 'Glimpse the Escape' : 'Explore Details';
                hovering = true;
            }

            // Only update state if it actually changed to avoid re-renders
            setCursorText(prev => prev !== newText ? newText : prev);
            setIsHovering(prev => prev !== hovering ? hovering : prev);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousemove', showCursor);
        };
    }, { scope: cursorRef, dependencies: [] });

    return (
        <div className="hidden md:block pointer-events-none">
            {/* Main Dot - The Anchor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-coral rounded-full z-[9999] shadow-sm will-change-transform"
            />

            {/* Follower - The "Luggage Tag" / Concierge Label */}
            <div
                ref={followerRef}
                className={`fixed top-0 left-0 z-[9998] flex items-center justify-center transition-[width,height,padding,background-color,border-color,border-radius,opacity] duration-500 cubic-bezier(0.16, 1, 0.3, 1) will-change-transform
            ${isHovering
                        ? 'w-auto h-auto px-4 py-2 bg-white rounded-full shadow-2xl border border-brand-coral/20'
                        : 'w-8 h-8 rounded-full border border-brand-coral/30 bg-brand-coral/5'
                    }
        `}
            >
                <span className={`font-handwriting text-brand-coral whitespace-nowrap transition-all duration-300 ${cursorText ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    } ${isHovering ? 'text-sm font-bold' : 'text-[0px]'}`}>
                    {cursorText}
                </span>
            </div>
        </div>
    );
}
