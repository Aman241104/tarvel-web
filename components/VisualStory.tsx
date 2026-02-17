'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stories = [
    {
        id: 1,
        title: 'Not Just a Trip',
        highlightWord: 'Trip',
        description:
            "We believe travel shouldn't just be about checking boxes. It's about getting lost in the right direction and finding stories you'll tell for a lifetime.",
        image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=600&q=80',
        shapeClass: 'rounded-[2.5rem]', // Soft Bento
        accentColor: 'text-[#FF6B6B]', // Coral
        Icon: Sparkles,
    },
    {
        id: 2,
        title: 'Local Secrets',
        highlightWord: 'Secrets',
        description:
            "Our guides aren't just maps; they're whispers from locals. Find the hidden cafe, the secret beach cove, and the street food vendor everyone misses.",
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80', // Greek street/food
        shapeClass: 'rounded-[2.5rem]', // Soft Bento
        accentColor: 'text-[#4ECDC4]', // Teal
        Icon: ArrowRight,
    },
    {
        id: 3,
        title: 'Tech-Free Zones',
        highlightWord: 'Free',
        description:
            "Disconnect to reconnect. We curate spaces where the wifi is weak but the connection is strong. Swap scrolling for stargazing.",
        image: 'https://images.unsplash.com/photo-1445307840119-2701d8fb3a3c?auto=format&fit=crop&w=600&q=80', // Camping/Stars
        shapeClass: 'rounded-[2rem] rotate-3', // Clover-ish / Rotated Rect
        accentColor: 'text-[#FACC15]', // Yellow
        Icon: Star,
    },
];

export default function VisualStory() {
    const containerRef = useRef<HTMLElement>(null);
    const storyRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            storyRefs.current.forEach((story, i) => {
                if (!story) return;

                const img = story.querySelector('.story-image');
                const text = story.querySelector('.story-text');

                // Image Reveal
                gsap.fromTo(
                    img,
                    { scale: 0.8, opacity: 0, rotation: 5 },
                    {
                        scale: 1,
                        opacity: 1,
                        rotation: 0,
                        duration: 1.2,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: story,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                // Text Slide
                const xStart = i % 2 === 0 ? -50 : 50; // Slide from left for odd, right for even (desktop visual logic varies but consistent direction helps)
                // Actually, let's make it slide TOWARDS center.
                // Block 1 (Text Left): Text slides from left (-50)
                // Block 2 (Text Right): Text slides from right (50)
                // Block 3 (Text Left): Text slides from left (-50)

                gsap.fromTo(
                    text,
                    { x: xStart, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: story,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                )
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="py-12 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                {stories.map((story, index) => {
                    const isReversed = index % 2 !== 0; // Even index (0, 2) = Left Text, Odd (1) = Right Text

                    return (
                        <div
                            key={story.id}
                            ref={(el) => { storyRefs.current[index] = el; }}
                            className={`flex flex-col items-center gap-8 md:gap-24 mb-12 md:mb-20 last:mb-0 w-full ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                                }`}
                        >
                            {/* Text Side */}
                            <div className="story-text flex-1 text-center md:text-left relative">
                                {/* Doodle Icon */}
                                <div className={`absolute -top-8 ${isReversed ? '-right-4' : '-left-4'} hidden md:block opacity-20`}>
                                    <story.Icon className={`w-12 h-12 ${story.accentColor.replace('text-', 'stroke-')}`} />
                                </div>

                                <h2 className="text-4xl md:text-5xl font-bold font-heading text-[#2D2D2D] mb-6 leading-tight">
                                    {story.title.split(' ').map((word, wIndex) => (
                                        <span
                                            key={wIndex}
                                            className={word.includes(story.highlightWord) ? story.accentColor : ''}
                                        >
                                            {word}{' '}
                                        </span>
                                    ))}
                                </h2>
                                <p className="text-lg text-gray-600 font-sans leading-relaxed max-w-md mx-auto md:mx-0">
                                    {story.description}
                                </p>
                            </div>

                            {/* Image Side */}
                            <div className="story-image flex-1 relative w-full max-w-lg aspect-[4/5] md:aspect-square">
                                <div
                                    className={`relative w-full h-full overflow-hidden shadow-2xl border-4 border-white ${story.shapeClass}`}
                                >
                                    <Image
                                        src={story.image}
                                        alt={story.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 500px"
                                    />
                                </div>
                                {/* Decorative blob/bg behind image? Optional but adds depth */}
                                <div className={`absolute inset-0 -z-10 transform translate-x-4 translate-y-4 ${story.shapeClass} bg-gray-100/50`} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
