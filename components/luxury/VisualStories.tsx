"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storyImages = [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506377630900-dd19f9293422?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1682695796954-bad25145f026?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1682685797661-9e05b6f4e987?q=80&w=1200&auto=format&fit=crop",
];

export default function VisualStories() {
    const containerRef = useRef<HTMLElement>(null);
    const col1Ref = useRef<HTMLDivElement>(null);
    const col2Ref = useRef<HTMLDivElement>(null);
    const col3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only run parallax on desktop
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            const ctx = gsap.context(() => {
                gsap.to(col1Ref.current, {
                    y: -100,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    }
                });
                gsap.to(col2Ref.current, {
                    y: 200,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    }
                });
                gsap.to(col3Ref.current, {
                    y: -100,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    }
                });
            }, containerRef);
            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative bg-[#0a0a0a] text-white py-16 md:py-32 overflow-hidden">

            {/* Header */}
            <div className="sticky top-10 md:top-24 z-10 text-center mb-10 md:mb-16 mix-blend-difference pointer-events-none px-4">
                <span className="text-accent-gold tracking-[0.2em] text-xs md:text-sm font-bold uppercase block mb-2 md:mb-4">
                    The Journal
                </span>
                <h2 className="text-4xl md:text-9xl font-heading font-bold uppercase tracking-tight">
                    Visual Stories
                </h2>
            </div>

            <div className="container mx-auto px-4 md:px-8">
                {/* Mobile: Horizontal Scroll Carousel */}
                <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
                    {storyImages.map((src, i) => (
                        <div key={i} className="flex-none w-[75vw] snap-center relative aspect-[3/4] overflow-hidden rounded-lg">
                            <img src={src} alt="Story" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                {/* Desktop: Parallax Grid */}
                <div className="hidden md:grid grid-cols-3 gap-6 overflow-visible">
                    <div ref={col1Ref} className="flex flex-col gap-6">
                        {storyImages.slice(0, 3).map((src, i) => (
                            <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-lg">
                                <img src={src} alt="Story" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                            </div>
                        ))}
                    </div>
                    <div ref={col2Ref} className="flex flex-col gap-6 -mt-32">
                        {storyImages.slice(3, 6).map((src, i) => (
                            <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-lg">
                                <img src={src} alt="Story" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                            </div>
                        ))}
                    </div>
                    <div ref={col3Ref} className="flex flex-col gap-6">
                        {storyImages.slice(6, 9).map((src, i) => (
                            <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-lg">
                                <img src={src} alt="Story" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
