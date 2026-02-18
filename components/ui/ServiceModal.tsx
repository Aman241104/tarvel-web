'use client';

import { useEffect, useRef } from 'react';
import { X, Check } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: {
        title: string;
        desc: string;
        details?: string[];
        image?: string;
    } | null;
}

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isOpen) {
            // Entrance
            gsap.fromTo(modalRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );
            gsap.fromTo(contentRef.current,
                { y: 50, scale: 0.9, opacity: 0 },
                { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' }
            );
        }
    }, { dependencies: [isOpen] });

    if (!isOpen || !service) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                ref={contentRef}
                className="bg-[#FFFBF5] w-full max-w-lg rounded-3xl shadow-2xl border-4 border-white relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Pattern */}
                <div className="h-24 bg-[#4ECDC4] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '10px 10px' }}
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-8 pb-8 -mt-12 relative z-10">
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-6">
                        <h3 className="text-3xl font-heading font-bold text-[#2D2D2D] mb-2">
                            {service.title}
                        </h3>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            {service.desc}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">What We Offer</h4>
                        {service.details?.map((detail, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <div className="bg-[#4ECDC4]/10 p-2 rounded-full">
                                    <Check className="w-4 h-4 text-[#4ECDC4]" />
                                </div>
                                <span className="text-[#2D2D2D] font-medium">{detail}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full mt-8 bg-[#2D2D2D] text-white font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-transform"
                    >
                        Got it, thanks!
                    </button>
                </div>
            </div>
        </div>
    );
}
