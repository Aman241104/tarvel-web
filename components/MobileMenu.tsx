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
    onSectionChange?: (id: string) => void;
}

export default function MobileMenu({ isOpen, onClose, links, activeSection, onSectionChange }: MobileMenuProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const { openWhatsApp } = useWhatsApp();

    useGSAP(() => {
        const validLinks = linksRef.current.filter(Boolean);
        if (isOpen) {
            // Open Animation - Swing Down
            const tl = gsap.timeline();

            tl.set(containerRef.current, { visibility: 'visible' })
                .set(tagRef.current, { rotation: -10, transformOrigin: 'top center' }) // Start slightly rotated
                .to(tagRef.current, {
                    y: 0,
                    rotation: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.6)', // Zappier swing
                })
                .fromTo(validLinks,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3, stagger: 0.08, ease: 'expo.out' },
                    "-=0.5"
                );
        } else {
            // Close Animation - Pull Up
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(containerRef.current, { visibility: 'hidden' });
                }
            });

            tl.to(validLinks, { y: -10, opacity: 0, duration: 0.2, stagger: 0.04 })
                .to(tagRef.current, {
                    y: '-110%',
                    rotation: 5,
                    duration: 0.4,
                    ease: 'expo.in',
                }, "-=0.1");
        }
    }, { dependencies: [isOpen], scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[10000] invisible pointer-events-none"
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
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] bg-white text-text-navy rounded-b-[40px] pt-24 pb-12 px-8 shadow-2xl -translate-y-full pointer-events-auto border-x-[6px] border-b-[6px] border-black/5"
            >
                {/* Hole Punch Visual */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-bg-light shadow-inner flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-black/5" />
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    aria-label="Close mobile menu"
                    className="absolute top-6 right-6 p-3 bg-black/5 rounded-full hover:bg-black/10 active:scale-90 transition-all text-text-navy z-50 focus:outline-none focus:ring-2 focus:ring-text-navy"
                >
                    <X className="w-6 h-6" aria-hidden="true" />
                </button>

                {/* Links */}
                <nav className="flex flex-col gap-6 mt-4">
                    {links.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => {
                                onSectionChange?.(link.id);
                                onClose();
                            }}
                            ref={(el) => { linksRef.current[i] = el; }}
                            className={`group flex items-center justify-between text-3xl font-black font-heading transition-all border-b border-black/5 pb-3 ${
                                activeSection === link.id ? 'text-brand-coral translate-x-2' : 'text-text-navy/40 hover:text-text-navy'
                            }`}
                        >
                            <span className="flex items-center gap-4">
                                {activeSection === link.id && <div className="w-2.5 h-2.5 rounded-full bg-brand-coral shadow-[0_0_15px_rgba(255,107,107,0.5)]" />}
                                {link.name}
                            </span>
                            <ArrowRight className={`w-6 h-6 transition-all duration-300 ${activeSection === link.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                        </Link>
                    ))}
                    <Link
                        href="#instagram"
                        onClick={() => {
                            onSectionChange?.('instagram');
                            onClose();
                        }}
                        className={`group flex items-center justify-between text-3xl font-black font-heading transition-all border-b border-black/5 pb-3 ${
                            activeSection === 'instagram' ? 'text-brand-coral translate-x-2' : 'text-text-navy/40 hover:text-text-navy'
                        }`}
                    >
                        <span className="flex items-center gap-4">
                            {activeSection === 'instagram' && <div className="w-2.5 h-2.5 rounded-full bg-brand-coral shadow-[0_0_15px_rgba(255,107,107,0.5)]" />}
                            Journal
                        </span>
                        <ArrowRight className={`w-6 h-6 transition-all duration-300 ${activeSection === 'instagram' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                    </Link>
                </nav>

                {/* Quick Contact CTA */}
                <div className="mt-10 pt-6 border-t font-sans border-black/5 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <p className="text-xs font-black opacity-40 mb-4 uppercase tracking-[0.3em] text-center">Ready to go?</p>
                    <button
                        onClick={() => {
                            openWhatsApp('Mobile Menu - Quick Plan');
                            onClose();
                        }}
                        className="w-full bg-brand-coral text-white font-black py-4 rounded-2xl shadow-xl hover:shadow-brand-coral/20 hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                    >
                        <Phone className="w-4 h-4 fill-current" />
                        <span>Plan Your Journey</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
