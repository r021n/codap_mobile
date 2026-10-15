import React from "react";
import type { MeasurementResult, ISPUCategory } from "../types";
import { PARAMETERS } from "../constants";

type DeviceSVGProps = {
  progress?: number;
  status?: string;
  result?: MeasurementResult | null;
  compact?: boolean;
  powerState?: "off" | "booting" | "ready";
  onPowerClick?: () => void;
};

export const DeviceSVG = React.memo(
  ({
    progress = 0,
    status,
    result,
    compact = false,
    powerState = "ready",
    onPowerClick,
  }: DeviceSVGProps) => {
    const getIndicatorX = (category: ISPUCategory | string) => {
      switch (category) {
        case "Baik":
          return 55;
        case "Sedang":
          return 85;
        case "Tidak Sehat":
          return 115;
        case "Sangat Tidak Sehat":
          return 145;
        case "Berbahaya":
          return 175;
        default:
          return 55;
      }
    };

    return (
      <svg
        viewBox="0 0 300 400"
        className={`w-full h-auto drop-shadow-2xl mx-auto transition-all duration-300 ${
          compact ? "max-w-[180px]" : "max-w-[280px] -[320px]"
        }`}
      >
        {/* Device Body */}
        {/* Back shadow */}
        <rect
          x="25"
          y="25"
          width="260"
          height="360"
          rx="15"
          fill="#94a3b8"
          opacity="0.3"
        />
        {/* Main casing */}
        <rect
          x="15"
          y="15"
          width="260"
          height="360"
          rx="15"
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth="2"
        />

        {/* Right side shading to give 3D edge effect */}
        <path d="M 230 15 L 230 375" stroke="#e2e8f0" strokeWidth="1" />
        <path
          d="M 230 15 L 260 15 Q 275 15 275 30 L 275 360 Q 275 375 260 375 L 230 375 Z"
          fill="#f1f5f9"
        />

        {/* Vents and Side Button */}
        <g fill="#cbd5e1">
          <rect
            x="245"
            y="80"
            width="20"
            height="4"
            rx="2"
            transform="rotate(-10 245 80)"
          />
          <rect
            x="245"
            y="95"
            width="20"
            height="4"
            rx="2"
            transform="rotate(-10 245 95)"
          />
          <rect
            x="245"
            y="110"
            width="20"
            height="4"
            rx="2"
            transform="rotate(-10 245 110)"
          />
          <rect
            x="245"
            y="125"
            width="20"
            height="4"
            rx="2"
            transform="rotate(-10 245 125)"
          />
          <rect
            x="245"
            y="140"
            width="20"
            height="4"
            rx="2"
            transform="rotate(-10 245 140)"
          />

          {/* Power Button Area */}
          <g
            className={onPowerClick ? "cursor-pointer" : ""}
            onClick={onPowerClick}
          >
            {/* Transparent hit area for power button - enlarged for touch */}
            <circle cx="255" cy="200" r="25" fill="transparent" />

            {/* Pointer so the user knows the power button is here */}
            <g
              className={powerState === "off" ? "animate-pulse" : ""}
              pointerEvents="none"
            >
              <circle
                cx="255"
                cy="200"
                r="17"
                fill="none"
                stroke={powerState === "off" ? "#f59e0b" : "#94a3b8"}
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text
                x="255"
                y="169"
                textAnchor="middle"
                fill={powerState === "off" ? "#f59e0b" : "#94a3b8"}
                fontSize="8"
                fontWeight="bold"
                fontFamily="sans-serif"
                letterSpacing="1"
              >
                POWER
              </text>
              <path
                d="M 255 175 L 255 184"
                stroke={powerState === "off" ? "#f59e0b" : "#94a3b8"}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 251.5 181 L 255 185.5 L 258.5 181"
                stroke={powerState === "off" ? "#f59e0b" : "#94a3b8"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>

            <circle
              cx="255"
              cy="200"
              r="10"
              fill="none"
              stroke={powerState !== "off" ? "#10b981" : "#cbd5e1"}
              strokeWidth="2"
              className="transition-colors duration-300"
            />
            <rect
              x="254"
              y="195"
              width="2"
              height="6"
              fill={powerState !== "off" ? "#10b981" : "#cbd5e1"}
              className="transition-colors duration-300"
            />
          </g>

          <rect
            x="245"
            y="260"
            width="20"
            height="4"
            rx="2"
            transform="rotate(-10 245 260)"
          />
          <rect
            x="245"
            y="275"
            width="20"
            height="4"
            rx="2"
            transform="rotate(-10 245 275)"
          />
          <rect
            x="245"
            y="290"
            width="20"
            height="4"
            rx="2"
            transform="rotate(-10 245 290)"
          />
          <rect
            x="245"
            y="305"
            width="20"
            height="4"
            rx="2"
            transform="rotate(-10 245 305)"
          />
        </g>

        {/* Screen Area */}
        <rect x="30" y="30" width="185" height="330" rx="8" fill="#111827" />
        <rect x="32" y="32" width="181" height="326" rx="6" fill="#000000" />

        {/* Top Bar on Screen (only visible when not off) */}
        {powerState !== "off" && (
          <g>
            <path
              d="M 40 45 L 46 51 L 43 54 L 43 36 L 46 39 L 40 45 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <rect
              x="180"
              y="40"
              width="18"
              height="10"
              rx="2"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            <rect x="199" y="43" width="2" height="4" fill="#ffffff" />
            <rect
              x="182"
              y="42"
              width="14"
              height="6"
              fill="#10b981"
              rx="1"
            />

            <text
              x="122"
              y="65"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10"
              fontFamily="sans-serif"
              fontWeight="bold"
              letterSpacing="0.5"
            >
              AIR QUALITY DETECTOR
            </text>
            <rect x="40" y="75" width="165" height="1" fill="#334155" />
          </g>
        )}

        {/* Screen Content */}
        {powerState === "off" ? (
          <g>{/* Black screen content - nothing to show */}</g>
        ) : powerState === "booting" ? (
          <g>
            <text
              x="122"
              y="170"
              textAnchor="middle"
              fill="#10b981"
              fontSize="14"
              fontFamily="monospace"
              fontWeight="bold"
              className="animate-pulse"
            >
              SYSTEM BOOT...
            </text>
            <rect
              x="50"
              y="190"
              width="145"
              height="4"
              fill="#1e293b"
              rx="2"
            />
            <rect
              x="50"
              y="190"
              width="145"
              height="4"
              fill="#10b981"
              rx="2"
            >
              <animate
                attributeName="width"
                from="0"
                to="145"
                dur="1.5s"
                fill="freeze"
              />
            </rect>
            <text
              x="122"
              y="220"
              textAnchor="middle"
              fill="#475569"
              fontSize="8"
              fontFamily="sans-serif"
            >
              LOADING CALIBRATION
            </text>
          </g>
        ) : progress > 0 && !result ? (
          <g>
            <text
              x="122"
              y="170"
              textAnchor="middle"
              fill="#3b82f6"
              fontSize="16"
              fontFamily="monospace"
              fontWeight="bold"
              className="animate-pulse"
            >
              MENGUKUR...
            </text>
            <text
              x="122"
              y="210"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="32"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {progress}%
            </text>
            {!compact && (
              <text
                x="122"
                y="240"
                textAnchor="middle"
                fill="#9ca3af"
                fontSize="10"
                fontFamily="sans-serif"
              >
                {status}
              </text>
            )}
            {/* Mock Parameters blinking */}
            {PARAMETERS.map((p, i) => (
              <text
                key={p.key}
                x="45"
                y={100 + i * 28}
                fill="#4b5563"
                fontSize="12"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                {p.label}
              </text>
            ))}
          </g>
        ) : !result && progress === 0 ? (
          <g>
            <text
              x="122"
              y="200"
              textAnchor="middle"
              fill="#4b5563"
              fontSize="24"
              fontFamily="monospace"
              fontWeight="bold"
            >
              READY
            </text>
            {PARAMETERS.map((p, i) => (
              <text
                key={p.key}
                x="45"
                y={100 + i * 28}
                fill="#374151"
                fontSize="12"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                {p.label}
              </text>
            ))}
          </g>
        ) : (
          <g>
            {/* Display Results */}
            {PARAMETERS.map((param, i) => {
              const cat = result?.categories[param.key];
              const value =
                cat?.value !== null && cat?.value !== undefined
                  ? cat?.value
                  : "---";
              const color = cat?.color || "#9ca3af";
              const yPos = 100 + i * 28;
              return (
                <g key={param.key}>
                  <text
                    x="45"
                    y={yPos}
                    fill={color}
                    fontSize="14"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    {param.label}
                  </text>
                  <text
                    x="155"
                    y={yPos}
                    fill={color}
                    fontSize="16"
                    fontWeight="bold"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    {value}
                  </text>
                  <text
                    x="160"
                    y={yPos}
                    fill={color}
                    fontSize="9"
                    fontFamily="sans-serif"
                    textAnchor="start"
                  >
                    {param.unit === "µg/m³" ? "ug/m³" : param.unit}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* Bottom Color Bar (only when ready or result) */}
        {(powerState === "ready" || result) && (
          <g transform="translate(0, 10)">
            <text
              x="55"
              y="325"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="7"
              fontFamily="sans-serif"
            >
              Baik
            </text>
            <text
              x="85"
              y="325"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="7"
              fontFamily="sans-serif"
            >
              Sedang
            </text>
            <text
              x="115"
              y="325"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="7"
              fontFamily="sans-serif"
            >
              T.Sht
            </text>
            <text
              x="145"
              y="325"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="7"
              fontFamily="sans-serif"
            >
              S.T.S
            </text>
            <text
              x="175"
              y="325"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="7"
              fontFamily="sans-serif"
            >
              Bhaya
            </text>

            <rect x="40" y="330" width="30" height="6" fill="#16a34a" />
            <rect x="70" y="330" width="30" height="6" fill="#2563eb" />
            <rect x="100" y="330" width="30" height="6" fill="#eab308" />
            <rect x="130" y="330" width="30" height="6" fill="#dc2626" />
            <rect x="160" y="330" width="30" height="6" fill="#581c87" />

            {result && (
              <polygon
                points={`${
                  getIndicatorX(result.overallCategory) - 4
                },344 ${getIndicatorX(result.overallCategory)},337 ${
                  getIndicatorX(result.overallCategory) + 4
                },344`}
                fill="#ffffff"
              />
            )}
          </g>
        )}
      </svg>
    );
  },
);

DeviceSVG.displayName = "DeviceSVG";
