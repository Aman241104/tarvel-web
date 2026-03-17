import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Mulish, Caveat } from "next/font/google"; // Luxury Fonts & Handwriting
import "./globals.css";
import SmoothScroll from "@/components/luxury/SmoothScroll"; // Lenis Wrapper
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import RightSideNav from "@/components/ui/RightSideNav";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/luxury/WhatsAppButton";
import { Providers } from "./providers";


export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
};


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
    metadataBase: new URL('https://destinationanywhere.co'),
    title: "Destination Anywhere | Luxury Travel Planner",
    description: "Curating extraordinary, personalized travel experiences and bespoke itineraries for the discerning global traveler. Discover the world with Sujal Soni.",
    keywords: ["luxury travel", "bespoke travel", "concierge booking", "private tours", "premium holidays", "Sujal Soni", "Destination Anywhere"],
    icons: {
        icon: "/assets/logo.png",
        shortcut: "/assets/logo.png",
        apple: "/assets/logo.png",
    },
    manifest: '/manifest.json',
    openGraph: {
        title: "Destination Anywhere | Luxury Travel Planner",
        description: "Curating extraordinary, personalized travel experiences and bespoke itineraries.",
        type: "website",
        url: 'https://destinationanywhere.co',
        siteName: 'Destination Anywhere',
        images: [
            {
                url: '/assets/logo.png',
                width: 1200,
                height: 630,
                alt: 'Destination Anywhere Logo',
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Destination Anywhere | Luxury Travel Planner",
        description: "Curating extraordinary, personalized travel experiences and bespoke itineraries.",
        images: ['/assets/logo.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${playfair.variable} ${mulish.variable} ${caveat.variable}`} suppressHydrationWarning>
            <body className={`${playfair.variable} ${mulish.variable} ${caveat.variable} font-body bg-bg-light text-text-light overflow-x-hidden antialiased selection:bg-brand-coral selection:text-white`}>
                <CustomCursor />
                <NoiseOverlay />
                <WhatsAppButton />
                <RightSideNav />
                <Navbar />
                <SmoothScroll>
                    <Providers>
                        <div className="page-reveal">
                            {children}
                        </div>
                    </Providers>
                </SmoothScroll>
            </body>
        </html>
    );
}
