"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        quote: "Completely seamless experience from start to finish. We didn't have to worry about a single detail.",
        author: "Family Traveler",
        highlight: "0 Stress",
        rotation: "-rotate-2",
        bgColor: "bg-[#FFFBF5]"
    },
    {
        id: 2,
        quote: "The personalized touch and handpicked stays were incredible. We've already booked our next journey!",
        author: "Milestone Celebration",
        highlight: "100% Trust",
        rotation: "rotate-2",
        bgColor: "bg-white"
    },
    {
        id: 3,
        quote: "Sujal protects your time. If you want stress-free travel that exceeds expectations, this is it.",
        author: "Business Professional",
        highlight: "Exceptional",
        rotation: "-rotate-1",
        bgColor: "bg-[#F8FAFB]"
    }
];

export default function Testimonials() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.testimonial-card');
        
        if (cards.length > 0) {
            // Initial state check (prevent flashes)
            gsap.set(cards, { opacity: 0, y: 60, scale: 0.9 });

            // Staggered reveal for cards
            gsap.to(cards, {
                y: 0,
                opacity: 1,
                scale: 1,
                rotation: (i) => i % 2 === 0 ? -2 : 2,
                duration: 0.8,
                stagger: 0.1,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 90%', // Earlier trigger
                    toggleActions: 'play none none reverse',
                }
            });
        }

        // Wavy line draw
        const wavyLine = containerRef.current?.querySelector('.wavy-line');
        if (wavyLine) {
            gsap.fromTo(wavyLine,
                { strokeDashoffset: 400 },
                {
                    strokeDashoffset: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 90%',
                    }
                }
            );
        }
    }, { scope: containerRef });

    return (
        <section id="testimonials" ref={containerRef} className="py-20 md:py-32 bg-bg-light relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16 relative inline-block mx-auto w-full">
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-text-navy relative z-10 inline-block">
                        Voices of Journey
                        <svg className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 md:w-64 h-8 z-0" viewBox="0 0 200 40" fill="none">
                            <path 
                                className="wavy-line" 
                                d="M5 20 Q 50 0 100 20 T 195 20" 
                                stroke="#FFBF00" 
                                strokeWidth="4" 
                                strokeLinecap="round" 
                                style={{ strokeDasharray: 400, strokeDashoffset: 400 }}
                            />
                        </svg>
                    </h2>
                    <p className="mt-8 text-gray-500 font-body text-lg max-w-xl mx-auto opacity-80">
                        We don't just book trips, we protect your precious time. Here's what our travelers say.
                    </p>

                    {/* Trust Block (2026 Trend) */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-10">
                        <div className="flex items-center gap-2 text-gray-400 hover:text-text-navy transition-colors">
                            <svg className="w-4 h-4 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[10px] font-black uppercase tracking-widest">Verified Reviews</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 hover:text-text-navy transition-colors">
                            <svg className="w-4 h-4 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[10px] font-black uppercase tracking-widest">Zero Hidden Fees</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 hover:text-text-navy transition-colors">
                            <svg className="w-4 h-4 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[10px] font-black uppercase tracking-widest">24/7 Concierge</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-16 items-stretch">
                    {testimonials.map((t, i) => (
                        <div 
                            key={t.id}
                            className={`testimonial-card bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-black/5 relative group hover:scale-[1.02] transition-all duration-700 flex flex-col h-full ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                        >
                            {/* Tape Piece */}
                            <div className={`washi-tape -top-4 left-1/2 -translate-x-1/2 w-24 h-10 -rotate-2 ${i % 3 === 0 ? 'washi-tape-yellow' : i % 3 === 1 ? 'washi-tape-coral' : 'washi-tape-teal'} opacity-40 group-hover:opacity-100 transition-opacity`} />
                            
                            <div className="flex gap-1 text-brand-yellow mb-8 relative z-10 scale-90 origin-left">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-5 h-5 fill-current" />
                                ))}
                            </div>
                            
                            <p className="font-heading text-xl md:text-2xl text-text-navy leading-snug mb-10 relative z-10 flex-grow italic opacity-90">
                                "{t.quote}"
                            </p>
                            
                            <div className="mt-auto border-t border-black/5 pt-6">
                                <div className="font-handwriting text-3xl md:text-4xl text-brand-teal rotate-[-1deg] mb-2 font-black">
                                    {t.highlight}
                                </div>
                                <div className="font-body font-black text-gray-400 text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-60">
                                    {t.author}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
