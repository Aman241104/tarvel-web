'use client';
import { FaInstagram } from 'react-icons/fa';

export default function InstagramFeed() {
    const posts = [1, 2, 3, 4]; // Placeholders

    return (
        <section className="py-24 bg-sky-50">
            <div className="container mx-auto px-6 text-center">
                <div className="mb-12">
                    <h2 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-2">
                        Follow Us
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold font-heading text-sky-900 mb-4">
                        Travel Stories & Destinations
                    </h3>
                    <a
                        href="https://www.instagram.com/destnation_anywhere/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition-colors"
                    >
                        <FaInstagram className="text-xl" /> @destination__anywhere
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <a
                            key={post}
                            href="https://www.instagram.com/destnation_anywhere/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="aspect-square bg-gray-200 rounded-3xl overflow-hidden relative group shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                                <FaInstagram className="text-white text-3xl opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
                            </div>
                            {/* Placeholder Gradient if image fails or for load */}
                            <div className="w-full h-full bg-gradient-to-br from-sky-100 to-white animate-pulse"></div>
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('https://source.unsplash.com/random/400x400?travel,${post}')` }}></div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
