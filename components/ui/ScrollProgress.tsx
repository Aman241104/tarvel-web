'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!barRef.current) return;

        gsap.to(barRef.current, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3,
            },
        });
    });

    return (
        <div
            ref={barRef}
            className="fixed top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent-gold via-sky-primary to-accent-gold origin-left z-[9999] pointer-events-none"
            style={{ transform: 'scaleX(0)' }}
        />
    );
}
