"use client";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-slate-900 to-slate-800 py-8 border-t border-slate-700">
            <div className="container mx-auto px-6 text-center text-slate-400 font-body text-sm">
                <p className="mb-2">Destination Anywhere & Co. | Designed for explorers.</p>
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </footer>
    );
}
