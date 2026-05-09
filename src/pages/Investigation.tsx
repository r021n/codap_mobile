import React, { useState } from "react";

interface InvestigationProps {
  onNext: () => void;
  onBack: () => void;
}

const Investigation: React.FC<InvestigationProps> = ({ onNext, onBack }) => {
  const [showSimModal, setShowSimModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const tasks = [
    "Buatlah rancangan praktikum dari rumusan masalah yang telah kamu buat modelnya pada tahap sebelumnya (secara berkelompok)!",
    "Gunakanlah sumber rujukan kredibel dalam pembuatan rancangan, serta gunakan AI untuk membantu pencarian!",
    "Lakukan simulasi praktikum yang telah tersedia pada aplikasi ini untuk menambah pengetahuanmu!",
    "Kumpulkan tugas pada tautan google form yang telah disediakan!",
    "Diskusikan dengan teman sekelompokmu mengenai variabel-variabel yang akan diuji!",
    "Pastikan setiap langkah dalam rancangan praktikum terukur dan dapat dilakukan dengan alat yang tersedia.",
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
              science
            </span>
            <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
              <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-[0.1em] leading-tight mb-0.5">
                SEP NGSS
              </span>
              <span className="text-[10px] font-bold text-[#0A110B] leading-tight">
                Investigations
              </span>
            </div>
          </div>

          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300">
            <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
              groups
            </span>
            <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
              <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-[0.1em] leading-tight mb-0.5">
                Metode
              </span>
              <span className="text-[10px] font-bold text-[#0A110B] leading-tight">
                Kelompok
              </span>
            </div>
          </div>

          <button 
            onClick={() => setShowChat(true)}
            className="relative overflow-hidden bg-gradient-to-r from-white to-[#C6E67D]/20 px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(82,140,70,0.1)] border border-[#528C46]/30 flex items-center gap-2.5 group hover:border-[#528C46] hover:shadow-[0_4px_15px_rgba(82,140,70,0.2)] transition-all duration-500 active:scale-95"
          >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            
            <div className="relative flex items-center gap-2">
              <div className="w-7 h-7 bg-white rounded-full shadow-inner flex items-center justify-center border border-[#C6E67D]/50 group-hover:rotate-[15deg] transition-transform duration-500">
                <span className="material-symbols-outlined text-[#528C46] text-[18px] animate-gentle-bounce">
                  psychology
                </span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[7px] font-black text-[#528C46] uppercase tracking-[0.2em] leading-tight mb-0.5">
                  Smart Helper
                </span>
                <span className="text-[11px] font-extrabold text-[#0A110B] leading-tight flex items-center gap-1">
                  Bantuan AI
                  <span className="w-1 h-1 bg-[#528C46] rounded-full animate-pulse"></span>
                </span>
              </div>
            </div>

            {/* Sparkle Icon */}
            <span className="material-symbols-outlined text-[14px] text-[#528C46] opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-1 -right-0 animate-spin-slow">
              auto_awesome
            </span>
          </button>
        </div>

        <div className="bg-white px-4 py-1.5 rounded-full border border-[#C6E67D]/30 shadow-sm">
          <h1 className="text-xs font-black text-[#0A110B] uppercase tracking-widest">
            Praktikum & Simulasi
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Left Column: Investigation Tasks (65%) */}
        <div className="w-[65%] flex flex-col gap-2 min-h-0">
          <div className="bg-white p-3 md:p-5 rounded-2xl border border-[#C6E67D]/30 shadow-sm flex flex-col flex-1 min-h-0">
            <div className="flex items-center gap-2 mb-4 shrink-0">
              <div className="w-1 h-6 bg-[#528C46] rounded-full"></div>
              <h2 className="text-base font-bold text-[#0A110B] leading-tight">
                Membuktikan Kebenaran Remodel
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-3 space-y-5 custom-scrollbar">
              <p className="text-sm text-[#6B7280] font-medium italic leading-relaxed">
                Setelah menyusun remodel, saatnya membuktikan kebenaran melalui rancangan praktikum.
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
            <h2 className="text-sm font-bold text-[#0A110B] mb-3 shrink-0">Aktivitas & Tugas</h2>
            
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
              <button 
                onClick={() => setShowSimModal(true)} 
                className="w-full p-4 flex items-center gap-4 bg-[#FDFCF8] border border-[#C6E67D]/40 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group shrink-0"
              >
                <span className="material-symbols-outlined text-3xl text-[#528C46] group-hover:scale-110 transition-transform">
                  science
                </span>
                <div className="text-left">
                  <p className="text-[13px] font-bold text-[#0A110B]">Simulasi Lab</p>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Pilih Praktikum</p>
                </div>
              </button>

              <button 
                onClick={() => setShowLinkModal(true)} 
                className="w-full p-4 flex items-center gap-4 bg-[#FDFCF8] border border-[#C6E67D]/40 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group shrink-0"
              >
                <span className="material-symbols-outlined text-3xl text-[#528C46] group-hover:scale-110 transition-transform">
                  assignment_turned_in
                </span>
                <div className="text-left">
                  <p className="text-[13px] font-bold text-[#0A110B]">Tugas & Refleksi</p>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Pengumpulan</p>
                </div>
              </button>
              
              <div className="p-3 bg-[#C6E67D]/10 rounded-xl border border-[#C6E67D]/30 mt-auto">
                <p className="text-[10px] text-[#528C46] leading-relaxed font-medium italic text-center">
                  Selesaikan praktikum dan kumpulkan tugas sebelum melanjutkan ke tahap berikutnya.
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-4 shrink-0">
              <button 
                onClick={onNext} 
                className="w-full py-3 bg-[#0A110B] text-white rounded-full font-bold text-[11px] uppercase tracking-widest shadow-md hover:bg-[#528C46] active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Selesaikan Tahap Ini
                <span className="material-symbols-outlined text-[14px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Simulations Modal */}
      {showSimModal && (
        <div className="fixed inset-0 bg-[#0A110B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#C6E67D]/30 animate-in zoom-in-95 duration-300">
             <div className="p-4 border-b border-[#C6E67D]/30 flex justify-between items-center bg-white">
                <div className="flex items-center gap-3">
                   <span className="material-symbols-outlined text-2xl text-[#528C46]">science</span>
                   <h3 className="font-bold text-[#0A110B] text-sm">Pilih Simulasi Praktikum</h3>
                </div>
                <button onClick={() => setShowSimModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
             </div>
             <div className="p-6 flex gap-4">
                <button onClick={() => {window.open("#", "_blank"); setShowSimModal(false);}} className="flex-1 flex flex-col items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group">
                   <span className="material-symbols-outlined text-3xl text-[#528C46] group-hover:scale-110 transition-transform">lab_research</span>
                   <div className="text-center">
                     <p className="font-bold text-[#0A110B] text-sm">Simulasi 1</p>
                     <p className="text-xs text-[#6B7280]">Eksperimen Udara</p>
                   </div>
                </button>
                <button onClick={() => {window.open("#", "_blank"); setShowSimModal(false);}} className="flex-1 flex flex-col items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group">
                   <span className="material-symbols-outlined text-3xl text-[#528C46] group-hover:scale-110 transition-transform">biotech</span>
                   <div className="text-center">
                     <p className="font-bold text-[#0A110B] text-sm">Simulasi 2</p>
                     <p className="text-xs text-[#6B7280]">Analisis Polutan</p>
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
             <div className="p-4 border-b border-[#C6E67D]/30 flex justify-between items-center bg-white">
                <div className="flex items-center gap-3">
                   <span className="material-symbols-outlined text-2xl text-[#528C46]">assignment_turned_in</span>
                   <h3 className="font-bold text-[#0A110B] text-sm">Pengumpulan & Refleksi</h3>
                </div>
                <button onClick={() => setShowLinkModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
             </div>
             <div className="p-6 grid grid-cols-2 gap-4">
                <a href="https://forms.gle/maPg1qzZnj2EwzeX6" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group">
                   <span className="material-symbols-outlined text-3xl text-[#528C46]">description</span>
                   <div className="text-center">
                     <p className="font-bold text-[#0A110B] text-sm">LKPD 3</p>
                     <p className="text-xs text-[#6B7280] truncate max-w-[120px]">Buka Google Form</p>
                   </div>
                </a>
                <a href="https://forms.gle/Ca5q7E8cp52w9Gzc9" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group">
                   <span className="material-symbols-outlined text-3xl text-[#528C46]">history_edu</span>
                   <div className="text-center">
                     <p className="font-bold text-[#0A110B] text-sm">Refleksi</p>
                     <p className="text-xs text-[#6B7280] truncate max-w-[120px]">Buka Google Form</p>
                   </div>
                </a>
             </div>
          </div>
        </div>
      )}

      {/* AI Chat Modal (Bottom Sheet Sidebar Style) */}
      {showChat && (
        <div className="fixed inset-0 z-[60] flex items-end justify-end pointer-events-none">
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
                  <div className="w-11 h-11 bg-gradient-to-br from-[#528C46] to-[#C6E67D] rounded-2xl flex items-center justify-center shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                    <span className="material-symbols-outlined text-2xl text-white">smart_toy</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-black text-[15px] text-[#0A110B] tracking-tight">Asisten AI</h3>
                  <p className="text-[10px] font-bold text-[#528C46] uppercase tracking-widest mt-0.5">Cerdas & Responsif</p>
                </div>
              </div>
              <button 
                onClick={() => setShowChat(false)}
                className="w-10 h-10 rounded-2xl hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all duration-300 group"
              >
                <span className="material-symbols-outlined text-2xl text-[#6B7280] group-hover:rotate-90 transition-transform">close</span>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#FDFCF8]/50">
              <div className="flex flex-col items-center justify-center py-4 opacity-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#528C46]">Hari Ini</span>
              </div>

              {/* AI Message */}
              <div className="flex gap-2 max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-[#528C46] flex items-center justify-center shrink-0 mt-auto">
                  <span className="material-symbols-outlined text-[16px] text-white">smart_toy</span>
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-[#C6E67D]/20">
                  <p className="text-xs text-[#0A110B] leading-relaxed">
                    Halo! Saya Asisten AI CODAP. Ada yang bisa saya bantu terkait rancangan praktikum kamu?
                  </p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex gap-2 max-w-[85%] ml-auto flex-row-reverse">
                <div className="w-7 h-7 rounded-full bg-[#0A110B] flex items-center justify-center shrink-0 mt-auto">
                  <span className="material-symbols-outlined text-[16px] text-white">person</span>
                </div>
                <div className="bg-[#528C46] p-3 rounded-2xl rounded-br-none shadow-sm text-white">
                  <p className="text-xs leading-relaxed font-medium">
                    Bagaimana cara menentukan variabel bebas?
                  </p>
                </div>
              </div>

              {/* AI Message */}
              <div className="flex gap-2 max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-[#528C46] flex items-center justify-center shrink-0 mt-auto">
                  <span className="material-symbols-outlined text-[16px] text-white">smart_toy</span>
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-[#C6E67D]/20">
                  <p className="text-xs text-[#0A110B] leading-relaxed">
                    Variabel bebas adalah faktor yang kamu ubah secara sengaja dalam eksperimen. Misalnya, jika kamu menguji pengaruh suhu terhadap polusi, maka suhu adalah variabel bebasnya.
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
                  <span className="material-symbols-outlined text-[18px]">send</span>
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

export default Investigation;
