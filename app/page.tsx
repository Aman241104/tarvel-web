"use client";

import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import USP from "@/components/sections/USP";
import WhatsAppButton from "@/components/luxury/WhatsAppButton";
import ServicesList from "@/components/ServicesList";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import PostItCTA from "@/components/ui/PostItCTA";
import { ArrowRight } from 'lucide-react';

const PopularDestinations = dynamic(() => import("@/components/sections/PopularDestinations"));
const ServicesGrid = dynamic(() => import("@/components/ServicesGrid"));
const TravelerSection = dynamic(() => import("@/components/luxury/TravelerSection"));
const Testimonials = dynamic(() => import("@/components/luxury/Testimonials"));
const Footer = dynamic(() => import("@/components/Footer"));
const CTASection = dynamic(() => import("@/components/CTASection"));
const TapeMarquee = dynamic(() => import("@/components/TapeMarquee"));
const InstagramFeed = dynamic(() => import("@/components/sections/InstagramFeed"));

export default function Home() {
    return (
        <main className="bg-bg-light min-h-screen relative overflow-x-hidden">

            <Navbar />
            <WhatsAppButton />
            <PostItCTA />

            <div className="relative z-30 bg-bg-light shadow-2xl">
                <section id="home">
                    <Hero />
                </section>

                {/* 1. USP Section */}
                <section id="usp">
                    <USP />
                </section>

                {/* Micro CTA */}
                <div className="py-4 bg-bg-light text-center">
                    <a href="#contact" className="inline-flex items-center gap-3 text-text-navy font-black uppercase tracking-[0.3em] text-[10px] hover:text-brand-coral transition-colors group">
                        <span>Book Your Journey</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* 2. Services Section */}
                {/* Updated Services Section: Boutique Luggage Tag Focus */}
                <section id="services" className="overflow-visible">
                    <div className="relative z-30">
                        <ServicesList />
                    </div>
                </section>

                {/* 3. About the Captain */}
                <TravelerSection />

                {/* 4. Packages Section (Popular Destinations) */}
                <section id="packages">
                    <PopularDestinations />
                </section>

                <section id="marquee" className="relative z-20 py-8 md:py-12 overflow-hidden">
                    <TapeMarquee />
                </section>

                {/* 5. Testimonials Section */}
                <section id="testimonials">
                    <Testimonials />
                </section>

                <InstagramFeed />
            </div>

            {/* 6. Contact Us Section */}
            <section id="contact">
                <CTASection />
            </section>

            {/* Final Footer Section */}
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
