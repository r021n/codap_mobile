import React from "react";

interface ObservationProps {
  onNext: () => void;
}

const Observation: React.FC<ObservationProps> = ({ onNext }) => {
  const questions = [
    "Apa saja fakta yang kamu peroleh dari video tersebut?",
    "Interpretasikan fakta yang kamu peroleh dari video tersebut?",
    "Susunlah rumusan masalah berdasarkan video yang telah kalian amati!",
    "Buatlah model dalam bentuk mind map dari rumusan masalah yang telah kalian susun (minimal 2)!",
    "Kumpulkan tugas pada tautan google form yang telah disediakan!",
  ];

  return (
    <div className="w-[100vw] h-[100vh] bg-[#FDFCF8] flex flex-col p-3 overflow-hidden font-sans selection:bg-[#C6E67D] selection:text-[#0A110B]">
      {/* Top Header Section */}
      <div className="flex justify-between items-center mb-2 shrink-0">
        <div className="flex gap-2">
          {/* SEP NGSS Icon Badge */}
          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300">
            <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
              science
            </span>
            <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
              <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-[0.1em] leading-tight mb-0.5">
                SEP NGSS
              </span>
              <span className="text-[10px] font-bold text-[#0A110B] leading-tight">
                Asking Questions
              </span>
            </div>
          </div>

          {/* Individu Icon Badge */}
          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300">
            <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
              person
            </span>
            <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
              <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-[0.1em] leading-tight mb-0.5">
                Tugas
              </span>
              <span className="text-[10px] font-bold text-[#0A110B] leading-tight">
                Individu
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white px-4 py-1.5 rounded-full border border-[#C6E67D]/30 shadow-sm">
          <h1 className="text-xs font-black text-[#0A110B] uppercase tracking-widest">
            Tahap Observasi
          </h1>
        </div>
      </div>

      {/* Main Content Area - Two Columns for Landscape */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Left Column: Video and Instruction (40-45%) */}
        <div className="w-[45%] flex flex-col gap-2 min-h-0">
          <div className="bg-white p-3 rounded-2xl border border-[#C6E67D]/30 shadow-sm flex flex-col flex-1 min-h-0">
            <div className="flex items-center gap-2 mb-3 shrink-0">
              <div className="w-1 h-5 bg-[#528C46] rounded-full"></div>
              <h2 className="text-sm font-bold text-[#0A110B] leading-tight">
                Coba amati dan analisis video berikut!
              </h2>
            </div>

            {/* Video Container */}
            <div className="flex-1 bg-black rounded-xl overflow-hidden relative shadow-inner group">
              <iframe
                className="w-full h-full border-0"
                src="https://www.youtube.com/embed/e6rglsLy1Ys"
                title="Video Observasi"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-2 p-2 bg-[#FDFCF8] rounded-lg border border-dashed border-[#C6E67D] shrink-0">
              <p className="text-[10px] text-[#6B7280] flex items-center gap-1 leading-tight">
                <span className="material-symbols-outlined text-[#528C46] text-[12px]">
                  link
                </span>
                Tautan:{" "}
                <a
                  href="https://www.youtube.com/watch?v=e6rglsLy1Ys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#528C46] font-semibold hover:underline"
                >
                  youtube.com/watch?v=e6rglsLy1Ys
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Questions and Submission (55-60%) */}
        <div className="w-[55%] flex flex-col gap-2 min-h-0">
          <div className="bg-white p-3 md:p-4 rounded-2xl border border-[#C6E67D]/30 shadow-sm flex flex-col flex-1 min-h-0 relative">
            <div className="flex items-center gap-2 mb-3 shrink-0">
              <div className="w-1 h-5 bg-[#528C46] rounded-full"></div>
              <h2 className="text-sm font-bold text-[#0A110B] leading-tight">
                Pertanyaan Analisis
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              <p className="text-xs text-[#6B7280] mb-4 font-medium italic leading-relaxed">
                Setelah mengamati dan menganalisis video, jawablah
                pertanyaan-pertanyaan berikut!
              </p>

              {questions.map((q, i) => (
                <div key={i} className="flex gap-3 group">
                  <div className="shrink-0 text-[#528C46] text-xs font-black pt-[2px]">
                    {i + 1}.
                  </div>
                  <p className="text-[12px] text-[#0A110B] leading-relaxed pt-[1px] font-medium">
                    {q}
                  </p>
                </div>
              ))}

              {/* Google Form Link Card */}
              <div className="mt-6 p-3 bg-[#FDFCF8] border border-[#C6E67D]/40 rounded-xl shadow-inner">
                <p className="text-[10px] font-bold text-[#528C46] mb-2 uppercase tracking-wider leading-tight">
                  Tautan Pengumpulan Tugas LKPD 1
                </p>
                <a
                  href="https://forms.gle/maPg1qzZnj2EwzeX6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-[#C6E67D]/40 hover:border-[#528C46] hover:shadow-md transition-all group"
                >
                  <span className="text-[11px] text-[#528C46] font-semibold truncate mr-2 leading-tight">
                    forms.gle/maPg1qzZnj2EwzeX6
                  </span>
                  <span className="material-symbols-outlined text-[#528C46] text-[16px] group-hover:translate-x-0.5 transition-transform">
                    open_in_new
                  </span>
                </a>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-3 shrink-0">
              <button
                onClick={onNext}
                className="w-full py-2.5 bg-[#528C46] text-white rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-[#0A110B] hover:text-[#C6E67D] transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                Lanjutkan Ke Tahap Berikutnya
                <span className="material-symbols-outlined text-[14px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #C6E67D;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #528C46;
        }
      `}</style>
    </div>
  );
};

export default Observation;
