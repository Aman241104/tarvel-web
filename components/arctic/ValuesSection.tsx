"use client";
import { FaArrowRight, FaPlane, FaShieldAlt } from "react-icons/fa";

export default function ValuesSection() {
    return (
        <section className="py-20 bg-arctic-snow overflow-x-auto">
            <div className="container mx-auto px-6">
                {/* Title for Context */}
                <div className="mb-12 text-center md:text-left">
                    <h2 className="font-primary font-bold text-3xl text-arctic-dark">Why Choose Us</h2>
                </div>

                {/* Circular Sequence - Horizontal Scroll on Mobile */}
                <div className="flex items-center gap-6 min-w-max md:min-w-0 md:justify-center p-4">

                    {/* 1. Text Circle */}
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-arctic-white shadow-card flex items-center justify-center p-8 text-center shrink-0">
                        <span className="font-primary font-bold text-xl md:text-2xl text-arctic-dark">Personalized Planning</span>
                    </div>

                    {/* 2. Image Circle */}
                    <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-card shrink-0 border-4 border-white">
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2070&auto=format&fit=crop')" }}></div>
                    </div>

                    {/* 3. Icon Circle (Gold) */}
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-arctic-gold shadow-card flex items-center justify-center text-white text-4xl shrink-0">
                        <FaArrowRight className="transform -rotate-45" />
                    </div>

                    {/* 4. Text Circle */}
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-arctic-dark shadow-card flex items-center justify-center p-8 text-center shrink-0 text-white">
                        <span className="font-primary font-bold text-xl md:text-2xl text-arctic-gold">Competitive Pricing</span>
                    </div>

                    {/* 5. Image Circle */}
                    <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-card shrink-0 border-4 border-white">
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')" }}></div>
                    </div>

                    {/* 6. Icon Circle (Orange) */}
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-arctic-orange shadow-card flex items-center justify-center text-white text-4xl shrink-0">
                        <FaShieldAlt />
                    </div>

                </div>
            </div>
        </section>
    );
}
