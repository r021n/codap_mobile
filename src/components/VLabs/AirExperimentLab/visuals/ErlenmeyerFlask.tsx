import React from "react";
import type { ErlenmeyerProps } from "../types";

export const ErlenmeyerSVG = React.memo(
  ({
    label,
    hasThermo,
    hasStopper,
    hasSoda,
    hasVinegar,
    isBubbling,
  }: ErlenmeyerProps) => (
    <svg viewBox="0 0 120 160" className="w-full h-full drop-shadow-md">
      {/* Gabus / Stopper */}
      {hasStopper && (
        <path
          d="M 50 22 L 70 22 L 68 35 L 52 35 Z"
          fill="#8B4513"
          stroke="#5c2e0b"
          strokeWidth="2"
        />
      )}

      {/* Termometer */}
      {hasThermo && (
        <g>
          <line
            x1="60"
            y1="-10"
            x2="60"
            y2="100"
            stroke="#d1d5db"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="60"
            y1="20"
            x2="60"
            y2="90"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="60" cy="100" r="8" fill="#ef4444" />
        </g>
      )}

      {/* Leher Tabung (tanpa kuping/pegangan) */}
      <path
        d="M 50 25 L 50 55 L 15 135 A 10 10 0 0 0 25 145 L 95 145 A 10 10 0 0 0 105 135 L 70 55 L 70 25 Z"
        fill="rgba(255, 255, 255, 0.5)"
        stroke="#475569"
        strokeWidth="2.5"
      />

      {/* Mulut tabung */}
      <line
        x1="48"
        y1="25"
        x2="72"
        y2="25"
        stroke="#475569"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Label */}
      <rect
        x="50"
        y="70"
        width="20"
        height="20"
        fill="white"
        stroke="#64748b"
        rx="2"
      />
      <text
        x="60"
        y="84"
        fontSize="12"
        textAnchor="middle"
        fontWeight="bold"
        fill="#1e293b"
      >
        {label}
      </text>

      {/* Isi Tabung: Baking Soda */}
      {hasSoda && (
        <path
          d="M 20 140 Q 60 120 100 140 L 95 145 L 25 145 Z"
          fill="#f8fafc"
        />
      )}

      {/* Isi Tabung: Cuka & Reaksi */}
      {hasVinegar && (
        <g>
          <path
            d="M 30 110 Q 60 105 90 110 L 100 135 L 20 135 Z"
            fill="rgba(191, 219, 254, 0.7)"
          />
          {isBubbling && (
            <g>
              <circle
                cx="40"
                cy="120"
                r="3"
                fill="white"
                className="animate-bounce"
              />
              <circle
                cx="60"
                cy="115"
                r="4"
                fill="white"
                className="animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
              <circle
                cx="80"
                cy="125"
                r="2"
                fill="white"
                className="animate-bounce"
                style={{ animationDelay: "0.4s" }}
              />
              <circle
                cx="50"
                cy="90"
                r="3"
                fill="white"
                className="animate-pulse"
              />
              <circle
                cx="70"
                cy="70"
                r="4"
                fill="white"
                className="animate-pulse"
                style={{ animationDelay: "0.3s" }}
              />
              <text
                x="60"
                y="60"
                fontSize="12"
                fill="#94a3b8"
                textAnchor="middle"
                className="animate-pulse"
              >
                CO₂
              </text>
            </g>
          )}
        </g>
      )}
    </svg>
  ),
);

ErlenmeyerSVG.displayName = "ErlenmeyerSVG";
