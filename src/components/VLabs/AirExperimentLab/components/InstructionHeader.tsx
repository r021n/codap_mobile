import React from "react";

type InstructionHeaderProps = {
  instruction: string;
  isInventoryOpen: boolean;
  onOpenInventory: () => void;
  onBack: () => void;
  onReset: () => void;
};

export const InstructionHeader = React.memo(
  ({
    instruction,
    isInventoryOpen,
    onOpenInventory,
    onBack,
    onReset,
  }: InstructionHeaderProps) => {
    return (
      <div className="bg-[#FDFCF8]/90 backdrop-blur-sm border-b border-[#C6E67D]/20 px-3 py-1.5 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] z-20 shrink-0 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {!isInventoryOpen && (
            <button
              onClick={onOpenInventory}
              className="px-2 py-1 text-[10px] font-bold rounded-lg border border-[#528C46]/40 bg-[#FDFCF8] text-[#528C46] shadow-xs hover:bg-[#528C46]/10 active:scale-95 transition-all flex items-center gap-1 shrink-0"
              title="Buka Rak Alat"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span>Alat</span>
            </button>
          )}
          <p className="text-xs text-[#0A110B] font-medium leading-tight truncate">
            <span className="font-bold text-[#528C46]">Instruksi:</span>{" "}
            {instruction}
          </p>
        </div>
        {!isInventoryOpen && (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={onBack}
              className="px-2 py-1 text-[10px] font-semibold rounded-lg border border-[#C6E67D]/30 text-[#6B7280] hover:bg-[#FDFCF8] active:scale-95 transition-all"
              title="Kembali ke Awal"
            >
              ← Kembali
            </button>
            <button
              onClick={onReset}
              className="px-2 py-1 text-[10px] font-semibold rounded-lg border border-foreground text-[#0A110B] hover:bg-foreground hover:text-white active:scale-95 transition-all"
              title="Reset Lab"
            >
              ↺ Reset
            </button>
          </div>
        )}
      </div>
    );
  },
);

InstructionHeader.displayName = "InstructionHeader";
