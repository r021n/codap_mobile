import React from "react";
import IndonesiaMapSVG from "../../../../assets/air_labs/indonesian_map.svg";
import { LOCATIONS } from "../constants";

export const MapIndonesiaBase = React.memo(() => (
  <div className="w-full h-full absolute inset-0 pointer-events-none">
    <img
      src={IndonesiaMapSVG}
      className="w-full h-full object-contain"
      alt="Peta Indonesia"
    />
  </div>
));
MapIndonesiaBase.displayName = "MapIndonesiaBase";

export const LocationPins = React.memo(
  ({ isMonitoring = false }: { isMonitoring?: boolean }) => (
    <svg
      viewBox="0 0 1000 500"
      className="w-full h-full absolute inset-0 z-10 pointer-events-none"
      preserveAspectRatio="xMidYMid meet"
    >
      {LOCATIONS.map((loc) => {
        let x: number;
        let y: number;
        if (loc === "Tasikmalaya") {
          x = 320;
          y = 360;
        } else if (loc === "Solo") {
          x = 380;
          y = 360;
        } else {
          x = 450;
          y = 200;
        } // Kutai Barat

        return (
          <g
            key={loc}
            transform={`translate(${x}, ${y})`}
            className="pointer-events-none"
          >
            <circle
              cx="0"
              cy="0"
              r={isMonitoring ? "20" : "12"}
              fill={isMonitoring ? "#10B981" : "#3B82F6"}
              opacity="0.3"
              className="animate-ping"
            />
            <circle
              cx="0"
              cy="0"
              r={isMonitoring ? "10" : "8"}
              fill={isMonitoring ? "#10B981" : "#3B82F6"}
            />
            <path
              d="M -6 -6 L 6 6 M 6 -6 L -6 6"
              stroke="white"
              strokeWidth="2"
            />
            <text
              x="0"
              y="25"
              textAnchor="middle"
              fill="#1F2937"
              fontSize="14"
              fontWeight="bold"
              className="drop-shadow-sm"
            >
              {loc}
            </text>
          </g>
        );
      })}
    </svg>
  ),
);
LocationPins.displayName = "LocationPins";

export const IndonesiaMap = React.memo(
  ({ isMonitoring = false }: { isMonitoring?: boolean }) => (
    <div className="relative w-full max-w-2xl aspect-[2/1] mx-auto bg-[#FDFCF8] rounded-2xl overflow-hidden shadow-inner border border-[#C6E67D]/30">
      <MapIndonesiaBase />
      <LocationPins isMonitoring={isMonitoring} />
    </div>
  ),
);
IndonesiaMap.displayName = "IndonesiaMap";
