'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Menu } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';
import MobileMenu from './MobileMenu';


export default function Navbar() {
    const containerRef = useRef<HTMLElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sections = ['home', 'usp', 'about', 'services', 'testimonials'];
        const observers = sections.map((id) => {
            const section = document.getElementById(id);
            if (!section) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
            );
            observer.observe(section);
            return observer;
        });

        return () => observers.forEach((o) => o?.disconnect());
    }, []);

    useGSAP(
        () => {
            gsap.fromTo(containerRef.current, 
                { y: -100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power4.out',
                    delay: 0.2,
                    clearProps: 'all'
                }
            );
        },
        { scope: containerRef }
    );

    // Sliding indicator animation
    useGSAP(() => {
        const activeLink = linksRef.current?.querySelector(`[data-nav-id="${activeSection}"]`);
        const indicator = containerRef.current?.querySelector('.nav-indicator');
        
        if (activeLink && indicator) {
            const { offsetLeft, offsetWidth } = activeLink as HTMLElement;
            gsap.to(indicator, {
                x: offsetLeft,
                width: offsetWidth,
                duration: 0.5,
                ease: 'power3.out',
            });
        }
    }, [activeSection]);

    const navLinks = [
        { name: 'Home', href: '#home', id: 'home' },
        { name: 'Why Us', href: '#usp', id: 'usp' },
        { name: 'Captain', href: '#about', id: 'about' },
        { name: 'Services', href: '#services', id: 'services' },
        { name: 'Reviews', href: '#testimonials', id: 'testimonials' },
    ];

    return (
        <>
            <nav
                ref={containerRef}
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[94%] max-w-5xl transition-all duration-300 rounded-3xl md:rounded-full border flex items-center justify-between px-4 md:px-6 py-2 md:py-3 ${
                    scrolled 
                    ? 'bg-bg-paper/90 backdrop-blur-2xl py-2 scale-[0.98] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10' 
                    : 'bg-white/5 backdrop-blur-xl shadow-xl border-white/10'
                }`}
            >
                {/* Left: Logo */}
                <Link href="#home" className="flex items-center gap-3 md:gap-4 group">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white/80 bg-white shadow-md group-hover:scale-110 transition-transform duration-300">
                         <Image src="/assets/logo.png" alt="Destination Anywhere Logo" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm md:text-base font-black tracking-tight text-text-navy transition-colors duration-300">
                            Destination Anywhere
                        </span>
                        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-black text-black/40 hidden sm:block transition-colors duration-300">
                            Travel Boutique
                        </span>
                    </div>
                </Link>

                {/* Center: Navigation Links (Desktop) */}
                <div className="hidden lg:flex items-center gap-0 relative bg-black/5 p-1.5 rounded-full border border-black/5" ref={linksRef}>
                    {/* Sliding Indicator Background */}
                    <div className="nav-indicator absolute h-[calc(100%-12px)] top-1.5 left-0 bg-black/10 rounded-full shadow-sm z-0 pointer-events-none" />
                    
                    {navLinks.map((link) => (
                        <Magnetic key={link.name} strength={0.2}>
                            <Link
                                href={link.href}
                                data-nav-id={link.id}
                                className={`group relative px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 rounded-full inline-block z-10 ${
                                    activeSection === link.id 
                                    ? 'text-brand-coral' 
                                    : 'text-text-navy/60 hover:text-text-navy'
                                }`}
                            >
                                {link.name}
                            </Link>
                        </Magnetic>
                    ))}
                </div>

                {/* Right: CTA Button (Desktop) & Mobile Menu */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Desktop CTA */}
                    <Magnetic>
                        <a
                            ref={ctaRef}
                            href="https://wa.me/918511071506?text=Hi%20Sujal,%20I%20want%20to%20plan%20a%20trip!"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex items-center justify-center px-6 lg:px-8 py-3.5 bg-brand-coral text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_rgba(255,107,107,0.35)] shadow-xl relative overflow-hidden group"
                        >
                            <span className="relative z-10">Plan My Journey</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                        </a>
                    </Magnetic>

                    {/* Mobile Menu Icon */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open mobile menu"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        className={`lg:hidden p-3 rounded-full transition-all duration-300 ${scrolled ? 'bg-black/5 text-text-navy' : 'bg-black/10 text-text-navy shadow-sm'}`}
                    >
                        <Menu className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} links={navLinks} activeSection={activeSection} />
        </>
    );
}
