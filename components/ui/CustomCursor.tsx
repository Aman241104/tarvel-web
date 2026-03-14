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
            const isNav = target.closest('nav, .navbar');
            const isLink = target.closest('a, button, .cursor-pointer, input');
            const isCard = target.closest('.group'); // Cards usually have 'group'
            const isCloseBtn = target.closest('[data-cursor="close"]');
            const isViewBtn = target.closest('[data-cursor="view"]');
            const isCTA = target.closest('button');
            const isImage = target.closest('img, .story-image, [class*="aspect-"]');

            if (isNav) {
                setIsHovering(false);
                setCursorText('');
            } else if (isCloseBtn) {
                setIsHovering(true);
                setCursorText('Close Window ✕');
            } else if (isViewBtn) {
                setIsHovering(true);
                setCursorText('Unlock Experience');
            } else if (isCTA) {
                setIsHovering(true);
                setCursorText('Plan Your Journey ✈️');
            } else if (isImage && isCard) {
                setIsHovering(true);
                setCursorText('Glimpse the Escape');
            } else if (isCard && !isLink) {
                setIsHovering(true);
                setCursorText('Explore Details');
            } else if (isLink) {
                setIsHovering(true);
                setCursorText('Continue →');
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
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-coral rounded-full pointer-events-none z-[9999] shadow-sm"
            />

            {/* Follower - The "Luggage Tag" / Concierge Label */}
            <div
                ref={followerRef}
                className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${isHovering
                        ? 'w-auto h-auto px-4 py-2 bg-white rounded-full shadow-xl border border-brand-coral/20'
                        : 'w-8 h-8 rounded-full border border-brand-coral/30 bg-brand-coral/5'
                    }
        `}
            >
                <span className={`font-handwriting text-brand-coral whitespace-nowrap transition-all duration-300 ${cursorText ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    } ${isHovering ? 'text-base font-bold' : 'text-[0px]'}`}>
                    {cursorText}
                </span>
            </div>
        </div>
    );
}
