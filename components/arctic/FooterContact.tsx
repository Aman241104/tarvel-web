"use client";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function FooterContact() {
    return (
        <section id="contact" className="py-24 bg-arctic-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Container: Contact Info (Orange) */}
                    <div className="lg:w-1/2 bg-arctic-orange rounded-[40px] p-12 text-white shadow-card flex flex-col justify-between min-h-[500px]">
                        <div>
                            <h2 className="font-primary font-bold text-4xl mb-8">Contact Us</h2>
                            <div className="space-y-6 font-secondary text-lg">
                                <div className="flex items-center gap-4">
                                    <FaPhone className="text-arctic-gold text-xl" />
                                    <a href="tel:+918511071506" className="hover:text-arctic-snow transition">+91 85110 71506</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FaEnvelope className="text-arctic-gold text-xl" />
                                    <a href="mailto:destinationanywhereo@gmail.com" className="hover:text-arctic-snow transition break-all">destinationanywhereo@gmail.com</a>
                                </div>
                                <div className="flex items-start gap-4">
                                    <FaMapMarkerAlt className="text-arctic-gold text-xl mt-1" />
                                    <p>Shop-106, Shayona Tilak-1 Complex, New SG Road, Gota, Ahmedabad</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <p className="font-primary font-bold mb-4">Follow Us</p>
                            <div className="flex gap-4">
                                <a href="https://www.instagram.com/destnation_anywhere/" target="_blank" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-arctic-orange transition-all">
                                    <FaInstagram className="text-2xl" />
                                </a>
                                <a href="https://wa.me/918511071506" target="_blank" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-arctic-orange transition-all">
                                    <FaWhatsapp className="text-2xl" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Container: Form (Grey) */}
                    <div className="lg:w-1/2 bg-arctic-snow rounded-[40px] p-12 shadow-card flex flex-col justify-center">
                        <h3 className="font-primary font-bold text-3xl text-arctic-dark mb-8">Send an Inquiry</h3>
                        <form className="space-y-6">
                            <div>
                                <label className="block font-secondary text-arctic-grey mb-2 uppercase text-xs tracking-wider">Name</label>
                                <input type="text" className="w-full bg-white border-none rounded-card px-6 py-4 focus:ring-2 focus:ring-arctic-orange focus:outline-none transition-shadow" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block font-secondary text-arctic-grey mb-2 uppercase text-xs tracking-wider">Phone</label>
                                <input type="tel" className="w-full bg-white border-none rounded-card px-6 py-4 focus:ring-2 focus:ring-arctic-orange focus:outline-none transition-shadow" placeholder="Your Phone" />
                            </div>
                            <div>
                                <label className="block font-secondary text-arctic-grey mb-2 uppercase text-xs tracking-wider">Destination</label>
                                <input type="text" className="w-full bg-white border-none rounded-card px-6 py-4 focus:ring-2 focus:ring-arctic-orange focus:outline-none transition-shadow" placeholder="Where to?" />
                            </div>
                            <button className="w-full bg-arctic-orange text-white font-primary font-bold uppercase py-5 rounded-stadium hover:bg-orange-600 transition-all shadow-lg mt-4">
                                Submit Application
                            </button>
                        </form>
                    </div>

                </div>

                {/* Simple Copyright Footer */}
                <div className="pt-12 text-center text-arctic-grey font-secondary text-sm">
                    © {new Date().getFullYear()} Destination Anywhere & Co. All rights reserved.
                </div>
            </div>
        </section>
    );
}
