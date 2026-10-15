import React, { useState } from "react";
import { useAuth } from "../context/auth-context";

interface ObservationProps {
  onNext: () => void;
  onBack: () => void;
}

const Observation: React.FC<ObservationProps> = ({ onNext, onBack }) => {
  const { completedPages, markPageCompleted } = useAuth();
  const isCompleted = completedPages.includes("observation");

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const videos = [
    { id: "e6rglsLy1Ys", title: "Video 1: Pengantar Pencemaran Udara" },
    { id: "mp3kztZy7ow", title: "Video 2: Cara Kerja Saintis" },
    { id: "pY-vNK0gG2Y", title: "Video 3: Pengukuran Kualitas Udara" },
    { id: "29jyaPIWzFI", title: "Video 4: Dampak Pencemaran" },
  ];

  const questions = [
    "Apa saja fakta yang kamu peroleh dari video tersebut?",
    "Interpretasikan fakta yang kamu peroleh dari video tersebut?",
    "Susunlah rumusan masalah berdasarkan video yang telah kalian amati!",
    "Buatlah model dalam bentuk mind map dari rumusan masalah yang telah kalian susun (minimal 2)!",
    "Kumpulkan tugas pada tautan google form yang telah disediakan!",
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

          <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1">
            {/* SEP NGSS Icon Badge */}
          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300 shrink-0">
            <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
              science
            </span>
            <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
              <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-widest leading-tight mb-0.5 whitespace-nowrap">
                SEP NGSS
              </span>
              <span className="text-[10px] font-bold text-[#0A110B] leading-tight whitespace-nowrap">
                Asking Questions
              </span>
            </div>
          </div>

          {/* Individu Icon Badge */}
          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300 shrink-0">
            <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
              groups
            </span>
            <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
              <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-widest leading-tight mb-0.5 whitespace-nowrap">
                Tugas
              </span>
              <span className="text-[10px] font-bold text-[#0A110B] leading-tight whitespace-nowrap">
                Kelompok
              </span>
            </div>
          </div>
          </div>
        </div>

        <div className="bg-white px-4 py-1.5 rounded-full border border-[#C6E67D]/30 shadow-sm shrink-0 ml-2 flex items-center gap-2">
          <h1 className="text-xs font-black text-[#0A110B] uppercase tracking-widest whitespace-nowrap">
            Asking Questions
          </h1>
          {isCompleted && (
            <span className="material-symbols-outlined text-[#528C46] text-[16px]">
              check_circle
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area - Two Columns for Landscape */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Left Column: Video and Instruction (40-45%) */}
        <div className="w-[45%] flex flex-col gap-2 min-h-0">
          <div className="bg-white p-3 rounded-2xl border border-[#C6E67D]/30 shadow-sm flex flex-col flex-1 min-h-0">
            <div className="flex items-center gap-2 mb-2 shrink-0">
              <div className="w-1 h-5 bg-[#528C46] rounded-full"></div>
              <h2 className="text-sm font-bold text-[#0A110B] leading-tight">
                Coba amati dan analisis video berikut!
              </h2>
            </div>

            {/* Video Container */}
            <div className="flex-1 bg-black rounded-xl overflow-hidden relative shadow-inner group">
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                src={`https://www.youtube.com/embed/${videos[activeVideoIndex].id}`}
                title={videos[activeVideoIndex].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Selection Buttons */}
            <div className="grid grid-cols-4 gap-1.5 shrink-0 mt-2">
              {videos.map((v, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVideoIndex(idx)}
                  className={`py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all duration-300 truncate text-center ${
                    activeVideoIndex === idx
                      ? "bg-[#528C46] text-white shadow-md scale-[1.02]"
                      : "bg-[#FDFCF8] border border-[#C6E67D]/40 text-[#6B7280] hover:border-[#528C46] hover:text-[#528C46]"
                  }`}
                  title={v.title}
                >
                  Video {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Questions and Submission (55-60%) */}
        <div className="w-[55%] flex flex-col gap-2 min-h-0">
          <div className="bg-white p-4 rounded-2xl border border-[#C6E67D]/30 shadow-sm flex flex-col flex-1 min-h-0 relative">
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
                  <p className="text-[12px] text-[#0A110B] leading-relaxed pt-px font-medium">
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
                onClick={async () => {
                  await markPageCompleted("observation");
                  onNext();
                }}
                className="w-full py-3 bg-[#0A110B] text-white rounded-full font-bold text-[11px] uppercase tracking-widest shadow-md hover:bg-[#528C46] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
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

export default Observation;
