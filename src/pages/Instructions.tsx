import React from "react";

interface InstructionsProps {
  onNext: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onNext }) => {
  const guideItems = [
    { icon: "arrow_back", label: "Kembali" },
    { icon: "arrow_forward", label: "Lanjut" },
    { icon: "home", label: "Kembali ke menu utama" },
    { icon: "science", label: "Science and Engineering Practices (SEP) NGSS" },
    { icon: "person", label: "Tugas individu" },
    { icon: "groups", label: "Tugas kelompok" },
    { icon: "auto_awesome", label: "Terintegrasi AI" },
    { icon: "analytics", label: "Terintegrasi CODAP" },
    { icon: "query_stats", label: "Indikator literasi data" },
  ];

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center p-2 sm:p-4 md:p-6 overflow-hidden font-sans selection:bg-green-200 selection:text-green-900">
      <div className="w-full max-w-5xl flex flex-col flex-1 min-h-0 justify-between">
        {/* Header - Compact */}
        <div className="mb-2 md:mb-4 flex items-center">
          <div className="bg-green-500 px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center shadow-sm">
            <h1 className="text-[10px] md:text-sm font-black text-white uppercase tracking-[0.2em]">
              Petunjuk Penggunaan Airdatalabs
            </h1>
          </div>
        </div>

        {/* Grid of Icons - Enforce 3 columns to save vertical space on landscape */}
        <div className="grid grid-cols-3 gap-1.5 md:gap-3 items-center flex-1 min-h-0 overflow-hidden">
          {guideItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-1.5 md:p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-green-300 hover:bg-green-50/50 transition-all duration-300 group shadow-sm max-h-[60px] md:max-h-[80px]"
            >
              <div className="flex-linear-0 w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center text-green-500 group-hover:scale-105 transition-all duration-300">
                <span className="material-symbols-outlined text-sm md:text-lg font-light">
                  {item.icon}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-[7px] md:text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 truncate">
                  Ikon / Tombol
                </p>
                <p className="text-[8px] md:text-[10px] font-bold text-slate-700 leading-tight line-clamp-2">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button - Compact */}
        <div className="pt-2 md:pt-4">
          <button
            onClick={onNext}
            className="w-full py-2.5 md:py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold text-[8px] md:text-[9px] uppercase tracking-widest shadow-lg shadow-green-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            Lanjutkan Ke Pembelajaran
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
