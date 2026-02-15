import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-dark': '#050505',
                'bg-light': '#F2F0E9', // Warm Beige
                'text-dark': '#ffffff',
                'text-light': '#1a1a1a',
                'sky-primary': '#0EA5E9', // Vivid Sky Blue
                'sky-light': '#E0F2FE', // Soft Cloud White
                'glass-white': 'rgba(255, 255, 255, 0.7)', // Glassmorphism
                'accent-gold': '#F59E0B', // Sun/Luxury
                // Retaining legacy colors for compatibility until full migration
                'arctic-white': '#FFFFFF',
                'arctic-snow': '#F5F7FA',
                'arctic-orange': '#0EA5E9', // Mapping old primary to new primary
                'arctic-gold': '#F59E0B', // Mapping old accent to new accent
                'arctic-dark': '#0F172A', // Mapping old dark to new dark
                'arctic-grey': '#64748B', // Slate-500
                sky: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
            },
            borderRadius: {
                'stadium': '50px',
                'card': '24px',
            },
            fontFamily: {
                heading: ['var(--font-playfair)', 'serif'],
                body: ['var(--font-mulish)', 'sans-serif'],
                primary: ['var(--font-playfair)', 'serif'],
                secondary: ['var(--font-mulish)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
