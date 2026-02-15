'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(sectionRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%'
                }
            }
        );
    }, []);

    return (
        <section id="contact" ref={sectionRef} className="py-12 px-2 md:px-6 bg-white">
            <div className="bg-sky-100 rounded-[3rem] p-8 md:p-16 container mx-auto shadow-sm">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Contact Details */}
                    <div className="lg:w-1/2">
                        <h2 className="text-sm font-bold text-sky-600 uppercase tracking-widest mb-2">
                            Contact Us
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold font-heading text-sky-900 mb-8">
                            Let's Plan Your <br /> Next Getaway
                        </h3>
                        <p className="text-gray-700 mb-10 text-lg max-w-md">
                            Ready to explore? We are just a call or text away. Reach out for personalized packages and support.
                        </p>

                        <div className="space-y-4">
                            <a href="tel:+918511071506" className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl hover:bg-white transition-colors duration-300">
                                <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white"><FaPhone /></div>
                                <span className="font-semibold text-gray-800">+91 85110 71506</span>
                            </a>
                            <a href="mailto:destinationanywhereo@gmail.com" className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl hover:bg-white transition-colors duration-300">
                                <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white"><FaEnvelope /></div>
                                <span className="font-semibold text-gray-800 break-all">destinationanywhereo@gmail.com</span>
                            </a>
                            <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl hover:bg-white transition-colors duration-300">
                                <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white"><FaMapMarkerAlt /></div>
                                <span className="font-semibold text-gray-800">Gota, Ahmedabad</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-1/2 w-full bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-sky-50">
                        <form className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    className="w-full px-6 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all placeholder-gray-400 font-medium"
                                    placeholder="Your Name"
                                />
                                <input
                                    type="tel"
                                    className="w-full px-6 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all placeholder-gray-400 font-medium"
                                    placeholder="Your Phone"
                                />
                            </div>
                            <input
                                type="text"
                                className="w-full px-6 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all placeholder-gray-400 font-medium"
                                placeholder="Destination"
                            />
                            <button
                                type="submit"
                                className="w-full py-5 bg-sky-600 text-white font-bold rounded-xl shadow-lg hover:bg-sky-700 hover:shadow-2xl transition-all transform hover:-translate-y-1 block text-center text-lg"
                            >
                                Send Request
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/918511071506"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 ring-4 ring-white"
                title="Chat on WhatsApp"
            >
                <FaWhatsapp className="text-4xl" />
            </a>
        </section>
    );
}
