"use client";

const instaImages = [
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=600&auto=format&fit=crop",
];

export default function InstagramMarquee() {
    return (
        <section className="bg-bg-light dark:bg-bg-dark pt-8 md:pt-12 text-center transition-colors duration-500">
            <a href="https://instagram.com" target="_blank" className="inline-block mb-8 font-mono text-xs text-accent-gold uppercase tracking-widest hover:underline">
                @destination__anywhere
            </a>

            {/* Infinite Scroll Strip */}
            <a href="https://www.instagram.com/destination__anywhere/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="overflow-hidden whitespace-nowrap pb-12 md:pb-24 group">
                    <div className="flex animate-marquee-slower group-hover:[animation-play-state:paused]">
                        {[...instaImages, ...instaImages, ...instaImages, ...instaImages].map((src, i) => (
                            <div key={i} className="w-40 h-40 md:w-64 md:h-64 mx-1 md:mx-2 shrink-0 rounded-lg overflow-hidden relative group/item cursor-pointer">
                                <img src={src} className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110" alt="Instagram" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center text-white">
                                    <span className="font-bold">Follow</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </a>
        </section>
    );
}
