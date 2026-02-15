'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaUserCheck, FaTags, FaHandshake, FaGlobe } from 'react-icons/fa';

const features = [
    {
        title: 'Personalized Travel Planning',
        description: 'We craft itineraries that match your unique preferences and travel style.',
        icon: FaUserCheck,
    },
    {
        title: 'Competitive Pricing',
        description: 'Get the best value for your money with our exclusive deals and transparent pricing.',
        icon: FaTags,
    },
    {
        title: 'Trusted Assistance',
        description: 'Our team is dedicated to providing reliable and trustworthy guidance throughout your journey.',
        icon: FaHandshake,
    },
    {
        title: 'End-to-End Support',
        description: 'From booking to boarding and beyond, we are with you every step of the way.',
        icon: FaGlobe,
    },
];

export default function WhyChooseUs() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Path drawing animation
            gsap.fromTo(
                '.path-line',
                { strokeDasharray: 1000, strokeDashoffset: 1000 },
                {
                    strokeDashoffset: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 1,
                    },
                }
            );

            // Icons animation
            gsap.from('.feature-node', {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                stagger: 0.3,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6 text-center mb-16 relative z-10">
                <h2 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-2">
                    Your Journey
                </h2>
                <h3 className="text-3xl md:text-5xl font-bold font-heading text-sky-900">
                    Path to Adventure
                </h3>
            </div>

            <div className="relative max-w-6xl mx-auto min-h-[600px] hidden md:block">
                {/* Wavy Path SVG */}
                <svg
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    viewBox="0 0 1000 600"
                    fill="none"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M50,100 C250,100 250,300 500,300 C750,300 750,500 950,500"
                        stroke="#BAE6FD" // sky-200
                        strokeWidth="4"
                        fill="none"
                        className="path-bg"
                    />
                    <path
                        d="M50,100 C250,100 250,300 500,300 C750,300 750,500 950,500"
                        stroke="#0284C7" // sky-600
                        strokeWidth="4"
                        fill="none"
                        className="path-line"
                    />
                </svg>

                {/* Feature Nodes positioned along the path */}
                {/* Node 1 */}
                <div className="feature-node absolute top-[10%] left-[5%] transform -translate-y-1/2 flex flex-col items-center group">
                    <div className="w-20 h-20 bg-white border-4 border-sky-500 rounded-full flex items-center justify-center text-3xl text-sky-600 shadow-xl z-10 group-hover:scale-110 transition-transform">
                        <FaUserCheck />
                    </div>
                    <div className="mt-4 bg-white p-4 rounded-xl shadow-lg border border-sky-100 max-w-xs text-center opacity-0 group-hover:opacity-100 transition-opacity absolute top-20 w-64">
                        <h4 className="font-bold text-sky-900">Personalized Planning</h4>
                        <p className="text-xs text-gray-500">We craft itineraries just for you.</p>
                    </div>
                </div>

                {/* Node 2 */}
                <div className="feature-node absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                    <div className="w-24 h-24 bg-sky-600 border-4 border-white rounded-full flex items-center justify-center text-4xl text-white shadow-xl z-10 group-hover:scale-110 transition-transform">
                        <FaTags />
                    </div>
                    <div className="mt-4 bg-white p-4 rounded-xl shadow-lg border border-sky-100 max-w-xs text-center opacity-0 group-hover:opacity-100 transition-opacity absolute top-24 w-64 z-20">
                        <h4 className="font-bold text-sky-900">Best Prices</h4>
                        <p className="text-xs text-gray-500">Competitive pricing for every budget.</p>
                    </div>
                </div>

                {/* Node 3 */}
                <div className="feature-node absolute bottom-[16%] right-[5%] transform -translate-y-1/2 flex flex-col items-center group">
                    <div className="w-20 h-20 bg-white border-4 border-sky-500 rounded-full flex items-center justify-center text-3xl text-sky-600 shadow-xl z-10 group-hover:scale-110 transition-transform">
                        <FaGlobe />
                    </div>
                    <div className="mt-4 bg-white p-4 rounded-xl shadow-lg border border-sky-100 max-w-xs text-center opacity-0 group-hover:opacity-100 transition-opacity absolute top-20 w-64 right-0">
                        <h4 className="font-bold text-sky-900">End-to-End Support</h4>
                        <p className="text-xs text-gray-500">We are with you every step.</p>
                    </div>
                </div>
            </div>

            {/* Mobile Vertical Layout */}
            <div className="md:hidden flex flex-col gap-8 px-6 relative z-10">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 bg-sky-50 p-6 rounded-2xl border border-sky-100">
                        <div className="text-3xl text-sky-600"><feature.icon /></div>
                        <div>
                            <h4 className="font-bold text-gray-900">{feature.title}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
