"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VisualStory from "@/components/VisualStory";
import ServicesGrid from "@/components/ServicesGrid";
import TravelerSection from "@/components/luxury/TravelerSection";
import Footer from "@/components/Footer";

import WhatsAppButton from "@/components/luxury/WhatsAppButton";
import ServicesList from "@/components/ServicesList";
import CTASection from "@/components/CTASection";
import TapeMarquee from "@/components/TapeMarquee";
import MobileStickyCTA from "@/components/MobileStickyCTA";

export default function Home() {
    return (
        <main className="bg-bg-light dark:bg-bg-dark min-h-screen relative transition-colors duration-500 overflow-x-hidden">

            <Navbar />
            <WhatsAppButton />

            <div className="relative z-30 bg-bg-light dark:bg-bg-dark shadow-2xl rounded-b-[10px] transition-colors duration-500">
                <section id="home">
                    <Hero />
                </section>
                <section id="stories">
                    <VisualStory />
                </section>
                <section id="about">
                    <TravelerSection />
                </section>
                <section id="marquee" className="relative z-20 -my-8 overflow-hidden">
                    <TapeMarquee />
                </section>
                <section id="services">
                    <ServicesGrid />
                    <ServicesList />
                </section>
            </div>

            {/* Smooth gradient transition from paper-warm to CTA coral */}
            <div className="h-24 md:h-32 bg-gradient-to-b from-[#FFFBF5] to-[#FF6B6B]/20 relative z-20" />

            <CTASection />

            {/* Final Footer Section */}
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
