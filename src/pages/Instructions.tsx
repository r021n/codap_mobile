import React, { useState } from "react";

interface InstructionsProps {
  onNext: () => void;
  onBack: () => void;
}

interface GuideItem {
  icon: string;
  label: string;
  description: string;
}

const Instructions: React.FC<InstructionsProps> = ({ onNext, onBack }) => {
  const [selectedItem, setSelectedItem] = useState<GuideItem | null>(null);

  const guideItems: GuideItem[] = [
    {
      icon: "arrow_back",
      label: "Kembali",
      description: "Digunakan untuk kembali ke halaman atau tahapan pembelajaran sebelumnya.",
    },
    {
      icon: "arrow_forward",
      label: "Lanjut",
      description: "Digunakan untuk melanjutkan ke tahapan atau aktivitas pembelajaran berikutnya.",
    },
    {
      icon: "home",
      label: "Menu Utama",
      description: "Mengarahkan kamu kembali ke halaman awal atau beranda aplikasi.",
    },
    {
      icon: "science",
      label: "SEP NGSS",
      description: "Menandai aktivitas sains dan rekayasa berdasarkan Scientific and Engineering Practices (SEP) NGSS.",
    },
    {
      icon: "person",
      label: "Tugas Individu",
      description: "Menunjukkan tugas atau penyelidikan yang harus diselesaikan secara mandiri.",
    },
    {
      icon: "groups",
      label: "Tugas Kelompok",
      description: "Menunjukkan aktivitas pembelajaran kolaboratif yang didiskusikan bersama rekan sekelompok.",
    },
    {
      icon: "auto_awesome",
      label: "Terintegrasi AI",
      description: "Fitur asisten kecerdasan buatan (AI) yang siap membantumu dalam memahami materi dan tanya-jawab.",
    },
    {
      icon: "analytics",
      label: "Terintegrasi CODAP",
      description: "Aktivitas analisis data interaktif menggunakan tabel dan grafik visual melalui CODAP.",
    },
    {
      icon: "query_stats",
      label: "Literasi Data",
      description: "Latihan untuk mengasah kemampuan membaca, menafsirkan, dan mengevaluasi data lingkungan.",
    },
  ];

  return (
    <div className="w-screen h-screen bg-[#FDFCF8] flex flex-row overflow-hidden selection:bg-[#C6E67D] selection:text-[#0A110B] relative">
      {/* Left Column - Visual/Greeting */}
      <div className="w-[40%] h-full bg-[#C6E67D] p-6 relative flex flex-col justify-between items-start overflow-hidden shrink-0 rounded-r-3xl shadow-sm">
        {/* Decorative background shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-48 h-48 bg-white/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-[#528C46]/20 rounded-full blur-2xl"></div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="relative z-20 w-8 h-8 bg-white rounded-full border border-[#C6E67D]/30 shadow-sm flex items-center justify-center hover:bg-[#528C46] group transition-all duration-300 shrink-0"
        >
          <span className="material-symbols-outlined text-[18px] text-[#528C46] group-hover:text-white transition-colors">
            arrow_back
          </span>
        </button>

        <div className="relative z-10 flex flex-col gap-2 mb-auto mt-6">
          <div className="inline-block self-start px-3 py-1 bg-[#528C46] text-white text-[10px] font-bold rounded-full tracking-wider uppercase">
            Panduan
          </div>
          <h1 className="text-2xl font-extrabold text-[#0A110B] leading-tight">
            Petunjuk <br /> Penggunaan
          </h1>
          <p className="text-[10px] text-[#0A110B]/80 leading-snug max-w-[90%] mt-1">
            Kenali fungsi setiap ikon di bawah ini. Ketuk salah satu ikon untuk melihat penjelasan detailnya.
          </p>
        </div>
      </div>

      {/* Right Column - Icons Grid & Action */}
      <div className="w-[60%] h-full flex flex-col justify-center p-5 overflow-hidden">
        <div className="w-full max-w-xl mx-auto flex flex-col h-full justify-between gap-2">
          <div className="flex-1 flex flex-col justify-center min-h-0">
            <div className="grid grid-cols-3 gap-2.5">
              {guideItems.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-gray-100 hover:border-[#C6E67D] hover:shadow-xs active:scale-95 transition-all duration-200 shadow-sm group text-left cursor-pointer"
                >
                  <div className="flex-none w-8 h-8 rounded-full bg-[#FDFCF8] border border-gray-100 flex items-center justify-center text-[#528C46] group-hover:bg-[#C6E67D]/20 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider mb-0.5">
                      Ikon
                    </p>
                    <p className="text-[10px] font-bold leading-tight text-[#0A110B] line-clamp-2">
                      {item.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 shrink-0">
            <button
              onClick={onNext}
              className="w-full py-2.5 bg-[#0A110B] text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-sm hover:bg-black active:translate-y-0.5 cursor-pointer"
            >
              Lanjutkan Ke Pembelajaran
            </button>
          </div>
        </div>
      </div>

      {/* Minimalist Detail Modal */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A110B]/30 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-[290px] rounded-2xl p-4 shadow-xl border border-[#C6E67D]/40 flex flex-col items-center text-center relative"
          >
            {/* Icon Header */}
            <div className="w-11 h-11 rounded-2xl bg-[#F2F5E8] border border-[#C6E67D]/40 flex items-center justify-center text-[#528C46] mb-2.5 shadow-2xs">
              <span className="material-symbols-outlined text-[22px]">
                {selectedItem.icon}
              </span>
            </div>

            {/* Label */}
            <span className="text-[9px] font-bold text-[#528C46] uppercase tracking-wider mb-0.5">
              Panduan Ikon
            </span>
            <h3 className="text-sm font-bold text-[#0A110B] mb-1.5 leading-snug">
              {selectedItem.label}
            </h3>

            {/* Description */}
            <p className="text-[11px] text-[#6B7280] leading-relaxed mb-4">
              {selectedItem.description}
            </p>

            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-1.5 bg-[#0A110B] hover:bg-[#528C46] text-white text-[11px] font-bold uppercase tracking-wider rounded-full transition-colors active:scale-95"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructions;
