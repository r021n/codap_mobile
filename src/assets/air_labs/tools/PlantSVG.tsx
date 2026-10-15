type PlantSVGProps = {
  className?: string;
};

export default function PlantSVG({ className = "w-8 h-8" }: PlantSVGProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hydroponic/Soil Holder Base */}
      <ellipse cx="24" cy="41" rx="9" ry="3" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
      {/* Main Stem */}
      <path
        d="M 24 41 Q 23 27 24 14"
        stroke="#15803D"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Left Leaf */}
      <path
        d="M 23.5 30 C 15 29 10 21 12 16 C 18 16 22 23 23.5 30 Z"
        fill="#22C55E"
        stroke="#16A34A"
        strokeWidth="1.5"
      />
      <path d="M 14 20 Q 18 22 22 26" stroke="#15803D" strokeWidth="1" strokeLinecap="round" />
      {/* Right Leaf */}
      <path
        d="M 24 23 C 32.5 22 38 14 36 9 C 30 9 26 16 24 23 Z"
        fill="#16A34A"
        stroke="#15803D"
        strokeWidth="1.5"
      />
      <path d="M 33 13 Q 29 16 25 20" stroke="#14532D" strokeWidth="1" strokeLinecap="round" />
      {/* Top Sprout */}
      <path
        d="M 24 15 C 21 10 23.5 5 24 4 C 24.5 5 27 10 24 15 Z"
        fill="#4ADE80"
        stroke="#22C55E"
        strokeWidth="1"
      />
    </svg>
  );
}
