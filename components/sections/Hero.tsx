'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { FaPlane } from 'react-icons/fa';

export default function Hero() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonsRef = useRef(null);
    const planeRef = useRef(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.5 })
            .fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4')
            .fromTo(buttonsRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');

        // Airplane animation loop - Only on Desktop
        if (!isMobile) {
            gsap.to(planeRef.current, {
                x: '120vw',
                y: -100,
                duration: 15,
                repeat: -1,
                ease: 'none',
                delay: 1,
            });
        }
    }, []);

    return (
        <section ref={heroRef} id="hero" className="relative pt-32 pb-12 px-2 md:px-6">
            {/* Large Rounded Image Container */}
            <div className="relative w-full max-w-[95%] mx-auto h-[70vh] h-[70dvh] md:h-[85vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl md:shadow-2xl bg-sky-200">
                
                <Image
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
                    alt="Hero Background"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/25"></div> {/* Overlay for text readability */}

                {/* Airplane Animation */}
                <div
                    ref={planeRef}
                    className="absolute top-[20%] right-[-10%] text-white/80 text-6xl md:text-8xl transform -rotate-12 z-10 hidden md:block"
                >
                    <FaPlane className="drop-shadow-lg" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
                    <h1
                        ref={titleRef}
                        className="text-4xl sm:text-5xl md:text-8xl font-extrabold font-heading text-white mb-6 drop-shadow-md leading-tight"
                    >
                        EXPLORE <br />
                        <span className="text-sky-100">THE WORLD</span>
                    </h1>
                    <p
                        ref={subtitleRef}
                        className="text-base md:text-2xl text-sky-50 mb-10 md:mb-12 max-w-2xl mx-auto font-medium drop-shadow-sm"
                    >
                        Your Journey Begins Anywhere. <br /> International & Domestic Packages.
                    </p>

                    {/* Integrated/Masked Buttons */}
                    <div
                        ref={buttonsRef}
                        className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto px-6 md:px-0"
                    >
                        <a
                            href="#contact"
                            className="px-8 py-3.5 md:px-10 md:py-4 bg-white text-sky-600 font-bold rounded-full shadow-lg hover:bg-sky-50 transition-all transform active:scale-95"
                        >
                            Plan Your Journey
                        </a>
                        <a
                            href="#services"
                            className="px-8 py-3.5 md:px-10 md:py-4 bg-sky-500/30 backdrop-blur-sm md:backdrop-blur-md border border-white/50 text-white font-bold rounded-full shadow-lg hover:bg-sky-500/50 transition-all transform active:scale-95"
                        >
                            View Services
                        </a>
                    </div>
                </div>

                {/* Decorative Elements inside the container - Hidden on Mobile */}
                <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-white/30 rounded-full animate-spin-slow hidden md:block"></div>
                <div className="absolute top-10 right-10 w-16 h-16 bg-white/20 rounded-full blur-xl animate-pulse hidden md:block"></div>
            </div>
        </section>
    );
}
