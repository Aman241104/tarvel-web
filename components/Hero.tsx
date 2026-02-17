'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import SearchWidget from './SearchWidget';
import Magnetic from './ui/Magnetic';



const stickers = [
    {
        src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
        alt: 'Beach',
        className: 'top-20 left-10 md:left-32 -rotate-12 w-48 h-64',
        speed: 0.05,
    },
    {
        src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80',
        alt: 'Camping',
        className: 'top-32 right-10 md:right-40 rotate-6 w-40 h-40',
        speed: -0.05,
    },
    {
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80',
        alt: 'Mountains',
        className: 'bottom-32 left-10 md:left-24 rotate-12 w-56 h-48',
        speed: 0.1,
    },
    {
        src: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=400&q=80',
        alt: 'Jungle',
        className: 'bottom-20 right-10 md:right-32 -rotate-6 w-44 h-56',
        speed: -0.08,
    },
    {
        src: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=400&q=80',
        alt: 'Travel',
        className: 'top-1/4 left-1/2 -translate-x-1/2 rotate-3 w-32 h-32',
        speed: 0.02,
    },
];

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const stickerRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Initialize x/y quickTo functions for each sticker
    const xTo = useRef<any[]>([]);
    const yTo = useRef<any[]>([]);

    useGSAP(
        () => {
            // 1. Entrance Animation
            const tl = gsap.timeline({ defaults: { ease: 'elastic.out(1, 0.5)' } });

            // Animate Text Up
            tl.fromTo(
                textRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
            );

            // Pop in Stickers
            stickerRefs.current.forEach((el, i) => {
                if (!el) return;
                const originalRotation = stickers[i].className.includes('-rotate')
                    ? -parseInt(stickers[i].className.split('-rotate-')[1] || '0')
                    : parseInt(stickers[i].className.split('rotate-')[1] || '0');

                tl.fromTo(
                    el,
                    { scale: 0, rotation: 180, opacity: 0 },
                    {
                        scale: 1,
                        rotation: isNaN(originalRotation) ? 0 : originalRotation,
                        opacity: 1,
                        duration: 1.5,
                        delay: i * 0.1, // Stagger
                    },
                    '<0.2' // Start slightly after text
                );

                // Setup QuickTo for performant mouse movement
                xTo.current[i] = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
                yTo.current[i] = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
            });

            // 2. Mouse Parallax
            const handleMouseMove = (e: MouseEvent) => {
                if (!containerRef.current) return;
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                const xPos = clientX - innerWidth / 2;
                const yPos = clientY - innerHeight / 2;

                stickerRefs.current.forEach((_, i) => {
                    const speed = stickers[i].speed;
                    if (xTo.current[i]) xTo.current[i](xPos * speed);
                    if (yTo.current[i]) yTo.current[i](yPos * speed);
                });
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-[#FFFBF5] flex flex-col items-center justify-center"
        >
            {/* Visuals: Floating Stickers */}
            {stickers.map((sticker, i) => (
                <div
                    key={i}
                    ref={(el) => { stickerRefs.current[i] = el; }}
                    className={`absolute p-1 bg-white shadow-xl rounded-xl z-10 ${sticker.className} transition-transform will-change-transform ${i < 2 ? 'block' : 'hidden md:block'}`}
                >
                    {/* Inner wrapper for border and image */}
                    <div className="relative w-full h-full rounded-lg overflow-hidden border-[4px] border-white">
                        <Image
                            src={sticker.src}
                            alt={sticker.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100px, 300px"
                        />
                    </div>
                </div>
            ))}

            {/* Typography: Central Heading */}
            <div ref={textRef} className="relative z-20 text-center flex flex-col items-center">
                <h1 className="font-black text-4xl md:text-7xl leading-tight text-[#2D2D2D] font-sans tracking-tight">
                    <span className="block">ESCAPE THE</span>
                    <span className="relative block text-transparent bg-clip-text stroke-current mt-2 pb-4">
                        {/* Outline Text Effect */}
                        <span
                            className="absolute inset-0 text-[#2D2D2D] z-10"
                            style={{
                                WebkitTextStroke: '2px #2D2D2D',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            ORDINARY
                        </span>
                        {/* Invisible spacer to hold the dimensions */}
                        <span className="opacity-0">ORDINARY</span>

                        {/* Yellow Scribble Underline */}
                        <svg
                            className="absolute w-[110%] -bottom-2 -left-[5%] z-0 text-[#FFE66D]"
                            viewBox="0 0 300 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 25C50 5 100 25 150 10C200 -5 250 20 295 15"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                </h1>

                {/* Subtext Pill */}
                <Magnetic strength={0.2}>
                    <div className="mt-8 px-6 py-3 bg-white rounded-full border border-black/5 shadow-md flex items-center gap-2 transform hover:scale-105 transition-transform cursor-pointer">
                        <span className="text-[#2D2D2D] font-bold text-sm uppercase tracking-wide">
                            Plan your trip
                        </span>
                        <span className="text-xl">✈️</span>
                    </div>
                </Magnetic>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 animate-bounce opacity-50 hidden md:block z-20">
                <div className="w-6 h-10 border-2 border-[#2D2D2D] rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-[#2D2D2D] rounded-full" />
                </div>
            </div>

            {/* Search Widget - The "Compass" */}
            <SearchWidget />
        </section>
    );
}
