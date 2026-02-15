'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            textRef.current,
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 80%',
                },
            }
        );

        gsap.fromTo(
            imageRef.current,
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: 'top 80%',
                },
            }
        );
    }, []);

    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div ref={textRef} className="md:w-1/2">
                        <h2 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-3">
                            Who We Are
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-extrabold font-heading text-sky-900 mb-8 leading-tight">
                            Crafting <span className="text-sky-500">Memories,</span> <br /> Not Just Trips.
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                            Sujal Soni founded <strong>Destination Anywhere & Co.</strong> with a simple belief:
                            travel should be about the destination, not the stress of planning. With a deep passion
                            for exploration, we curate journeys that are seamless, personalized, and unforgettable.
                        </p>
                        <div className="flex gap-4 mt-8">
                            <div className="px-6 py-3 bg-sky-50 rounded-full text-sky-700 font-semibold text-sm">Passionate Team</div>
                            <div className="px-6 py-3 bg-sky-50 rounded-full text-sky-700 font-semibold text-sm">24/7 Support</div>
                        </div>
                    </div>
                    <div ref={imageRef} className="md:w-1/2 relative h-[400px]">
                        {/* Abstract Rounded Image Composition */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200 rounded-full overflow-hidden border-4 border-white shadow-xl z-20">
                            <div className="w-full h-full bg-gray-300 bg-[url('https://source.unsplash.com/random/400x400?travel')] bg-cover"></div>
                        </div>
                        <div className="absolute bottom-0 left-10 w-48 h-48 bg-sky-100 rounded-full overflow-hidden border-4 border-white shadow-lg z-10">
                            <div className="w-full h-full bg-gray-300 bg-[url('https://source.unsplash.com/random/300x300?airplane')] bg-cover"></div>
                        </div>
                        {/* Decorative dot/circle */}
                        <div className="absolute top-1/2 left-0 w-12 h-12 bg-sky-400 rounded-full border-4 border-white shadow-md z-30 animate-bounce-slow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
