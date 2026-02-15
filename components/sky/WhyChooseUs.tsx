"use client";

import { motion, Variants } from "framer-motion";
import { UserCheck, Tag, ShieldCheck, Headphones } from "lucide-react";

const reasons = [
    {
        title: "Personalized Planning",
        icon: UserCheck,
        color: "bg-sky-100 text-sky-primary",
    },
    {
        title: "Competitive Pricing",
        icon: Tag,
        color: "bg-orange-100 text-orange-500",
    },
    {
        title: "Trusted Assistance",
        icon: ShieldCheck,
        color: "bg-green-100 text-green-500",
    },
    {
        title: "End-to-End Support",
        icon: Headphones,
        color: "bg-purple-100 text-purple-500",
    },
];

const floatVariants: Variants = {
    initial: { y: 0 },
    animate: (i: number) => ({
        y: [0, -15, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4, // Stagger effect
        },
    }),
};

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-white relative">
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-sky-primary/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-text-dark mb-4">
                        Why Fly With Us?
                    </h2>
                    <p className="text-slate-500 font-body max-w-2xl mx-auto">
                        We make your journey seamless from takeoff to landing.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                    {reasons.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <motion.div
                                custom={index}
                                variants={floatVariants}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                className={`w-28 h-28 rounded-full ${item.color} flex items-center justify-center shadow-lg border-4 border-white mb-6`}
                            >
                                <item.icon size={40} />
                            </motion.div>
                            <h3 className="font-bold font-heading text-text-dark text-lg text-center">
                                {item.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
