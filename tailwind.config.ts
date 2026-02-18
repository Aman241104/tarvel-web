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
                'text-navy': '#0F172A', // Deep Navy for better contrast
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
                handwriting: ['var(--font-caveat)', 'cursive'],
            },
            backgroundImage: {
                'paper-pattern': "url('https://www.transparenttextures.com/patterns/cream-paper.png')", // Optional subtle pattern
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                'spin-slow': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                },
                'pulse-ring': {
                    '0%': { transform: 'scale(1)', opacity: '0.6' },
                    '100%': { transform: 'scale(1.8)', opacity: '0' },
                },
            },
            animation: {
                float: 'float 3s ease-in-out infinite',
                'spin-slow': 'spin-slow 10s linear infinite',
                'pulse-ring': 'pulse-ring 2s ease-out infinite',
            }
        },
    },
    plugins: [],
};
export default config;
