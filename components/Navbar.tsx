'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
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

    useGSAP(
        () => {
            gsap.from(containerRef.current, {
                y: -100,
                opacity: 0,
                duration: 1.2,
                ease: 'elastic.out(1, 0.5)',
                delay: 0.2, // Small delay to let content load a bit
            });
        },
        { scope: containerRef }
    );

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Story', href: '#stories' },
        { name: 'Trips', href: '#about' }, // Sujal section
        { name: 'Gallery', href: '#services' }, // Services Grid
    ];

    return (
        <>
            <nav
                ref={containerRef}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl bg-white/80 backdrop-blur-md rounded-full border border-white/50 shadow-lg shadow-black/5 flex items-center justify-between px-6 py-3"
            >
                {/* Left: Logo */}
                <Link href="#home" className="text-xl font-bold text-[#2D2D2D] font-sans tracking-tight">
                    Destination Anywhere
                </Link>

                {/* Center: Navigation Links (Desktop) */}
                <div className="hidden md:flex items-center gap-1" ref={linksRef}>
                    {navLinks.map((link) => (
                        <Magnetic key={link.name} strength={0.3}>
                            <Link
                                href={link.href}
                                className="group relative px-4 py-2 text-sm font-medium text-[#2D2D2D] transition-colors duration-300 inline-block"
                            >
                                <span className="relative z-10">{link.name}</span>
                                <span className="absolute inset-0 bg-gray-100 rounded-full scale-0 transition-transform duration-300 ease-out group-hover:scale-100 -z-0 origin-center opacity-0 group-hover:opacity-100" />
                            </Link>
                        </Magnetic>
                    ))}
                </div>

                {/* Right: CTA Button (Desktop) & Mobile Menu */}
                <div className="flex items-center gap-4">
                    {/* Desktop CTA */}
                    <Magnetic>
                        <a
                            ref={ctaRef}
                            href="https://wa.me/918511071506?text=Hi%20Sujal,%20I%20want%20to%20plan%20a%20trip!"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-[#FF6B6B] text-white text-sm font-bold rounded-full transition-transform duration-300 hover:scale-105 hover:rotate-2 shadow-sm"
                        >
                            Book Now
                        </a>
                    </Magnetic>

                    {/* Mobile Menu Icon */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-2 text-[#2D2D2D] hover:bg-black/5 rounded-full transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} links={navLinks} />
        </>
    );
}
