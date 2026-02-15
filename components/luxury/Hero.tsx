"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import useMagnetic from "@/hooks/useMagnetic";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const planeRef = useRef<HTMLDivElement>(null);

    useMagnetic(btnRef);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Curtain Reveal
            tl.fromTo(imageRef.current,
                { scale: 1.2, filter: "brightness(0.5)" },
                { scale: 1, filter: "brightness(1)", duration: 2, ease: "power4.out" }
            );

            // Parallax Effects
            gsap.to(imageRef.current, {
                yPercent: 20,
                scale: 1.15,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            gsap.to(titleRef.current, {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Plane Animation
            gsap.to(planeRef.current, {
                motionPath: {
                    path: [{ x: "0vw", y: "0vh" }, { x: "100vw", y: "-50vh" }],
                    curviness: 1.5,
                    autoRotate: true,
                },
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            // Staggered Text Reveal
            const words = titleRef.current?.innerText.split(" ");
            if (titleRef.current) {
                titleRef.current.innerHTML = "";
                words?.forEach((word) => {
                    const span = document.createElement("span");
                    span.innerText = word + " ";
                    span.style.display = "inline-block";
                    span.style.overflow = "hidden";
                    span.style.verticalAlign = "bottom";

                    const inner = document.createElement("span");
                    inner.innerText = word;
                    inner.style.display = "inline-block";
                    inner.className = "word-inner";

                    span.innerHTML = "";
                    span.appendChild(inner);
                    titleRef.current?.appendChild(span);
                });
            }

            tl.fromTo(".word-inner",
                { y: "100%" },
                { y: "0%", duration: 1, stagger: 0.1, ease: "power4.out" },
                "-=1.5"
            );

            // Button Reveal
            tl.fromTo(btnRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                "-=1"
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center text-white">

            {/* Background Image: Above Clouds */}
            <div className="absolute inset-0 z-0 h-full w-full">
                <div
                    ref={imageRef}
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2674&auto=format&fit=crop')" }}
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            </div>

            {/* Flying Plane */}
            <div ref={planeRef} className="absolute left-[-10vw] bottom-[20vh] z-20 w-32 h-32 pointer-events-none opacity-80 mix-blend-overlay">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white rotate-45">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <div className="mb-4 md:mb-6 flex justify-center">
                    <span className="px-3 py-1 rounded-full border border-white/30 text-[10px] md:text-xs font-mono uppercase tracking-widest backdrop-blur-md">
                        Travel Anywhere
                    </span>
                </div>

                <h1 ref={titleRef} className="relative z-10 flex flex-col items-center justify-center leading-none tracking-tighter mix-blend-difference mb-6 md:mb-8">
                    <span className="block text-4xl md:text-9xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 filter drop-shadow-lg">
                        EXPLORE
                    </span>
                    <span className="block text-4xl md:text-9xl font-heading font-thin italic text-white/90">
                        THE WORLD
                    </span>
                </h1>

                <p className="mt-4 md:mt-8 text-base md:text-2xl font-light font-body max-w-lg mx-auto opacity-80">
                    Curated expeditions for the modern explorer.
                </p>

                <div className="mt-8 md:mt-12 flex justify-center">
                    <button
                        ref={btnRef}
                        onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                        className="group relative bg-white text-black px-8 py-4 md:px-12 md:py-6 rounded-full text-sm md:text-base font-bold uppercase tracking-wider overflow-hidden hover:scale-105 transition-transform duration-300"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Explore
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-accent-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-center opacity-70 z-20">
                <span className="text-[9px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-4 block text-white/60">Scroll to Explore</span>
                <motion.div
                    animate={{ height: [0, 60, 0], y: [0, 0, 60] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] bg-gradient-to-b from-white to-transparent mx-auto"
                />
            </div>
        </section>
    );
}
