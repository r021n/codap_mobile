import React, { useState } from "react";

interface Literacy3Props {
  onNext: () => void;
  onBack: () => void;
}

const Literacy3: React.FC<Literacy3Props> = ({ onNext, onBack }) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  const tasks = [
    "Akses web CODAP melalui https://codap.concord.org/",
    "Unduh data mocking yang telah guru siapkan!",
    "Import data mocking ke dalam CODAP",
    "Kerjakan setiap instruksi dan pertanyaan yang guru berikan!",
    "Amati tren perubahan kualitas udara berdasarkan jam operasional.",
    "Tarik kesimpulan mengenai pengaruh aktivitas manusia terhadap polusi.",
  ];

  const guideSteps = [
    'Buat grafik baru. Tarik variabel "Jam" ke sumbu X and variabel "CO" (karbon monoksida) ke sumbu Y.',
    'Tarik variabel "Karakteristik" dan lepaskan di tengah-tengah grafik untuk memberikan warna yang berbeda (legend).',
    "Klik ikon ruler, lalu centang connecting lines untuk melihat garis tren waktu.",
    'Lakukan langkah yang sama persis pada grafik baru, namun ganti variabel sumbu Y dengan "SO2" (Sulfur Dioksida).',
  ];

  const questionSteps = [
    "Bandingkan tren pergerakan gas CO (karbon monoksida) di kawasan perkotaan pada jam 06.00-08.00 pagi dan 16.00-18.00 sore dengan jam 02.00 dini hari. Apa yang terjadi?",
    'Gas CO dan NO2 biasanya berasal dari knalpot kendaraan, sedangkan gas SO2 berasal dari pembakaran pabrik/PLTU. Jelaskan mengapa grafik garis untuk kawasan Industri cenderung stabil dan tinggi sepanjang hari, sedangkan kawasan perkotaan berbentuk seperti "gunung dan lembah" yang naik-turun mengikuti jam!',
    "Jika kamu memiliki anggota keluarga yang memiliki penyakit asma (sesak napas), di jam berapa saja kamu sangat melarang mereka keluar rumah jika mereka tinggal di Semarang Kota atau Solo? Jelaskan alasanmu berdasarkan grafik!",
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
              forum
            </span>
            <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
              <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-[0.1em] leading-tight mb-0.5">
                SEP NGSS
              </span>
              <span className="text-[10px] font-bold text-[#0A110B] leading-tight">
                Constructing Explanations
              </span>
            </div>
          </div>

          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300">
            <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
              person
            </span>
            <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
              <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-[0.1em] leading-tight mb-0.5">
                Tugas
              </span>
              <span className="text-[10px] font-bold text-[#0A110B] leading-tight">
                Individu
              </span>
            </div>
          </div>

          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300">
            <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
              dataset
            </span>
            <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
              <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-[0.1em] leading-tight mb-0.5">
                Platform
              </span>
              <span className="text-[10px] font-bold text-[#0A110B] leading-tight">
                CODAP
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
        {/* Left Column: Literacy Training (65%) */}
        <div className="w-[65%] flex flex-col gap-2 min-h-0">
          <div className="bg-white p-4 rounded-2xl border border-[#C6E67D]/30 shadow-sm flex flex-col flex-1 min-h-0">
            <div className="flex justify-between items-center mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-[#528C46] rounded-full"></div>
                <h2 className="text-base font-bold text-[#0A110B] leading-tight">
                  Pelatihan Literasi Data
                </h2>
              </div>
              <div className="bg-[#C6E67D]/20 px-3 py-1 rounded-full border border-[#C6E67D]/40">
                <span className="text-[10px] font-black text-[#528C46] uppercase tracking-wider">Analysis & Interpretation</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-3 space-y-5 custom-scrollbar">
              <p className="text-sm text-[#6B7280] font-medium italic leading-relaxed">
                Setelah merancang dan melaksanakan praktikum. Sekarang kamu telah sampai pada pelatihan literasi data. Kemampuan ini sangat penting.
              </p>
              
              <div className="space-y-4">
                {tasks.map((task, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="shrink-0 text-[#528C46] text-sm font-black pt-[2px]">
                      {i + 1}.
                    </div>
                    <p className="text-[14px] text-[#0A110B] leading-relaxed pt-[1px] font-medium">
                      {task.includes("https") ? (
                        <>
                          {task.split("https")[0]}
                          <a href={"https" + task.split("https")[1]} target="_blank" rel="noopener noreferrer" className="text-[#528C46] font-bold hover:underline break-all">
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
        </div>

        {/* Right Column: Compact Actions (35%) */}
        <div className="w-[35%] flex flex-col gap-3 min-h-0">
          <div className="bg-white p-4 rounded-2xl border border-[#C6E67D]/30 shadow-sm flex flex-col flex-1 min-h-0">
            <h2 className="text-sm font-bold text-[#0A110B] mb-3 shrink-0">Aktivitas & Tugas</h2>
            
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
              <button 
                onClick={() => setShowLinkModal(true)} 
                className="w-full p-4 flex items-center gap-4 bg-[#FDFCF8] border border-[#C6E67D]/40 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group shrink-0"
              >
                <span className="material-symbols-outlined text-3xl text-[#528C46] group-hover:scale-110 transition-transform">
                  folder_shared
                </span>
                <div className="text-left">
                  <p className="text-[13px] font-bold text-[#0A110B]">Tautan & Tugas</p>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Data & LKPD 7</p>
                </div>
              </button>

              <button 
                onClick={() => setShowGuideModal(true)} 
                className="w-full p-4 flex items-center gap-4 bg-[#FDFCF8] border border-[#C6E67D]/40 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group shrink-0"
              >
                <span className="material-symbols-outlined text-3xl text-[#528C46] group-hover:scale-110 transition-transform">
                  auto_graph
                </span>
                <div className="text-left">
                  <p className="text-[13px] font-bold text-[#0A110B]">Panduan & Tanya</p>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Analisis & Tafsir</p>
                </div>
              </button>

              <div className="p-3 bg-[#C6E67D]/10 rounded-xl border border-[#C6E67D]/30 mt-auto">
                <p className="text-[10px] text-[#528C46] leading-relaxed font-medium italic text-center">
                  Gunakan visualisasi data untuk menemukan pola tersembunyi di balik angka-angka polutan.
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-4 shrink-0">
              <button 
                onClick={onNext} 
                className="w-full py-3 bg-[#0A110B] text-white rounded-full font-bold text-[11px] uppercase tracking-widest shadow-md hover:bg-[#528C46] active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Selesaikan Pembelajaran
                <span className="material-symbols-outlined text-[14px]">
                  verified
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
                   <span className="material-symbols-outlined text-2xl text-[#528C46]">folder_shared</span>
                   <h3 className="font-bold text-[#0A110B] text-sm">Tautan & Pengumpulan</h3>
                </div>
                <button onClick={() => setShowLinkModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
             </div>
             <div className="p-4 flex flex-col gap-3">
                <a href="https://drive.google.com/drive/folders/1RprtsKu7j9hRp1IKtt0KHerAq2yQRkOj?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group">
                   <span className="material-symbols-outlined text-2xl text-[#528C46]">description</span>
                   <div className="flex-1">
                     <p className="font-bold text-[#0A110B] text-sm">Data Mocking</p>
                     <p className="text-xs text-[#6B7280]">drive.google.com/...</p>
                   </div>
                   <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-1 transition-transform">open_in_new</span>
                </a>
                <a href="https://forms.gle/maPg1qzZnj2EwzeX6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group">
                   <span className="material-symbols-outlined text-2xl text-[#528C46]">assignment_turned_in</span>
                   <div className="flex-1">
                     <p className="font-bold text-[#0A110B] text-sm">Tugas LKPD 7</p>
                     <p className="text-xs text-[#6B7280]">forms.gle/maPg1qzZnj2EwzeX6</p>
                   </div>
                   <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-1 transition-transform">open_in_new</span>
                </a>
             </div>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-[#0A110B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-[#C6E67D]/30 animate-in zoom-in-95 duration-300">
             <div className="p-4 border-b border-[#C6E67D]/30 flex justify-between items-center bg-white shrink-0">
                <div className="flex items-center gap-3">
                   <span className="material-symbols-outlined text-2xl text-[#528C46]">insights</span>
                   <h3 className="font-bold text-[#0A110B] text-sm">Panduan & Pertanyaan Pemantik</h3>
                </div>
                <button onClick={() => setShowGuideModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
             </div>
             
             <div className="flex-1 p-6 grid grid-cols-2 gap-6 overflow-y-auto custom-scrollbar">
                {/* Left side: Guide Steps */}
                <div className="flex flex-col bg-white rounded-2xl border border-[#C6E67D]/30 p-5 shadow-sm">
                  <p className="text-xs font-black text-[#528C46] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                    Langkah CODAP (Analysis)
                  </p>
                  <div className="space-y-4">
                    {guideSteps.map((step, i) => (
                      <div key={i} className="flex gap-3 items-start">
                         <div className="shrink-0 text-[#528C46] text-sm font-black pt-0.5">{i+1}.</div>
                         <p className="text-[13px] text-[#0A110B] leading-relaxed font-medium">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side: Questions */}
                <div className="flex flex-col bg-white rounded-2xl border border-[#C6E67D]/30 p-5 shadow-sm">
                  <p className="text-xs font-black text-[#528C46] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">forum</span>
                    Pertanyaan Pemantik
                  </p>
                  <div className="space-y-4">
                     {questionSteps.map((q, i) => (
                       <div key={i} className="flex gap-3 items-start bg-[#FDFCF8] p-4 rounded-xl border border-[#C6E67D]/20 hover:border-[#528C46] transition-colors group">
                          <span className="material-symbols-outlined text-[#528C46] text-lg mt-0.5 group-hover:scale-110 transition-transform">help</span>
                          <p className="text-[13px] text-[#0A110B] leading-relaxed font-medium">{q}</p>
                       </div>
                     ))}
                  </div>
                </div>
             </div>

             <div className="p-4 bg-white border-t border-[#C6E67D]/30 shrink-0">
                <p className="text-[11px] text-[#6B7280] italic leading-relaxed w-full text-center max-w-3xl mx-auto">
                  "Angka-angka ini sebenarnya sedang bercerita tentang aktivitas manusia. Mari kita bongkar ceritanya lewat visualisasi grafik!"
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
      `}</style>
    </div>
  );
};

export default Literacy3;
