"use client";

export default function AboutTeam() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Main Image Block (Large) */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative w-full h-[500px] rounded-[40px] overflow-hidden shadow-2xl">
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526772662000-3f88f107f500?q=80&w=1335&auto=format&fit=crop')" }}></div>
                        </div>
                        {/* Secondary Small Circle Image */}
                        <div className="absolute -bottom-10 -right-4 w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden z-10 hidden md:block">
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540206395-688085723adb?q=80&w=1288&auto=format&fit=crop')" }}></div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="lg:w-1/2 lg:pl-12">
                        <span className="text-arctic-orange font-bold font-primary tracking-widest uppercase text-sm mb-4 block">About Us</span>
                        <h2 className="font-primary font-bold text-4xl text-arctic-dark mb-6">Meet The Traveler Behind The Brand</h2>
                        <p className="font-secondary text-arctic-grey leading-relaxed text-lg mb-6">
                            Sujal Soni is deeply passionate about travelling and exploring new destinations.
                            His love for travel inspired him to start <strong>Destination Anywhere & Co.</strong>,
                            with the vision of helping people explore the world seamlessly and stress-free.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-arctic-gold flex items-center justify-center text-white font-bold">S</div>
                            <div>
                                <p className="font-primary font-bold text-arctic-dark">Sujal Soni</p>
                                <p className="font-secondary text-xs text-arctic-grey">Founder</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
