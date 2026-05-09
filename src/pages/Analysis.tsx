import React, { useState } from "react";

interface AnalysisProps {
  onNext: () => void;
  onBack: () => void;
}

const Analysis: React.FC<AnalysisProps> = ({ onNext, onBack }) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const tasks = [
    "Kerjakan pretest literasi data!",
    "Lakukanlah praktikum dan buat laporan sementara dari hasil praktikum!",
    "Masukkan data hasil praktikum ke dalam web CODAP!",
    "Kumpulkan tugas pada tautan google form yang telah disediakan (laporan sementara dan tautan CODAP kelompok)!",
    "Analisis tren data yang muncul pada grafik CODAP.",
    "Bandingkan hasil praktikum kelompokmu dengan kelompok lain.",
  ];

  const codapSteps = [
    `Buka web CODAP 
    https://codap.concord.org/`,
    "Klik “Launch CODAP”",
    "Pilih “Create New Document”",
    "Klik “Tables”",
    "Klik “New”",
    "Double Klik “New Dataset” untuk mengganti nama data",
    "Double Klik “AttributeName” untuk mengganti nama atribut",
    "Klik ikon “+” untuk tambah kolom",
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
                analytics
              </span>
              <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
                <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-widest leading-tight mb-0.5 whitespace-nowrap">
                  SEP NGSS
                </span>
                <span className="text-[10px] font-bold text-[#0A110B] leading-tight whitespace-nowrap">
                  Analyzing & Interpreting Data
                </span>
              </div>
            </div>

            <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300 shrink-0">
              <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
                groups
              </span>
              <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
                <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-widest leading-tight mb-0.5 whitespace-nowrap">
                  Metode
                </span>
                <span className="text-[10px] font-bold text-[#0A110B] leading-tight whitespace-nowrap">
                  Kelompok
                </span>
              </div>
            </div>

            <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300 shrink-0">
              <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
                dataset
              </span>
              <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
                <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-widest leading-tight mb-0.5 whitespace-nowrap">
                  Platform
                </span>
                <span className="text-[10px] font-bold text-[#0A110B] leading-tight whitespace-nowrap">
                  CODAP
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowChat(true)}
              className="relative overflow-hidden bg-linear-to-r from-white to-[#C6E67D]/20 px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(82,140,70,0.1)] border border-[#528C46]/30 flex items-center gap-2.5 group hover:border-[#528C46] hover:shadow-[0_4px_15px_rgba(82,140,70,0.2)] transition-all duration-500 active:scale-95 shrink-0"
            >
              {/* Animated Background Glow */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

              <div className="relative flex items-center gap-2">
                <div className="w-7 h-7 bg-white rounded-full shadow-inner flex items-center justify-center border border-[#C6E67D]/50 group-hover:rotate-15 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[#528C46] text-[18px] animate-gentle-bounce">
                    psychology
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[7px] font-black text-[#528C46] uppercase tracking-[0.2em] leading-tight mb-0.5 whitespace-nowrap">
                    Smart Helper
                  </span>
                  <span className="text-[11px] font-extrabold text-[#0A110B] leading-tight flex items-center gap-1 whitespace-nowrap">
                    Bantuan AI
                    <span className="w-1 h-1 bg-[#528C46] rounded-full animate-pulse"></span>
                  </span>
                </div>
              </div>

              {/* Sparkle Icon */}
              <span className="material-symbols-outlined text-[14px] text-[#528C46] opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-1 right-0 animate-spin-slow">
                auto_awesome
              </span>
            </button>
          </div>
        </div>

        <div className="bg-white px-4 py-1.5 rounded-full border border-[#C6E67D]/30 shadow-sm shrink-0 ml-2">
          <h1 className="text-xs font-black text-[#0A110B] uppercase tracking-widest whitespace-nowrap">
            Analisis Data
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Left Column: Analysis Tasks (65%) */}
        <div className="w-[65%] flex flex-col gap-2 min-h-0">
          <div className="bg-white p-4 rounded-2xl border border-[#C6E67D]/30 shadow-sm flex flex-col flex-1 min-h-0">
            <div className="flex justify-between items-center mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-[#528C46] rounded-full"></div>
                <h2 className="text-base font-bold text-[#0A110B] leading-tight">
                  Praktikum Nyata
                </h2>
              </div>
              <div className="bg-[#C6E67D]/20 px-3 py-1 rounded-full border border-[#C6E67D]/40">
                <span className="text-[10px] font-black text-[#528C46] uppercase tracking-wider">
                  Literasi Data
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-3 space-y-5 custom-scrollbar">
              <p className="text-sm text-[#6B7280] font-medium italic leading-relaxed">
                Setelah menyusun rancangan praktikum. Secara berkelompok
                laksanakan praktikum nyata dengan tugas berikut:
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
              Aktivitas & Panduan
            </h2>

            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
              <button
                onClick={() => setShowLinkModal(true)}
                className="w-full p-4 flex items-center gap-4 bg-[#FDFCF8] border border-[#C6E67D]/40 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group shrink-0"
              >
                <span className="material-symbols-outlined text-3xl text-[#528C46] group-hover:scale-110 transition-transform">
                  link
                </span>
                <div className="text-left">
                  <p className="text-[13px] font-bold text-[#0A110B]">
                    Tautan & Tugas
                  </p>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">
                    Pretest & LKPD 4
                  </p>
                </div>
              </button>

              <button
                onClick={() => setShowGuideModal(true)}
                className="w-full p-4 flex items-center gap-4 bg-[#FDFCF8] border border-[#C6E67D]/40 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group shrink-0"
              >
                <span className="material-symbols-outlined text-3xl text-[#528C46] group-hover:scale-110 transition-transform">
                  menu_book
                </span>
                <div className="text-left">
                  <p className="text-[13px] font-bold text-[#0A110B]">
                    Panduan CODAP
                  </p>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">
                    Langkah Operasi
                  </p>
                </div>
              </button>

              <div className="p-3 bg-[#C6E67D]/10 rounded-xl border border-[#C6E67D]/30 mt-auto">
                <p className="text-[10px] text-[#528C46] leading-relaxed font-medium italic text-center">
                  Gunakan panduan CODAP untuk membantu proses analisis data
                  kelompokmu.
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-4 shrink-0">
              <button
                onClick={onNext}
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
                  link
                </span>
                <h3 className="font-bold text-[#0A110B] text-sm">
                  Tautan & Pengumpulan
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
                href="https://forms.gle/icxsnUaeEjTzziZa8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group"
              >
                <span className="material-symbols-outlined text-2xl text-[#528C46]">
                  quiz
                </span>
                <div className="flex-1">
                  <p className="font-bold text-[#0A110B] text-sm">
                    Pretest Literasi Data
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    forms.gle/icxsnUaeEjTzziZa8
                  </p>
                </div>
                <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-1 transition-transform">
                  open_in_new
                </span>
              </a>
              <a
                href="https://drive.google.com/drive/folders/12dtOCPXqN5jbpO19llXUXQJJCjn8w1eF?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group"
              >
                <span className="material-symbols-outlined text-2xl text-[#528C46]">
                  dataset
                </span>
                <div className="flex-1">
                  <p className="font-bold text-[#0A110B] text-sm">
                    Tautan Web CODAP
                  </p>
                  <p className="text-xs text-[#6B7280]">Buka Link CODAP</p>
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
                    Tugas LKPD 4
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

      {/* Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-[#0A110B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-[#C6E67D]/30 animate-in zoom-in-95 duration-300">
            <div className="p-4 border-b border-[#C6E67D]/30 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-[#528C46]">
                  menu_book
                </span>
                <h3 className="font-bold text-[#0A110B] text-sm">
                  Panduan Operasi CODAP
                </h3>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {codapSteps.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="shrink-0 text-[#528C46] text-sm font-black pt-0.5">
                      {i + 1}.
                    </div>
                    <p className="text-[13px] text-[#0A110B] leading-relaxed font-medium">
                      {step.includes("https") ? (
                        <>
                          {step.split("https")[0]}
                          <a
                            href={"https" + step.split("https")[1]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#528C46] hover:underline font-bold break-all"
                          >
                            {"https" + step.split("https")[1]}
                          </a>
                        </>
                      ) : (
                        step
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Modal (Bottom Sheet Sidebar Style) */}
      {showChat && (
        <div className="fixed inset-0 z-60 flex items-end justify-end pointer-events-none">
          {/* Overlay to close */}
          <div
            className="absolute inset-0 bg-[#0A110B]/20 backdrop-blur-[2px] pointer-events-auto"
            onClick={() => setShowChat(false)}
          ></div>

          <div className="w-[320px] h-full bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.15)] border-l border-[#C6E67D]/30 flex flex-col overflow-hidden animate-slide-right pointer-events-auto relative z-10">
            {/* Header */}
            <div className="px-6 py-6 flex justify-between items-center shrink-0 border-b border-gray-100 bg-[#FDFCF8]/30">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-11 h-11 bg-linear-to-br from-[#528C46] to-[#C6E67D] rounded-2xl flex items-center justify-center shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                    <span className="material-symbols-outlined text-2xl text-white">
                      smart_toy
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-black text-[15px] text-[#0A110B] tracking-tight">
                    Asisten AI
                  </h3>
                  <p className="text-[10px] font-bold text-[#528C46] uppercase tracking-widest mt-0.5">
                    Cerdas & Responsif
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="w-10 h-10 rounded-2xl hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all duration-300 group"
              >
                <span className="material-symbols-outlined text-2xl text-[#6B7280] group-hover:rotate-90 transition-transform">
                  close
                </span>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#FDFCF8]/50">
              <div className="flex flex-col items-center justify-center py-4 opacity-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#528C46]">
                  Hari Ini
                </span>
              </div>

              {/* AI Message */}
              <div className="flex gap-2 max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-[#528C46] flex items-center justify-center shrink-0 mt-auto">
                  <span className="material-symbols-outlined text-[16px] text-white">
                    smart_toy
                  </span>
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-[#C6E67D]/20">
                  <p className="text-xs text-[#0A110B] leading-relaxed">
                    Halo! Saya Asisten AI CODAP. Ada yang bisa saya bantu
                    terkait analisis data praktikum kamu?
                  </p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex gap-2 max-w-[85%] ml-auto flex-row-reverse">
                <div className="w-7 h-7 rounded-full bg-[#0A110B] flex items-center justify-center shrink-0 mt-auto">
                  <span className="material-symbols-outlined text-[16px] text-white">
                    person
                  </span>
                </div>
                <div className="bg-[#528C46] p-3 rounded-2xl rounded-br-none shadow-sm text-white">
                  <p className="text-xs leading-relaxed font-medium">
                    Bagaimana cara membaca tren pada grafik?
                  </p>
                </div>
              </div>

              {/* AI Message */}
              <div className="flex gap-2 max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-[#528C46] flex items-center justify-center shrink-0 mt-auto">
                  <span className="material-symbols-outlined text-[16px] text-white">
                    smart_toy
                  </span>
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-[#C6E67D]/20">
                  <p className="text-xs text-[#0A110B] leading-relaxed">
                    Tren data bisa dilihat dari arah sebaran titik pada grafik.
                    Jika titik-titik cenderung naik dari kiri ke kanan, berarti
                    ada korelasi positif.
                  </p>
                </div>
              </div>
            </div>

            {/* Input Area (Mock) */}
            <div className="p-4 bg-white border-t border-[#C6E67D]/20 shrink-0">
              <div className="flex gap-2 items-center bg-[#FDFCF8] border border-[#C6E67D]/30 rounded-2xl p-2 pr-1">
                <input
                  type="text"
                  placeholder="Ketik pesan..."
                  className="flex-1 bg-transparent border-none outline-none text-xs px-2 text-[#0A110B] placeholder:text-gray-400"
                  disabled
                />
                <button className="w-8 h-8 bg-[#528C46] rounded-xl flex items-center justify-center text-white opacity-50 cursor-not-allowed">
                  <span className="material-symbols-outlined text-[18px]">
                    send
                  </span>
                </button>
              </div>
              <p className="text-[9px] text-center text-gray-400 mt-2 italic">
                AI dapat memberikan jawaban yang tidak akurat.
              </p>
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

        @keyframes slide-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .animate-slide-right {
          animation: slide-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }

        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }

        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        .animate-gentle-bounce {
          animation: gentle-bounce 2s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Analysis;
