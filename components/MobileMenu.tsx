'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { X, ArrowRight, Phone } from 'lucide-react';
import { useWhatsApp } from '@/hooks/useWhatsApp';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    links: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const { openWhatsApp } = useWhatsApp();

    useGSAP(() => {
        if (isOpen) {
            // Open Animation - Swing Down
            const tl = gsap.timeline();

            tl.set(containerRef.current, { visibility: 'visible' })
                .set(tagRef.current, { rotation: -10, transformOrigin: 'top center' }) // Start slightly rotated
                .to(tagRef.current, {
                    y: 0,
                    rotation: 0,
                    duration: 1.2,
                    ease: 'elastic.out(1, 0.5)', // Bouncy swing
                })
                .fromTo(linksRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
                    "-=0.8"
                );
        } else {
            // Close Animation - Pull Up
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(containerRef.current, { visibility: 'hidden' });
                }
            });

            tl.to(linksRef.current, { y: -10, opacity: 0, duration: 0.2, stagger: 0.05 })
                .to(tagRef.current, {
                    y: '-110%',
                    rotation: 5,
                    duration: 0.5,
                    ease: 'power3.in',
                }, "-=0.1");
        }
    }, { dependencies: [isOpen], scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] invisible pointer-events-none"
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 pointer-events-auto ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Luggage Tag Panel */}
            <div
                ref={tagRef}
                className="absolute top-0 right-4 md:right-20 w-[90%] md:w-[400px] bg-[#4ECDC4] text-white rounded-b-[40px] pt-24 pb-12 px-8 shadow-2xl -translate-y-full pointer-events-auto border-x-4 border-b-4 border-white/20"
            >
                {/* Hole Punch Visual */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black/20 shadow-inner" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-white/20 rounded-full hover:bg-white/40 hover:rotate-90 transition-all text-white"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Links */}
                <nav className="flex flex-col gap-6 mt-4">
                    {links.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={onClose}
                            ref={(el) => { linksRef.current[i] = el; }}
                            className="group flex items-center justify-between text-3xl font-bold font-heading hover:text-[#FFFBF5] transition-colors border-b border-white/20 pb-2"
                        >
                            <span>{link.name}</span>
                            <ArrowRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </Link>
                    ))}
                </nav>

                {/* Quick Contact CTA */}
                <div className="mt-10 pt-6 border-t font-sans border-white/20 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <p className="text-sm font-bold opacity-80 mb-4 uppercase tracking-widest text-center">Ready to go?</p>
                    <button
                        onClick={() => {
                            openWhatsApp('Mobile Menu - Quick Plan');
                            onClose();
                        }}
                        className="w-full bg-white text-[#4ECDC4] font-bold py-4 rounded-full shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                    >
                        <Phone className="w-5 h-5" />
                        <span>Plan My Trip</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
