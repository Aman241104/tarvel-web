import type { Metadata } from 'next';
import { Playfair_Display, Mulish } from "next/font/google"; // Luxury Fonts
import "./globals.css";
import SmoothScroll from "@/components/luxury/SmoothScroll"; // Lenis Wrapper

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
        <html lang="en" className={`${playfair.variable} ${mulish.variable}`}>
            <body className="font-body bg-arctic-white antialiased text-text-dark relative">
                {/* Global Noise Overlay */}
                <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay"
                    style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
                </div>

                <SmoothScroll>
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}
