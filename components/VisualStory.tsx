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
        image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=600&q=80', // Camping/Stars
        shapeClass: 'rounded-[2.5rem]', // Consistent Soft Bento
        accentColor: 'text-[#D97706]', // Darker Amber/Gold for better white bg contrast
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

                const imgContainer = story.querySelector('.story-image-container');
                const img = story.querySelector('.story-image');
                const text = story.querySelector('.story-text');
                const brushUnderline = story.querySelector('.brush-underline');

                // Advanced Image Reveal with 3D feel
                gsap.fromTo(
                    imgContainer,
                    { scale: 0.9, opacity: 0, rotateY: 15 },
                    {
                        scale: 1,
                        opacity: 1,
                        rotateY: 0,
                        duration: 1.5,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: story,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                // Text Staggered Reveal
                gsap.fromTo(
                    text,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: story,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );

                // Brush-stroke underline draw
                if (brushUnderline) {
                    gsap.fromTo(
                        brushUnderline,
                        { strokeDashoffset: 200 },
                        {
                            strokeDashoffset: 0,
                            duration: 1.2,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: story,
                                start: 'top 70%',
                            }
                        }
                    );
                }

                // Parallax Effect (Smooth scrub)
                if (img) {
                    gsap.fromTo(
                        img,
                        { scale: 1.2, yPercent: -10 },
                        {
                            scale: 1,
                            yPercent: 10,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: story,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true,
                            },
                        }
                    );
                }
            });

            // Section Progress Tracker (Dot Indicator)
            const dots = containerRef.current?.querySelectorAll('.progress-dot');
            storyRefs.current.forEach((story, i) => {
                if (!story || !dots?.[i]) return;
                ScrollTrigger.create({
                    trigger: story,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => gsap.to(dots[i], { scale: 1.5, backgroundColor: '#FF6B6B', duration: 0.3 }),
                    onLeave: () => gsap.to(dots[i], { scale: 1, backgroundColor: '#E2E8F0', duration: 0.3 }),
                    onEnterBack: () => gsap.to(dots[i], { scale: 1.5, backgroundColor: '#FF6B6B', duration: 0.3 }),
                    onLeaveBack: () => gsap.to(dots[i], { scale: 1, backgroundColor: '#E2E8F0', duration: 0.3 }),
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="py-20 md:py-40 bg-white paper-cool overflow-hidden relative">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-20 md:mb-32 max-w-2xl mx-auto">
                    <span className="text-brand-coral font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 block">Visual Stories</span>
                    <h2 className="text-4xl md:text-7xl font-heading font-black text-text-navy leading-none">The Art of <br/><span className="italic text-brand-teal">Exploration</span></h2>
                </div>

                {stories.map((story, index) => {
                    const isReversed = index % 2 !== 0;
                    const rotation = index % 2 === 0 ? '-rotate-1' : 'rotate-1';

                    return (
                        <div
                            key={story.id}
                            ref={(el) => { storyRefs.current[index] = el; }}
                            className={`flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-24 mb-24 md:mb-40 lg:mb-56 last:mb-0 w-full ${isReversed ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Text Side */}
                            <div className="story-text w-full lg:w-[45%] text-left relative">
                                <span className="text-7xl md:text-8xl font-black text-black/[0.03] absolute -top-8 md:-top-20 left-0 md:-left-8 select-none">0{index + 1}</span>
                                
                                <h2 className="text-3xl md:text-6xl font-black font-heading text-text-navy mb-6 md:mb-8 leading-[1.1] tracking-tight relative z-10">
                                    {story.title.split(' ').map((word, wIndex) => (
                                        <span
                                            key={wIndex}
                                            className={`relative inline-block ${word.includes(story.highlightWord) ? (
                                                index === 0 ? 'text-brand-coral' : index === 1 ? 'text-brand-teal' : 'text-brand-yellow'
                                            ) : ''}`}
                                        >
                                            {word}{' '}
                                            {word.includes(story.highlightWord) && (
                                                <svg className="absolute -bottom-2 left-0 w-full h-4 z-0" viewBox="0 0 200 12" preserveAspectRatio="none">
                                                    <path
                                                        className="brush-underline"
                                                        d="M2 9C15 4 30 11 50 7C70 3 85 12 105 6C125 2 140 10 160 8C175 5 190 11 198 7"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="6"
                                                        strokeLinecap="round"
                                                        style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
                                                    />
                                                </svg>
                                            )}
                                        </span>
                                    ))}
                                </h2>
                                <p className="text-base md:text-xl text-gray-500 font-body leading-relaxed max-w-md opacity-80 mb-8 md:mb-0">
                                    {story.description}
                                </p>
                                
                                <button className="hidden md:flex group items-center gap-3 text-sm font-black uppercase tracking-widest text-text-navy hover:text-brand-coral transition-colors mt-10">
                                    Read Full Story
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>

                            {/* Image Side */}
                            <div className="story-image-container w-full lg:w-[50%] relative aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5] perspective-1000">
                                <div
                                    className={`relative w-full h-full overflow-hidden border-[6px] md:border-[12px] border-white ${story.shapeClass} ${rotation} shadow-2xl group`}
                                >
                                    <Image
                                        src={story.image}
                                        alt={story.title}
                                        fill
                                        className="story-image object-cover filter-printed transition-transform duration-1000"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 800px"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </div>
                                {/* Decorative elements */}
                                <div className={`absolute -inset-2 md:-inset-6 -z-10 transform translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 ${story.shapeClass} ${rotation} bg-gray-50 opacity-40 border border-black/5`} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
