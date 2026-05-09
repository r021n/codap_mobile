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
    <div className="w-[100vw] h-[100vh] bg-[#FDFCF8] flex flex-row overflow-hidden selection:bg-[#C6E67D] selection:text-[#0A110B]">
      {/* Left Column */}
      <div className="w-[45%] h-full bg-[#C6E67D] p-4 flex flex-col relative overflow-hidden shrink-0 rounded-r-3xl shadow-sm">
        <div className="absolute top-[-10%] left-[-10%] w-48 h-48 bg-white/30 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-[#528C46]/20 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center gap-2 mb-3 relative z-10">
          <button onClick={onBack} className="w-6 h-6 bg-white/50 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-sm text-[#528C46]">arrow_back</span>
          </button>
          <div className="bg-[#528C46] px-3 py-1 rounded-full flex items-center shadow-sm">
             <span className="text-[10px] font-bold text-white uppercase tracking-wider">Praktikum & Simulasi</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3 relative z-10">
           {/* Badges */}
           <div className="bg-[#FDFCF8]/90 backdrop-blur px-2 py-1 rounded-xl flex items-center gap-1.5 border border-[#528C46]/20 shadow-sm">
             <div className="bg-[#528C46] w-5 h-5 rounded-md flex items-center justify-center"><span className="material-symbols-outlined text-white text-[12px]">science</span></div>
             <div className="flex flex-col"><span className="text-[6px] font-bold text-[#528C46] uppercase leading-none mb-0.5">SEP NGSS</span><span className="text-[8px] font-bold text-[#0A110B] leading-none">Investigations</span></div>
           </div>
           <div className="bg-[#FDFCF8]/90 backdrop-blur px-2 py-1 rounded-xl flex items-center gap-1.5 border border-[#528C46]/20 shadow-sm">
             <div className="bg-[#528C46] w-5 h-5 rounded-md flex items-center justify-center"><span className="material-symbols-outlined text-white text-[12px]">groups</span></div>
             <div className="flex flex-col"><span className="text-[6px] font-bold text-[#528C46] uppercase leading-none mb-0.5">Metode</span><span className="text-[8px] font-bold text-[#0A110B] leading-none">Kelompok</span></div>
           </div>
           <div className="bg-[#FDFCF8]/90 backdrop-blur px-2 py-1 rounded-xl flex items-center gap-1.5 border border-[#528C46]/20 shadow-sm">
             <div className="bg-[#528C46] w-5 h-5 rounded-md flex items-center justify-center"><span className="material-symbols-outlined text-white text-[12px]">psychology</span></div>
             <div className="flex flex-col"><span className="text-[6px] font-bold text-[#528C46] uppercase leading-none mb-0.5">Bantuan</span><span className="text-[8px] font-bold text-[#0A110B] leading-none">AI</span></div>
           </div>
        </div>

        <div className="flex-1 flex flex-col bg-[#FDFCF8] rounded-2xl p-3 border border-[#528C46]/20 shadow-sm min-h-0 relative z-10">
           <h2 className="text-[11px] font-extrabold text-[#0A110B] mb-1 leading-tight">Membuktikan Kebenaran Remodel</h2>
           <p className="text-[9px] text-[#6B7280] mb-2 leading-snug">Setelah menyusun remodel, saatnya membuktikan kebenaran melalui rancangan praktikum.</p>
           
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
            <h2 className="text-sm font-extrabold text-[#0A110B] mb-2">Aktivitas & Tugas</h2>
            <p className="text-[10px] text-[#6B7280] mb-4 leading-snug">Pilih menu di bawah ini untuk melakukan simulasi lab atau mengumpulkan tugas yang telah dikerjakan.</p>
            
            <div className="flex-1 flex items-center justify-center gap-4">
               <button onClick={() => setShowSimModal(true)} className="flex-1 h-36 flex flex-col items-center justify-center bg-[#FDFCF8] border-2 border-dashed border-[#C6E67D] rounded-3xl hover:border-[#528C46] transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#C6E67D]/30 flex items-center justify-center text-[#528C46] mb-3 group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-3xl">science</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#0A110B]">Simulasi Lab</span>
                  <span className="text-[9px] text-[#6B7280] mt-0.5 uppercase tracking-wider">Pilih Praktikum</span>
               </button>

               <button onClick={() => setShowLinkModal(true)} className="flex-1 h-36 flex flex-col items-center justify-center bg-[#FDFCF8] border-2 border-dashed border-[#C6E67D] rounded-3xl hover:border-[#528C46] transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#C6E67D]/30 flex items-center justify-center text-[#528C46] mb-3 group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-3xl">assignment_turned_in</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#0A110B]">Tugas & Refleksi</span>
                  <span className="text-[9px] text-[#6B7280] mt-0.5 uppercase tracking-wider">Pengumpulan</span>
               </button>
            </div>

            <button onClick={onNext} className="w-full py-2.5 bg-[#0A110B] text-white rounded-full font-bold text-[10px] uppercase tracking-widest shadow-lg hover:bg-black active:translate-y-0.5 transition-all shrink-0 mt-4 flex items-center justify-center gap-2">
              Selesaikan Tahap Ini
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
         </div>
      </div>

      {/* Simulations Modal */}
      {showSimModal && (
        <div className="fixed inset-0 bg-[#0A110B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#C6E67D]/30 animate-in zoom-in-95 duration-300">
             <div className="p-3 border-b border-[#C6E67D]/30 flex justify-between items-center bg-white">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-lg bg-[#528C46] flex items-center justify-center text-white"><span className="material-symbols-outlined text-xs">science</span></div>
                   <h3 className="font-bold text-[#0A110B] text-[11px]">Pilih Simulasi Praktikum</h3>
                </div>
                <button onClick={() => setShowSimModal(false)} className="w-6 h-6 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors"><span className="material-symbols-outlined text-sm">close</span></button>
             </div>
             <div className="p-4 flex gap-3">
                <button onClick={() => {window.open("#", "_blank"); setShowSimModal(false);}} className="flex-1 flex flex-col items-center gap-2 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] transition-all group">
                   <div className="w-10 h-10 rounded-full bg-[#C6E67D]/20 flex items-center justify-center text-[#528C46] group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-lg">lab_research</span></div>
                   <div className="text-center">
                     <p className="font-bold text-[#0A110B] text-[10px]">Simulasi 1</p>
                     <p className="text-[8px] text-[#6B7280]">Eksperimen Udara</p>
                   </div>
                </button>
                <button onClick={() => {window.open("#", "_blank"); setShowSimModal(false);}} className="flex-1 flex flex-col items-center gap-2 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] transition-all group">
                   <div className="w-10 h-10 rounded-full bg-[#C6E67D]/20 flex items-center justify-center text-[#528C46] group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-lg">biotech</span></div>
                   <div className="text-center">
                     <p className="font-bold text-[#0A110B] text-[10px]">Simulasi 2</p>
                     <p className="text-[8px] text-[#6B7280]">Analisis Polutan</p>
                   </div>
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Submission Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-[#0A110B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#C6E67D]/30 animate-in zoom-in-95 duration-300">
             <div className="p-3 border-b border-[#C6E67D]/30 flex justify-between items-center bg-white">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-lg bg-[#528C46] flex items-center justify-center text-white"><span className="material-symbols-outlined text-xs">assignment_turned_in</span></div>
                   <h3 className="font-bold text-[#0A110B] text-[11px]">Pengumpulan & Refleksi</h3>
                </div>
                <button onClick={() => setShowLinkModal(false)} className="w-6 h-6 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors"><span className="material-symbols-outlined text-sm">close</span></button>
             </div>
             <div className="p-4 grid grid-cols-2 gap-3">
                <a href="https://forms.gle/maPg1qzZnj2EwzeX6" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] transition-all group">
                   <div className="w-10 h-10 rounded-full bg-[#C6E67D]/20 flex items-center justify-center text-[#528C46]"><span className="material-symbols-outlined text-lg">description</span></div>
                   <div className="text-center">
                     <p className="font-bold text-[#0A110B] text-[10px]">LKPD 3</p>
                     <p className="text-[8px] text-[#6B7280] truncate max-w-[120px]">forms.gle/maPg...</p>
                   </div>
                </a>
                <a href="https://forms.gle/Ca5q7E8cp52w9Gzc9" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] transition-all group">
                   <div className="w-10 h-10 rounded-full bg-[#C6E67D]/20 flex items-center justify-center text-[#528C46]"><span className="material-symbols-outlined text-lg">history_edu</span></div>
                   <div className="text-center">
                     <p className="font-bold text-[#0A110B] text-[10px]">Refleksi</p>
                     <p className="text-[8px] text-[#6B7280] truncate max-w-[120px]">forms.gle/Ca5q...</p>
                   </div>
                </a>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investigation;
