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
    const indicatorRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const navLinks = [
        { name: 'Why Us', href: '#usp', id: 'usp' },
        { name: 'Services', href: '#services', id: 'services' },
        { name: 'Captain', href: '#about-captain', id: 'about-captain' },
        { name: 'Packages', href: '#packages', id: 'packages' },
        { name: 'Reviews', href: '#testimonials', id: 'testimonials' },
        { name: 'Journal', href: '#instagram', id: 'instagram' },
    ];

    useEffect(() => {
        const sections = ['home', 'usp', 'services', 'about-captain', 'packages', 'testimonials', 'instagram', 'contact'];
        
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
            
            // Robust active section detection
            let current = 'home';
            const threshold = 200;

            for (const id of sections) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= threshold) {
                        current = id;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
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
                    clearProps: 'y,opacity'
                }
            );
        },
        { scope: containerRef }
    );

    // Sliding indicator animation
    const updateIndicator = () => {
        const activeLink = containerRef.current?.querySelector(`[data-nav-id="${activeSection}"]`) as HTMLElement;
        const indicator = indicatorRef.current;
        const linksContainer = linksRef.current;
        
        if (activeLink && indicator && linksContainer) {
            const isInsideContainer = linksContainer.contains(activeLink);

            if (isInsideContainer) {
                let offsetLeft = 0;
                let curr = activeLink;
                while (curr && curr !== linksContainer) {
                    offsetLeft += curr.offsetLeft;
                    // @ts-ignore
                    curr = curr.offsetParent;
                }

                gsap.to(indicator, {
                    x: offsetLeft,
                    width: activeLink.offsetWidth,
                    duration: 0.6,
                    ease: 'expo.out',
                    opacity: 1,
                    overwrite: true
                });
            } else {
                gsap.to(indicator, { opacity: 0, duration: 0.4, ease: 'power2.inOut' });
            }
        } else if (indicator) {
            gsap.to(indicator, { opacity: 0, duration: 0.4, ease: 'power2.inOut' });
        }
    };

    useGSAP(() => {
        const timer = setTimeout(updateIndicator, 50);
        window.addEventListener('resize', updateIndicator);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateIndicator);
        };
    }, [activeSection, scrolled]);

    const handleLinkClick = (id: string) => {
        setActiveSection(id);
    };

    return (
        <>
            <nav
                ref={containerRef}
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-6xl transition-all duration-500 rounded-full border flex items-center justify-between px-5 md:px-8 py-2 md:py-2.5 ${
                    scrolled 
                    ? 'bg-white/95 backdrop-blur-2xl scale-[0.98] shadow-2xl border-black/5' 
                    : 'bg-white/60 backdrop-blur-xl shadow-lg border-black/5'
                }`}
            >
                {/* Left: Logo */}
                <Link 
                    href="#home" 
                    onClick={() => handleLinkClick('home')} 
                    data-nav-id="home"
                    className="flex items-center gap-2 md:gap-4 group shrink-0"
                >
                    <div className="relative w-10 h-10 md:w-14 md:h-14 group-hover:scale-105 transition-transform duration-500">
                         <Image 
                            src="/logo-removebg-preview.png" 
                            alt="Destination Anywhere Logo" 
                            fill 
                            className="object-contain" 
                            sizes="(max-width: 768px) 40px, 56px"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-xs md:text-lg font-black text-text-navy leading-none whitespace-nowrap tracking-tighter">
                            Destination Anywhere
                        </span>
                        <span className="text-[7px] md:text-[9px] font-bold text-brand-coral uppercase tracking-[0.2em] mt-0.5 opacity-80">
                            Luxury Travel & Co.
                        </span>
                    </div>
                </Link>

                {/* Center: Navigation Links (Desktop) */}
                <div className="hidden lg:flex items-center gap-2 relative bg-black/[0.03] p-1.5 rounded-full border border-black/[0.05]" ref={linksRef}>
                    <div 
                        ref={indicatorRef}
                        className="nav-indicator absolute h-[calc(100%-12px)] top-1.5 left-0 bg-white rounded-full shadow-sm z-0 pointer-events-none opacity-0" 
                    />
                    
                    {navLinks.map((link) => (
                        <Magnetic key={link.name} strength={0.15}>
                            <Link
                                href={link.href}
                                data-nav-id={link.id}
                                onClick={() => handleLinkClick(link.id)}
                                className={`group relative px-6 py-2 text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 rounded-full inline-block z-10 ${
                                    activeSection === link.id 
                                    ? 'text-brand-coral' 
                                    : 'text-text-navy/50 hover:text-text-navy'
                                }`}
                            >
                                {link.name}
                            </Link>
                        </Magnetic>
                    ))}
                </div>

                {/* Right: CTA Button */}
                <div className="flex items-center gap-4">
                    <Magnetic>
                        <a
                            ref={ctaRef}
                            href="https://wa.me/918511071506?text=Hi%20Sujal,%20I%20want%20to%20plan%20a%20trip!"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex items-center justify-center px-8 py-3.5 bg-text-navy text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(15,23,42,0.3)] shadow-lg group relative overflow-hidden"
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
                        className={`lg:hidden w-11 h-11 rounded-full transition-all duration-300 flex items-center justify-center ${scrolled ? 'bg-black/5 text-text-navy' : 'bg-white/80 text-text-navy shadow-md border border-black/5'}`}
                    >
                        <Menu className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div>
            </nav>

            <MobileMenu 
                isOpen={isMobileMenuOpen} 
                onClose={() => setIsMobileMenuOpen(false)} 
                links={navLinks} 
                activeSection={activeSection}
                onSectionChange={setActiveSection}
            />
        </>
    );
}
