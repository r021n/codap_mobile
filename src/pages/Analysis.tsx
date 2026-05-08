import React, { useState } from "react";

interface AnalysisProps {
  onNext: () => void;
  onBack: () => void;
}

const Analysis: React.FC<AnalysisProps> = ({ onNext, onBack }) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  const tasks = [
    "Kerjakan pretest literasi data!",
    "Lakukanlah praktikum dan buat laporan sementara dari hasil praktikum!",
    "Masukkan data hasil praktikum ke dalam web CODAP!",
    "Kumpulkan tugas pada tautan google form yang telah disediakan (laporan sementara dan tautan CODAP kelompok)!",
  ];

  const codapSteps = [
    "Buka web CODAP https://codap.concord.org/",
    "Klik “Launch CODAP”",
    "Pilih “Create New Document”",
    "Klik “Tables”",
    "Klik “New”",
    "Double Klik “New Dataset” untuk mengganti nama data",
    "Double Klik “AttributeName” untuk mengganti nama atribut",
    "Klik ikon “+” untuk tambah kolom",
  ];

  return (
    <div className="w-screen h-screen bg-slate-50 flex flex-col items-center p-2 md:p-6 overflow-y-auto font-sans selection:bg-green-200 selection:text-green-900">
      <div className="w-full max-w-6xl min-h-full flex flex-col">
        {/* Top Header Section */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2">
            {/* SEP NGSS Icon Badge */}
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2.5 group hover:border-emerald-300 transition-all duration-300">
              <div className="bg-emerald-500 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <span className="material-symbols-outlined text-white text-lg">
                  analytics
                </span>
              </div>
              <div className="flex flex-col pr-0.5 overflow-hidden">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-0.5">
                  SEP NGSS
                </span>
                <span className="text-[10px] font-bold text-slate-700 leading-none truncate max-w-[100px] md:max-w-none">
                  Analyzing & Interpreting Data
                </span>
              </div>
            </div>

            {/* Kelompok Icon Badge */}
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2.5 group hover:border-blue-300 transition-all duration-300">
              <div className="bg-blue-500 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform duration-300 shrink-0">
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
              <div className="bg-purple-500 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-purple-100 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <span className="material-symbols-outlined text-white text-lg">
                  psychology
                </span>
              </div>
              <div className="flex flex-col pr-0.5">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-0.5">
                  Bantuan
                </span>
                <span className="text-[10px] font-bold text-slate-700 leading-none">
                  AI Integration
                </span>
              </div>
            </div>

            {/* CODAP Icon Badge */}
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2.5 group hover:border-amber-300 transition-all duration-300">
              <div className="bg-amber-500 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-amber-100 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <span className="material-symbols-outlined text-white text-lg">
                  dataset
                </span>
              </div>
              <div className="flex flex-col pr-0.5">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-0.5">
                  Platform
                </span>
                <span className="text-[10px] font-bold text-slate-700 leading-none">
                  CODAP
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
              Analisis Data
            </h1>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-[1fr_1.2fr] gap-3 md:gap-6 min-h-0">
          {/* Left Column: Instructions */}
          <div className="flex flex-col space-y-3 min-h-0">
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col flex-1 min-h-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-5 bg-emerald-500 rounded-full"></div>
                  <h2 className="text-[11px] md:text-base font-bold text-slate-800 leading-tight">
                    Praktikum Nyata
                  </h2>
                </div>

                {/* Data Literacy Badge */}
                <div className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-emerald-600 text-xs">
                    history_edu
                  </span>
                  <span className="text-[8px] md:text-[9px] font-bold text-emerald-700 uppercase tracking-tighter">
                    Literasi Data: Collecting & Recording
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-[10px] md:text-sm text-slate-600 mb-3.5 leading-relaxed">
                  Setelah kamu menyusun rancangan praktikum. Sekarang kamu
                  secara berkelompok akan melaksanakan praktikum nyata. Pada
                  tahap ini, tugas kelompok adalah sebagai berikut!
                </p>

                <div className="space-y-2.5">
                  {tasks.map((task, i) => (
                    <div key={i} className="flex gap-2.5 group">
                      <div className="shrink-0 w-5 h-5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 text-[9px] font-bold group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600 transition-all">
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

          {/* Right Column: Interactive Buttons */}
          <div className="flex flex-col space-y-3 min-h-0">
            <div className="flex-1 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-0">
              <div className="flex-1 flex flex-col justify-start md:justify-center space-y-4 overflow-y-auto custom-scrollbar pr-1">
                <div className="grid grid-cols-2 gap-4">
                  {/* Links Modal Trigger */}
                  <button
                    onClick={() => setShowLinkModal(true)}
                    className="flex flex-col items-center justify-center p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl hover:border-purple-400 hover:bg-purple-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-100 mb-2 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl">
                        link
                      </span>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-700">
                      Tautan & Tugas
                    </span>
                    <span className="text-[8px] text-slate-400 mt-1 uppercase tracking-tighter">
                      Pretest & LKPD 4
                    </span>
                  </button>

                  {/* Guide Modal Trigger */}
                  <button
                    onClick={() => setShowGuideModal(true)}
                    className="flex flex-col items-center justify-center p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl hover:border-amber-400 hover:bg-amber-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-100 mb-2 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl">
                        menu_book
                      </span>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-700">
                      Panduan CODAP
                    </span>
                    <span className="text-[8px] text-slate-400 mt-1 uppercase tracking-tighter">
                      Langkah Operasi
                    </span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={onNext}
                  className="w-full py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Selesaikan Analisis
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Links & Submissions Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-white animate-in zoom-in-95 duration-300">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-lg">
                    link
                  </span>
                </div>
                <h3 className="font-bold text-slate-800">
                  Tautan & Pengumpulan
                </h3>
              </div>
              <button
                onClick={() => setShowLinkModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="p-5 space-y-3">
              <a
                href="https://forms.gle/icxsnUaeEjTzziZa8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-purple-300 hover:bg-purple-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-purple-500">
                    <span className="material-symbols-outlined">quiz</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-700">
                      Pretest Literasi Data
                    </p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[180px]">
                      forms.gle/icxsnUaeEjTzziZa8
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-purple-400">
                  open_in_new
                </span>
              </a>

              <a
                href="https://drive.google.com/drive/folders/12dtOCPXqN5jbpO19llXUXQJJCjn8w1eF?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500">
                    <span className="material-symbols-outlined">dataset</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-700">Tautan Web CODAP</p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[180px]">
                      drive.google.com/...
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-blue-400">
                  open_in_new
                </span>
              </a>

              <a
                href="https://forms.gle/maPg1qzZnj2EwzeX6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-500">
                    <span className="material-symbols-outlined">
                      assignment_turned_in
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-700">Tugas LKPD 4</p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[180px]">
                      forms.gle/maPg1qzZnj2EwzeX6
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-emerald-400">
                  open_in_new
                </span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CODAP Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-white animate-in zoom-in-95 duration-300">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-lg">
                    menu_book
                  </span>
                </div>
                <h3 className="font-bold text-slate-800">
                  Panduan Operasi CODAP
                </h3>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="p-5 overflow-y-auto max-h-[60vh] custom-scrollbar">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                Collecting & Recording Data
              </p>
              <div className="space-y-3">
                {codapSteps.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start group">
                    <div className="shrink-0 w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 text-[10px] font-bold border border-amber-100">
                      {i + 1}
                    </div>
                    <p className="text-[11px] md:text-sm text-slate-700 leading-relaxed pt-0.5">
                      {step.includes("https") ? (
                        <>
                          {step.split("https")[0]}
                          <a
                            href={"https" + step.split("https")[1]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
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
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-6 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors"
              >
                Mengerti
              </button>
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

export default Analysis;
