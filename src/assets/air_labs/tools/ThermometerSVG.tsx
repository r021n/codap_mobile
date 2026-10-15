type ThermometerSVGProps = {
  label?: string;
  className?: string;
};

export default function ThermometerSVG({
  label,
  className = "w-8 h-8",
}: ThermometerSVGProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Glass Stem & Bulb */}
      <path
        d="M 21 6 C 21 4.34 22.34 3 24 3 C 25.66 3 27 4.34 27 6 L 27 29.5 C 29.5 31.2 31 34 31 37 C 31 40.87 27.87 44 24 44 C 20.13 44 17 40.87 17 37 C 17 34 18.5 31.2 21 29.5 Z"
        fill="#F1F5F9"
        stroke="#64748B"
        strokeWidth="2"
      />
      {/* Red Bulb Liquid */}
      <circle cx="24" cy="37" r="4.5" fill="#EF4444" />
      {/* Red Capillary Column */}
      <rect x="23" y="14" width="2" height="20" rx="1" fill="#EF4444" />
      {/* Measurement Ticks */}
      <line x1="19" y1="14" x2="21" y2="14" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="18" x2="21" y2="18" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19" y1="22" x2="21" y2="22" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="26" x2="21" y2="26" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
      {/* Glass Highlight */}
      <path
        d="M 22.5 7 L 22.5 28"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* Optional Label Badge (e.g. A, B, D) */}
      {label && (
        <g>
          <circle cx="37" cy="11" r="7.5" fill="#528C46" stroke="#FFFFFF" strokeWidth="1.5" />
          <text
            x="37"
            y="14.5"
            fontSize="9"
            fontWeight="bold"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="sans-serif"
          >
            {label}
          </text>
        </g>
      )}
    </svg>
  );
}
