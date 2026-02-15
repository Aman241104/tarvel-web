"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import clsx from "clsx";
import { Menu } from "lucide-react";

const links = [
    { name: "Destinations", href: "#" },
    { name: "Stories", href: "#" },
    { name: "About", href: "#" },
];

export default function FloatingNav() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 100);
    });

    const navItems = [
        { name: "Home", link: "#home" },
        { name: "About", link: "#about" },
        { name: "Services", link: "#services" },
        { name: "Stories", link: "#stories" },
        { name: "Contact", link: "#contact" },
    ];

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        e.preventDefault();
        const target = document.querySelector(link);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0, x: "-50%" }}
            animate={{
                y: 0,
                opacity: 1,
                x: "-50%",
                scale: isScrolled ? 0.9 : 1,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={clsx(
                "fixed top-6 left-1/2 z-50 hidden md:flex items-center justify-between px-6 py-4",
                "bg-black/20 backdrop-blur-md border border-white/10 rounded-full shadow-2xl",
                "w-[90%] md:w-auto md:min-w-[600px] transition-all duration-300"
            )}
        >
            {/* Logo */}
            <a href="#home" onClick={(e) => handleScroll(e, "#home")} className="font-heading font-bold text-white text-lg tracking-wider">
                D/A
            </a>

            {/* Desktop Links */}
            <div className={clsx(
                "hidden md:flex items-center gap-8 mx-8 font-body text-sm font-medium text-white/80",
                isScrolled ? "opacity-70" : "opacity-100",
                "transition-opacity duration-300"
            )}>
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.link}
                        onClick={(e) => handleScroll(e, item.link)}
                        className="text-sm uppercase tracking-widest hover:text-accent-gold transition-colors relative group"
                    >
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                    </a>
                ))}
            </div>

            {/* CTA */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-accent-gold text-black px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300 shadow-lg"
            >
                Book Now
            </button>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-white">
                <Menu size={24} />
            </button>
        </motion.nav>
    );
}
