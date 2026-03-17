"use client";

import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import USP from "@/components/sections/USP";
import WhatsAppButton from "@/components/luxury/WhatsAppButton";
import ServicesList from "@/components/ServicesList";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { ArrowRight } from 'lucide-react';

const PopularDestinations = dynamic(() => import("@/components/sections/PopularDestinations"));
const ServicesGrid = dynamic(() => import("@/components/ServicesGrid"));
const TravelerSection = dynamic(() => import("@/components/luxury/TravelerSection"));
const Testimonials = dynamic(() => import("@/components/luxury/Testimonials"));
const Footer = dynamic(() => import("@/components/Footer"));
const CTASection = dynamic(() => import("@/components/CTASection"));
const TapeMarquee = dynamic(() => import("@/components/TapeMarquee"));
const InstagramFeed = dynamic(() => import("@/components/sections/InstagramFeed"));
const HappyCustomers = dynamic(() => import("@/components/sections/HappyCustomers"));

export default function Home() {
    return (
        <main className="bg-bg-light min-h-screen relative overflow-x-hidden">

            <WhatsAppButton />
            <MobileStickyCTA />

            <div className="relative z-30 bg-bg-light shadow-2xl">
                <section id="home">
                    <Hero />
                </section>

                {/* 1. USP Section */}
                <section id="usp">
                    <USP />
                </section>

                <section id="marquee-top" className="relative z-20 py-8 md:py-12 overflow-hidden">
                    <TapeMarquee />
                </section>

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

                {/* 5. Testimonials Section */}
                <section id="testimonials">
                    <Testimonials />
                </section>

                {/* 6. Happy Customers Section */}
                <section id="happy-customers">
                    <HappyCustomers />
                </section>

                <section id="marquee-bottom" className="relative z-20 py-8 md:py-12 overflow-hidden">
                    <TapeMarquee reverse rotate={1} speed={30} text="Bespoke Itineraries 🗺 Luxury Travel Planner 🌴 Hidden Gems 💎 Curated Memories ✨ • " />
                </section>

                <InstagramFeed />
            </div>

            {/* 6. Contact Us Section */}
            <section id="contact">
                <CTASection />
            </section>

            {/* Final Footer Section */}
            <Footer />
        </main>
    );
}
