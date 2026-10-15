import React from "react";
import type { HoseDrawing, PortCoords } from "../types";
import { hasMeasuredPortCoords } from "../constants";

type HoseOverlayProps = {
  hoseBCConnected: boolean;
  hoseDJConnected: boolean;
  hoseDrawing: HoseDrawing;
  portCoords: PortCoords;
};

export const HoseOverlay = React.memo(
  ({
    hoseBCConnected,
    hoseDJConnected,
    hoseDrawing,
    portCoords,
  }: HoseOverlayProps) => {
    return (
      <svg
        id="hose-overlay"
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
      >
        {hoseBCConnected &&
          hasMeasuredPortCoords(portCoords, "B") &&
          hasMeasuredPortCoords(portCoords, "C") && (
            <path
              d={`M ${portCoords.B.x} ${portCoords.B.y} Q ${(portCoords.B.x + portCoords.C.x) / 2} ${Math.min(portCoords.B.y, portCoords.C.y) - 80} ${portCoords.C.x} ${portCoords.C.y}`}
              fill="none"
              stroke="#22c55e"
              strokeWidth="8"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 3px 2px rgba(0,0,0,0.3))" }}
            />
          )}
        {hoseDJConnected &&
          hasMeasuredPortCoords(portCoords, "D") &&
          hasMeasuredPortCoords(portCoords, "J") && (
            <path
              d={`M ${portCoords.D.x} ${portCoords.D.y} Q ${(portCoords.D.x + portCoords.J.x) / 2} ${Math.min(portCoords.D.y, portCoords.J.y) - 70} ${portCoords.J.x} ${portCoords.J.y}`}
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="8"
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 3px 2px rgba(0,0,0,0.25))",
              }}
            />
          )}
        {hoseDrawing.isDrawing &&
          hoseDrawing.startPort &&
          hasMeasuredPortCoords(portCoords, hoseDrawing.startPort) && (
            <path
              d={`M ${portCoords[hoseDrawing.startPort].x} ${portCoords[hoseDrawing.startPort].y} Q ${(portCoords[hoseDrawing.startPort].x + hoseDrawing.currentX) / 2} ${Math.min(portCoords[hoseDrawing.startPort].y, hoseDrawing.currentY) - 50} ${hoseDrawing.currentX} ${hoseDrawing.currentY}`}
              fill="none"
              stroke="#4ade80"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="10 5"
              className="opacity-70"
            />
          )}
      </svg>
    );
  },
);

HoseOverlay.displayName = "HoseOverlay";
