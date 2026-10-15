import React, { type PointerEvent as ReactPointerEvent } from "react";
import type { DragInfo } from "../types";

type ScannerButtonProps = {
  onPointerDown: (e: ReactPointerEvent) => void;
};

export const ScannerButton = React.memo(
  ({ onPointerDown }: ScannerButtonProps) => {
    return (
      <div className="absolute top-4 right-4 z-50 flex flex-col items-center gap-1 group bg-[#FDFCF8]/90 p-2 rounded-2xl backdrop-blur-sm shadow-xl border-2 border-[#528C46]/30 animate-in fade-in zoom-in duration-300">
        <div
          onPointerDown={onPointerDown}
          className="w-14 h-14 flex items-center justify-center bg-[#528C46] text-white rounded-full border-4 border-[#C6E67D] shadow-lg cursor-grab active:cursor-grabbing transition-all hover:scale-110 active:scale-95 touch-none font-black text-sm tracking-tighter"
        >
          ISPU
        </div>
        <span className="text-[10px] font-bold text-[#528C46] uppercase tracking-widest mt-1">
          Scanner
        </span>
        <span className="text-[9px] font-medium text-[#528C46]/70 leading-tight text-center max-w-[92px]">
          Indeks Standar Pencemaran Udara
        </span>
      </div>
    );
  },
);
ScannerButton.displayName = "ScannerButton";

type ScannerOverlayProps = {
  dragInfo: DragInfo;
};

export const ScannerOverlay = React.memo(
  ({ dragInfo }: ScannerOverlayProps) => {
    if (!dragInfo.isDragging) return null;

    return (
      <div
        id="scanner-overlay"
        className="fixed pointer-events-none z-[100] transform -translate-x-1/2 drop-shadow-2xl scale-125"
        style={{
          left: dragInfo.x,
          top: dragInfo.y - (dragInfo.isTouch ? 60 : 0),
          marginTop: dragInfo.isTouch ? "-20px" : "0px",
        }}
      >
        <div className="bg-[#528C46] text-white p-3 rounded-full border-4 border-[#C6E67D] shadow-[0_0_25px_rgba(37,99,235,0.7)] font-black text-sm tracking-tighter">
          ISPU
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-[#528C46] text-white text-[8px] font-medium rounded whitespace-nowrap shadow-md">
          Indeks Standar Pencemaran Udara
        </div>
        {dragInfo.isTouch && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-9 px-2 py-1 bg-[#528C46] text-white text-[8px] font-bold rounded uppercase whitespace-nowrap shadow-md">
            Scanning Mode
          </div>
        )}
      </div>
    );
  },
);
ScannerOverlay.displayName = "ScannerOverlay";
