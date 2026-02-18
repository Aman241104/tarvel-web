export default function NoiseOverlay() {
    return (
        <>
            {/* Primary fine grain */}
            <div
                className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.025] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    transform: 'translateZ(0)',
                }}
            />
            {/* Secondary depth variation — very subtle */}
            <div
                className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.012] mix-blend-soft-light"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='depthNoise'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.015' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23depthNoise)'/%3E%3C/svg%3E")`,
                    transform: 'translateZ(0)',
                }}
            />
        </>
    );
}
