"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textRef.current, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
            });
            gsap.from(buttonRef.current, {
                y: 20,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "power3.out",
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative w-full h-screen min-h-[700px] overflow-hidden rounded-b-card md:rounded-b-[0px]" // Slight mobile rounding, full on desktop
        >
            {/* Background Image - Full Width */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')", // Travel/Adventure generic
                }}
            >
                <div className="absolute inset-0 bg-arctic-dark/30"></div> {/* Overlay */}
            </div>

            <div className="relative h-full container mx-auto px-6 flex flex-col justify-end pb-24 md:pb-32">
                <h1
                    ref={textRef}
                    className="font-primary font-bold text-5xl md:text-8xl text-white uppercase tracking-wider mb-8 drop-shadow-xl"
                >
                    Explore <br /> The World
                </h1>

                <div ref={buttonRef} className="flex flex-col md:flex-row gap-4 items-start">
                    <button className="bg-arctic-orange text-white font-primary font-semibold text-sm uppercase px-10 py-5 rounded-stadium hover:scale-105 hover:bg-orange-600 transition-all duration-300 shadow-lg">
                        Plan Your Trip
                    </button>
                    <button className="bg-white/20 backdrop-blur-md border border-white/50 text-white font-primary font-semibold text-sm uppercase px-10 py-5 rounded-stadium hover:bg-white/30 transition-all duration-300 shadow-lg">
                        View Services
                    </button>
                </div>
            </div>
        </section>
    );
}
