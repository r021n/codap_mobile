import React from "react";
import type { GelasUkurProps, TimbanganProps, ToplesProps } from "../types";

export const SunSVG = React.memo(() => (
  <svg width="70" height="70" viewBox="0 0 100 100">
    {/* Lingkaran cahaya luar */}
    <circle cx="50" cy="50" r="35" fill="#fde68a" opacity="0.3" />
    {/* Badan matahari */}
    <circle cx="50" cy="50" r="22" fill="#fbbf24" />
    <circle cx="50" cy="50" r="18" fill="#fcd34d" />
    {/* Highlight */}
    <circle cx="43" cy="43" r="6" fill="#fef3c7" opacity="0.7" />
    {/* Sinar matahari (garis pendek memancar) */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 50 + Math.cos(rad) * 28;
      const y1 = 50 + Math.sin(rad) * 28;
      const x2 = 50 + Math.cos(rad) * 40;
      const y2 = 50 + Math.sin(rad) * 40;
      return (
        <line
          key={angle}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#f59e0b"
          strokeWidth="4"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
));
SunSVG.displayName = "SunSVG";

export const GelasUkurSVG = React.memo(({ sodaAmount }: GelasUkurProps) => (
  <svg viewBox="0 0 60 120" className="w-full h-full drop-shadow-md">
    {/* Skala */}
    <line x1="15" y1="20" x2="25" y2="20" stroke="#94a3b8" strokeWidth="1" />
    <text x="28" y="24" fontSize="8" fill="#64748b">
      50
    </text>
    <line x1="15" y1="50" x2="25" y2="50" stroke="#94a3b8" strokeWidth="1" />
    <text x="28" y="54" fontSize="8" fill="#64748b">
      30
    </text>
    <line x1="15" y1="80" x2="25" y2="80" stroke="#94a3b8" strokeWidth="1" />
    <text x="28" y="84" fontSize="8" fill="#64748b">
      10
    </text>

    {/* Isi Soda */}
    {sodaAmount > 0 && (
      <rect
        x="16"
        y={110 - sodaAmount * 3}
        width="28"
        height={sodaAmount * 3}
        fill="#f8fafc"
      />
    )}

    {/* Badan Gelas Ukur dengan Moncong (Pour Spout) */}
    <path
      d="M 7 7 L 16 8.5 L 45 8.5 Q 47.5 9.5 45 11.5 L 45 110 A 5 5 0 0 1 40 115 L 20 115 A 5 5 0 0 1 15 110 L 15 16 Q 10 13 7 7 Z"
      fill="rgba(255,255,255,0.4)"
      stroke="#475569"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Garis Bibir / Moncong 3D */}
    <path
      d="M 7 7 Q 16 11 45 8.5"
      stroke="#94a3b8"
      strokeWidth="1.5"
      fill="none"
      opacity="0.6"
      strokeLinecap="round"
    />
    <path d="M 10 115 L 50 115 L 50 120 L 10 120 Z" fill="#475569" />
  </svg>
));
GelasUkurSVG.displayName = "GelasUkurSVG";

export const TimbanganSVG = React.memo(({ value }: TimbanganProps) => (
  <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-md">
    <path
      d="M 10 20 L 90 20 L 100 50 L 0 50 Z"
      fill="#cbd5e1"
      stroke="#94a3b8"
      strokeWidth="2"
    />
    <rect x="30" y="25" width="40" height="15" fill="#0f172a" rx="2" />
    <text
      x="50"
      y="36"
      fontSize="10"
      fill="#22c55e"
      textAnchor="middle"
      fontFamily="monospace"
      fontWeight="bold"
    >
      {value.toFixed(1)} g
    </text>
    <path
      d="M 20 20 L 80 20 L 80 15 L 20 15 Z"
      fill="#e2e8f0"
      stroke="#94a3b8"
      strokeWidth="1"
    />
  </svg>
));
TimbanganSVG.displayName = "TimbanganSVG";

export const ToplesSVG = React.memo(({ hasPlant, hasWrap }: ToplesProps) => (
  <svg viewBox="0 0 120 160" className="w-full h-full drop-shadow-md">
    <rect
      x="25"
      y="35"
      width="70"
      height="105"
      rx="10"
      fill="rgba(255,255,255,0.4)"
      stroke="#475569"
      strokeWidth="2.5"
    />
    <rect
      x="35"
      y="26"
      width="50"
      height="10"
      rx="3"
      fill="#94a3b8"
      stroke="#64748b"
      strokeWidth="1.5"
    />
    {hasWrap && (
      <path
        d="M 32 28 Q 60 18 88 28"
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="4"
        strokeLinecap="round"
      />
    )}
    {hasPlant && (
      <g transform="translate(60, 130)">
        <path d="M 0 0 Q -12 -25 -6 -45 Q 6 -20 0 0" fill="#22c55e" />
        <path d="M 0 0 Q 14 -16 22 -34 Q 8 -12 0 0" fill="#16a34a" />
        <path d="M 0 0 Q -18 -12 -24 -28 Q -8 -8 0 0" fill="#15803d" />
      </g>
    )}
    <text
      x="60"
      y="152"
      textAnchor="middle"
      fontSize="10"
      fill="#334155"
      fontWeight="600"
    >
      Toples
    </text>
  </svg>
));
ToplesSVG.displayName = "ToplesSVG";
