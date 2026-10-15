import React from "react";
import type { LabLog } from "../types";

type LKPDPanelProps = {
  isOpen: boolean;
  durationInput: string;
  time: number;
  duration: number;
  isRunning: boolean;
  isLabFinished: boolean;
  logs: LabLog[];
  onToggle: () => void;
  onDurationChange: (value: string) => void;
  onDurationBlur: () => void;
};

export const LKPDPanel = React.memo(
  ({
    isOpen,
    durationInput,
    time,
    duration,
    isRunning,
    isLabFinished,
    logs,
    onToggle,
    onDurationChange,
    onDurationBlur,
  }: LKPDPanelProps) => {
    return (
      <div
        className={`z-40 flex flex-col border-t-2 border-[#C6E67D]/20 bg-[#FDFCF8] shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out shrink-0 ${
          isOpen ? "h-[36vh] max-h-52" : "h-auto"
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-[#C6E67D]/20 bg-[#FDFCF8] px-3 py-1.5 shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-xs text-[#528C46]">
              LKPD Data Suhu
            </h3>
            <button
              onClick={onToggle}
              className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded border border-[#C6E67D]/30 text-[#6B7280] hover:bg-[#528C46]/10 hover:text-[#528C46] active:scale-95 transition-all"
              title={isOpen ? "Sembunyikan LKPD" : "Tampilkan LKPD"}
            >
              <span>{isOpen ? "Sembunyikan" : "Tampilkan"}</span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Durasi Custom */}
            <div className="flex items-center gap-1 text-[10px]">
              <label
                htmlFor="duration-input"
                className="text-[#6B7280] font-medium"
              >
                Durasi:
              </label>
              <input
                id="duration-input"
                type="number"
                min="5"
                value={durationInput}
                onChange={(e) => onDurationChange(e.target.value)}
                onBlur={onDurationBlur}
                disabled={isRunning || isLabFinished}
                className="w-12 rounded border border-[#C6E67D]/30 bg-[#FDFCF8] px-1.5 py-0.5 text-center font-sans font-semibold text-[#0A110B] focus:border-[#528C46] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
              <span className="text-[#6B7280]">mnt</span>
            </div>
            <div className="rounded border border-[#528C46]/20 bg-[#FDFCF8] px-2 py-0.5 font-sans text-xs font-semibold text-[#528C46]">
              {time}/{duration} Mnt
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="flex-1 overflow-auto">
            <table className="w-max min-w-full text-left text-[11px]">
              <thead className="sticky top-0 border-b border-[#C6E67D]/20 bg-[#FDFCF8] text-[#0A110B]">
                <tr>
                  <th className="p-1.5 pl-4 font-semibold">Menit ke-</th>
                  <th className="p-1.5 font-semibold">Tabung A (Kontrol)</th>
                  <th className="p-1.5 font-semibold">Tabung B (+CO2)</th>
                  <th className="p-1.5 font-semibold">Tabung D (Toples)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/10">
                {logs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-3 text-center italic text-[#6B7280]"
                    >
                      Mulai stopwatch untuk mencatat data.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr
                      key={log.time}
                      className="transition-colors hover:bg-[#FDFCF8]/50"
                    >
                      <td className="p-1.5 pl-4 font-sans font-semibold text-[#0A110B]">
                        {log.time}
                      </td>
                      <td className="p-1.5 font-sans text-[#6B7280]">
                        {log.tempA} °C
                      </td>
                      <td className="p-1.5 font-bold text-[#528C46]">
                        {log.tempB} °C{" "}
                        {parseFloat(log.tempB) > parseFloat(log.tempA)
                          ? "↑"
                          : ""}
                      </td>
                      <td className="p-1.5 font-sans text-[#6B7280]">
                        {log.tempD} °C
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  },
);

LKPDPanel.displayName = "LKPDPanel";
