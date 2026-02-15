"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCompass, FaMapMarkedAlt } from "react-icons/fa";

export default function IntroPhilosophy() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Dashed Line Animation
            gsap.fromTo(
                ".dashed-path",
                { strokeDasharray: 20, strokeDashoffset: 1000 },
                {
                    strokeDashoffset: 0,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                    },
                }
            );

            // Node Pop-in
            gsap.from(".decor-node", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                stagger: 0.3,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                }
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-arctic-white relative overflow-hidden">
            {/* Decorative Dashed Path Background */}
            <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20"
                viewBox="0 0 1440 600"
                preserveAspectRatio="none"
            >
                <path
                    d="M-50,300 C200,100 400,500 700,300 S1200,100 1500,300"
                    fill="none"
                    stroke="#FF4500"
                    strokeWidth="3"
                    strokeDasharray="15 15"
                    className="dashed-path"
                />
            </svg>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                {/* Icon & Quote */}
                <div className="decor-node w-20 h-20 bg-arctic-snow rounded-full flex items-center justify-center text-arctic-orange text-3xl mb-8 shadow-sm">
                    <FaCompass />
                </div>

                <blockquote className="max-w-4xl mx-auto">
                    <p className="font-primary font-bold text-3xl md:text-5xl text-arctic-dark leading-tight mb-6">
                        "Your Journey Begins Anywhere."
                    </p>
                    <cite className="not-italic font-secondary text-arctic-grey text-lg">
                        — Destination Anywhere & Co.
                    </cite>
                </blockquote>

                {/* Decorative Nodes imitating a map route */}
                <div className="mt-16 flex gap-8 items-center justify-center">
                    <div className="decor-node w-3 h-3 bg-arctic-orange rounded-full"></div>
                    <div className="decor-node w-3 h-3 bg-arctic-gold rounded-full"></div>
                    <div className="decor-node w-3 h-3 bg-arctic-orange rounded-full"></div>
                </div>
            </div>
        </section>
    );
}
