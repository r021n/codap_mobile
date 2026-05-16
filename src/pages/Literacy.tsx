import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AIChatModal, { type ChatMessage } from "../components/AIChatModal";

interface LiteracyProps {
  onNext: () => void;
  onBack: () => void;
}

const Literacy: React.FC<LiteracyProps> = ({ onNext, onBack }) => {
  const { completedPages, markPageCompleted } = useAuth();
  const isCompleted = completedPages.includes("literacy");

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const tasks = [
    "Akses web CODAP melalui https://codap.concord.org/",
    "Unduh data mocking yang telah guru siapkan!",
    "Import data mocking ke dalam CODAP",
    "Kerjakan setiap instruksi dan pertanyaan yang guru berikan!",
    "Lakukan analisis data untuk melihat korelasi antar variabel.",
    "Presentasikan hasil temuanmu kepada kelompok lain melalui forum diskusi.",
  ];

  const guideSteps = [
    "Import (masukkan) file data CSV ke dalam workspace CODAP.",
    "Perhatikan tabel data (case table) yang muncul.",
    'Tarik (drag) judul kolom "Karakteristik" ke area kosong di sebelah kiri tabel untuk membuat pengelompokan tingkat pertama.',
    'Selanjutnya, tarik judul kolom "Kota" dan letakkan tepat di sebelah kanan kolom "Karakteristik". Sekarang datamu sudah terkelompokkan dengan rapi!',
  ];

  const reflectionQuestions = [
    "Sebutkan mana saja yang termasuk variabel kategori (teks) dan mana yang termasuk variabel numerik (angka) dari data tersebut!",
    "Sebelum kamu mengubah tabelnya, berapa total baris observasi (rekaman data) yang ada?",
    'Mengapa mengelompokkan data berdasarkan "Karakteristik" (Industri/ Perkotaan/ Kabupaten) lalu "Kota" membuat proses pencarian data jauh lebih efisien dibandingkan membiarkannya dalam satu tabel datar (flat table)?',
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: "1",
      sender: "ai",
      text: "Halo! Saya Asisten AI CODAP. Ada yang bisa saya bantu terkait pelatihan literasi data kamu?",
    },
    {
      id: "2",
      sender: "user",
      text: "Bagaimana cara mengelompokkan data di CODAP?",
    },
    {
      id: "3",
      sender: "ai",
      text: "Kamu bisa menyeret (drag) judul kolom ke area paling kiri tabel untuk membuat pengelompokan berdasarkan nilai pada kolom tersebut.",
    },
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

          {/* Badges & AI Button */}
          <div className="flex gap-2 items-center overflow-x-auto no-scrollbar flex-1">
            <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300 shrink-0">
              <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
                calculate
              </span>
              <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
                <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-widest leading-tight mb-0.5 whitespace-nowrap">
                  SEP NGSS
                </span>
                <span className="text-[10px] font-bold text-[#0A110B] leading-tight whitespace-nowrap">
                  Using Mathematics & Computational Thinking
                </span>
              </div>
            </div>

            <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300 shrink-0">
              <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
                person
              </span>
              <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
                <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-widest leading-tight mb-0.5 whitespace-nowrap">
                  Tugas
                </span>
                <span className="text-[10px] font-bold text-[#0A110B] leading-tight whitespace-nowrap">
                  Individu
                </span>
              </div>
            </div>

            <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 group hover:border-[#528C46] transition-all duration-300 shrink-0">
              <span className="material-symbols-outlined text-[#528C46] text-[20px] group-hover:scale-110 transition-transform duration-300">
                dataset
              </span>
              <div className="flex flex-col pr-1 border-l border-[#C6E67D]/30 pl-2">
                <span className="text-[8px] font-black text-[#6B7280] uppercase tracking-widest leading-tight mb-0.5 whitespace-nowrap">
                  Platform
                </span>
                <span className="text-[10px] font-bold text-[#0A110B] leading-tight whitespace-nowrap">
                  CODAP
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowChat(true)}
              className="relative overflow-hidden bg-linear-to-r from-white to-[#C6E67D]/20 px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(82,140,70,0.1)] border border-[#528C46]/30 flex items-center gap-2.5 group hover:border-[#528C46] hover:shadow-[0_4px_15px_rgba(82,140,70,0.2)] transition-all duration-500 active:scale-95 shrink-0"
            >
              {/* Animated Background Glow */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

              <div className="relative flex items-center gap-2">
                <div className="w-7 h-7 bg-white rounded-full shadow-inner flex items-center justify-center border border-[#C6E67D]/50 group-hover:rotate-15 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[#528C46] text-[18px] animate-gentle-bounce">
                    psychology
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[7px] font-black text-[#528C46] uppercase tracking-[0.2em] leading-tight mb-0.5 whitespace-nowrap">
                    Smart Helper
                  </span>
                  <span className="text-[11px] font-extrabold text-[#0A110B] leading-tight flex items-center gap-1 whitespace-nowrap">
                    Bantuan AI
                    <span className="w-1 h-1 bg-[#528C46] rounded-full animate-pulse"></span>
                  </span>
                </div>
              </div>

              {/* Sparkle Icon */}
              <span className="material-symbols-outlined text-[14px] text-[#528C46] opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-1 right-0 animate-spin-slow">
                auto_awesome
              </span>
            </button>
          </div>
        </div>

        <div className="bg-white px-4 py-1.5 rounded-full border border-[#C6E67D]/30 shadow-sm shrink-0 ml-2 flex items-center gap-2">
          <h1 className="text-xs font-black text-[#0A110B] uppercase tracking-widest whitespace-nowrap">
            Literasi Data
          </h1>
          {isCompleted && (
            <span className="material-symbols-outlined text-[#528C46] text-[16px]">
              check_circle
            </span>
          )}
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
                <span className="text-[10px] font-black text-[#528C46] uppercase tracking-wider">
                  Collecting & Recording
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-3 space-y-5 custom-scrollbar">
              <p className="text-sm text-[#6B7280] font-medium italic leading-relaxed">
                Setelah merancang dan melaksanakan praktikum. Sekarang kamu
                telah sampai pada pelatihan literasi data. Kemampuan ini sangat
                penting.
              </p>

              <div className="space-y-4">
                {tasks.map((task, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="shrink-0 text-[#528C46] text-sm font-black pt-[2px]">
                      {i + 1}.
                    </div>
                    <p className="text-[14px] text-[#0A110B] leading-relaxed pt-px font-medium">
                      {task.includes("https") ? (
                        <>
                          {task.split("https")[0]}
                          <a
                            href={"https" + task.split("https")[1]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#528C46] hover:underline font-bold break-all"
                          >
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
            <h2 className="text-sm font-bold text-[#0A110B] mb-3 shrink-0">
              Aktivitas & Tugas
            </h2>

            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
              <button
                onClick={() => setShowLinkModal(true)}
                className="w-full p-4 flex items-center gap-4 bg-[#FDFCF8] border border-[#C6E67D]/40 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group shrink-0"
              >
                <span className="material-symbols-outlined text-3xl text-[#528C46] group-hover:scale-110 transition-transform">
                  folder_shared
                </span>
                <div className="text-left">
                  <p className="text-[13px] font-bold text-[#0A110B]">
                    Tautan & Tugas
                  </p>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">
                    Data & LKPD 5
                  </p>
                </div>
              </button>

              <button
                onClick={() => setShowGuideModal(true)}
                className="w-full p-4 flex items-center gap-4 bg-[#FDFCF8] border border-[#C6E67D]/40 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group shrink-0"
              >
                <span className="material-symbols-outlined text-3xl text-[#528C46] group-hover:scale-110 transition-transform">
                  lightbulb
                </span>
                <div className="text-left">
                  <p className="text-[13px] font-bold text-[#0A110B]">
                    Panduan & Tanya
                  </p>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">
                    Operasi & Refleksi
                  </p>
                </div>
              </button>

              <div className="p-3 bg-[#C6E67D]/10 rounded-xl border border-[#C6E67D]/30 mt-auto">
                <p className="text-[10px] text-[#528C46] leading-relaxed font-medium italic text-center">
                  Kemampuan literasi data membantu kamu memahami pola polusi
                  udara dengan lebih baik.
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-4 shrink-0">
              <button
                onClick={async () => {
                  await markPageCompleted("literacy");
                  onNext();
                }}
                className="w-full py-3 bg-[#0A110B] text-white rounded-full font-bold text-[11px] uppercase tracking-widest shadow-md hover:bg-[#528C46] active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
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

      {/* Links Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-[#0A110B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#C6E67D]/30 animate-in zoom-in-95 duration-300">
            <div className="p-4 border-b border-[#C6E67D]/30 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-[#528C46]">
                  folder_shared
                </span>
                <h3 className="font-bold text-[#0A110B] text-sm">
                  Tautan & Pengumpulan
                </h3>
              </div>
              <button
                onClick={() => setShowLinkModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <a
                href="https://drive.google.com/drive/folders/1RprtsKu7j9hRp1IKtt0KHerAq2yQRkOj?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group"
              >
                <span className="material-symbols-outlined text-2xl text-[#528C46]">
                  description
                </span>
                <div className="flex-1">
                  <p className="font-bold text-[#0A110B] text-sm">
                    Data Mocking
                  </p>
                  <p className="text-xs text-[#6B7280]">drive.google.com/...</p>
                </div>
                <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-1 transition-transform">
                  open_in_new
                </span>
              </a>
              <a
                href="https://forms.gle/maPg1qzZnj2EwzeX6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group"
              >
                <span className="material-symbols-outlined text-2xl text-[#528C46]">
                  assignment_turned_in
                </span>
                <div className="flex-1">
                  <p className="font-bold text-[#0A110B] text-sm">
                    Tugas LKPD 5
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    forms.gle/maPg1qzZnj2EwzeX6
                  </p>
                </div>
                <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-1 transition-transform">
                  open_in_new
                </span>
              </a>
              <a
                href="https://forms.gle/Ca5q7E8cp52w9Gzc9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl hover:border-[#528C46] hover:shadow-md transition-all group"
              >
                <span className="material-symbols-outlined text-2xl text-[#528C46]">
                  history_edu
                </span>
                <div className="flex-1">
                  <p className="font-bold text-[#0A110B] text-sm">Refleksi</p>
                  <p className="text-xs text-[#6B7280]">
                    forms.gle/Ca5q7E8cp52w9Gzc9
                  </p>
                </div>
                <span className="material-symbols-outlined text-[#528C46] text-sm group-hover:translate-x-1 transition-transform">
                  open_in_new
                </span>
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
                <span className="material-symbols-outlined text-2xl text-[#528C46]">
                  lightbulb
                </span>
                <h3 className="font-bold text-[#0A110B] text-sm">
                  Panduan & Pertanyaan Pemantik
                </h3>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="flex-1 p-6 grid grid-cols-2 gap-6 overflow-y-auto custom-scrollbar">
              {/* Left side: Guide Steps */}
              <div className="flex flex-col bg-white rounded-2xl border border-[#C6E67D]/30 p-5 shadow-sm">
                <p className="text-xs font-black text-[#528C46] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    auto_fix_high
                  </span>
                  Langkah CODAP
                </p>
                <div className="space-y-4">
                  {guideSteps.map((step, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="shrink-0 text-[#528C46] text-sm font-black pt-0.5">
                        {i + 1}.
                      </div>
                      <p className="text-[13px] text-[#0A110B] leading-relaxed font-medium">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side: Questions */}
              <div className="flex flex-col bg-white rounded-2xl border border-[#C6E67D]/30 p-5 shadow-sm">
                <p className="text-xs font-black text-[#528C46] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    forum
                  </span>
                  Pertanyaan Pemantik
                </p>
                <div className="space-y-4">
                  {reflectionQuestions.map((q, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start bg-[#FDFCF8] p-4 rounded-xl border border-[#C6E67D]/20 hover:border-[#528C46] transition-colors group"
                    >
                      <span className="material-symbols-outlined text-[#528C46] text-lg mt-0.5 group-hover:scale-110 transition-transform">
                        help
                      </span>
                      <p className="text-[13px] text-[#0A110B] leading-relaxed font-medium">
                        {q}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-[#C6E67D]/30 shrink-0">
              <p className="text-[11px] text-[#6B7280] italic leading-relaxed w-full text-center max-w-3xl mx-auto">
                "Halo Air Quality Specialist hebat! Kamu baru saja menerima
                paket data rahasia dari stasiun pemantau kualitas udara di
                daerah Jawa Tengah. Data ini merekam kualitas udara setiap jam
                selama 7 hari penuh! Ikuti langkah berikut ya!"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Modal */}
      <AIChatModal 
        isOpen={showChat} 
        onClose={() => setShowChat(false)} 
        messages={chatMessages} 
        storageKey="chat_history_literacy"
      />

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

export default Literacy;
