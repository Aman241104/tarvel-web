"use client";

import FloatingNav from "@/components/luxury/FloatingNav";
import MobileNav from "@/components/luxury/MobileNav";
import Hero from "@/components/luxury/Hero";
import VisualStories from "@/components/luxury/VisualStories";
import TravelerSection from "@/components/luxury/TravelerSection";
import Services from "@/components/luxury/Services";
import Footer from "@/components/luxury/Footer";
import VerticalFeatures from "@/components/luxury/VerticalFeatures";
import InstagramMarquee from "@/components/luxury/InstagramMarquee";
import ContactCard from "@/components/luxury/ContactCard";
import Preloader from "@/components/luxury/Preloader";
import WhatsAppButton from "@/components/luxury/WhatsAppButton";

export default function Home() {
    return (
        <main className="bg-bg-light dark:bg-bg-dark min-h-screen relative transition-colors duration-500">
            <Preloader />
            <FloatingNav />
            <MobileNav />
            <WhatsAppButton />

            <div className="relative z-10 bg-bg-light dark:bg-bg-dark shadow-2xl mb-[80vh] rounded-b-[50px] overflow-hidden transition-colors duration-500">
                <section id="home">
                    <Hero />
                </section>
                <section id="stories">
                    <VisualStories />
                </section>
                <section id="about">
                    <TravelerSection />
                </section>
                <VerticalFeatures />
                <section id="services">
                    <Services />
                </section>
                <section id="contact">
                    <ContactCard />
                </section>
                <InstagramMarquee />
            </div>

            <Footer />
        </main>
    );
}
