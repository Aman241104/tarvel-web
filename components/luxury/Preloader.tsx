"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Counter Animation
            const counterObj = { value: 0 };
            tl.to(counterObj, {
                value: 100,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => setCount(Math.floor(counterObj.value))
            });

            // Text Reveal (Simple Fade/Slide for now, SplitText requires paid plugin or manual split)
            tl.fromTo(textRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=1.5"
            );

            // Exit Animation
            tl.to(containerRef.current, {
                y: "-100%",
                duration: 1.5,
                ease: "power4.inOut",
                delay: 0.5
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center overflow-hidden"
        >
            <div className="absolute bottom-12 right-12 text-9xl font-heading font-bold opacity-20">
                {count}%
            </div>

            <h1 ref={textRef} className="text-4xl md:text-7xl font-heading font-bold tracking-widest uppercase text-center">
                Destination <br /> Anywhere
            </h1>
        </div>
    );
}
