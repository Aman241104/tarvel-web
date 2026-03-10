"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import USP from "@/components/sections/USP";
import PopularDestinations from "@/components/sections/PopularDestinations";
import ServicesGrid from "@/components/ServicesGrid";
import TravelerSection from "@/components/luxury/TravelerSection";
import Testimonials from "@/components/luxury/Testimonials";
import Footer from "@/components/Footer";

import WhatsAppButton from "@/components/luxury/WhatsAppButton";
import ServicesList from "@/components/ServicesList";
import CTASection from "@/components/CTASection";
import TapeMarquee from "@/components/TapeMarquee";
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

                <section id="marquee" className="relative z-20 py-12 -my-12">
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
