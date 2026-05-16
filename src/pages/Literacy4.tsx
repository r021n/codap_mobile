import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Literacy4Props {
  onNext: () => void;
  onBack: () => void;
}

const Literacy4: React.FC<Literacy4Props> = ({ onNext, onBack }) => {
  const { completedPages, markPageCompleted } = useAuth();
  const isCompleted = completedPages.includes("literacy4");

  const [showLinkModal, setShowLinkModal] = useState(false);

  const tasks = [
    "Telaahlah jurnal artikel yang disediakan oleh guru mengenai dampak polusi udara terhadap kesehatan masyarakat.",
    "Bandingkan temuan dalam jurnal dengan data yang telah kamu analisis sebelumnya menggunakan CODAP.",
    "Susunlah argumen ilmiah yang kuat berdasarkan bukti-bukti (evidence) yang telah kamu kumpulkan.",
    "Buatlah model final dari remodel rumusan masalah yang telah kamu buat sebelumnya dengan mengintegrasikan solusi mitigasi.",
  ];

  return (
    <div className="w-screen h-screen bg-[#FDFCF8] flex flex-col p-3 overflow-hidden font-sans selection:bg-[#C6E67D] selection:text-[#0A110B]">
      {/* Top Header Section */}
      <div className="flex justify-between items-center mb-2 shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <button
            onClick={onBack}
            className="w-8 h-8 bg-white rounded-full border border-[#C6E67D]/30 shadow-sm flex items-center justify-center hover:bg-[#528C46] group transition-all duration-300 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px] text-[#528C46] group-hover:text-white transition-colors">
              arrow_back
            </span>
          </button>

          <div className="flex gap-2 items-center overflow-x-auto no-scrollbar flex-1">
            {/* Badges */}
            <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300 shrink-0">
              <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
                gavel
              </span>
              <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
                <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-widest leading-tight mb-0.5 whitespace-nowrap">
                  SEP NGSS
                </span>
                <span className="text-[10px] font-bold text-[#0A110B] leading-tight whitespace-nowrap">
                  Engaging in Argument From Evidence
                </span>
              </div>
            </div>

            <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300 shrink-0">
              <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
                person
              </span>
              <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
                <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-widest leading-tight mb-0.5 whitespace-nowrap">
                  Tugas
                </span>
                <span className="text-[10px] font-bold text-[#0A110B] leading-tight whitespace-nowrap">
                  Individu
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-4 py-1.5 rounded-full border border-[#C6E67D]/30 shadow-sm shrink-0 ml-2 flex items-center gap-2">
          <h1 className="text-xs font-black text-[#0A110B] uppercase tracking-widest whitespace-nowrap">
            Literasi Data
          </h1>
          {isCompleted && (
            <span className="material-symbols-outlined text-[#528C46] text-[16px]">
              check_circle
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Left Column: Literacy Argumentation (65%) */}
        <div className="w-[65%] flex flex-col gap-2 min-h-0">
          <div className="bg-white p-4 rounded-2xl border border-[#C6E67D]/30 shadow-sm flex flex-col flex-1 min-h-0">
            <div className="flex justify-between items-center mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-[#528C46] rounded-full"></div>
                <h2 className="text-base font-bold text-[#0A110B] leading-tight">
                  Pelatihan Literasi Data: Argumentasi
                </h2>
              </div>
              <div className="bg-[#C6E67D]/20 px-3 py-1 rounded-full border border-[#C6E67D]/40">
                <span className="text-[10px] font-black text-[#528C46] uppercase tracking-wider">
                  Evidence & Argument
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-3 space-y-5 custom-scrollbar">
              <p className="text-sm text-[#6B7280] font-medium italic leading-relaxed">
                Pada tahap ini, kamu diminta untuk menelaah jurnal artikel
                terkait dampak pencemaran udara. Setelahnya kamu diminta untuk
                membuat model final dari remodel rumusan masalah yang sudah kamu
                buat.
              </p>

              <div className="space-y-4">
                {tasks.map((task, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="shrink-0 text-[#528C46] text-sm font-black pt-[2px]">
                      {i + 1}.
                    </div>
                    <p className="text-[14px] text-[#0A110B] leading-relaxed pt-px font-medium">
                      {task}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Compact Actions (35%) */}
        <div className="w-[35%] flex flex-col gap-3 min-h-0">
          <div className="bg-white p-4 rounded-2xl border border-[#C6E67D]/30 shadow-sm flex flex-col flex-1 min-h-0">
            <h2 className="text-sm font-bold text-[#0A110B] mb-3 shrink-0">
              Aktivitas & Jurnal
            </h2>

            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
              <button
                onClick={() => setShowLinkModal(true)}
                className="w-full p-6 flex items-center gap-5 bg-[#FDFCF8] border border-[#C6E67D]/40 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group shrink-0"
              >
                <span className="material-symbols-outlined text-4xl text-[#528C46] group-hover:scale-110 transition-transform duration-300">
                  library_books
                </span>
                <div className="text-left">
                  <p className="text-sm font-bold text-[#0A110B]">
                    Tautan Jurnal & Tugas
                  </p>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">
                    Resource & LKPD 8
                  </p>
                </div>
              </button>

              <div className="p-4 bg-[#C6E67D]/10 rounded-xl border border-[#C6E67D]/30 mt-auto">
                <p className="text-[11px] text-[#528C46] leading-relaxed font-medium italic text-center">
                  Gunakan bukti dari jurnal untuk mendukung model rumusan
                  masalahmu.
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-4 shrink-0">
              <button
                onClick={async () => {
                  await markPageCompleted("literacy4");
                  onNext();
                }}
                className="w-full py-3 bg-[#0A110B] text-white rounded-full font-bold text-[11px] uppercase tracking-widest shadow-md hover:bg-[#528C46] active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Ke Tahap Berikutnya
                <span className="material-symbols-outlined text-[14px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Links Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-[#0A110B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#C6E67D]/30 animate-in zoom-in-95 duration-300">
            <div className="p-4 border-b border-[#C6E67D]/30 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-[#528C46]">
                  library_books
                </span>
                <h3 className="font-bold text-[#0A110B] text-sm">
                  Tautan Jurnal & Tugas
                </h3>
              </div>
              <button
                onClick={() => setShowLinkModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <a
                href="https://drive.google.com/file/d/1PAF90eMoL4Ae9bWfJ810n940_4i4XfRO/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group"
              >
                <span className="material-symbols-outlined text-2xl text-[#528C46]">
                  article
                </span>
                <div className="flex-1">
                  <p className="font-bold text-[#0A110B] text-sm">
                    Tautan Jurnal Artikel
                  </p>
                  <p className="text-xs text-[#6B7280]">drive.google.com/...</p>
                </div>
                <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-1 transition-transform">
                  open_in_new
                </span>
              </a>
              <a
                href="https://forms.gle/maPg1qzZnj2EwzeX6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group"
              >
                <span className="material-symbols-outlined text-2xl text-[#528C46]">
                  assignment_turned_in
                </span>
                <div className="flex-1">
                  <p className="font-bold text-[#0A110B] text-sm">
                    Tugas LKPD 8
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    forms.gle/maPg1qzZnj2EwzeX6
                  </p>
                </div>
                <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-1 transition-transform">
                  open_in_new
                </span>
              </a>
            </div>
          </div>
        </div>
      )}

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
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Literacy4;
