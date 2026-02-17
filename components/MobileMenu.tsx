'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { X, ArrowRight } from 'lucide-react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    links: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useGSAP(() => {
        if (isOpen) {
            // Open Animation
            const tl = gsap.timeline();

            tl.set(containerRef.current, { visibility: 'visible' })
                .to(menuRef.current, {
                    y: 0,
                    duration: 0.8,
                    ease: 'power4.out', // Smooth slide down
                })
                .fromTo(linksRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
                    "-=0.4"
                );
        } else {
            // Close Animation
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(containerRef.current, { visibility: 'hidden' });
                }
            });

            tl.to(linksRef.current, { y: -20, opacity: 0, duration: 0.3, stagger: 0.05 })
                .to(menuRef.current, {
                    y: '-100%',
                    duration: 0.6,
                    ease: 'power3.in',
                }, "-=0.2");
        }
    }, { dependencies: [isOpen], scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] invisible"
        >
            {/* Backdrop (Optional, here we go full screen) */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Menu Panel */}
            <div
                ref={menuRef}
                className="absolute top-0 left-0 w-full h-screen bg-[#4ECDC4] flex flex-col items-center justify-center -translate-y-full"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-4 bg-white/20 rounded-full hover:bg-white/40 hover:scale-110 transition-all text-white"
                >
                    <X className="w-8 h-8" />
                </button>

                {/* Links */}
                <nav className="flex flex-col items-center gap-8">
                    {links.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={onClose} // Close on click
                            ref={(el) => { linksRef.current[i] = el; }}
                            className="text-5xl md:text-7xl font-bold text-white font-heading hover:text-[#FFFBF5] transition-colors flex items-center gap-4 group"
                        >
                            <span>{link.name}</span>
                            <ArrowRight className="w-8 h-8 md:w-12 md:h-12 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </Link>
                    ))}
                </nav>

                {/* Socials / Extra */}
                <div className="absolute bottom-12 text-white/60 font-sans text-sm tracking-widest uppercase">
                    Connect • Explore • Live
                </div>
            </div>
        </div>
    );
}
