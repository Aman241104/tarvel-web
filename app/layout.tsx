import type { Metadata } from 'next';
import { Playfair_Display, Mulish, Caveat } from "next/font/google"; // Luxury Fonts & Handwriting
import "./globals.css";
import SmoothScroll from "@/components/luxury/SmoothScroll"; // Lenis Wrapper
import CustomCursor from "@/components/ui/CustomCursor";
import CursorStamper from "@/components/ui/CursorStamper";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";
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
    title: "Destination Anywhere & Co. | Luxury Travel",
    description: "Uncover the extraordinary. Tailored journeys for the discerning traveler.",
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
                    <Providers>{children}</Providers>
                </SmoothScroll>
            </body>
        </html>
    );
}
