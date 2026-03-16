'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Instagram, Facebook, Send, Linkedin, Mail, Phone, MapPin, Award, Star } from 'lucide-react';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import Magnetic from '@/components/ui/Magnetic';
import Image from 'next/image';
import Postmark from '@/components/ui/Postmark';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const containerRef = useRef<HTMLElement>(null);
    const planeRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const { openWhatsApp } = useWhatsApp();

    useGSAP(
        () => {
            // Mega Type Parallax
            gsap.to('.mega-type', {
                yPercent: -15,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: 1.5,
                },
            });

            // Spotlight mouse move
            const spotlight = spotlightRef.current;
            if (spotlight) {
                const xTo = gsap.quickTo(spotlight, '--x', { duration: 0.8, ease: 'power3' });
                const yTo = gsap.quickTo(spotlight, '--y', { duration: 0.8, ease: 'power3' });

                const handleMouseMove = (e: MouseEvent) => {
                    const rect = containerRef.current?.getBoundingClientRect();
                    if (rect) {
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        xTo(x);
                        yTo(y);
                    }
                };

                window.addEventListener('mousemove', handleMouseMove);
                return () => window.removeEventListener('mousemove', handleMouseMove);
            }
        },
        { scope: containerRef }
    );

    const handleFlyPlane = () => {
        if (!planeRef.current) return;

        gsap.fromTo(planeRef.current,
            { x: '-10vw', y: 50, opacity: 1, rotate: 10 },
            {
                x: '110vw',
                y: -150,
                rotate: -20,
                duration: 2.5,
                ease: 'power2.inOut',
                overwrite: true
            }
        );
    };

    return (
        <footer ref={containerRef} className="relative bg-[#070b14] pt-24 md:pt-32 pb-12 overflow-hidden z-30 text-white">
            {/* Glassmorphism Map Silhouette with Spotlight */}
            <div 
                ref={spotlightRef}
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cpath fill='white' d='M150 100c-10 0-20 5-25 15-5 10-5 20 0 30s15 15 25 15h100c10 0 20-5 25-15s5-20 0-30-15-15-25-15H150zm300 50c-10 0-20 5-25 15s-5 20 0 30 15 15 25 15h150c10 0 20-5 25-15s5-20 0-30-15-15-25-15H450zm250 100c-10 0-20 5-25 15s-5 20 0 30 15 15 25 15h200c10 0 20-5 25-15s5-20 0-30-15-15-25-15H700zM200 300c-10 0-20 5-25 15s-5 20 0 30 15 15 25 15h120c10 0 20-5 25-15s5-20 0-30-15-15-25-15H200zm400 50c-10 0-20 5-25 15s-5 20 0 30 15 15 25 15h180c10 0 20-5 25-15s5-20 0-30-15-15-25-15H600z'/%3E%3C/svg%3E")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    maskImage: 'radial-gradient(circle 300px at var(--x, 50%) var(--y, 50%), black, transparent)',
                    WebkitMaskImage: 'radial-gradient(circle 300px at var(--x, 50%) var(--y, 50%), black, transparent)',
                } as any}
            />

            {/* Postmark Scroll-to-Top */}
            <Postmark />

            {/* Organic Wave Divider (Double Layered) */}
            <div className="absolute -top-10 left-0 w-full overflow-hidden leading-none z-10">
                <svg className="relative block w-full h-[140px] md:h-[200px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#FF5A5F" opacity="0.3"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.51,22.43-10.89,44.78-22.1,66.66-33.33V0Z" fill="#FF5A5F"></path>
                </svg>
            </div>

            {/* Floating Paper Plane */}
            <div
                ref={planeRef}
                className="absolute top-40 left-0 text-white w-24 h-24 md:w-48 md:h-48 z-20 cursor-pointer drop-shadow-2xl"
                onMouseEnter={handleFlyPlane}
                onClick={handleFlyPlane}
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="opacity-60 hover:opacity-100 transition-opacity">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 items-start">

                    {/* Col 1: The Boutique Identity (4 cols) */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="flex flex-col gap-6">
                            <div className="relative w-32 h-32 md:w-44 md:h-44 group-hover:scale-105 transition-transform duration-500">
                                <Image
                                   src="/logo-removebg-preview.png"
                                   alt="Destination Anywhere Logo"
                                   fill
                                   className="object-contain"
                                   sizes="(max-width: 768px) 128px, 176px"
                                />                            </div>
                            <div>
                                <h3 className="text-4xl md:text-5xl font-black font-heading text-[#ffffff] leading-tight tracking-tighter">
                                    Destination<br />Anywhere
                                </h3>
                                <p className="text-[#9ca3af] font-body text-[12px] md:text-[14px] uppercase tracking-[0.4em] mt-3 font-black">Luxury Travel Planning</p>
                            </div>
                        </div>
                        
                        <p className="text-[#d1d5db] font-body text-base md:text-lg leading-relaxed max-w-sm font-medium">
                            We don't just book trips; we protect your most precious asset—your time. Every stamp in your passport is a story we help you write.
                        </p>

                        <div className="flex gap-4">
                            {[
                                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/destnation_anywhere/" },
                                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sujal-soni-335038b2?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
                                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/p/1DWvi1QgaR/?mibextid=wwXIfr" }
                            ].map((social) => (
                                <a 
                                    key={social.label}
                                    href={social.href} 
                                    aria-label={`Visit our ${social.label} page`}
                                    className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white hover:text-brand-teal transition-all duration-300 flex items-center justify-center group shadow-xl"
                                >
                                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Col 2: The Journey Links (2 cols) */}
                    <div className="lg:col-span-2 pt-4">
                        <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-[#9ca3af] border-l-2 border-brand-yellow/50 pl-4">The Journey</h4>
                        <ul className="space-y-6 font-black text-sm uppercase tracking-widest">
                            {[
                                { name: 'Why Us', href: '#usp' },
                                { name: 'Services', href: '#services' },
                                { name: 'Captain', href: '#about-captain' },
                                { name: 'Packages', href: '#packages' },
                                { name: 'Reviews', href: '#testimonials' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-[#d1d5db] hover:text-brand-yellow transition-all duration-200 ease-in-out flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-4 h-px bg-brand-yellow transition-all overflow-hidden" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Contact & HQ (3 cols) */}
                    <div className="lg:col-span-3 pt-4">
                        <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-[#9ca3af] border-l-2 border-brand-yellow/50 pl-4">Boutique HQ</h4>
                        <div className="space-y-8">
                            <div className="footer-contact-item flex items-center gap-4 group cursor-pointer" onClick={() => window.open('mailto:concierge@destanywhere.com')}>
                                <div className="bg-white/5 p-3 rounded-xl group-hover:bg-brand-yellow group-hover:text-text-navy transition-colors shrink-0">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#9ca3af] mb-0.5">Email Us</p>
                                    <p className="text-sm font-bold tracking-tight text-[#ffffff] truncate">concierge@destanywhere.com</p>
                                </div>
                            </div>
                            
                            <div className="footer-contact-item flex items-center gap-4 group cursor-pointer" onClick={() => window.open('tel:+918511071506')}>
                                <div className="bg-white/5 p-3 rounded-xl group-hover:bg-brand-yellow group-hover:text-text-navy transition-colors shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#9ca3af] mb-0.5">Direct Line</p>
                                    <p className="text-sm font-bold tracking-tight text-[#ffffff]">+91 85110 71506</p>
                                </div>
                            </div>

                            <div className="footer-contact-item flex items-center gap-4 group cursor-pointer">
                                <div className="bg-white/5 p-3 rounded-xl group-hover:bg-brand-yellow group-hover:text-text-navy transition-colors shrink-0">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#9ca3af] mb-0.5">Office</p>
                                    <p className="text-sm font-bold tracking-tight text-[#ffffff]">Ahmedabad, Gujarat, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Col 4: Call to Action & Accolades (3 cols) */}
                    <div className="lg:col-span-3 pt-4">
                        <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-[#9ca3af] border-l-2 border-brand-yellow/50 pl-4">Start Your Story</h4>
                        <p className="text-[#d1d5db] font-body text-sm mb-8 leading-[1.6]">
                            Ready to transform your travel dreams into a curated reality? Let's design your next escape today.
                        </p>
                        
                        <div className="mb-10">
                            <a 
                                href="https://wa.me/918511071506?text=Hi%20Sujal,%20I%20want%20to%20plan%20a%20trip!" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full py-4 px-8 bg-brand-yellow text-text-navy rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand-yellow/10 group"
                            >
                                <Send className="w-4 h-4 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                Plan Your Journey
                            </a>
                        </div>

                        {/* Brand Accolades */}
                        <div className="flex items-center gap-6 opacity-60">
                            <div className="flex items-center gap-2">
                                <Award className="w-5 h-5 text-brand-teal" />
                                <span className="text-[9px] font-black uppercase tracking-widest leading-none text-[#9ca3af]">Boutique<br/>certified</span>
                            </div>
                            <div className="w-px h-8 bg-white/20" />
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-current text-brand-yellow" />
                                <span className="text-[9px] font-black uppercase tracking-widest leading-none text-[#9ca3af]">5-Star<br/>Service</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Legal bar */}
                <div className="border-t border-white/5 mt-20 pt-10 pb-8 flex flex-col md:flex-row justify-between items-center text-[#9ca3af] text-[9px] uppercase font-black tracking-[0.3em] text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 mb-6 md:mb-0">
                        <p>&copy; {new Date().getFullYear()} Destination Anywhere</p>
                        <p className="hidden md:block opacity-20">|</p>
                        <p>Developed by Gravity Media Marketing</p>
                        <p className="hidden md:block opacity-20">|</p>
                        <div className="flex gap-8">
                            <Link href="#" className="hover:text-brand-yellow transition-colors duration-200">Privacy</Link>
                            <Link href="#" className="hover:text-brand-yellow transition-colors duration-200">Terms</Link>
                            <Link href="#" className="hover:text-brand-yellow transition-colors duration-200">Cookies</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 italic font-handwriting text-xl text-[#ffffff] opacity-80">
                        Made with love for the curious <Heart className="w-5 h-5 fill-brand-coral" />
                    </div>
                </div>
            </div>

            {/* MEGA TYPE SIGNATURE */}
            <div className="absolute bottom-[-1vw] left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.02]">
                <h1 className="mega-type text-[12vw] md:text-[18vw] font-black font-heading text-[#ffffff] whitespace-nowrap text-center leading-[0.7] tracking-tighter uppercase">
                    Destination Anywhere
                </h1>
            </div>
        </footer>
    );
}

function Heart({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    );
}
