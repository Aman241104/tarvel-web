'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import SearchWidget from './SearchWidget';
import Magnetic from './ui/Magnetic';
import { useWhatsApp } from '@/hooks/useWhatsApp';



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
    const { openWhatsApp } = useWhatsApp();
    const [greeting, setGreeting] = useState('Global Concierge');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning, Traveler');
        else if (hour < 18) setGreeting('Good Afternoon, Traveler');
        else setGreeting('Good Evening, Traveler');
    }, []);

    // Initialize x/y quickTo functions for each sticker
    const xTo = useRef<any[]>([]);
    const yTo = useRef<any[]>([]);

    useGSAP(
        () => {
            // 1. Entrance Animation
            const tl = gsap.timeline({ defaults: { ease: 'elastic.out(1, 0.5)' } });

            // Animate Text Container Up
            tl.fromTo(
                textRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
            );

            // Character-by-character reveal for DESTINATION
            const destChars = containerRef.current?.querySelectorAll('.dest-char');
            if (destChars?.length) {
                tl.fromTo(
                    destChars,
                    { y: 40, opacity: 0, rotateZ: -8, scale: 0.8 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateZ: 0,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.04,
                        ease: 'back.out(2)',
                    },
                    '-=0.8'
                );
            }

            // Animate the underline SVG path
            const underlinePath = containerRef.current?.querySelector('.hero-underline');
            if (underlinePath) {
                gsap.fromTo(
                    underlinePath,
                    { strokeDashoffset: 200 },
                    {
                        strokeDashoffset: 0,
                        duration: 1.2,
                        ease: 'power2.out',
                        delay: 1.5,
                    }
                );
            }

            // Passport Stamp bounce-in
            const passportStamp = containerRef.current?.querySelector('.passport-stamp');
            if (passportStamp) {
                tl.fromTo(
                    passportStamp,
                    { scale: 0, opacity: 0, rotation: -30 },
                    {
                        scale: 1,
                        opacity: 1,
                        rotation: -15,
                        duration: 1,
                        ease: 'elastic.out(1, 0.4)',
                    },
                    '-=0.5'
                );
            }

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

    const handleStickerHover = (index: number, enter: boolean) => {
        const el = stickerRefs.current[index];
        if (!el) return;
        const img = el.querySelector('img');

        // Zoom the image
        if (img) {
            gsap.to(img, {
                scale: enter ? 1.15 : 1,
                duration: 0.7,
                ease: 'power2.out'
            });
        }

        // Pop the card
        gsap.to(el, {
            scale: enter ? 1.1 : 1,
            zIndex: enter ? 50 : 10,
            rotation: enter ? 0 : (stickers[index].className.includes('rotate') ? gsap.getProperty(el, 'rotation') : 0), // preserve or reset? actually just letting it be is better or 0 for focus
            // logic for rotation is tricky if we want to return to exact original. 
            // simpler: just scale.
            duration: 0.4,
            ease: 'back.out(1.7)'
        });
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-[#FFFBF5] paper-warm flex flex-col items-center justify-center"
        >
            {/* Visuals: Floating Stickers */}
            {stickers.map((sticker, i) => (
                <div
                    key={i}
                    ref={(el) => { stickerRefs.current[i] = el; }}
                    onMouseEnter={() => handleStickerHover(i, true)}
                    onMouseLeave={() => handleStickerHover(i, false)}
                    className={`absolute p-2 bg-white shadow-ambient rounded-sm z-10 ${sticker.className} transition-transform will-change-transform ${i < 2 ? 'block' : 'hidden md:block'} cursor-pointer`}
                    style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }} // Subtle random rotation
                >
                    {/* Polaroid Style Border */}
                    <div className="relative w-full h-full bg-gray-100/50">
                        <div className="absolute top-0 left-0 w-full h-full border-[12px] border-b-[40px] border-white shadow-inner"></div>
                        <Image
                            src={sticker.src}
                            alt={sticker.alt}
                            fill
                            className="object-cover p-[12px] pb-[40px] filter-printed"
                            sizes="(max-width: 768px) 150px, 350px"
                        />
                        <div className="absolute bottom-2 left-0 w-full text-center">
                            <span className="font-handwriting text-gray-500 text-xs tracking-widest uppercase opacity-60">
                                {sticker.alt}
                            </span>
                        </div>
                    </div>
                </div>
            ))}



            {/* Typography: Central Heading */}
            <div ref={textRef} className="relative z-20 text-center flex flex-col items-center max-w-4xl mx-auto">
                {/* Doodle: Star */}
                <svg className="absolute -top-12 -right-8 w-16 h-16 text-accent-gold opacity-80 animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0L61 35L98 35L68 57L79 91L50 70L21 91L32 57L2 35L39 35L50 0Z" />
                </svg>

                {/* Passport Stamp Decoration */}
                <div className="passport-stamp absolute -top-16 -left-16 md:-left-24 w-24 h-24 md:w-28 md:h-28 hidden md:flex items-center justify-center rotate-[-15deg] opacity-0">
                    <svg viewBox="0 0 120 120" className="w-full h-full">
                        <circle cx="60" cy="60" r="54" fill="none" stroke="#FF6B6B" strokeWidth="3" strokeDasharray="6 4" opacity="0.6" />
                        <circle cx="60" cy="60" r="44" fill="none" stroke="#FF6B6B" strokeWidth="1.5" opacity="0.4" />
                        <text x="60" y="42" textAnchor="middle" fill="#FF6B6B" fontSize="11" fontWeight="bold" fontFamily="serif" opacity="0.7">APPROVED</text>
                        <text x="60" y="58" textAnchor="middle" fill="#FF6B6B" fontSize="7" fontFamily="sans-serif" opacity="0.5">DESTINATION ANYWHERE</text>
                        <text x="60" y="72" textAnchor="middle" fill="#FF6B6B" fontSize="18" fontWeight="bold" fontFamily="serif" opacity="0.6">✓</text>
                        <text x="60" y="88" textAnchor="middle" fill="#FF6B6B" fontSize="7" fontFamily="sans-serif" opacity="0.4">2025</text>
                    </svg>
                </div>

                <h1 className="flex flex-col items-center justify-center">
                    <span className="font-body font-bold text-xs md:text-lg tracking-[0.15em] md:tracking-[0.3em] text-sky-primary uppercase mb-4 min-h-[1.5em] px-4 text-center">
                        {greeting}
                    </span>

                    <span className="font-heading font-black text-6xl md:text-9xl leading-[0.9] text-text-navy tracking-tighter relative">
                        {'DESTINATION'.split('').map((char, i) => (
                            <span key={i} className="dest-char inline-block" aria-hidden={i > 0}>
                                {char}
                            </span>
                        ))}
                        {/* Doodle: Arrow */}
                        <svg className="absolute -left-16 top-1/2 w-24 h-12 text-sky-400 -rotate-12 hidden md:block" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M0 25C20 25 40 10 60 40M60 40L40 35M60 40L50 50" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>

                    <span className="font-heading font-italic text-5xl md:text-8xl leading-none text-transparent bg-clip-text bg-gradient-to-r from-sky-primary to-accent-gold relative mt-2">
                        Anywhere
                        {/* Underline */}
                        <svg className="absolute -bottom-4 left-0 w-full h-6 text-accent-gold opacity-60" viewBox="0 0 200 20" preserveAspectRatio="none">
                            <path className="hero-underline" d="M5 15Q100 0 195 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: 200, strokeDashoffset: 200 }} />
                        </svg>
                    </span>
                </h1>

                {/* Subtext Pill */}
                <Magnetic strength={0.2}>
                    <button
                        onClick={() => openWhatsApp('Hero Section - "Plan your trip"')}
                        className="mt-8 px-6 py-3 bg-white rounded-full border border-black/5 shadow-ambient-sm flex items-center gap-2 transform hover:scale-105 transition-transform cursor-pointer"
                    >
                        <span className="text-[#2D2D2D] font-bold text-sm uppercase tracking-wide">
                            Plan your trip
                        </span>
                        <span className="text-xl">✈️</span>
                    </button>
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
