type CylinderSVGProps = {
  className?: string;
};

export default function CylinderSVG({
  className = "w-8 h-8",
}: CylinderSVGProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexagonal Base */}
      <path
        d="M 14 42 L 34 42 L 37 45 L 11 45 Z"
        fill="#64748B"
        stroke="#475569"
        strokeWidth="1.5"
      />
      {/* Cylinder Glass Body with Integrated Pour Spout (Moncong) */}
      <path
        d="M 11 5 L 18 7 L 30 7 Q 32 8 30 10 L 30 42 L 18 42 L 18 13 Q 14 10 11 5 Z"
        fill="#E0F2FE"
        fillOpacity="0.45"
        stroke="#475569"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Top Opening Rim Contour */}
      <path
        d="M 11 5 Q 18 9 30 7"
        stroke="#94A3B8"
        strokeWidth="1"
        fill="none"
        opacity="0.75"
        strokeLinecap="round"
      />
      {/* Measurement Ticks */}
      <line x1="23" y1="14" x2="28" y2="14" stroke="#334155" strokeWidth="1.2" />
      <line x1="25" y1="19" x2="28" y2="19" stroke="#334155" strokeWidth="1" />
      <line x1="23" y1="24" x2="28" y2="24" stroke="#334155" strokeWidth="1.2" />
      <line x1="25" y1="29" x2="28" y2="29" stroke="#334155" strokeWidth="1" />
      <line x1="23" y1="34" x2="28" y2="34" stroke="#334155" strokeWidth="1.2" />
      {/* Subtle Liquid Level in Cylinder */}
      <rect
        x="19"
        y="32"
        width="10"
        height="10"
        fill="#38BDF8"
        fillOpacity="0.3"
      />
      {/* Glass Highlight */}
      <line
        x1="20"
        y1="9"
        x2="20"
        y2="40"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
