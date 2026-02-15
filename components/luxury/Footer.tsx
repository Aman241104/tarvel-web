export default function Footer() {
    return (
        <footer
            className="fixed bottom-0 left-0 w-full h-[80vh] z-0 bg-[#050505] text-white flex flex-col justify-between p-6 md:p-24"
        >
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-sm font-bold tracking-widest uppercase text-accent-gold mb-8">Start Your Journey</h2>
                    <ul className="space-y-3 md:space-y-4 text-xl md:text-3xl font-heading font-light">
                        <li className="hover:text-accent-gold cursor-pointer transition-colors">
                            <a href="#services" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>Destinations</a>
                        </li>
                        <li className="hover:text-accent-gold cursor-pointer transition-colors">
                            <a href="#about" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>Our Story</a>
                        </li>
                        <li className="hover:text-accent-gold cursor-pointer transition-colors">
                            <a href="https://www.instagram.com/destination__anywhere/" target="_blank">Journal</a>
                        </li>
                        <li className="hover:text-accent-gold cursor-pointer transition-colors">
                            <a href="#contact" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Contact</a>
                        </li>
                    </ul>
                </div>
                <div className="text-right hidden md:block max-w-sm">
                    <p className="text-sm font-body text-white/60 mb-2 leading-relaxed">
                        Shop-106, Shayona Tilak-1 Complex, <br />
                        New SG Road, Vandematram, <br />
                        Gota, Ahmedabad – 382481
                    </p>
                    <a href="tel:+918511071506" className="block text-lg font-body text-white/40 hover:text-white transition-colors">+91 85110 71506</a>
                    <a href="mailto:destinationanywhereo@gmail.com" className="block mt-2 text-lg font-body text-white/40 hover:text-white transition-colors">destinationanywhereo@gmail.com</a>
                </div>
            </div>

            <div>
                {/* Direct WhatsApp Call to Action */}
                <a
                    href="https://wa.me/918511071506?text=Hi%20Sujal,%20I%20want%20to%20plan%20a%20trip!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                >
                    <h1 className="text-[12vw] leading-none font-heading font-bold text-white/10 uppercase transition-colors duration-500 group-hover:text-accent-gold/20">
                        Start Your Journey
                    </h1>
                    <div className="flex items-center gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-accent-gold">
                        <span className="text-xl uppercase tracking-widest">Plan on WhatsApp</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                </a>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-4 md:mt-8 border-t border-white/10 pt-4 md:pt-8 text-xs md:text-sm text-white/40 font-mono gap-1">
                    <p>© {new Date().getFullYear()} Destination Anywhere & Co.</p>
                    <p>Designed for the Extraordinary.</p>
                </div>
            </div>
        </footer>
    );
}
