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
    links: { name: string; href: string; id: string }[];
    activeSection?: string;
}

export default function MobileMenu({ isOpen, onClose, links, activeSection }: MobileMenuProps) {
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
                className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500 pointer-events-auto ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Luggage Tag Panel */}
            <div
                id="mobile-menu"
                ref={tagRef}
                className="absolute top-0 right-4 md:right-20 w-[90%] md:w-[400px] bg-brand-teal text-white rounded-b-[40px] pt-24 pb-12 px-8 shadow-[0_30px_60px_rgba(0,0,0,0.3)] -translate-y-full pointer-events-auto border-x-[6px] border-b-[6px] border-white/20"
            >
                {/* Hole Punch Visual */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-black/30 shadow-inner flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white/10" />
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    aria-label="Close mobile menu"
                    className="absolute top-6 right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 active:scale-90 transition-all text-white z-50 focus:outline-none focus:ring-2 focus:ring-white"
                >
                    <X className="w-6 h-6" aria-hidden="true" />
                </button>

                {/* Links */}
                <nav className="flex flex-col gap-6 mt-4">
                    {links.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={onClose}
                            ref={(el) => { linksRef.current[i] = el; }}
                            className={`group flex items-center justify-between text-3xl font-black font-heading transition-all border-b border-white/10 pb-3 ${
                                activeSection === link.id ? 'text-white translate-x-2' : 'text-white/50 hover:text-white'
                            }`}
                        >
                            <span className="flex items-center gap-4">
                                {activeSection === link.id && <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow shadow-[0_0_15px_rgba(255,191,0,0.5)]" />}
                                {link.name}
                            </span>
                            <ArrowRight className={`w-6 h-6 transition-all duration-300 ${activeSection === link.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} />
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
                        className="w-full bg-white text-brand-teal font-black py-4 rounded-full shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                    >
                        <Phone className="w-5 h-5 fill-current" />
                        <span>Plan My Trip</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
