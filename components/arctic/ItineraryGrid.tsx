"use client";

const steps = [
    {
        step: "01",
        title: "Contact Us",
        desc: "Reach out via phone or email to discuss your dream destination.",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1470&auto=format&fit=crop"
    },
    {
        step: "02",
        title: "Get A Plan",
        desc: "We craft a personalized itinerary tailored to your preferences.",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1335&auto=format&fit=crop"
    },
    {
        step: "03",
        title: "Travel Stress-Free",
        desc: "Embark on your journey with full support and zero worries.",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1474&auto=format&fit=crop"
    }
];

export default function ItineraryGrid() {
    return (
        <section className="py-24 bg-arctic-snow">
            <div className="container mx-auto px-6">
                <h2 className="font-primary font-bold text-4xl text-arctic-dark mb-16 text-center">Your Journey to Adventure</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((item, index) => (
                        <div key={index} className={`flex flex-col rounded-card overflow-hidden shadow-card bg-white h-[450px] ${index % 2 !== 0 ? 'md:mt-12' : ''}`}>
                            {/* Zig Zag effect by margin top on odd items if desired, or simpler grid */}

                            {/* Image Top (50%) */}
                            <div className="h-1/2 w-full bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }}></div>

                            {/* Text Bottom (50%) */}
                            <div className="h-1/2 p-8 flex flex-col justify-center relative">
                                <div className="absolute -top-6 right-8 w-12 h-12 rounded-full bg-arctic-orange flex items-center justify-center text-white font-bold shadow-lg">
                                    {item.step}
                                </div>
                                <h3 className="font-primary font-bold text-xl text-arctic-dark mb-3">{item.title}</h3>
                                <p className="font-secondary text-arctic-grey text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
