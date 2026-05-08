import React from "react";

interface InstructionsProps {
  onNext: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onNext }) => {
  const guideItems = [
    { icon: "arrow_back", label: "Kembali" },
    { icon: "arrow_forward", label: "Lanjut" },
    { icon: "home", label: "Menu Utama" },
    { icon: "science", label: "SEP NGSS" },
    { icon: "person", label: "Tugas Individu" },
    { icon: "groups", label: "Tugas Kelompok" },
    { icon: "auto_awesome", label: "Terintegrasi AI" },
    { icon: "analytics", label: "Terintegrasi CODAP" },
    { icon: "query_stats", label: "Literasi Data" },
  ];

  return (
    <div className="w-[100vw] h-[100vh] bg-[#FDFCF8] flex flex-row overflow-hidden selection:bg-[#C6E67D] selection:text-[#0A110B]">
      {/* Left Column - Visual/Greeting */}
      <div className="w-[40%] h-full bg-[#C6E67D] p-6 relative flex flex-col justify-center items-start overflow-hidden shrink-0 rounded-r-3xl shadow-sm">
        {/* Decorative background shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-48 h-48 bg-white/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-[#528C46]/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col gap-2">
          <div className="inline-block self-start px-3 py-1 bg-[#528C46] text-white text-[10px] font-bold rounded-full tracking-wider uppercase">
            Panduan
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A110B] leading-tight">
            Petunjuk <br /> Penggunaan
          </h1>
          <p className="text-[9px] sm:text-[10px] text-[#0A110B]/80 leading-snug max-w-[90%] mt-1">
            Kenali dan pahami fungsi setiap ikon di bawah ini untuk mempermudah navigasi dan pembelajaranmu.
          </p>
        </div>
      </div>

      {/* Right Column - Icons Grid & Action */}
      <div className="w-[60%] h-full flex flex-col justify-center p-4 sm:p-6 overflow-hidden">
        <div className="w-full max-w-xl mx-auto flex flex-col h-full justify-between gap-2">
          
          <div className="flex-1 flex flex-col justify-center min-h-0">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {guideItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 sm:p-2.5 rounded-2xl bg-white border border-gray-100 hover:border-[#C6E67D] transition-all duration-300 shadow-sm group"
                >
                  <div className="flex-none w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FDFCF8] border border-gray-100 flex items-center justify-center text-[#528C46] group-hover:bg-[#C6E67D]/20 transition-colors">
                    <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-[8px] sm:text-[9px] font-bold text-[#6B7280] uppercase tracking-wider mb-0.5">
                      Ikon
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-bold leading-tight text-[#0A110B] line-clamp-2">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 shrink-0">
            <button
              onClick={onNext}
              className="w-full py-2 sm:py-2.5 bg-[#0A110B] text-white rounded-full font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 shadow-sm hover:bg-black active:translate-y-0.5 cursor-pointer"
            >
              Lanjutkan Ke Pembelajaran
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
