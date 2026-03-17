'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, MessageCircle, Clock, MapPin, Star, ShieldCheck, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import Image from 'next/image';

interface PackageModalProps {
    isOpen: boolean;
    onClose: () => void;
    pkg: {
        name: string;
        image: string;
        tag: string;
        price: string;
        duration: string;
        badge: string;
        details: string[];
    } | null;
}

export default function PackageModal({ isOpen, onClose, pkg }: PackageModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { openWhatsApp } = useWhatsApp();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const handleWhatsAppClick = () => {
        if (!pkg) return;
        const message = `Hi Sujal, I'm interested in the ${pkg.name} package (${pkg.duration}) starting from ${pkg.price}. Can you provide more details?`;
        openWhatsApp('Package Inquiry', message);
    };

    useGSAP(() => {
        if (typeof window === 'undefined') return;

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.fromTo(modalRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: 'power2.out' }
            );
            gsap.fromTo(contentRef.current,
                { y: 100, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }
            );
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, { dependencies: [isOpen] });

    if (!isOpen || !pkg || !mounted) return null;

    const modalContent = (
        <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
        >
            <div
                ref={contentRef}
                className="bg-white w-[92%] max-w-xl h-auto max-h-[85vh] max-h-[85dvh] rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button - Global */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-all hover:rotate-90"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Top: Image & Hero Info (Stacked) */}
                <div className="relative w-full h-[25vh] md:h-[35vh] shrink-0">
                    <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-4 left-6 right-6 text-white">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-brand-coral rounded-full text-[8px] font-black uppercase tracking-widest mb-2">
                            <Zap className="w-2.5 h-2.5 fill-current" />
                            {pkg.badge}
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black font-heading mb-1 leading-none">
                            {pkg.name}
                        </h2>
                        <p className="text-white/80 font-medium tracking-wide uppercase text-[8px] md:text-xs">
                            {pkg.tag}
                        </p>
                    </div>
                </div>

                {/* Bottom: Details & CTA */}
                <div className="flex-1 p-5 md:p-6 overflow-y-auto bg-white flex flex-col custom-scrollbar">
                    {/* Header Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                        <div className="flex flex-col">
                            <span className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-0.5">Duration</span>
                            <div className="flex items-center gap-1.5 text-text-navy">
                                <Clock className="w-3 h-3 text-brand-teal" />
                                <span className="font-bold text-[10px] md:text-xs">{pkg.duration}</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-0.5">Price</span>
                            <span className="text-base md:text-lg font-black text-brand-teal leading-none">{pkg.price}</span>
                        </div>
                    </div>

                    {/* What's Included */}
                    <div className="space-y-3 mb-6">
                        <h3 className="text-[9px] font-black text-text-navy uppercase tracking-[0.2em] flex items-center gap-2">
                            <div className="w-4 h-[1px] bg-brand-teal" />
                            Premium Inclusions
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                            {pkg.details.map((detail, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-lg border border-gray-100/50 hover:bg-white hover:shadow-md hover:shadow-black/5 transition-all group">
                                    <div className="mt-0.5 w-4 h-4 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                                        <Check className="w-2.5 h-2.5" />
                                    </div>
                                    <span className="text-[10px] md:text-[11px] text-gray-600 font-medium leading-tight">
                                        {detail}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-auto pt-4 border-t border-gray-50">
                        <button
                            onClick={handleWhatsAppClick}
                            className="w-full bg-brand-teal text-white py-3.5 md:py-4 rounded-xl font-black uppercase tracking-widest text-[9px] md:text-[10px] flex items-center justify-center gap-2 shadow-xl shadow-brand-teal/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            <MessageCircle className="w-4 h-4 fill-current" />
                            Book on WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
