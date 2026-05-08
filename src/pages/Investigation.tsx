import React, { useState } from "react";

interface InvestigationProps {
  onNext: () => void;
  onBack: () => void;
}

const Investigation: React.FC<InvestigationProps> = ({ onNext, onBack }) => {
  const [showSimModal, setShowSimModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  const tasks = [
    "Buatlah rancangan praktikum dari rumusan masalah yang telah kamu buat modelnya pada tahap sebelumnya (secara berkelompok)!",
    "Gunakanlah sumber rujukan kredibel dalam pembuatan rancangan, serta gunakan AI untuk membantu pencarian!",
    "Lakukan simulasi praktikum yang telah tersedia pada aplikasi ini untuk menambah pengetahuanmu!",
    "Kumpulkan tugas pada tautan google form yang telah disediakan!",
  ];

  return (
    <div className="w-screen h-screen bg-slate-50 flex flex-col items-center p-2 md:p-6 overflow-y-auto font-sans selection:bg-green-200 selection:text-green-900">
      <div className="w-full max-w-6xl min-h-full flex flex-col">
        {/* Top Header Section */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2">
            {/* SEP NGSS Icon Badge */}
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2.5 group hover:border-green-300 transition-all duration-300">
              <div className="bg-emerald-500 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <span className="material-symbols-outlined text-white text-lg">
                  science
                </span>
              </div>
              <div className="flex flex-col pr-0.5 overflow-hidden">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-0.5">
                  SEP NGSS
                </span>
                <span className="text-[10px] font-bold text-slate-700 leading-none truncate max-w-[70px] md:max-w-none">
                  Investigations
                </span>
              </div>
            </div>

            {/* Kelompok Icon Badge */}
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2.5 group hover:border-blue-300 transition-all duration-300">
              <div className="bg-blue-500 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <span className="material-symbols-outlined text-white text-lg">
                  groups
                </span>
              </div>
              <div className="flex flex-col pr-0.5">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-0.5">
                  Metode
                </span>
                <span className="text-[10px] font-bold text-slate-700 leading-none">
                  Kelompok
                </span>
              </div>
            </div>

            {/* AI Icon Badge */}
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2.5 group hover:border-purple-300 transition-all duration-300">
              <div className="bg-purple-500 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-purple-100 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <span className="material-symbols-outlined text-white text-lg">
                  psychology
                </span>
              </div>
              <div className="flex flex-col pr-0.5">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-0.5">
                  Bantuan
                </span>
                <span className="text-[10px] font-bold text-slate-700 leading-none">
                  AI integration
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <button
              onClick={onBack}
              className="w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <span className="material-symbols-outlined text-xs">
                arrow_back
              </span>
            </button>
            <h1 className="text-[9px] md:text-xs font-black text-slate-700 uppercase tracking-widest">
              Praktikum & Simulasi
            </h1>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-[1fr_1.2fr] gap-3 md:gap-6 min-h-0">
          {/* Left Column: Instructions */}
          <div className="flex flex-col space-y-3 min-h-0">
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col flex-1 min-h-0">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-1.5 h-5 bg-emerald-500 rounded-full"></div>
                <h2 className="text-[11px] md:text-base font-bold text-slate-800 leading-tight">
                  Membuktikan Kebenaran Remodel
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-[10px] md:text-sm text-slate-600 mb-3.5 leading-relaxed">
                  Setelah kamu menyusun remodel berdasarkan cara kerja saintis
                  dan dampak pencemaran udara, selanjutnya kita akan membuktikan
                  kebenaran remodel. Beberapa caranya adalah dengan merancang
                  dan melaksanakan praktikum serta menelaah jurnal.
                </p>

                <div className="space-y-2.5">
                  <h3 className="text-[8px] md:text-xs font-black text-slate-400 uppercase tracking-widest">
                    Tugasmu adalah sebagai berikut:
                  </h3>
                  {tasks.map((task, i) => (
                    <div key={i} className="flex gap-2.5 group">
                      <div className="flex-shrink-0 w-5 h-5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 text-[9px] font-bold group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600 transition-all">
                        {i + 1}
                      </div>
                      <p className="text-[10px] md:text-sm text-slate-700 leading-relaxed pt-0.5">
                        {task}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Simulations and Links */}
          <div className="flex flex-col space-y-3 min-h-0">
            <div className="flex-1 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-0">
              <div className="flex-1 flex flex-col justify-start md:justify-center space-y-4 overflow-y-auto custom-scrollbar pr-1">
                <div className="grid grid-cols-2 gap-4">
                  {/* Simulations Modal Trigger */}
                  <button
                    onClick={() => setShowSimModal(true)}
                    className="flex flex-col items-center justify-center p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-100 mb-2 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl">
                        science
                      </span>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-700">
                      Simulasi Lab
                    </span>
                    <span className="text-[8px] text-slate-400 mt-1 uppercase tracking-tighter">
                      Pilih Praktikum
                    </span>
                  </button>

                  {/* Links Modal Trigger */}
                  <button
                    onClick={() => setShowLinkModal(true)}
                    className="flex flex-col items-center justify-center p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl hover:border-purple-400 hover:bg-purple-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-100 mb-2 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl">
                        assignment_turned_in
                      </span>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-700">
                      Tugas & Refleksi
                    </span>
                    <span className="text-[8px] text-slate-400 mt-1 uppercase tracking-tighter">
                      Pengumpulan
                    </span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={onNext}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Selesaikan Tahap Ini
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulations Modal */}
      {showSimModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-white animate-in zoom-in-95 duration-300">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-lg">
                    science
                  </span>
                </div>
                <h3 className="font-bold text-slate-800">
                  Pilih Simulasi Praktikum
                </h3>
              </div>
              <button
                onClick={() => setShowSimModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="p-5 grid gap-3">
              <button
                onClick={() => {
                  window.open("#", "_blank");
                  setShowSimModal(false);
                }}
                className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">
                    lab_research
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-700">Simulasi 1</p>
                  <p className="text-[10px] text-slate-500">
                    Eksperimen Kualitas Udara
                  </p>
                </div>
              </button>
              <button
                onClick={() => {
                  window.open("#", "_blank");
                  setShowSimModal(false);
                }}
                className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">biotech</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-700">Simulasi 2</p>
                  <p className="text-[10px] text-slate-500">
                    Analisis Dampak Polutan
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submission Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-white animate-in zoom-in-95 duration-300">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-lg">
                    assignment_turned_in
                  </span>
                </div>
                <h3 className="font-bold text-slate-800">
                  Pengumpulan & Refleksi
                </h3>
              </div>
              <button
                onClick={() => setShowLinkModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  LKPD 3
                </p>
                <a
                  href="https://forms.gle/maPg1qzZnj2EwzeX6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-purple-300 hover:bg-purple-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-purple-500">
                      <span className="material-symbols-outlined">
                        description
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-700">
                        Form Pengumpulan
                      </p>
                      <p className="text-[10px] text-slate-500">
                        forms.gle/maPg1qzZnj2EwzeX6
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-purple-400">
                    open_in_new
                  </span>
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  Refleksi
                </p>
                <a
                  href="https://forms.gle/Ca5q7E8cp52w9Gzc9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500">
                      <span className="material-symbols-outlined">
                        history_edu
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-700">
                        Refleksi Pembelajaran
                      </p>
                      <p className="text-[10px] text-slate-500">
                        forms.gle/Ca5q7E8cp52w9Gzc9
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-blue-400">
                    open_in_new
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default Investigation;
