type BakingSodaSVGProps = {
  className?: string;
};

export default function BakingSodaSVG({
  className = "w-8 h-8",
}: BakingSodaSVGProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Reagent Jar Body */}
      <rect
        x="12"
        y="15"
        width="24"
        height="28"
        rx="4"
        fill="#F8FAFC"
        stroke="#475569"
        strokeWidth="2"
      />
      {/* Screw Cap */}
      <rect
        x="16"
        y="9"
        width="16"
        height="7"
        rx="1.5"
        fill="#1E293B"
        stroke="#0F172A"
        strokeWidth="1.5"
      />
      {/* Cap Grips */}
      <line x1="20" y1="10" x2="20" y2="15" stroke="#64748B" strokeWidth="1" />
      <line x1="24" y1="10" x2="24" y2="15" stroke="#64748B" strokeWidth="1" />
      <line x1="28" y1="10" x2="28" y2="15" stroke="#64748B" strokeWidth="1" />
      {/* White Powder Fill Level */}
      <path
        d="M 13 31 Q 24 29 35 31 L 35 39 C 35 41 33 42 31 42 L 17 42 C 15 42 13 41 13 39 Z"
        fill="#E2E8F0"
      />
      {/* Lab Chemical Label */}
      <rect
        x="15"
        y="21"
        width="18"
        height="12"
        rx="2"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="1"
      />
      <text
        x="24"
        y="28"
        fontSize="5.5"
        fontWeight="bold"
        textAnchor="middle"
        fill="#0F172A"
        fontFamily="monospace"
      >
        NaHCO₃
      </text>
      <text
        x="24"
        y="32"
        fontSize="3.8"
        fontWeight="bold"
        textAnchor="middle"
        fill="#64748B"
        fontFamily="sans-serif"
      >
        SODA
      </text>
    </svg>
  );
}
