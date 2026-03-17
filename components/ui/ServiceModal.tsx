'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useWhatsApp } from '@/hooks/useWhatsApp';

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: {
        title: string;
        desc: string;
        details?: string[];
        image?: string;
        color?: string;
    } | null;
}

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { openWhatsApp } = useWhatsApp();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const activeColor = service?.color || 'brand-teal';
    const colorClass = activeColor === 'brand-yellow' ? 'bg-brand-yellow' : 
                      activeColor === 'brand-coral' ? 'bg-brand-coral' : 'bg-brand-teal';
    
    const textColorClass = activeColor === 'brand-yellow' ? 'text-brand-yellow' : 
                          activeColor === 'brand-coral' ? 'text-brand-coral' : 'text-brand-teal';

    const bgColorClass = activeColor === 'brand-yellow' ? 'bg-brand-yellow/10' : 
                        activeColor === 'brand-coral' ? 'bg-brand-coral/10' : 'bg-brand-teal/10';

    const handleWhatsAppClick = () => {
        if (!service) return;
        const message = `Hi Sujal, I'm interested in the ${service.title} service. Can you provide more details?`;
        openWhatsApp('Service Inquiry', message);
    };

    useGSAP(() => {
        if (typeof window === 'undefined') return;

        if (isOpen) {
            // Body scroll lock
            if (document.body) {
                document.body.style.overflow = 'hidden';
            }

            // Entrance
            gsap.fromTo(modalRef.current,
                { opacity: 0, pointerEvents: 'none' },
                { opacity: 1, pointerEvents: 'auto', duration: 0.3 }
            );
            gsap.fromTo(contentRef.current,
                { y: 50, scale: 0.9, opacity: 0 },
                { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' }
            );
        } else {
            if (document.body) {
                document.body.style.overflow = '';
            }
        }

        return () => {
            if (document.body) {
                document.body.style.overflow = '';
            }
        };
    }, { dependencies: [isOpen] });

    if (!isOpen || !service || !mounted) return null;

    const modalContent = (
        <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-md pointer-events-auto"
            onClick={onClose}
        >
            <div
                ref={contentRef}
                className="bg-[#FFFBF5] w-[92%] max-w-lg h-auto max-h-[85vh] max-h-[85dvh] rounded-[2rem] shadow-2xl border-4 border-white relative overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Pattern */}
                <div className={`h-20 md:h-24 ${colorClass} relative shrink-0 overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '10px 10px' }}
                    />
                    <button
                        onClick={onClose}
                        aria-label="Close service details"
                        data-cursor="close"
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        <X className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-5 md:px-8 pb-6 md:pb-8 -mt-8 md:-mt-12 relative z-10 overflow-y-auto flex-1 custom-scrollbar">
                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md border border-gray-100 mb-6">
                        <h3 id="modal-title" className="text-xl md:text-3xl font-heading font-black text-text-navy mb-1 md:mb-2">
                            {service.title}
                        </h3>
                        <p className="text-gray-500 font-medium leading-relaxed text-xs md:text-base">
                            {service.desc}
                        </p>
                    </div>

                    <div className="space-y-2 md:space-y-3">
                        <h4 className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">What We Offer</h4>
                        {service.details?.map((detail, i) => (
                            <div key={i} className="flex items-center gap-2.5 md:gap-3 p-2.5 md:p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <div className={`${bgColorClass} p-1.5 md:p-2 rounded-full`}>
                                    <Check className={`w-3 h-3 md:w-3.5 md:h-3.5 ${textColorClass}`} />
                                </div>
                                <span className="text-text-navy font-black text-[10px] md:text-sm uppercase tracking-wide">{detail}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleWhatsAppClick}
                        className={`w-full mt-6 md:mt-8 ${colorClass} text-white font-black text-[10px] md:text-xs uppercase tracking-widest py-3.5 md:py-4 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3`}
                    >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        Book on WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
