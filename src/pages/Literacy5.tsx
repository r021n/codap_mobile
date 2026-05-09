import React, { useState } from "react";

interface Literacy5Props {
  onNext: () => void;
  onBack: () => void;
}

const Literacy5: React.FC<Literacy5Props> = ({ onBack }) => {
  const [showLinkModal, setShowLinkModal] = useState(false);

  const tasks = [
    "Buatlah poster rekomendasi mitigasi/ adaptasi terhadap permasalahan pencemaran udara di daerah Jawa Tengah berdasarkan data yang telah kamu olah dengan CODAP dan model yang telah kamu buat pada tahap-tahap sebelumnya! (Ketentuan tugas poster ada pada laman di bawah)",
    "Gunakan AI untuk mencari dan merancang ide. Desain dan keseluruhan konten poster harus dibuat secara mandiri oleh kelompok!",
    "Kerjakan posttest literasi data sebagai tahap akhir evaluasi pemahamanmu.",
    "Komunikasikan hasil karyamu melalui media sosial atau forum sekolah untuk menyebarkan kesadaran lingkungan.",
  ];

  return (
    <div className="w-[100vw] h-[100vh] bg-[#FDFCF8] flex flex-col p-3 overflow-hidden font-sans selection:bg-[#C6E67D] selection:text-[#0A110B]">
      {/* Top Header Section */}
      <div className="flex justify-between items-center mb-2 shrink-0">
        <div className="flex gap-2 items-center">
          <button 
            onClick={onBack} 
            className="w-8 h-8 bg-white rounded-full border border-[#C6E67D]/30 shadow-sm flex items-center justify-center hover:bg-[#528C46] group transition-all duration-300 mr-1"
          >
            <span className="material-symbols-outlined text-[18px] text-[#528C46] group-hover:text-white transition-colors">
              arrow_back
            </span>
          </button>

          {/* Badges */}
          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300">
            <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
              campaign
            </span>
            <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
              <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-[0.1em] leading-tight mb-0.5">
                SEP NGSS
              </span>
              <span className="text-[10px] font-bold text-[#0A110B] leading-tight">
                Communicating Information
              </span>
            </div>
          </div>

          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300">
            <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
              smart_toy
            </span>
            <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
              <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-[0.1em] leading-tight mb-0.5">
                Kelompok
              </span>
              <span className="text-[10px] font-bold text-[#0A110B] leading-tight">
                AI CODAP
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white px-4 py-1.5 rounded-full border border-[#C6E67D]/30 shadow-sm">
          <h1 className="text-xs font-black text-[#0A110B] uppercase tracking-widest">
            Literasi Data
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Left Column: Literacy Communication (65%) */}
        <div className="w-[65%] flex flex-col gap-2 min-h-0">
          <div className="bg-white p-3 md:p-5 rounded-2xl border border-[#C6E67D]/30 shadow-sm flex flex-col flex-1 min-h-0">
            <div className="flex justify-between items-center mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-[#528C46] rounded-full"></div>
                <h2 className="text-base font-bold text-[#0A110B] leading-tight">
                  Pelatihan Literasi Data: Komunikasi
                </h2>
              </div>
              <div className="bg-[#C6E67D]/20 px-3 py-1 rounded-full border border-[#C6E67D]/40">
                <span className="text-[10px] font-black text-[#528C46] uppercase tracking-wider">Communication</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-3 space-y-5 custom-scrollbar">
              <p className="text-sm text-[#6B7280] font-medium italic leading-relaxed">
                Selamat, Kamu sudah berhasil pada tahap akhir untuk menjadi seorang Air Quality Specialist hebat! Gubernur memintamu untuk membuat media kampanye publik berupa poster berdasarkan hasil investigasi data menggunakan CODAP.
              </p>
              
              <div className="space-y-4">
                {tasks.map((task, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="shrink-0 text-[#528C46] text-sm font-black pt-[2px]">
                      {i + 1}.
                    </div>
                    <p className="text-[14px] text-[#0A110B] leading-relaxed pt-[1px] font-medium">
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
            <h2 className="text-sm font-bold text-[#0A110B] mb-3 shrink-0">Aktivitas Akhir</h2>
            
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
              <button 
                onClick={() => setShowLinkModal(true)} 
                className="w-full p-6 flex items-center gap-5 bg-[#FDFCF8] border border-[#C6E67D]/40 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group shrink-0"
              >
                <span className="material-symbols-outlined text-4xl text-[#528C46] group-hover:scale-110 transition-transform duration-300">
                  add_task
                </span>
                <div className="text-left">
                  <p className="text-sm font-bold text-[#0A110B]">Tautan Tugas & Refleksi</p>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">LKPD 9, Poster, Refleksi</p>
                </div>
              </button>

              <div className="p-4 bg-[#C6E67D]/10 rounded-xl border border-[#C6E67D]/30 mt-auto">
                <p className="text-[11px] text-[#528C46] leading-relaxed font-medium italic text-center">
                  Poster kampanye kamu akan sangat membantu masyarakat memahami bahaya polusi udara.
                </p>
              </div>
            </div>

            {/* Final Action Button */}
            <div className="mt-4 shrink-0">
              <button 
                className="w-full py-4 bg-[#528C46] text-white rounded-full font-bold text-[12px] uppercase tracking-widest shadow-lg hover:bg-[#3d6934] active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Pembelajaran Selesai
                <span className="material-symbols-outlined text-[16px]">
                  celebration
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
                   <span className="material-symbols-outlined text-2xl text-[#528C46]">link</span>
                   <h3 className="font-bold text-[#0A110B] text-sm">Tautan Penting Tahap Akhir</h3>
                </div>
                <button onClick={() => setShowLinkModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
             </div>
             <div className="p-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <a href="https://forms.gle/maPg1qzZnj2EwzeX6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group">
                   <span className="material-symbols-outlined text-2xl text-[#528C46]">assignment_turned_in</span>
                   <div className="flex-1">
                     <p className="font-bold text-[#0A110B] text-sm">Pengumpulan LKPD 9</p>
                     <p className="text-xs text-[#6B7280]">forms.gle/maPg1qzZnj2EwzeX6</p>
                   </div>
                   <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-1 transition-transform">open_in_new</span>
                </a>
                <a href="https://docs.google.com/document/d/1wbiEEzvG0oFLmsKit0qg1MBX5nd3OQN4/edit?usp=sharing&ouid=114334106960553096157&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group">
                   <span className="material-symbols-outlined text-2xl text-[#528C46]">description</span>
                   <div className="flex-1">
                     <p className="font-bold text-[#0A110B] text-sm">Ketentuan Tugas Poster</p>
                     <p className="text-xs text-[#6B7280]">docs.google.com/...</p>
                   </div>
                   <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-1 transition-transform">open_in_new</span>
                </a>
                <a href="https://forms.gle/Ca5q7E8cp52w9Gzc9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group">
                   <span className="material-symbols-outlined text-2xl text-[#528C46]">psychology_alt</span>
                   <div className="flex-1">
                     <p className="font-bold text-[#0A110B] text-sm">Refleksi Pembelajaran</p>
                     <p className="text-xs text-[#6B7280]">forms.gle/Ca5q7E8cp52w9Gzc9</p>
                   </div>
                   <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-1 transition-transform">open_in_new</span>
                </a>
                <a href="https://forms.gle/ukv82HKptFFe8RdU6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group">
                   <span className="material-symbols-outlined text-2xl text-[#528C46]">quiz</span>
                   <div className="flex-1">
                     <p className="font-bold text-[#0A110B] text-sm">Posttest Literasi Data</p>
                     <p className="text-xs text-[#6B7280]">forms.gle/ukv82HKptFFe8RdU6</p>
                   </div>
                   <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-1 transition-transform">open_in_new</span>
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
      `}</style>
    </div>
  );
};

export default Literacy5;
