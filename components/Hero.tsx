'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SearchWidget from './SearchWidget';
import Magnetic from './ui/Magnetic';
import { useWhatsApp } from '@/hooks/useWhatsApp';

const stickers = [
    {
        src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
        alt: 'Beach',
        className: 'top-20 left-10 md:left-32 -rotate-12 w-48 h-64',
        mobileClassName: 'top-10 left-4 rotate-[-6deg] w-24 h-32',
        speed: 0.05,
    },
    {
        src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80',
        alt: 'Camping',
        className: 'top-32 right-10 md:right-40 rotate-6 w-40 h-40',
        mobileClassName: 'top-20 right-4 rotate-[4deg] w-20 h-20',
        speed: -0.05,
    },
    {
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80',
        alt: 'Mountains',
        className: 'bottom-32 left-10 md:left-24 rotate-12 w-56 h-48',
        mobileClassName: 'bottom-40 left-4 rotate-[8deg] w-28 h-24',
        speed: 0.1,
    },
    {
        src: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=400&q=80',
        alt: 'Jungle',
        className: 'bottom-20 right-10 md:right-32 -rotate-6 w-44 h-56',
        mobileClassName: 'bottom-32 right-4 rotate-[-4deg] w-22 h-28',
        speed: -0.08,
    },
    {
        src: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=400&q=80',
        alt: 'Travel',
        className: 'top-1/4 left-1/2 -translate-x-1/2 rotate-3 w-32 h-32',
        mobileClassName: 'top-[15%] left-1/2 -translate-x-1/2 rotate-[2deg] w-16 h-16',
        speed: 0.02,
    },
];

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const stickerRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { openWhatsApp } = useWhatsApp();
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        setIsDesktop(window.innerWidth >= 768);
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
                { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
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
                        duration: 0.4,
                        stagger: 0.03,
                        ease: 'back.out(1.7)',
                    },
                    '-=0.6'
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
                        duration: 0.8,
                        ease: 'power3.out',
                        delay: 1,
                    }
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
                        opacity: window.innerWidth < 768 ? 0.4 : 1,
                        duration: 0.8,
                        delay: i * 0.08,
                    },
                    '<0.1'
                );

                // Setup QuickTo for performant mouse movement
                xTo.current[i] = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
                yTo.current[i] = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
            });

            // 2. Mouse Parallax
            const handleMouseMove = (e: MouseEvent) => {
                if (!containerRef.current || window.innerWidth < 768) return;
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
        if (!isDesktop) return;
        const el = stickerRefs.current[index];
        if (!el) return;
        const img = el.querySelector('img');

        if (img) {
            gsap.to(img, {
                scale: enter ? 1.15 : 1,
                duration: 0.7,
                ease: 'power2.out'
            });
        }

        gsap.to(el, {
            scale: enter ? 1.1 : 1,
            zIndex: enter ? 50 : 0,
            duration: 0.4,
            ease: 'back.out(1.7)'
        });
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[100dvh] overflow-hidden bg-bg-light flex flex-col items-center justify-center"
        >
            {/* Visuals: Floating Stickers */}
            {stickers.map((sticker, i) => (
                <motion.div
                    key={i}
                    drag={isDesktop}
                    dragConstraints={containerRef}
                    dragElastic={0.1}
                    whileDrag={{ scale: 1.1, zIndex: 40 }}
                    onMouseEnter={() => handleStickerHover(i, true)}
                    onMouseLeave={() => handleStickerHover(i, false)}
                    ref={(el) => { stickerRefs.current[i] = el as HTMLDivElement; }}
                    className={`absolute p-1.5 md:p-2 pb-6 md:pb-10 bg-white shadow-2xl rounded-sm will-change-transform cursor-grab active:cursor-grabbing
                        ${sticker.mobileClassName} md:${sticker.className}
                        z-0 md:z-10 opacity-40 md:opacity-100 flex flex-col
                    `}
                    style={{
                        backfaceVisibility: 'hidden'
                    }}
                >
                    {/* Washi Tape Decoration */}
                    <div className={`washi-tape -top-3 left-1/2 -translate-x-1/2 -rotate-2 ${i % 2 === 0 ? 'washi-tape-yellow' : 'washi-tape-coral'}`} />

                    {/* Polaroid Content */}
                    <div className="relative w-full flex-1 bg-gray-100 overflow-hidden">
                        <Image
                            src={sticker.src}
                            alt={sticker.alt}
                            fill
                            priority={i < 2}
                            className="object-cover filter-printed"
                            sizes="(max-width: 768px) 30vw, (max-width: 1200px) 15vw, 250px"
                        />
                    </div>

                    {/* Caption area */}
                    <div className="mt-auto pt-1 md:pt-2 text-center">
                        <span className="font-handwriting text-gray-500 text-[8px] md:text-[10px] tracking-widest uppercase block">
                            {sticker.alt}
                        </span>
                    </div>
                </motion.div>
            ))}

            {/* Typography: Central Heading */}
            <div ref={textRef} className="relative z-20 text-center flex flex-col items-center max-w-4xl mx-auto -mt-10 md:mt-0 px-4">
                {/* Doodle: Star */}
                <svg className="absolute -top-16 -right-12 w-14 h-14 text-brand-yellow opacity-80 animate-spin-slow hidden md:block" viewBox="0 0 100 100" fill="currentColor">
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

                <h1 className="flex flex-col items-center justify-center w-full mb-4 md:mb-0">

                    <span className="font-heading font-black text-[13vw] sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] text-text-navy tracking-tighter relative flex justify-center max-w-[90vw] whitespace-nowrap">
                        {'DESTINATION'.split('').map((char, i) => (
                            <span key={i} className="dest-char inline-block" aria-hidden={i > 0}>
                                {char}
                            </span>
                        ))}
                        {/* Doodle: Arrow */}
                        <svg className="absolute -left-12 md:-left-20 top-1/2 w-12 h-6 md:w-20 md:h-10 text-brand-teal -rotate-12 hidden lg:block" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M0 25C20 25 40 10 60 40M60 40L40 35M60 40L50 50" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>

                    <span className="font-handwriting text-[12vw] sm:text-6xl md:text-7xl lg:text-9xl leading-none text-brand-yellow relative mt-2 md:mt-4 drop-shadow-sm transform -rotate-2">
                        Anywhere
                        {/* Underline */}
                        <svg className="absolute -bottom-2 left-0 w-full h-4 md:h-6 text-brand-teal opacity-60" viewBox="0 0 200 20" preserveAspectRatio="none">
                            <path className="hero-underline" d="M5 15Q100 0 195 15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={{ strokeDasharray: 200, strokeDashoffset: 200 }} />
                        </svg>
                    </span>
                </h1>

                {/* Subtext Pill & Social Proof */}
                <div className="mt-8 md:mt-16 flex flex-col items-center gap-8">
                    <div className="hidden md:flex">
                        <Magnetic strength={0.2}>
                            <button
                                onClick={() => openWhatsApp('Hero Section - "PLAN YOUR TRIP"')}
                                className="px-8 py-4 bg-text-navy text-white rounded-full shadow-[0_20px_40px_rgba(15,23,42,0.3)] flex items-center gap-4 transform hover:scale-105 transition-all group overflow-hidden relative"
                            >
                                <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em]">
                                    Start Your Story
                                </span>
                                <span className="relative z-10 text-xl group-hover:translate-x-1 transition-transform">✈️</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>
                        </Magnetic>
                    </div>

                    {/* High-end Social Proof */}
                    <div className="flex items-center gap-4 bg-bg-paper px-6 py-3 rounded-2xl border border-black/5 shadow-ambient-sm animate-float">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative shadow-sm">
                                    <Image
                                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                        alt="Traveler"
                                        fill
                                        className="object-cover"
                                        sizes="40px"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-3.5 h-3.5 text-brand-yellow fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-[10px] font-black text-text-navy/60 uppercase tracking-[0.15em]">
                                500+ Happy Explorers
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Hidden on short screens to avoid SearchWidget overlap */}
            <div className="absolute bottom-8 animate-bounce opacity-50 hidden min-[800px]:block z-20">
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-white/20 rounded-full" />
                </div>
            </div>

            {/* Search Widget - The "Compass" */}
            <SearchWidget />
        </section>
    );
}
