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
    <div className="w-screen h-screen bg-slate-50 flex flex-col items-center p-4 md:p-6 overflow-hidden font-sans selection:bg-green-200 selection:text-green-900">
      <div className="w-full max-w-6xl h-full flex flex-col">
        
        {/* Top Header Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3">
            {/* SEP NGSS Icon Badge */}
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2.5 group hover:border-green-300 transition-all duration-300">
              <div className="bg-green-500 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-green-100 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-white text-lg">science</span>
              </div>
              <div className="flex flex-col pr-1">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-0.5">SEP NGSS</span>
                <span className="text-[10px] font-bold text-slate-700 leading-none">Asking Questions</span>
              </div>
            </div>

            {/* Individu Icon Badge */}
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2.5 group hover:border-blue-300 transition-all duration-300">
              <div className="bg-blue-500 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-white text-lg">person</span>
              </div>
              <div className="flex flex-col pr-1">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-0.5">Tugas</span>
                <span className="text-[10px] font-bold text-slate-700 leading-none">Individu</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <h1 className="text-xs md:text-sm font-black text-slate-700 uppercase tracking-widest">
              Tahap Observasi
            </h1>
          </div>
        </div>

        {/* Main Content Area - Two Columns for Landscape */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
          
          {/* Left Column: Video and Instruction */}
          <div className="flex flex-col space-y-4 min-h-0">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col flex-1 min-h-0">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
                <h2 className="text-sm md:text-base font-bold text-slate-800">
                  Coba amati dan analisis video berikut!
                </h2>
              </div>
              
              {/* Video Container */}
              <div className="flex-1 bg-slate-900 rounded-xl overflow-hidden relative shadow-inner group">
                <iframe
                  className="w-full h-full border-0"
                  src="https://www.youtube.com/embed/e6rglsLy1Ys"
                  title="Video Observasi"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <p className="text-[10px] md:text-xs text-slate-500 flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs">link</span>
                  Tautan: <a href="https://www.youtube.com/watch?v=e6rglsLy1Ys" target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">youtube.com/watch?v=e6rglsLy1Ys</a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Questions and Submission */}
          <div className="flex flex-col space-y-4 min-h-0">
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col flex-1 min-h-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                <h2 className="text-sm md:text-base font-bold text-slate-800">
                  Pertanyaan Analisis
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                <p className="text-[11px] md:text-xs text-slate-600 mb-4 font-medium italic">
                  Setelah mengamati dan menganalisis video, jawablah pertanyaan-pertanyaan berikut!
                </p>
                
                {questions.map((q, i) => (
                  <div key={i} className="flex gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold group-hover:bg-green-100 group-hover:text-green-600 transition-colors">
                      {i + 1}
                    </div>
                    <p className="text-[11px] md:text-xs text-slate-700 leading-relaxed pt-0.5">
                      {q}
                    </p>
                  </div>
                ))}

                {/* Google Form Link Card */}
                <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl">
                  <p className="text-[10px] md:text-xs font-bold text-green-800 mb-2 uppercase tracking-wider">
                    Tautan Pengumpulan Tugas LKPD 1
                  </p>
                  <a 
                    href="https://forms.gle/maPg1qzZnj2EwzeX6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white p-3 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all group"
                  >
                    <span className="text-[10px] md:text-xs text-green-600 font-medium truncate mr-2">
                      forms.gle/maPg1qzZnj2EwzeX6
                    </span>
                    <span className="material-symbols-outlined text-green-500 group-hover:translate-x-1 transition-transform">
                      open_in_new
                    </span>
                  </a>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                <button
                  onClick={onNext}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-green-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Lanjutkan Ke Tahap Berikutnya
                  <span className="material-symbols-outlined text-sm md:text-base">arrow_forward</span>
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

export default Observation;
