import type { Metadata } from 'next';
import { Playfair_Display, Mulish, Caveat } from "next/font/google"; // Luxury Fonts & Handwriting
import "./globals.css";
import SmoothScroll from "@/components/luxury/SmoothScroll"; // Lenis Wrapper
import CustomCursor from "@/components/ui/CustomCursor";
import CursorStamper from "@/components/ui/CursorStamper";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PostItCTA from "@/components/ui/PostItCTA";
import { Providers } from "./providers";


const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: '--font-playfair',
    display: 'swap',
});

const mulish = Mulish({
    subsets: ["latin"],
    variable: '--font-mulish',
    display: 'swap',
});

const caveat = Caveat({
    subsets: ["latin"],
    variable: '--font-caveat',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Destination Anywhere & Co. | Luxury Travel Boutique",
    description: "Curating extraordinary, personalized travel experiences and bespoke itineraries for the discerning global traveler. Discover the world with Sujal Soni.",
    keywords: ["luxury travel", "bespoke travel", "concierge booking", "private tours", "premium holidays", "Sujal Soni", "Destination Anywhere"],
    openGraph: {
        title: "Destination Anywhere & Co.",
        description: "Curating extraordinary, personalized travel experiences and bespoke itineraries.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Destination Anywhere & Co.",
        description: "Curating extraordinary, personalized travel experiences and bespoke itineraries.",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${playfair.variable} ${mulish.variable} ${caveat.variable}`}>
            <body className={`${playfair.variable} ${mulish.variable} ${caveat.variable} font-body bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-500 overflow-x-hidden antialiased selection:bg-sky-primary selection:text-white`}>
                <NoiseOverlay />
                <ScrollProgress />
                <SmoothScroll>
                    <CustomCursor />
                    <CursorStamper />
                    <Providers>
                        {children}
                        <PostItCTA />
                    </Providers>
                </SmoothScroll>
            </body>
        </html>
    );
}
