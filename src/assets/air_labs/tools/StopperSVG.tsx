type StopperSVGProps = {
  label?: string;
  className?: string;
};

export default function StopperSVG({
  label,
  className = "w-8 h-8",
}: StopperSVGProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cork / Rubber Stopper Body */}
      <path
        d="M 12 16 C 12 14.9 12.9 14 14 14 L 34 14 C 35.1 14 36 14.9 36 16 L 31.5 35 C 31.2 36.2 30.1 37 28.9 37 L 19.1 37 C 17.9 37 16.8 36.2 16.5 35 Z"
        fill="#9A5B2D"
        stroke="#5C2E0B"
        strokeWidth="2"
      />
      {/* Top Rim Highlight */}
      <ellipse cx="24" cy="15" rx="10" ry="2" fill="#B7733E" />
      {/* Center Borehole for Tube */}
      <ellipse cx="24" cy="15" rx="2.5" ry="1.2" fill="#3D1E07" />
      {/* Cork Texture Horizontal Bands */}
      <path
        d="M 15 22 Q 24 24 33 22"
        stroke="#783A10"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M 16.5 29 Q 24 31 31.5 29"
        stroke="#783A10"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Optional Label Badge */}
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
