import React from "react";

type EnvironmentVisualProps = {
  location?: string;
};

export const EnvironmentVisual = React.memo(
  ({ location }: EnvironmentVisualProps) => (
    <svg
      className="absolute inset-0 w-full h-full object-cover"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="100%" stopColor="#E0F6FF" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#skyGradient)" />
      {/* Sun */}
      <circle cx="700" cy="100" r="60" fill="#FFD700" opacity="0.8" />
      {/* Clouds */}
      <path
        d="M 100 150 Q 130 110 160 140 Q 200 120 220 160 Q 250 160 210 190 Q 160 210 120 180 Z"
        fill="#FFFFFF"
        opacity="0.8"
      />
      <path
        d="M 500 100 Q 520 70 550 90 Q 580 80 590 110 Q 610 100 600 130 Q 550 150 510 120 Z"
        fill="#FFFFFF"
        opacity="0.6"
      />

      {/* Distant City / Mountains based on location (simplified) */}
      {location === "Tasikmalaya" && (
        <path
          d="M 0 450 L 150 250 L 350 450 L 550 300 L 800 450 L 800 600 L 0 600 Z"
          fill="#4B5320"
          opacity="0.6"
        />
      )}
      {location === "Solo" && (
        <>
          <rect x="100" y="300" width="80" height="200" fill="#8B8B8B" />
          <rect x="190" y="250" width="100" height="250" fill="#A9A9A9" />
          <rect x="350" y="320" width="120" height="180" fill="#8B8B8B" />
          <rect x="520" y="200" width="90" height="300" fill="#A9A9A9" />
          <rect x="650" y="350" width="100" height="150" fill="#8B8B8B" />
        </>
      )}
      {location === "Kutai Barat" && (
        <>
          <path
            d="M 0 500 Q 100 400 200 500 T 400 500 T 600 500 T 800 500 L 800 600 L 0 600 Z"
            fill="#228B22"
            opacity="0.7"
          />
          <path
            d="M -50 550 Q 50 450 150 550 T 350 550 T 550 550 T 750 550 T 850 550 L 850 600 L -50 600 Z"
            fill="#006400"
          />
        </>
      )}

      {/* Ground */}
      <rect x="0" y="450" width="100%" height="150" fill="#8B4513" />
      <rect x="0" y="450" width="100%" height="20" fill="#556B2F" />
    </svg>
  ),
);
EnvironmentVisual.displayName = "EnvironmentVisual";
