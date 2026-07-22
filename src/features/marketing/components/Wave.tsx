export function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      {/* Back layer: lighter + slower, drifts the opposite way for depth */}
      <svg
        className={`absolute inset-0 h-full w-[200%] opacity-40 ${flip ? "rotate-180" : ""} wave-back`}
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,80 C120,40 360,120 480,80 C600,40 840,120 960,80 C1080,40 1320,120 1440,80 C1560,40 1800,120 1920,80 C2040,40 2280,120 2400,80 C2520,40 2760,120 2880,80 L2880,120 L0,120 Z"
        />
      </svg>
      {/* Front layer */}
      <svg
        className={`relative h-full w-[200%] ${flip ? "rotate-180" : ""} wave-slow`}
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 C1680,110 1920,10 2160,60 C2400,110 2640,10 2880,60 L2880,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}
