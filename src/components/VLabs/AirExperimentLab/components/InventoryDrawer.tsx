import React, { type PointerEvent as ReactPointerEvent } from "react";
import type { InventoryItem } from "../types";
import { InventoryToolIcon } from "../../../../assets/air_labs/tools";

type InventoryDrawerProps = {
  isOpen: boolean;
  inventory: Record<InventoryItem, boolean>;
  isSetupComplete: boolean;
  isSunny: boolean;
  dragItem: InventoryItem | null;
  onClose: () => void;
  onBack: () => void;
  onReset: () => void;
  onItemPointerDown: (
    e: ReactPointerEvent<HTMLDivElement>,
    item: InventoryItem,
  ) => void;
};

export const InventoryDrawer = React.memo(
  ({
    isOpen,
    inventory,
    isSetupComplete,
    isSunny,
    dragItem,
    onClose,
    onBack,
    onReset,
    onItemPointerDown,
  }: InventoryDrawerProps) => {
    const renderInvItem = (
      id: InventoryItem,
      label: string,
      extraClass = "",
    ) => (
      <div
        key={id}
        onPointerDown={(e) => onItemPointerDown(e, id)}
        className={`touch-none cursor-grab flex flex-col items-center justify-center p-2 rounded-lg border ${extraClass} 
        ${dragItem === id ? "opacity-50 border-dashed border-[#528C46]" : "bg-[#FDFCF8] border-[#C6E67D]/20 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] hover:bg-[#528C46]/5 hover:border-[#528C46]/50 active:scale-95"}`}
      >
        <InventoryToolIcon
          item={id}
          className="w-8 h-8 pointer-events-none select-none"
        />
        <span className="text-[10px] text-center mt-1 text-[#0A110B] font-semibold pointer-events-none select-none leading-tight">
          {label}
        </span>
      </div>
    );

    return (
      <div
        className={`z-20 flex h-full min-h-0 flex-col border-r border-[#C6E67D]/20 bg-[#FDFCF8] shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out ${
          isOpen
            ? "w-[30vw] max-w-[280px] min-w-[210px] opacity-100"
            : "w-0 min-w-0 max-w-0 opacity-0 overflow-hidden border-r-0 pointer-events-none"
        }`}
      >
        <div className="p-2.5 border-b border-[#C6E67D]/20 bg-[#FDFCF8]/90 sticky top-0 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#528C46]">Alat & Bahan</h2>
            <div className="flex items-center gap-1.5">
              <button
                onClick={onBack}
                className="px-2 py-1 text-[10px] font-semibold rounded-lg border border-[#C6E67D]/30 text-[#6B7280] hover:bg-[#FDFCF8] active:scale-95 transition-all duration-150"
                title="Kembali ke Awal"
              >
                ← Kembali
              </button>
              <button
                onClick={onReset}
                className="px-2 py-1 text-[10px] font-semibold rounded-lg border border-foreground text-[#0A110B] hover:bg-foreground hover:text-white active:scale-95 transition-all duration-150"
                title="Reset Lab"
              >
                ↺ Reset
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded-lg border border-[#C6E67D]/30 text-[#6B7280] hover:bg-[#528C46]/10 hover:text-[#528C46] active:scale-95 transition-all"
                title="Sembunyikan Panel Alat"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2.5">
          <div className="grid grid-cols-3 gap-2">
            {inventory.thermoA && renderInvItem("thermoA", "Thermo A")}
            {inventory.thermoB && renderInvItem("thermoB", "Thermo B")}
            {inventory.thermoD && renderInvItem("thermoD", "Thermo D")}
            {inventory.stopperA && renderInvItem("stopperA", "Gabus A")}
            {inventory.stopperB && renderInvItem("stopperB", "Gabus B")}
            {inventory.stopperC && renderInvItem("stopperC", "Gabus C")}
            {inventory.stopperD && renderInvItem("stopperD", "Gabus D")}
            {inventory.plant && renderInvItem("plant", "Tanaman")}
            {inventory.cylinder && renderInvItem("cylinder", "Gelas Ukur")}
            {inventory.bakingSoda &&
              renderInvItem("bakingSoda", "Baking Soda (5 gr)")}
            {inventory.vinegar && renderInvItem("vinegar", "Cuka")}
            {inventory.sun &&
              isSetupComplete &&
              renderInvItem(
                "sun",
                "Matahari",
                "border-[#F59E0B] bg-[#F59E0B]/10 animate-pulse",
              )}
            {inventory.stopwatch &&
              isSunny &&
              renderInvItem(
                "stopwatch",
                "Stopwatch",
                "border-[#528C46] bg-[#528C46]/10 animate-pulse",
              )}
          </div>
        </div>
      </div>
    );
  },
);

InventoryDrawer.displayName = "InventoryDrawer";
