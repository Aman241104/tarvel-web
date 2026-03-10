'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MapPin, Heart } from 'lucide-react';
import Image from 'next/image';
import { useWhatsApp } from '@/hooks/useWhatsApp';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
    const containerRef = useRef<HTMLElement>(null);
    const postcardRef = useRef<HTMLDivElement>(null);
    const { openWhatsApp } = useWhatsApp();
    const [formData, setFormData] = useState({ name: '', destination: '', message: '' });

    useGSAP(
        () => {
            gsap.from(postcardRef.current, {
                y: 100,
                rotateX: -15,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Parallax for background doodles
            gsap.to('.cta-parallax', {
                y: -50,
                rotation: 10,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        },
        { scope: containerRef }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const message = `Hi Sujal, I'm ${formData.name}. I'm dreaming of ${formData.destination || 'a trip'}. ${formData.message}`;
        openWhatsApp('Postcard Form', message);
    };

    return (
        <section ref={containerRef} className="py-24 md:py-48 bg-[#FF5A5F] relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="cta-parallax absolute top-20 left-20 w-80 h-80 border-4 border-white rounded-full animate-spin-slow" />
                 <div className="cta-parallax absolute bottom-40 right-20 w-[600px] h-[600px] border-2 border-white rounded-full" />
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center mb-16">
                <h2 className="text-white font-heading font-black text-4xl md:text-7xl mb-4 leading-none tracking-tighter opacity-100">
                    Your Journey Starts with a <span className="italic text-brand-yellow drop-shadow-lg">Note</span>
                </h2>
                <p className="text-white/90 font-body text-lg md:text-xl max-w-2xl mx-auto italic mb-10">
                    Drop us a line and let's craft an itinerary that's uniquely yours.
                </p>

                {/* Trust Signal: Recent Review Snippet */}
                <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20 text-white shadow-2xl animate-float">
                    <div className="flex -space-x-2">
                        <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                            <Image src="https://i.pravatar.cc/100?img=32" alt="Reviewer" fill className="object-cover" />
                        </div>
                    </div>
                    <div className="text-left">
                        <p className="text-[11px] font-black italic leading-tight">"Sujal made our Bali trip magical. 10/10!"</p>
                        <div className="flex gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-2.5 h-2.5 text-brand-yellow fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl">
                <div 
                    ref={postcardRef}
                    className="relative bg-white shadow-2xl p-6 md:p-12 rounded-sm transform md:rotate-[-1deg] overflow-hidden group border-[6px] md:border-[12px] border-white outline outline-1 outline-black/5"
                >
                    {/* The Center Vertical Line */}
                    <div className="absolute top-12 bottom-12 left-1/2 w-[2px] bg-gray-100 hidden md:block" />

                    <div className="flex flex-col md:flex-row gap-8 md:gap-20">
                        {/* Left Side: Message Area */}
                        <div className="flex-1 text-left">
                            <h2 className="font-handwriting text-4xl md:text-5xl text-[#2EC4B6] mb-8 md:mb-10 rotate-[-1deg] md:rotate-[-2deg]">
                                Postcard from your dreams
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                                <div className="relative group/field border-b-2 border-gray-100 focus-within:border-[#2EC4B6] transition-all pb-2">
                                    <label htmlFor="traveler-name" className="block font-handwriting text-xl md:text-2xl text-gray-400 mb-1 opacity-60 cursor-pointer">Dear,</label>
                                    <input 
                                        id="traveler-name"
                                        type="text" 
                                        placeholder="Traveler's Name"
                                        required
                                        className="w-full bg-transparent py-1 font-handwriting text-2xl text-text-navy outline-none placeholder:text-gray-200"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                
                                <div className="relative group/field border-b-2 border-gray-100 focus-within:border-[#2EC4B6] transition-all pb-2">
                                    <label htmlFor="destination" className="block font-handwriting text-xl md:text-2xl text-gray-400 mb-1 opacity-60 cursor-pointer">I'm dreaming of</label>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="text-gray-300 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                                        <input 
                                            id="destination"
                                            type="text" 
                                            placeholder="Where to?"
                                            className="w-full bg-transparent py-1 font-handwriting text-2xl text-text-navy outline-none placeholder:text-gray-200"
                                            value={formData.destination}
                                            onChange={(e) => setFormData({...formData, destination: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="relative group/field border-b-2 border-gray-100 focus-within:border-[#2EC4B6] transition-all pb-2">
                                    <label htmlFor="special-notes" className="block font-handwriting text-xl md:text-2xl text-gray-400 mb-1 opacity-60 cursor-pointer">Any special notes?</label>
                                    <textarea 
                                        id="special-notes"
                                        placeholder="Beach club, restaurants, hidden gems..."
                                        rows={2}
                                        className="w-full bg-transparent py-1 font-handwriting text-2xl text-text-navy outline-none transition-colors resize-none placeholder:text-gray-200"
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    aria-label="Send message to Sujal"
                                    className="md:hidden w-full bg-[#FF5A5F] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
                                >
                                    Send Message <Send className="w-4 h-4" aria-hidden="true" />
                                </button>
                            </form>
                        </div>

                        {/* Right Side: Stamp & Address */}
                        <div className="flex-1 flex flex-col justify-between items-end relative">
                            {/* Postage Stamp */}
                            <div className="stamp-parallax w-28 h-36 md:w-36 md:h-44 bg-white border-[4px] md:border-[6px] border-white shadow-ambient-lg rotate-[5deg] md:group-hover:rotate-0 transition-all duration-700 cursor-pointer overflow-hidden group/stamp p-1 hidden sm:block">
                                 <div className="absolute inset-0 bg-brand-yellow/10 opacity-0 group-hover/stamp:opacity-100 transition-opacity z-10" />
                                 <div className="relative w-full h-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                                      <Image 
                                        src="/assets/logo.png" 
                                        alt="Stamp" 
                                        fill 
                                        className="object-contain p-3 md:p-4 grayscale group-hover/stamp:grayscale-0 transition-all duration-700 scale-90 group-hover/stamp:scale-105" 
                                      />
                                 </div>
                            </div>

                            <div className="w-full mt-8 md:mt-16 space-y-6 md:space-y-10 text-left">
                                <div className="border-b-2 border-gray-100 pb-2 md:pb-3">
                                     <p className="font-handwriting text-2xl md:text-3xl text-gray-400 tracking-wide">Destination Anywhere & Co.</p>
                                </div>
                                <div className="border-b-2 border-gray-100 pb-2 md:pb-3">
                                     <p className="font-body font-black text-gray-400 text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-60">Global Luxury Concierge</p>
                                </div>
                                <div className="border-b-2 border-gray-100 pb-2 md:pb-3">
                                     <p className="font-body font-black text-gray-400 text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-60">Est. 2015</p>
                                </div>
                            </div>

                            <button 
                                onClick={handleSubmit}
                                className="hidden md:flex group relative bg-[#FF5A5F] text-white px-10 md:px-12 py-5 md:py-6 rounded-sm font-black text-[10px] md:text-xs uppercase tracking-widest shadow-2xl hover:rotate-1 hover:scale-105 transition-all duration-500 items-center gap-4 mt-12 md:mt-16 self-end overflow-hidden"
                            >
                                <span className="relative z-10">Send the Postcard</span>
                                <Send className="relative z-10 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>

                            <div className="mt-8 md:mt-10 flex items-center gap-3 text-gray-400 font-handwriting text-xl md:text-2xl self-end italic opacity-80">
                                With Love, Sujal <Heart className="w-4 h-4 md:w-5 md:h-5 text-[#FF5A5F] fill-[#FF5A5F] animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Faint Text Mark (Rubber Stamp Effect) */}
                    <div className="absolute bottom-4 left-4 opacity-[0.03] select-none pointer-events-none rotate-[-15deg]">
                         <p className="text-8xl font-black font-heading uppercase">Approved</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
