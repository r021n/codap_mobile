import React, { useState } from "react";

interface Observation2Props {
  onNext: () => void;
  onBack: () => void;
}

const Observation2: React.FC<Observation2Props> = ({ onNext, onBack }) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const videos = [
    { id: "mp3kztZy7ow", title: "Video 1: Cara Kerja Saintis" },
    { id: "pY-vNK0gG2Y", title: "Video 2: Pengukuran Kualitas Udara" },
    { id: "29jyaPIWzFI", title: "Video 3: Dampak Pencemaran" },
  ];

  const questions = [
    "Apakah model (mind map) yang kamu susun sudah sesuai dengan cara kerja dari seorang saintis?",
    "Apakah model (mind map) yang kamu susun sudah sesuai dengan dampak yang ditimbulkan oleh pencemaran udara?",
    "Buatlah remodel (mind map) berdasarkan cara kerja seorang saintis dan dampak pencemaran udara yang telah kamu pelajari!",
    "Kumpulkan tugas pada tautan google form yang telah disediakan!",
  ];

  return (
    <div className="w-screen h-screen bg-slate-50 flex flex-col items-center p-4 md:p-6 overflow-hidden font-sans selection:bg-green-200 selection:text-green-900">
      <div className="w-full max-w-6xl h-full flex flex-col">
        {/* Top Header Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3">
            {/* SEP NGSS Icon Badge */}
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2.5 group hover:border-green-300 transition-all duration-300">
              <div className="bg-green-500 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-green-100 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-white text-lg">
                  science
                </span>
              </div>
              <div className="flex flex-col pr-1">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-0.5">
                  SEP NGSS
                </span>
                <span className="text-[10px] font-bold text-slate-700 leading-none">
                  Developing & Using Models
                </span>
              </div>
            </div>

            {/* Individu Icon Badge */}
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2.5 group hover:border-blue-300 transition-all duration-300">
              <div className="bg-blue-500 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-white text-lg">
                  person
                </span>
              </div>
              <div className="flex flex-col pr-1">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-0.5">
                  Tugas
                </span>
                <span className="text-[10px] font-bold text-slate-700 leading-none">
                  Individu
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
            </button>
            <h1 className="text-xs md:text-sm font-black text-slate-700 uppercase tracking-widest">
              Tahap Observasi 2
            </h1>
          </div>
        </div>

        {/* Main Content Area - Two Columns for Landscape */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
          {/* Left Column: Multi-Video Section */}
          <div className="flex flex-col space-y-4 min-h-0">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col flex-1 min-h-0">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
                <h2 className="text-xs md:text-sm font-bold text-slate-800 leading-tight">
                  Amati cara kerja saintis & dampak pencemaran udara berikut!
                </h2>
              </div>

              {/* Video Player */}
              <div className="flex-1 bg-slate-900 rounded-xl overflow-hidden relative shadow-inner mb-3">
                <iframe
                  className="w-full h-full border-0"
                  src={`https://www.youtube.com/embed/${videos[activeVideoIndex].id}`}
                  title={videos[activeVideoIndex].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Selector Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {videos.map((video, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveVideoIndex(idx)}
                    className={`py-2 px-1 rounded-lg text-[8px] md:text-[9px] font-bold transition-all duration-300 border ${
                      activeVideoIndex === idx
                        ? "bg-green-500 border-green-500 text-white shadow-md shadow-green-100"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:border-green-200"
                    }`}
                  >
                    Video {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Questions and Submission */}
          <div className="flex flex-col space-y-4 min-h-0">
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col flex-1 min-h-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                <h2 className="text-sm md:text-base font-bold text-slate-800">
                  Pertanyaan Refleksi
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                <p className="text-[10px] md:text-xs text-slate-600 mb-4 font-medium italic leading-relaxed">
                  Setelah kamu mengamati video tersebut, perhatikan model (mind
                  map) yang telah kamu buat sebelumnya dan jawablah pertanyaan
                  berikut!
                </p>

                {questions.map((q, i) => (
                  <div key={i} className="flex gap-3 group">
                    <div className="shrink-0 w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold group-hover:bg-green-100 group-hover:text-green-600 transition-colors">
                      {i + 1}
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-700 leading-relaxed pt-0.5">
                      {q}
                    </p>
                  </div>
                ))}

                {/* Google Form Link Card */}
                <div className="mt-6 p-4 bg-linear-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl">
                  <p className="text-[9px] md:text-[10px] font-bold text-green-800 mb-2 uppercase tracking-wider">
                    Tautan Pengumpulan Tugas LKPD 2
                  </p>
                  <a
                    href="https://forms.gle/maPg1qzZnj2EwzeX6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white p-3 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all group"
                  >
                    <span className="text-[9px] md:text-[10px] text-green-600 font-medium truncate mr-2">
                      forms.gle/maPg1qzZnj2EwzeX6
                    </span>
                    <span className="material-symbols-outlined text-green-500 group-hover:translate-x-1 transition-transform text-sm">
                      open_in_new
                    </span>
                  </a>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                <button
                  onClick={onNext}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-[9px] md:text-[10px] uppercase tracking-widest shadow-lg shadow-green-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Selesaikan Pembelajaran
                  <span className="material-symbols-outlined text-sm md:text-base">
                    check_circle
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default Observation2;
