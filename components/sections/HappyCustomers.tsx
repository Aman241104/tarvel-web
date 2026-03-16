"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const customers = [
    { src: "/customer/image.png", name: "Priya & Rohan", trip: "Bali Honeymoon", rotate: "-rotate-3", delay: 0 },
    { src: "/customer/image copy.png", name: "The Sharma Family", trip: "Thailand Adventure", rotate: "rotate-2", delay: 0.1 },
    { src: "/customer/image copy 2.png", name: "Ananya S.", trip: "Europe Solo", rotate: "-rotate-1", delay: 0.2 },
    { src: "/customer/image copy 3.png", name: "Mehta Family", trip: "Swiss Alps", rotate: "rotate-3", delay: 0.3 },
    { src: "/customer/image copy 4.png", name: "Kavya & Dev", trip: "Maldives Escape", rotate: "-rotate-2", delay: 0.4 },
    { src: "/customer/image copy 5.png", name: "Arjun K.", trip: "Japan Discovery", rotate: "rotate-1", delay: 0.5 },
    { src: "/customer/image copy 6.png", name: "The Verma Clan", trip: "Rajasthan Royal", rotate: "-rotate-3", delay: 0.6 },
    { src: "/customer/image copy 7.png", name: "Sneha & Vikram", trip: "Dubai Luxe", rotate: "rotate-2", delay: 0.7 },
];

const washiColors = [
    "washi-tape-yellow",
    "washi-tape-coral",
    "washi-tape-teal",
    "washi-tape-yellow",
    "washi-tape-coral",
    "washi-tape-teal",
    "washi-tape-yellow",
    "washi-tape-coral",
];

export default function HappyCustomers() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Heading animation
            if (headingRef.current) {
                gsap.fromTo(
                    headingRef.current.children,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // Cards animation
            const cards = gsap.utils.toArray<HTMLElement>(".customer-card");
            if (cards.length > 0) {
                gsap.set(cards, { y: 80, scale: 0.88, opacity: 0 });
                gsap.to(cards, {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.1,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                });

                // Subtle float for each card
                cards.forEach((card, i) => {
                    gsap.to(card, {
                        y: i % 2 === 0 ? "+=8" : "-=8",
                        x: i % 3 === 0 ? "+=4" : i % 3 === 1 ? "-=4" : "+=2",
                        duration: 3.5 + i * 0.3,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: i * 0.4,
                    });
                });
            }

            // Counter animation
            const counter = sectionRef.current?.querySelector(".happy-counter");
            if (counter) {
                gsap.fromTo(
                    counter,
                    { innerText: 0 },
                    {
                        innerText: 500,
                        duration: 1.4,
                        ease: "power2.out",
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: counter,
                            start: "top 90%",
                            once: true,
                        },
                    }
                );
            }

            setTimeout(() => ScrollTrigger.refresh(), 500);
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            id="happy-customers"
            className="bg-bg-light pt-16 md:pt-24 pb-20 md:pb-28 relative overflow-hidden"
        >
            {/* Background blobs */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-brand-coral/5 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-yellow/3 blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div ref={headingRef} className="text-center mb-16 md:mb-20">
                    {/* Pill */}
                    <div className="w-full flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-coral/10 border border-brand-coral/20 text-brand-coral rounded-full text-xs font-black tracking-[0.3em] -rotate-1">
                            <Heart className="w-3 h-3 fill-current" />
                            HAPPY CUSTOMERS
                        </div>
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-text-navy leading-[1.1] tracking-tighter relative inline-flex flex-wrap justify-center items-center gap-x-4">
                        <span>Smiles We&apos;ve</span>
                        <span className="relative inline-block">
                            <span className="absolute inset-0 bg-brand-yellow -rotate-1 -skew-x-3 scale-105 z-0 shadow-md" />
                            <span className="relative z-10 px-3">Crafted</span>
                        </span>
                        <span>✈️</span>
                    </h2>

                    {/* Sub */}
                    <p className="mt-8 text-gray-500 font-body text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
                        Real travelers. Real moments. Every photo tells a story curated just for them — and soon, for you.
                    </p>

                    {/* Stats strip */}
                    <div className="flex flex-wrap justify-center items-stretch gap-6 md:gap-12 mt-12">
                        <div className="text-center flex flex-col">
                            <div className="flex items-baseline justify-center gap-1 mb-2">
                                <span className="happy-counter text-4xl md:text-5xl font-heading font-black text-text-navy tabular-nums">
                                    500
                                </span>
                                <span className="text-xl font-black text-brand-teal">+</span>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-auto">
                                Happy Travelers
                            </p>
                        </div>
                        <div className="w-px bg-black/10 hidden md:block" />
                        <div className="text-center flex flex-col">
                            <div className="flex items-center justify-center gap-0.5 mb-4 h-full min-h-[40px]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-brand-yellow text-brand-yellow" />
                                ))}
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-auto">
                                5-Star Rated
                            </p>
                        </div>
                        <div className="w-px bg-black/10 hidden md:block" />
                        <div className="text-center flex flex-col">
                            <div className="mb-2">
                                <span className="text-4xl md:text-5xl font-heading font-black text-text-navy">
                                    100%
                                </span>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-auto">
                                Recommend Us
                            </p>
                        </div>
                    </div>
                </div>

                {/* Masonry / polaroid grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16 items-start">
                    {customers.map((c, i) => (
                        <div
                            key={i}
                            className={`customer-card break-inside-avoid inline-block w-full group ${c.rotate} hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer`}
                            style={{ transformOrigin: "center top" }}
                        >
                            {/* Polaroid */}
                            <div className="bg-white shadow-[0_15px_40px_-10px_rgba(0,0,0,0.12)] rounded-sm border border-black/5 relative hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] transition-shadow duration-500">
                                {/* Washi tape top */}
                                <div
                                    className={`washi-tape ${washiColors[i % washiColors.length]} -top-3 left-1/2 -translate-x-1/2 w-16 h-8 opacity-60 group-hover:opacity-100 transition-opacity z-20`}
                                />

                                {/* Photo */}
                                <div
                                    className={`relative overflow-hidden bg-gray-100 ${i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[3/4]"
                                        }`}
                                >
                                    <img
                                        src={c.src}
                                        alt={`${c.name} - ${c.trip}`}
                                        className="w-full h-full object-cover filter saturate-[1.05] contrast-[1.02] transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3">
                                        <div className="text-white">
                                            <div className="flex gap-0.5 mb-1">
                                                {[...Array(5)].map((_, j) => (
                                                    <Star key={j} className="w-2.5 h-2.5 fill-white text-white" />
                                                ))}
                                            </div>
                                            <p className="font-body text-[10px] font-black uppercase tracking-wider opacity-90">
                                                {c.trip}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Caption */}
                                <div className="p-2 pb-3 text-center">
                                    <p className="font-handwriting text-base text-gray-500 font-bold leading-tight">
                                        {c.name}
                                    </p>
                                    <p className="font-body text-[8px] text-brand-teal font-black uppercase tracking-widest mt-0.5 opacity-80">
                                        {c.trip}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16 md:mt-20">
                    <p className="font-handwriting text-2xl md:text-3xl text-gray-400 rotate-[-1deg] mb-6">
                        Your story is next ✨
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-text-navy text-white font-body font-black text-sm uppercase tracking-widest rounded-full hover:bg-brand-teal hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-brand-teal/30"
                    >
                        <Heart className="w-4 h-4" />
                        Start Your Journey
                    </a>
                </div>
            </div>
        </section>
    );
}
