import React from "react";
import type { MeasurementResult } from "../../types";
import { LOCATIONS, PARAMETERS } from "../../constants";
import { getCategoryBgClass, getCategoryTextClass } from "../../utils/ispuCalculator";

type ResultViewProps = {
  results: MeasurementResult[];
  revealedCities: string[];
  activeDropZone: string | null;
  onReset: () => void;
};

export const ResultView = React.memo(
  ({ results, revealedCities, activeDropZone, onReset }: ResultViewProps) => {
    return (
      <div className="flex flex-col flex-1 space-y-4 max-w-5xl mx-auto w-full relative pb-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C6E67D]/30 pb-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#0A110B]">
              Hasil Pengukuran
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Data real-time jam {results[0]?.record.jam}
            </p>
          </div>
          <div className="px-3 py-1.5 bg-[#C6E67D]/10 text-blue-700 font-bold text-xs rounded-full border border-[#C6E67D]/30 shadow-sm animate-pulse">
            {revealedCities.length}/{LOCATIONS.length} Lokasi Teranalisis
          </div>
        </div>

        {/* Rak Alat Analisis */}
        <div className="bg-[#FDFCF8] rounded-2xl border border-[#C6E67D]/30 p-4 shadow-inner">
          <div className="flex flex-col items-center gap-6">
            <div className="flex-1 text-center ">
              <h3 className="text-sm font-bold text-[#528C46] flex items-center gap-2 justify-center ">
                <span className="p-1 bg-[#528C46]/10 rounded-lg">🛠️</span> Rak
                Alat Analisis
              </h3>
              <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                Sentuh & tarik tombol <b>ISPU</b> (Indeks Standar Pencemaran
                Udara) ke kotak hasil setiap kota untuk menganalisis kategori
                kualitas udara.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-8">
          <div className="grid grid-cols-1 gap-6 py-4">
            {results.map((res, idx) => {
              const isRevealed = revealedCities.includes(res.record.kota);
              const isHovered = activeDropZone === res.record.kota;
              return (
                <div
                  key={res.record.kota}
                  data-dropzone-city={res.record.kota}
                  className={`space-y-4 rounded-2xl p-1 transition-all duration-300 border ${
                    isRevealed
                      ? "border-transparent"
                      : isHovered
                      ? "border-[#528C46] bg-[#C6E67D]/10 shadow-lg scale-[1.02]"
                      : "border-dashed border-[#C6E67D]/30 bg-[#FDFCF8]/50"
                  }`}
                >
                  <div className="flex items-center gap-2 border-b pb-2 px-2">
                    <div className="w-6 h-6 rounded-full bg-[#528C46] text-white flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <h3 className="font-bold text-[#0A110B] text-lg">
                      {res.record.kota}
                    </h3>
                  </div>

                  {isRevealed ? (
                    <div
                      className={`p-4 rounded-xl text-white shadow-lg animate-in zoom-in-95 duration-500 ${getCategoryBgClass(
                        res.overallCategory,
                      )}`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm opacity-90 font-medium leading-tight">
                          Kategori ISPU
                          <span className="block text-[10px] font-normal opacity-75">
                            Indeks Standar Pencemaran Udara
                          </span>
                        </p>
                        <span className="text-2xl font-black">
                          {res.overallMax}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold">
                        {res.overallCategory}
                      </h3>
                    </div>
                  ) : (
                    <div
                      className={`h-[84px] rounded-xl flex flex-col items-center justify-center border border-white transition-colors gap-1 italic text-sm ${
                        isHovered
                          ? "bg-[#C6E67D]/20 text-[#528C46]"
                          : "bg-slate-200/50 text-[#6B7280]"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center opacity-50 ${
                          isHovered
                            ? "border-[#C6E67D] animate-pulse"
                            : "border-[#C6E67D]/30"
                        }`}
                      >
                        ?
                      </div>
                      <span>
                        {isHovered ? "Ready to Scan" : "Drop Tombol ISPU"}
                      </span>
                      {!isHovered && (
                        <span className="text-[10px] not-italic opacity-75 text-center leading-tight px-2">
                          Indeks Standar Pencemaran Udara
                        </span>
                      )}
                    </div>
                  )}

                  <div className="bg-white border rounded-xl overflow-hidden text-sm shadow-sm">
                    <table className="w-full">
                      <thead className="bg-[#FDFCF8] text-[#6B7280]">
                        <tr>
                          <th className="p-3 text-left">Parameter</th>
                          <th className="p-3 text-center">Nilai</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {PARAMETERS.map((param) => {
                          const cat = res.categories[param.key];
                          return (
                            <tr key={param.key}>
                              <td className="p-3">
                                <span className="font-medium block">
                                  {param.label}
                                </span>
                                <span className="text-xs text-[#6B7280]">
                                  {param.unit}
                                </span>
                              </td>
                              <td className="p-3 text-center font-mono font-bold">
                                <div className="flex flex-col items-center">
                                  <span>
                                    {cat?.value !== null && cat?.value !== undefined
                                      ? cat.value
                                      : "-"}
                                  </span>
                                  {isRevealed && cat?.category !== "-" && (
                                    <span
                                      className={`text-[10px] px-1.5 py-0.5 rounded animate-in fade-in slide-in-from-top-1 ${getCategoryTextClass(
                                        cat.category,
                                      )}`}
                                      style={{
                                        backgroundColor: cat.color + "20",
                                      }}
                                    >
                                      {cat.category}
                                    </span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t bg-white">
          <button
            onClick={onReset}
            className="w-full bg-[#C6E67D]/20 text-[#0A110B] py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors active:scale-95"
          >
            Ukur Ulang
          </button>
        </div>
      </div>
    );
  },
);

ResultView.displayName = "ResultView";
