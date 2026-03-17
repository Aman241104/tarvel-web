'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import PackageModal from '../ui/PackageModal';

const destinations = [
    {
        name: 'Maldives',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
        tag: 'Overwater Luxury',
        price: '₹1,99,900',
        duration: '4 Nights / 5 Days',
        badge: 'Honeymoon Special',
        details: [
            "Luxury Overwater Villa Stay",
            "Speedboat/Seaplane Transfers",
            "All-Inclusive Meal Plans",
            "Snorkeling & Water Sports",
            "Romantic Candlelight Dinner"
        ]
    },
    {
        name: 'Bali',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
        tag: 'Tropical Paradise',
        price: '₹39,900',
        duration: '6 Nights / 7 Days',
        badge: 'Best Value',
        details: [
            "Private Pool Villa Stay",
            "Ubud & Kuta Tour",
            "Tegalalang Rice Terrace Visit",
            "Daily Breakfast & Selected Meals",
            "Traditional Balinese Massage"
        ]
    },
    {
        name: 'Dubai',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
        tag: 'Modern Elegance',
        price: '₹59,900',
        duration: '6 Nights / 7 Days',
        badge: 'Selling Fast',
        details: [
            "Premium Hotel Stay",
            "Burj Khalifa At The Top Access",
            "Desert Safari with BBQ Dinner",
            "Dhow Cruise with Dinner",
            "Dubai City Guided Tour"
        ]
    },
    {
        name: 'Europe',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
        tag: 'Grand Tour',
        price: '₹2,10,000',
        duration: '12 Nights / 13 Days',
        badge: 'Ultimate Experience',
        details: [
            "Multi-City Guided Tour (Paris, Swiss, Rome)",
            "High-Speed Inter-city Trains",
            "Breakfast & Selected Dinners",
            "Eiffel Tower & Mt. Titlis Access",
            "All Visa Documentation Support"
        ]
    }
];

export default function PopularDestinations() {
    const [selectedPackage, setSelectedPackage] = useState<typeof destinations[0] | null>(null);
    const { openWhatsApp } = useWhatsApp();

    const handleWhatsAppClick = (pkg: typeof destinations[0]) => {
        const message = `Hi Sujal, I'm interested in the ${pkg.name} package (${pkg.duration}) starting from ${pkg.price}. Can you provide more details?`;
        openWhatsApp('Package Inquiry', message);
    };

    return (
        <section id="packages" className="pt-10 md:pt-16 lg:pt-24 pb-4 md:pb-12 bg-bg-light relative overflow-hidden">
            <PackageModal
                isOpen={!!selectedPackage}
                onClose={() => setSelectedPackage(null)}
                pkg={selectedPackage}
            />
            <div className="container mx-auto px-6 max-w-6xl lg:max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
                    <div className="text-left">
                        <span className="text-brand-coral font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Handpicked for you</span>
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-text-navy tracking-tight">
                            Exclusive Packages
                        </h2>
                    </div>
                    <a href="#contact" className="group flex items-center gap-2 text-gray-400 hover:text-brand-coral transition-colors font-black uppercase tracking-widest text-[9px]">
                        View More Deals <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((dest, i) => (
                        <motion.div
                            key={dest.name}
                            initial={{ y: 40 }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ 
                                duration: 0.6,
                                delay: i * 0.08,
                                ease: [0.25, 1, 0.5, 1] 
                            }}
                            className="group relative h-[300px] md:h-[420px] rounded-[1.75rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all border border-black/5 hover:border-black/0"
                            onClick={() => setSelectedPackage(dest)}
                        >
                            <Image
                                src={dest.image}
                                alt={dest.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity z-10" />
                            
                            <div className="absolute top-3 md:top-5 left-3 md:left-5 flex flex-col gap-1 md:gap-1.5 items-start z-20">
                                <span className="px-2 md:px-3 py-0.5 md:py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white">
                                    {dest.tag}
                                </span>
                                <span className="px-2 md:px-2.5 py-0.5 bg-brand-coral text-white text-[6px] md:text-[7px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                                    {dest.badge}
                                </span>
                            </div>

                            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 z-20">
                                <div className="flex items-center gap-1.5 md:gap-2 text-brand-teal mb-1 md:mb-1.5">
                                    <MapPin className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{dest.name}</span>
                                </div>
                                <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-0.5 md:mb-1">
                                    {dest.name} Escape
                                </h3>
                                <div className="flex items-center gap-1.5 md:gap-2 text-white/60 text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-3 md:mb-4">
                                    <Clock className="w-2 md:w-2.5 h-2 md:h-2.5" />
                                    {dest.duration}
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] md:text-[9px] text-white/40 uppercase font-black tracking-widest leading-none mb-1">Starting from</span>
                                        <span className="text-base md:text-lg font-black text-white leading-none">{dest.price}</span>
                                    </div>
                                    <div 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleWhatsAppClick(dest);
                                        }}
                                        className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-brand-teal text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 shadow-lg shadow-brand-teal/20 flex items-center gap-1.5 md:gap-2 group/btn cursor-pointer z-30"
                                    >
                                        <MessageCircle className="w-2.5 md:w-3 h-2.5 md:h-3 fill-current" />
                                        Inquiry
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
