"use client";

import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import USP from "@/components/sections/USP";

const PopularDestinations = dynamic(() => import("@/components/sections/PopularDestinations"));
const ServicesGrid = dynamic(() => import("@/components/ServicesGrid"));
const TravelerSection = dynamic(() => import("@/components/luxury/TravelerSection"));
const Testimonials = dynamic(() => import("@/components/luxury/Testimonials"));
const Footer = dynamic(() => import("@/components/Footer"));

import WhatsAppButton from "@/components/luxury/WhatsAppButton";
import ServicesList from "@/components/ServicesList";
const CTASection = dynamic(() => import("@/components/CTASection"));
const TapeMarquee = dynamic(() => import("@/components/TapeMarquee"));
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <main className="bg-bg-light min-h-screen relative overflow-x-hidden">

            <Navbar />
            <WhatsAppButton />

            <div className="relative z-30 bg-bg-light shadow-2xl">
                <section id="home">
                    <Hero />
                </section>

                <USP />

                {/* Micro CTA */}
                <div className="py-12 bg-bg-light text-center">
                    <a href="#contact" className="inline-flex items-center gap-3 text-text-navy font-black uppercase tracking-[0.3em] text-xs hover:text-brand-coral transition-colors group">
                        <span>Book Your Journey</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <TravelerSection />

                <section id="services">
                    <ServicesGrid />
                    
                    {/* Micro CTA */}
                    <div className="py-12 bg-bg-light text-center">
                        <a href="#contact" className="inline-flex items-center gap-3 text-text-navy font-black uppercase tracking-[0.3em] text-xs hover:text-brand-coral transition-colors group">
                            <span>Plan Your Luxury Escape</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <ServicesList />
                </section>

                <PopularDestinations />

                <Testimonials />

                {/* Micro CTA After Testimonials */}
                <div className="py-12 bg-bg-light text-center">
                    <a href="#contact" className="inline-flex items-center gap-3 text-text-navy font-black uppercase tracking-[0.3em] text-xs hover:text-brand-coral transition-colors group">
                        <span>Start Planning Your Trip</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <section id="marquee" className="relative z-20 py-12 -my-12 overflow-hidden">
                    <TapeMarquee />
                </section>
            </div>

            <section id="contact">
                <CTASection />
            </section>

            {/* Final Footer Section */}
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
