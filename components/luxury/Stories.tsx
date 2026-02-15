"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stories = [
    {
        id: 1,
        title: "The Silent Fjord",
        location: "Norway",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Desert Winds",
        location: "Morocco",
        image: "https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Temple of Dawn",
        location: "Thailand",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2639&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Highland Mist",
        location: "Scotland",
        image: "https://images.unsplash.com/photo-1506377630900-dd19f9293422?q=80&w=2670&auto=format&fit=crop"
    }
];

export default function Stories() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray(".story-item");

            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: () => "+=" + triggerRef.current!.offsetWidth // Scroll amount same as width
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-text-dark text-white overflow-hidden">
            <div ref={triggerRef} className="flex h-screen w-[400vw]">

                {/* Intro Panel */}
                <div className="story-item w-screen h-screen flex items-center justify-center bg-text-dark shrink-0">
                    <div className="text-center px-6">
                        <span className="text-accent-gold tracking-widest uppercase text-sm font-bold block mb-4">Travel Journal</span>
                        <h2 className="text-6xl md:text-8xl font-heading font-bold mb-8">
                            Visual <br /> Stories
                        </h2>
                        <p className="text-white/50 max-w-md mx-auto">Scroll to explore our latest expeditions captured on film.</p>
                    </div>
                </div>

                {/* Story Panels */}
                {stories.map((story) => (
                    <div key={story.id} className="story-item w-screen h-screen flex items-center justify-center shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            <img
                                src={story.image}
                                alt={story.title}
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-black/30" />
                        </div>
                        <div className="relative z-10 text-center">
                            <h3 className="text-5xl md:text-7xl font-heading font-bold mb-2">{story.title}</h3>
                            <p className="text-xl font-mono text-accent-gold">{story.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
