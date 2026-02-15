import { FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-sky-900 text-white py-12">
            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-2xl font-bold font-heading mb-4">Destination Anywhere & Co.</h3>
                    <p className="text-sky-200 mb-4">Your Journey Begins Anywhere.</p>
                    <div className="flex space-x-4">
                        <a href="https://www.instagram.com/destnation_anywhere/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 text-2xl"><FaInstagram /></a>
                        <a href="https://wa.me/918511071506" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 text-2xl"><FaWhatsapp /></a>
                    </div>
                </div>
                <div>
                    <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sky-200">
                        <li><a href="#hero" className="hover:text-white">Home</a></li>
                        <li><a href="#about" className="hover:text-white">About Us</a></li>
                        <li><a href="#services" className="hover:text-white">Services</a></li>
                        <li><a href="#contact" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
                    <ul className="space-y-3 text-sky-200">
                        <li className="flex items-start gap-2"><FaPhone className="mt-1" /> +91 85110 71506</li>
                        <li className="flex items-start gap-2"><FaEnvelope className="mt-1" /> destinationanywhereo@gmail.com</li>
                        <li className="flex items-start gap-2"><FaMapMarkerAlt className="mt-1 flex-shrink-0" /> Shop-106, Shayona Tilak-1 Complex, New SG Road, Gota, Ahmedabad</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-sky-800 mt-8 pt-8 text-center text-sky-300 text-sm">
                <p>&copy; {new Date().getFullYear()} Destination Anywhere & Co. Designed for explorers.</p>
            </div>
        </footer>
    );
}
