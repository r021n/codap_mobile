type VinegarSVGProps = {
  className?: string;
};

export default function VinegarSVG({ className = "w-8 h-8" }: VinegarSVGProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bottle Body with Neck and Sloping Shoulders */}
      <path
        d="M 20 8 L 28 8 L 28 14 L 35 21 L 35 41 C 35 42.6 33.6 44 32 44 L 16 44 C 14.4 44 13 42.6 13 41 L 13 21 L 20 14 Z"
        fill="#F8FAFC"
        stroke="#475569"
        strokeWidth="2"
      />
      {/* Safety Reagent Cap (Red/Amber) */}
      <rect
        x="19"
        y="4"
        width="10"
        height="5"
        rx="1"
        fill="#DC2626"
        stroke="#991B1B"
        strokeWidth="1"
      />
      {/* Clear Liquid Fill */}
      <path
        d="M 14 26 Q 24 24 34 26 L 34 41 C 34 42.6 32.6 43.5 31 43.5 L 17 43.5 C 15.4 43.5 14 42.6 14 41 Z"
        fill="#BAE6FD"
        fillOpacity="0.45"
      />
      {/* Label */}
      <rect
        x="16"
        y="25"
        width="16"
        height="12"
        rx="1.5"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="1"
      />
      <text
        x="24"
        y="31"
        fontSize="4.2"
        fontWeight="bold"
        textAnchor="middle"
        fill="#991B1B"
        fontFamily="monospace"
      >
        CH₃COOH
      </text>
      <text
        x="24"
        y="35.5"
        fontSize="3.8"
        fontWeight="bold"
        textAnchor="middle"
        fill="#475569"
        fontFamily="sans-serif"
      >
        CUKA
      </text>
    </svg>
  );
}
