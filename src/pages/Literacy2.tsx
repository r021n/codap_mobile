import React, { useState } from "react";

interface Literacy2Props {
  onNext: () => void;
  onBack: () => void;
}

const Literacy2: React.FC<Literacy2Props> = ({ onNext, onBack }) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  const tasks = [
    "Akses web CODAP melalui https://codap.concord.org/",
    "Unduh data mocking yang telah guru siapkan!",
    "Import data mocking ke dalam CODAP",
    "Kerjakan setiap instruksi dan pertanyaan yang guru berikan!",
  ];

  const guideSteps = [
    "Klik menu graph untuk memunculkan grafik kosong.",
    'Tarik variabel "PM2.5" ke sumbu X (bawah grafik).',
    'Tarik variabel "Karakteristik" ke sumbu Y (kiri grafik) sehingga titik-titik data terbagi menjadi 3 baris.',
    "Klik ikon ruler (penggaris) di menu sebelah kanan grafik, lalu centang mean (rata-rata) dan median (nilai tengah). Arahkan kursormu ke garis yang muncul untuk melihat angkanya.",
  ];

  const questionSteps = [
    "Berdasarkan nilai rata-rata (mean), urutkan karakteristik wilayah (Industri, Perkotaan, Kabupaten) dari tingkat polusi PM2.5 yang paling kotor hingga paling bersih!",
    "Coba perhatikan polutan SO2 di daerah Industri. Tuliskan berapa rata-rata (mean) SO2 di sana.",
    "Batas aman PM2.5 harian standar WHO adalah 15. Berdasarkan perhitungan rata-rata di grafikmu, wilayah dengan karakteristik apa saja yang rata-ratanya sudah melampaui batas aman tersebut?",
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
             <span className="text-[10px] font-bold text-white uppercase tracking-wider">Literasi Data</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2 relative z-10">
           {/* Badges */}
           <div className="bg-[#FDFCF8]/90 backdrop-blur px-2 py-1 rounded-xl flex items-center gap-1.5 border border-[#528C46]/20 shadow-sm">
             <div className="bg-[#528C46] w-5 h-5 rounded-md flex items-center justify-center"><span className="material-symbols-outlined text-white text-[12px]">calculate</span></div>
             <div className="flex flex-col"><span className="text-[5px] font-bold text-[#528C46] uppercase leading-none mb-0.5">SEP NGSS</span><span className="text-[7px] font-bold text-[#0A110B] leading-none">Computational Thinking</span></div>
           </div>
           <div className="bg-[#FDFCF8]/90 backdrop-blur px-2 py-1 rounded-xl flex items-center gap-1.5 border border-[#528C46]/20 shadow-sm">
             <div className="bg-[#528C46] w-5 h-5 rounded-md flex items-center justify-center"><span className="material-symbols-outlined text-white text-[12px]">person</span></div>
             <div className="flex flex-col"><span className="text-[5px] font-bold text-[#528C46] uppercase leading-none mb-0.5">Tugas</span><span className="text-[7px] font-bold text-[#0A110B] leading-none">Individu</span></div>
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
             <h2 className="text-[11px] font-extrabold text-[#0A110B] leading-tight">Pelatihan Literasi Data</h2>
             <div className="bg-[#C6E67D]/30 px-2 py-0.5 rounded-full border border-[#528C46]/30">
               <span className="text-[7px] font-bold text-[#528C46] uppercase">Calculation</span>
             </div>
           </div>
           <p className="text-[9px] text-[#6B7280] mb-2 leading-snug italic">Setelah merancang dan melaksanakan praktikum. Sekarang kamu telah sampai pada pelatihan literasi data. Kemampuan ini sangat penting.</p>
           
           <div className="flex-1 flex flex-col justify-around min-h-0">
               {tasks.map((task, i) => (
                 <div key={i} className="flex gap-2 items-start">
                   <div className="shrink-0 w-4 h-4 rounded-full bg-[#C6E67D]/30 flex items-center justify-center text-[#528C46] text-[8px] font-bold mt-0.5">{i+1}</div>
                   <p className="text-[9px] text-[#0A110B] leading-snug">
                     {task.includes("https") ? (
                       <>
                         {task.split("https")[0]}
                         <a href={"https" + task.split("https")[1]} target="_blank" rel="noopener noreferrer" className="text-[#528C46] hover:underline font-bold">
                           {"https" + task.split("https")[1]}
                         </a>
                       </>
                     ) : (
                       task
                     )}
                   </p>
                 </div>
               ))}
           </div>
        </div>
      </div>

      {/* Right Column - Interactions */}
      <div className="w-[55%] h-full flex flex-col p-4 overflow-hidden">
         <div className="flex-1 flex flex-col bg-white rounded-3xl border border-[#C6E67D]/30 shadow-sm p-4 min-h-0 justify-between">
            <h2 className="text-sm font-extrabold text-[#0A110B] mb-2">Aktivitas & Tugas</h2>
            <p className="text-[10px] text-[#6B7280] mb-4 leading-snug">Gunakan menu di bawah ini untuk mengakses tautan tugas dan panduan operasi CODAP.</p>
            
            <div className="flex-1 flex items-center justify-center gap-4">
               <button onClick={() => setShowLinkModal(true)} className="flex-1 h-36 flex flex-col items-center justify-center bg-[#FDFCF8] border-2 border-dashed border-[#C6E67D] rounded-3xl hover:border-[#528C46] transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#C6E67D]/30 flex items-center justify-center text-[#528C46] mb-3 group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-3xl">folder_shared</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#0A110B]">Tautan & Tugas</span>
                  <span className="text-[9px] text-[#6B7280] mt-0.5 uppercase tracking-wider">Data & LKPD 6</span>
               </button>

               <button onClick={() => setShowGuideModal(true)} className="flex-1 h-36 flex flex-col items-center justify-center bg-[#FDFCF8] border-2 border-dashed border-[#C6E67D] rounded-3xl hover:border-[#528C46] transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#C6E67D]/30 flex items-center justify-center text-[#528C46] mb-3 group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-3xl">lightbulb</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#0A110B]">Panduan & Tanya</span>
                  <span className="text-[9px] text-[#6B7280] mt-0.5 uppercase tracking-wider">Operasi & Hitungan</span>
               </button>
            </div>

            <button onClick={onNext} className="w-full py-2.5 bg-[#0A110B] text-white rounded-full font-bold text-[10px] uppercase tracking-widest shadow-lg hover:bg-black active:translate-y-0.5 transition-all shrink-0 mt-4 flex items-center justify-center gap-2">
              Selesaikan Pembelajaran
              <span className="material-symbols-outlined text-sm">verified</span>
            </button>
         </div>
      </div>

      {/* Links Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-[#0A110B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#C6E67D]/30 animate-in zoom-in-95 duration-300">
             <div className="p-3 border-b border-[#C6E67D]/30 flex justify-between items-center bg-white">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-lg bg-[#528C46] flex items-center justify-center text-white"><span className="material-symbols-outlined text-xs">folder_shared</span></div>
                   <h3 className="font-bold text-[#0A110B] text-[11px]">Tautan & Pengumpulan</h3>
                </div>
                <button onClick={() => setShowLinkModal(false)} className="w-6 h-6 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors"><span className="material-symbols-outlined text-sm">close</span></button>
             </div>
             <div className="p-3 flex flex-col gap-2">
                <a href="https://drive.google.com/drive/folders/1RprtsKu7j9hRp1IKtt0KHerAq2yQRkOj?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 bg-white border border-gray-200 rounded-xl hover:border-[#528C46] transition-all group">
                   <div className="w-8 h-8 rounded-full bg-[#C6E67D]/20 flex items-center justify-center text-[#528C46]"><span className="material-symbols-outlined text-sm">description</span></div>
                   <div className="flex-1">
                     <p className="font-bold text-[#0A110B] text-[10px]">Data Mocking</p>
                     <p className="text-[8px] text-[#6B7280]">drive.google.com/...</p>
                   </div>
                   <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-0.5 transition-transform">open_in_new</span>
                </a>
                <a href="https://forms.gle/maPg1qzZnj2EwzeX6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 bg-white border border-gray-200 rounded-xl hover:border-[#528C46] transition-all group">
                   <div className="w-8 h-8 rounded-full bg-[#C6E67D]/20 flex items-center justify-center text-[#528C46]"><span className="material-symbols-outlined text-sm">assignment_turned_in</span></div>
                   <div className="flex-1">
                     <p className="font-bold text-[#0A110B] text-[10px]">Tugas LKPD 6</p>
                     <p className="text-[8px] text-[#6B7280]">forms.gle/maPg1qzZnj2EwzeX6</p>
                   </div>
                   <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-0.5 transition-transform">open_in_new</span>
                </a>
             </div>
          </div>
        </div>
      )}

      {/* Guide Modal (Large split grid) */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-[#0A110B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] w-full max-w-4xl h-[90vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-[#C6E67D]/30 animate-in zoom-in-95 duration-300">
             <div className="p-3 border-b border-[#C6E67D]/30 flex justify-between items-center bg-white shrink-0">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-lg bg-[#528C46] flex items-center justify-center text-white"><span className="material-symbols-outlined text-xs">lightbulb</span></div>
                   <h3 className="font-bold text-[#0A110B] text-[11px]">Panduan & Pertanyaan Pemantik</h3>
                </div>
                <button onClick={() => setShowGuideModal(false)} className="w-6 h-6 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors"><span className="material-symbols-outlined text-sm">close</span></button>
             </div>
             
             <div className="flex-1 p-4 grid grid-cols-2 gap-4 min-h-0">
               {/* Left side: Guide Steps */}
               <div className="flex flex-col h-full bg-white rounded-2xl border border-[#C6E67D]/30 p-3">
                 <p className="text-[10px] font-black text-[#528C46] uppercase tracking-widest mb-2 flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px]">auto_fix_high</span>Langkah CODAP (Calculation)</p>
                 <div className="flex-1 flex flex-col justify-around">
                   {guideSteps.map((step, i) => (
                     <div key={i} className="flex gap-2 items-start">
                        <div className="shrink-0 w-5 h-5 rounded-md bg-[#C6E67D]/20 flex items-center justify-center text-[#528C46] text-[9px] font-bold border border-[#C6E67D]/50 mt-0.5">{i+1}</div>
                        <p className="text-[9px] text-[#0A110B] leading-snug">{step}</p>
                     </div>
                   ))}
                 </div>
               </div>

               {/* Right side: Questions */}
               <div className="flex flex-col h-full bg-white rounded-2xl border border-[#C6E67D]/30 p-3">
                 <p className="text-[10px] font-black text-[#528C46] uppercase tracking-widest mb-2 flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px]">forum</span>Pertanyaan Pemantik</p>
                 <div className="flex-1 flex flex-col justify-around">
                    {questionSteps.map((q, i) => (
                      <div key={i} className="flex gap-2 items-start bg-[#FDFCF8] p-2 rounded-xl border border-[#C6E67D]/20">
                         <div className="shrink-0 w-5 h-5 rounded-full bg-[#528C46] flex items-center justify-center text-white text-[9px] font-bold mt-0.5">?</div>
                         <p className="text-[9px] text-[#0A110B] leading-snug">{q}</p>
                      </div>
                    ))}
                 </div>
               </div>
             </div>

             <div className="p-3 bg-white border-t border-[#C6E67D]/30 shrink-0">
                <p className="text-[9px] text-[#6B7280] italic leading-snug w-full text-center">
                  "Melihat ribuan data angka pasti membuat kita kesulitan untuk mengolahnya secara manual. Oleh karenanya, mari kita gunakan CODAP untuk membantu kita dalam mengolah data!"
                </p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Literacy2;

