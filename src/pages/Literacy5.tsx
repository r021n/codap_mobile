import React, { useState } from "react";

interface Literacy5Props {
  onNext: () => void;
  onBack: () => void;
}

const Literacy5: React.FC<Literacy5Props> = ({ onNext, onBack }) => {
  const [showLinkModal, setShowLinkModal] = useState(false);

  const tasks = [
    "Buatlah poster rekomendasi mitigasi/ adaptasi terhadap permasalahan pencemaran udara di daerah Jawa Tengah berdasarkan data yang telah kamu olah dengan CODAP dan model yang telah kamu buat pada tahap-tahap sebelumnya! (Ketentuan tugas poster ada pada laman di bawah)",
    "Gunakan AI untuk mencari dan merancang ide. Desain dan keseluruhan konten poster harus dibuat secara mandiri oleh kelompok!",
    "Kerjakan posttest literasi data",
  ];

  return (
    <div className="w-screen h-screen bg-slate-50 flex flex-col items-center p-2 md:p-6 overflow-y-auto font-sans selection:bg-blue-200 selection:text-blue-900">
      <div className="w-full max-w-6xl min-h-full flex flex-col">
        {/* Top Header Section */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2">
            {/* SEP NGSS Icon Badge */}
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2.5 group hover:border-blue-300 transition-all duration-300">
              <div className="bg-blue-500 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <span className="material-symbols-outlined text-white text-lg">
                  campaign
                </span>
              </div>
              <div className="flex flex-col pr-0.5 overflow-hidden">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-0.5">
                  SEP NGSS
                </span>
                <span className="text-[10px] font-bold text-slate-700 leading-none truncate max-w-[150px] md:max-w-none">
                  Obtaining, Evaluating, & Communicating Information
                </span>
              </div>
            </div>

            {/* Kelompok Icon Badge */}
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2.5 group hover:border-indigo-300 transition-all duration-300">
              <div className="bg-indigo-500 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <span className="material-symbols-outlined text-white text-lg">
                  smart_toy
                </span>
              </div>
              <div className="flex flex-col pr-0.5">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-0.5">
                  Kelompok
                </span>
                <span className="text-[10px] font-bold text-slate-700 leading-none">
                  AI CODAP
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
              Literasi Data
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
                  <div className="w-1.5 h-5 bg-blue-500 rounded-full"></div>
                  <h2 className="text-[11px] md:text-base font-bold text-slate-800 leading-tight">
                    Pelatihan Literasi Data: Komunikasi
                  </h2>
                </div>

                {/* Data Literacy Badge */}
                <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-blue-600 text-xs">
                    forum
                  </span>
                  <span className="text-[8px] md:text-[9px] font-bold text-blue-700 uppercase tracking-tighter">
                    Literasi Data: Communication
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-[10px] md:text-sm text-slate-600 mb-3.5 leading-relaxed font-medium italic">
                  Selamat, Kamu sudah berhasil pada tahap akhir untuk menjadi seorang Air Quality Specialist hebat! Sekarang kamu ditunjuk sebagai bagian dari Tim Satgas Komunikasi Lingkungan Provinsi Jawa Tengah. Gubernur memintamu untuk membuat media kampanye publik berupa poster. Poster ini harus memberitahu masyarakat mengenai kondisi udara terkini dan memberikan panduan nyata mengenai apa yang harus dilakukan (Mitigasi dan Adaptasi) berdasarkan hasil investigasi data yang baru saja kamu lakukan menggunakan CODAP.
                </p>

                <div className="space-y-2.5">
                  <h3 className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Tugasmu pada tahap ini adalah:
                  </h3>
                  {tasks.map((task, i) => (
                    <div key={i} className="flex gap-2.5 group">
                      <div className="shrink-0 w-5 h-5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 text-[9px] font-bold group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600 transition-all">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Links Modal Trigger */}
                  <button
                    onClick={() => setShowLinkModal(true)}
                    className="flex flex-col items-center justify-center p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl hover:border-indigo-400 hover:bg-indigo-50 transition-all group min-h-[160px]"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-100 mb-3 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">
                        add_task
                      </span>
                    </div>
                    <span className="text-[11px] md:text-sm font-bold text-slate-700">
                      Tautan Tugas & Refleksi
                    </span>
                    <span className="text-[9px] text-slate-400 mt-1 uppercase tracking-widest text-center">
                      LKPD 9, Poster, Refleksi & Posttest
                    </span>
                  </button>

                  <div className="hidden md:flex flex-col items-center justify-center p-6 bg-slate-50/50 border-2 border-slate-100 rounded-2xl opacity-60">
                    <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400 mb-3">
                      <span className="material-symbols-outlined text-3xl">
                        workspace_premium
                      </span>
                    </div>
                    <span className="text-[11px] md:text-sm font-bold text-slate-500">
                      Sertifikat Kelulusan
                    </span>
                    <span className="text-[9px] text-slate-400 mt-1 uppercase tracking-widest">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={onNext}
                  className="w-full py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Selesaikan Seluruh Pembelajaran
                  <span className="material-symbols-outlined text-sm">
                    celebration
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
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-white animate-in zoom-in-95 duration-300">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-lg">
                    link
                  </span>
                </div>
                <h3 className="font-bold text-slate-800">Tautan Penting Tahap Akhir</h3>
              </div>
              <button
                onClick={() => setShowLinkModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* LKPD 9 */}
              <a
                href="https://forms.gle/maPg1qzZnj2EwzeX6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500">
                    <span className="material-symbols-outlined">
                      assignment_turned_in
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-700">Tautan Pengumpulan LKPD 9</p>
                    <p className="text-[10px] text-slate-500">forms.gle/maPg1qzZnj2EwzeX6</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-blue-400">
                  open_in_new
                </span>
              </a>

              {/* Poster Guidelines */}
              <a
                href="https://docs.google.com/document/d/1wbiEEzvG0oFLmsKit0qg1MBX5nd3OQN4/edit?usp=sharing&ouid=114334106960553096157&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-500">
                    <span className="material-symbols-outlined">
                      description
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-700">Ketentuan Tugas Poster</p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[200px]">docs.google.com/document/...</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-indigo-400">
                  open_in_new
                </span>
              </a>

              {/* Refleksi */}
              <a
                href="https://forms.gle/Ca5q7E8cp52w9Gzc9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-purple-300 hover:bg-purple-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-purple-500">
                    <span className="material-symbols-outlined">
                      psychology_alt
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-700">Tautan Refleksi Pembelajaran</p>
                    <p className="text-[10px] text-slate-500">forms.gle/Ca5q7E8cp52w9Gzc9</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-purple-400">
                  open_in_new
                </span>
              </a>

              {/* Posttest */}
              <a
                href="https://forms.gle/ukv82HKptFFe8RdU6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-rose-300 hover:bg-rose-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-rose-500">
                    <span className="material-symbols-outlined">
                      quiz
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-700">Tautan Posttest Literasi Data</p>
                    <p className="text-[10px] text-slate-500">forms.gle/ukv82HKptFFe8RdU6</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-rose-400">
                  open_in_new
                </span>
              </a>
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

export default Literacy5;
