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
    "Apakah model (mind map) yang kamu susun sudah sesuai dengan dampak pencemaran udara?",
    "Buatlah remodel (mind map) berdasarkan materi yang dipelajari!",
    "Kumpulkan tugas pada tautan google form yang disediakan!",
  ];

  return (
    <div className="w-[100vw] h-[100vh] bg-[#FDFCF8] flex flex-row overflow-hidden selection:bg-[#C6E67D] selection:text-[#0A110B]">
      {/* Left Column - Visual & Video */}
      <div className="w-[45%] h-full bg-[#C6E67D] p-4 flex flex-col relative overflow-hidden shrink-0 rounded-r-3xl shadow-sm">
        {/* Decor */}
        <div className="absolute top-[-10%] left-[-10%] w-48 h-48 bg-white/30 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-[#528C46]/20 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center gap-2 mb-3 relative z-10">
          <button onClick={onBack} className="w-6 h-6 bg-white/50 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-sm text-[#528C46]">arrow_back</span>
          </button>
          <div className="bg-[#528C46] px-3 py-1 rounded-full flex items-center shadow-sm">
             <span className="text-[10px] font-bold text-white uppercase tracking-wider">Tahap Observasi 2</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3 relative z-10">
           {/* Badges */}
           <div className="bg-[#FDFCF8]/90 backdrop-blur px-2 py-1 rounded-xl flex items-center gap-1.5 border border-[#528C46]/20 shadow-sm">
             <div className="bg-[#528C46] w-5 h-5 rounded-md flex items-center justify-center">
               <span className="material-symbols-outlined text-white text-[12px]">science</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[6px] font-bold text-[#528C46] uppercase leading-none mb-0.5">SEP NGSS</span>
               <span className="text-[8px] font-bold text-[#0A110B] leading-none">Developing Models</span>
             </div>
           </div>
           <div className="bg-[#FDFCF8]/90 backdrop-blur px-2 py-1 rounded-xl flex items-center gap-1.5 border border-[#528C46]/20 shadow-sm">
             <div className="bg-[#528C46] w-5 h-5 rounded-md flex items-center justify-center">
               <span className="material-symbols-outlined text-white text-[12px]">person</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[6px] font-bold text-[#528C46] uppercase leading-none mb-0.5">Tugas</span>
               <span className="text-[8px] font-bold text-[#0A110B] leading-none">Individu</span>
             </div>
           </div>
        </div>

        {/* Video Player */}
        <div className="flex-1 flex flex-col bg-[#FDFCF8] rounded-2xl p-2 border border-[#528C46]/20 shadow-sm min-h-0 relative z-10">
           <h2 className="text-[10px] font-bold text-[#0A110B] mb-2 leading-tight px-1">Amati cara kerja saintis & dampak pencemaran!</h2>
           <div className="flex-1 rounded-xl overflow-hidden bg-black mb-2 relative min-h-0">
              <iframe 
                className="absolute inset-0 w-full h-full border-0" 
                src={`https://www.youtube.com/embed/${videos[activeVideoIndex].id}`} 
                title={videos[activeVideoIndex].title} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
           </div>
           <div className="grid grid-cols-3 gap-1.5 shrink-0">
             {videos.map((vid, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveVideoIndex(idx)} 
                  className={`py-1.5 rounded-lg text-[8px] font-bold transition-all ${
                    activeVideoIndex === idx 
                    ? "bg-[#528C46] text-white shadow-sm" 
                    : "bg-white border border-gray-200 text-[#6B7280] hover:border-[#C6E67D]"
                  }`}
                >
                  Video {idx+1}
                </button>
             ))}
           </div>
        </div>
      </div>

      {/* Right Column - Questions & Action */}
      <div className="w-[55%] h-full flex flex-col p-4 overflow-hidden">
         <div className="flex-1 flex flex-col bg-white rounded-3xl border border-[#C6E67D]/30 shadow-sm p-4 min-h-0">
            <h2 className="text-sm font-extrabold text-[#0A110B] mb-1">Pertanyaan Refleksi</h2>
            <p className="text-[9px] text-[#6B7280] mb-3 leading-snug">Setelah mengamati video, perhatikan mind map yang telah dibuat dan jawablah pertanyaan berikut!</p>
            
            <div className="flex-1 flex flex-col justify-around min-h-0 mb-3">
               {questions.map((q, i) => (
                 <div key={i} className="flex gap-2 items-start">
                   <div className="shrink-0 w-5 h-5 rounded-full bg-[#C6E67D]/30 flex items-center justify-center text-[#528C46] text-[9px] font-bold">{i+1}</div>
                   <p className="text-[10px] text-[#0A110B] leading-snug pt-0.5">{q}</p>
                 </div>
               ))}
            </div>

            {/* Links */}
            <div className="bg-[#FDFCF8] p-3 rounded-2xl border border-[#C6E67D]/50 mb-3 shrink-0">
               <p className="text-[8px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">Pengumpulan Tugas LKPD 2</p>
               <a href="https://forms.gle/maPg1qzZnj2EwzeX6" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-gray-100 hover:border-[#528C46] transition-all group">
                 <span className="text-[10px] text-[#528C46] font-bold truncate mr-2">forms.gle/maPg1qzZnj2EwzeX6</span>
                 <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-0.5 transition-transform">open_in_new</span>
               </a>
            </div>

            {/* Button */}
            <button 
              onClick={onNext} 
              className="w-full py-2.5 bg-[#0A110B] text-white rounded-full font-bold text-[10px] uppercase tracking-widest shadow-lg hover:bg-black active:translate-y-0.5 transition-all shrink-0 flex items-center justify-center gap-2"
            >
              Selesaikan Pembelajaran
              <span className="material-symbols-outlined text-sm">check_circle</span>
            </button>
         </div>
      </div>
    </div>
  );
};

export default Observation2;
