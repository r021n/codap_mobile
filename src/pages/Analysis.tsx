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
    <div className="w-[100vw] h-[100vh] bg-[#FDFCF8] flex flex-row overflow-hidden selection:bg-[#C6E67D] selection:text-[#0A110B]">
      {/* Left Column */}
      <div className="w-[45%] h-full bg-[#C6E67D] p-4 flex flex-col relative overflow-hidden shrink-0 rounded-r-3xl shadow-sm">
        <div className="absolute top-[-10%] left-[-10%] w-48 h-48 bg-white/30 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-[#528C46]/20 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center gap-2 mb-2 relative z-10">
          <button onClick={onBack} className="w-6 h-6 bg-white/50 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-sm text-[#528C46]">arrow_back</span>
          </button>
          <div className="bg-[#528C46] px-3 py-1 rounded-full flex items-center shadow-sm">
             <span className="text-[10px] font-bold text-white uppercase tracking-wider">Analisis Data</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2 relative z-10">
           {/* Badges */}
           <div className="bg-[#FDFCF8]/90 backdrop-blur px-2 py-1 rounded-xl flex items-center gap-1.5 border border-[#528C46]/20 shadow-sm">
             <div className="bg-[#528C46] w-5 h-5 rounded-md flex items-center justify-center"><span className="material-symbols-outlined text-white text-[12px]">analytics</span></div>
             <div className="flex flex-col"><span className="text-[5px] font-bold text-[#528C46] uppercase leading-none mb-0.5">SEP NGSS</span><span className="text-[7px] font-bold text-[#0A110B] leading-none">Analyzing Data</span></div>
           </div>
           <div className="bg-[#FDFCF8]/90 backdrop-blur px-2 py-1 rounded-xl flex items-center gap-1.5 border border-[#528C46]/20 shadow-sm">
             <div className="bg-[#528C46] w-5 h-5 rounded-md flex items-center justify-center"><span className="material-symbols-outlined text-white text-[12px]">groups</span></div>
             <div className="flex flex-col"><span className="text-[5px] font-bold text-[#528C46] uppercase leading-none mb-0.5">Metode</span><span className="text-[7px] font-bold text-[#0A110B] leading-none">Kelompok</span></div>
           </div>
           <div className="bg-[#FDFCF8]/90 backdrop-blur px-2 py-1 rounded-xl flex items-center gap-1.5 border border-[#528C46]/20 shadow-sm">
             <div className="bg-[#528C46] w-5 h-5 rounded-md flex items-center justify-center"><span className="material-symbols-outlined text-white text-[12px]">psychology</span></div>
             <div className="flex flex-col"><span className="text-[5px] font-bold text-[#528C46] uppercase leading-none mb-0.5">Bantuan</span><span className="text-[7px] font-bold text-[#0A110B] leading-none">AI</span></div>
           </div>
           <div className="bg-[#FDFCF8]/90 backdrop-blur px-2 py-1 rounded-xl flex items-center gap-1.5 border border-[#528C46]/20 shadow-sm">
             <div className="bg-[#528C46] w-5 h-5 rounded-md flex items-center justify-center"><span className="material-symbols-outlined text-white text-[12px]">dataset</span></div>
             <div className="flex flex-col"><span className="text-[5px] font-bold text-[#528C46] uppercase leading-none mb-0.5">Platform</span><span className="text-[7px] font-bold text-[#0A110B] leading-none">CODAP</span></div>
           </div>
        </div>

        <div className="flex-1 flex flex-col bg-[#FDFCF8] rounded-2xl p-3 border border-[#528C46]/20 shadow-sm min-h-0 relative z-10">
           <div className="flex justify-between items-start mb-1">
             <h2 className="text-[11px] font-extrabold text-[#0A110B] leading-tight">Praktikum Nyata</h2>
             <div className="bg-[#C6E67D]/30 px-2 py-0.5 rounded-full border border-[#528C46]/30">
               <span className="text-[7px] font-bold text-[#528C46] uppercase">Literasi Data</span>
             </div>
           </div>
           <p className="text-[9px] text-[#6B7280] mb-2 leading-snug">Setelah menyusun rancangan praktikum. Secara berkelompok laksanakan praktikum nyata dengan tugas berikut:</p>
           
           <div className="flex-1 flex flex-col justify-around min-h-0">
               {tasks.map((task, i) => (
                 <div key={i} className="flex gap-2 items-start">
                   <div className="shrink-0 w-4 h-4 rounded-full bg-[#C6E67D]/30 flex items-center justify-center text-[#528C46] text-[8px] font-bold">{i+1}</div>
                   <p className="text-[9px] text-[#0A110B] leading-snug pt-0.5">{task}</p>
                 </div>
               ))}
           </div>
        </div>
      </div>

      {/* Right Column - Interactions */}
      <div className="w-[55%] h-full flex flex-col p-4 overflow-hidden">
         <div className="flex-1 flex flex-col bg-white rounded-3xl border border-[#C6E67D]/30 shadow-sm p-4 min-h-0 justify-between">
            <h2 className="text-sm font-extrabold text-[#0A110B] mb-2">Aktivitas & Panduan</h2>
            <p className="text-[10px] text-[#6B7280] mb-4 leading-snug">Gunakan menu di bawah ini untuk mengakses tautan tugas dan panduan operasi CODAP.</p>
            
            <div className="flex-1 flex items-center justify-center gap-4">
               <button onClick={() => setShowLinkModal(true)} className="flex-1 h-36 flex flex-col items-center justify-center bg-[#FDFCF8] border-2 border-dashed border-[#C6E67D] rounded-3xl hover:border-[#528C46] transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#C6E67D]/30 flex items-center justify-center text-[#528C46] mb-3 group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-3xl">link</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#0A110B]">Tautan & Tugas</span>
                  <span className="text-[9px] text-[#6B7280] mt-0.5 uppercase tracking-wider">Pretest & LKPD 4</span>
               </button>

               <button onClick={() => setShowGuideModal(true)} className="flex-1 h-36 flex flex-col items-center justify-center bg-[#FDFCF8] border-2 border-dashed border-[#C6E67D] rounded-3xl hover:border-[#528C46] transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#C6E67D]/30 flex items-center justify-center text-[#528C46] mb-3 group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-3xl">menu_book</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#0A110B]">Panduan CODAP</span>
                  <span className="text-[9px] text-[#6B7280] mt-0.5 uppercase tracking-wider">Langkah Operasi</span>
               </button>
            </div>

            <button onClick={onNext} className="w-full py-2.5 bg-[#0A110B] text-white rounded-full font-bold text-[10px] uppercase tracking-widest shadow-lg hover:bg-black active:translate-y-0.5 transition-all shrink-0 mt-4 flex items-center justify-center gap-2">
              Selesaikan Analisis
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
         </div>
      </div>

      {/* Links Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-[#0A110B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#C6E67D]/30 animate-in zoom-in-95 duration-300">
             <div className="p-3 border-b border-[#C6E67D]/30 flex justify-between items-center bg-white">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-lg bg-[#528C46] flex items-center justify-center text-white"><span className="material-symbols-outlined text-xs">link</span></div>
                   <h3 className="font-bold text-[#0A110B] text-[11px]">Tautan & Pengumpulan</h3>
                </div>
                <button onClick={() => setShowLinkModal(false)} className="w-6 h-6 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors"><span className="material-symbols-outlined text-sm">close</span></button>
             </div>
             <div className="p-3 flex flex-col gap-2">
                <a href="https://forms.gle/icxsnUaeEjTzziZa8" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 bg-white border border-gray-200 rounded-xl hover:border-[#528C46] transition-all group">
                   <div className="w-8 h-8 rounded-full bg-[#C6E67D]/20 flex items-center justify-center text-[#528C46]"><span className="material-symbols-outlined text-sm">quiz</span></div>
                   <div className="flex-1">
                     <p className="font-bold text-[#0A110B] text-[10px]">Pretest Literasi Data</p>
                     <p className="text-[8px] text-[#6B7280]">forms.gle/icxsnUaeEjTzziZa8</p>
                   </div>
                   <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-0.5 transition-transform">open_in_new</span>
                </a>
                <a href="https://drive.google.com/drive/folders/12dtOCPXqN5jbpO19llXUXQJJCjn8w1eF?usp=drive_link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 bg-white border border-gray-200 rounded-xl hover:border-[#528C46] transition-all group">
                   <div className="w-8 h-8 rounded-full bg-[#C6E67D]/20 flex items-center justify-center text-[#528C46]"><span className="material-symbols-outlined text-sm">dataset</span></div>
                   <div className="flex-1">
                     <p className="font-bold text-[#0A110B] text-[10px]">Tautan Web CODAP</p>
                     <p className="text-[8px] text-[#6B7280]">drive.google.com/...</p>
                   </div>
                   <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-0.5 transition-transform">open_in_new</span>
                </a>
                <a href="https://forms.gle/maPg1qzZnj2EwzeX6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 bg-white border border-gray-200 rounded-xl hover:border-[#528C46] transition-all group">
                   <div className="w-8 h-8 rounded-full bg-[#C6E67D]/20 flex items-center justify-center text-[#528C46]"><span className="material-symbols-outlined text-sm">assignment_turned_in</span></div>
                   <div className="flex-1">
                     <p className="font-bold text-[#0A110B] text-[10px]">Tugas LKPD 4</p>
                     <p className="text-[8px] text-[#6B7280]">forms.gle/maPg1qzZnj2EwzeX6</p>
                   </div>
                   <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-0.5 transition-transform">open_in_new</span>
                </a>
             </div>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-[#0A110B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-[#C6E67D]/30 animate-in zoom-in-95 duration-300">
             <div className="p-3 border-b border-[#C6E67D]/30 flex justify-between items-center bg-white">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-lg bg-[#528C46] flex items-center justify-center text-white"><span className="material-symbols-outlined text-xs">menu_book</span></div>
                   <h3 className="font-bold text-[#0A110B] text-[11px]">Panduan Operasi CODAP</h3>
                </div>
                <button onClick={() => setShowGuideModal(false)} className="w-6 h-6 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors"><span className="material-symbols-outlined text-sm">close</span></button>
             </div>
             <div className="p-4 grid grid-cols-2 gap-x-4 gap-y-2">
                {codapSteps.map((step, i) => (
                  <div key={i} className="flex gap-2 items-start">
                     <div className="shrink-0 w-4 h-4 rounded-full bg-[#C6E67D]/30 flex items-center justify-center text-[#528C46] text-[8px] font-bold mt-0.5">{i+1}</div>
                     <p className="text-[9px] text-[#0A110B] leading-snug">
                        {step.includes("https") ? (
                          <>
                            {step.split("https")[0]}
                            <a href={"https" + step.split("https")[1]} target="_blank" rel="noopener noreferrer" className="text-[#528C46] hover:underline font-bold">
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
      )}
    </div>
  );
};

export default Analysis;
