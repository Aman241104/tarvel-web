'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${scrolled
                    ? 'w-[90%] md:w-auto bg-white/80 backdrop-blur-md shadow-xl py-3 px-8 rounded-full border border-white/20'
                    : 'w-[90%] md:w-auto bg-white/60 backdrop-blur-sm py-4 px-8 rounded-full mt-2'
                }`}
        >
            <div className="flex justify-between items-center gap-8">
                <Link href="/" className="text-xl font-bold font-heading text-sky-600 whitespace-nowrap">
                    Destination Anywhere
                </Link>
                <div className="hidden md:flex space-x-6 items-center whitespace-nowrap">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-700 hover:text-sky-500 font-medium transition-colors text-sm uppercase tracking-wide"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden md:block">
                    <a
                        href="https://wa.me/918511071506"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sky-500 text-white px-5 py-2 rounded-full hover:bg-sky-600 transition-colors flex items-center gap-2 text-sm font-semibold shadow-md active:scale-95 transform duration-150"
                    >
                        <FaWhatsapp /> Plan Trip
                    </a>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-700 text-2xl"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 mt-4 w-full bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-6 flex flex-col items-center space-y-4 border border-gray-100">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-gray-700 hover:text-sky-500 font-medium text-lg w-full text-center py-2"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="https://wa.me/918511071506"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sky-500 text-white px-8 py-3 rounded-full hover:bg-sky-600 transition-colors flex items-center gap-2 w-full justify-center shadow-lg"
                    >
                        <FaWhatsapp /> Plan Trip
                    </a>
                </div>
            )}
        </nav>
    );
}
