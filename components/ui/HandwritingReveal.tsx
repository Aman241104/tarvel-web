'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HandwritingRevealProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
}

export default function HandwritingReveal({
    text,
    className = '',
    speed = 0.8,
    delay = 0,
    as: Tag = 'h2'
}: HandwritingRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const chars = containerRef.current.querySelectorAll('.hw-char');

        gsap.set(chars, { opacity: 0, y: 20, rotateZ: -5 });

        gsap.to(chars, {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            duration: speed * 0.3,
            stagger: speed * 0.04,
            ease: 'back.out(2)',
            delay,
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
                once: true,
            },
        });
    }, { scope: containerRef });

    // Split text into words, then chars
    const words = text.split(' ');

    return (
        <div ref={containerRef} className={`inline-block ${className}`} aria-label={text}>
            <Tag className="inline">
                {words.map((word, wi) => (
                    <span key={wi} className="inline-block whitespace-nowrap">
                        {word.split('').map((char, ci) => (
                            <span
                                key={`${wi}-${ci}`}
                                className="hw-char inline-block"
                                aria-hidden="true"
                            >
                                {char}
                            </span>
                        ))}
                        {wi < words.length - 1 && (
                            <span className="hw-char inline-block" aria-hidden="true">&nbsp;</span>
                        )}
                    </span>
                ))}
            </Tag>
        </div>
    );
}
