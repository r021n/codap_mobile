import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import envImg from "../assets/screen_1/env.png";

interface OnboardingProps {
  onStart: () => void;
}

const Onboarding = ({ onStart }: OnboardingProps) => {
  const { user, logout } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="w-[100vw] h-[100vh] bg-[#FDFCF8] flex flex-row overflow-hidden selection:bg-[#C6E67D] selection:text-[#0A110B] relative">
      {/* Logout Button (Conditional) */}
      {user && (
        <button
          onClick={() => setShowLogoutModal(true)}
          className="absolute top-5 right-5 z-20 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-[#C6E67D]/30 flex items-center gap-2 text-[#6B7280] hover:text-red-500 hover:border-red-200 transition-all duration-300 group"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider group-hover:block hidden">Logout</span>
          <span className="material-symbols-outlined text-[18px]">logout</span>
        </button>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A110B]/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[280px] rounded-3xl p-6 shadow-2xl border border-[#C6E67D]/20 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-4 text-red-500">
              <span className="material-symbols-outlined text-2xl">logout</span>
            </div>
            <h2 className="text-lg font-bold text-[#0A110B] mb-1">Konfirmasi Logout</h2>
            <p className="text-[11px] text-[#6B7280] mb-5 leading-relaxed">Apakah kamu yakin ingin keluar dari akun?</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest text-[#6B7280] bg-gray-50 hover:bg-gray-100 transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowLogoutModal(false);
                }}
                className="flex-1 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 transition-all"
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Left Column - Image Section */}
      <div className="w-[45%] h-full flex justify-center items-center p-5 relative overflow-hidden shrink-0">
        {/* Decorative background shapes */}
        <div className="absolute top-[10%] left-[10%] w-32 h-32 bg-[#C6E67D]/60 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[10%] w-48 h-48 bg-[#528C46]/20 rounded-full blur-3xl"></div>

        <img
          src={envImg}
          alt="Environmental Illustration"
          className="relative z-10 w-full h-auto max-h-[85vh] object-contain drop-shadow-2xl"
        />
      </div>

      {/* Right Column - Content Section (Fixed, No Scroll) */}
      <div className="w-[55%] h-full flex flex-col justify-center p-5 gap-3 overflow-hidden">
        {/* Badge & Title */}
        <div className="flex flex-col gap-2">
          <div className="inline-block self-start px-3 py-1 bg-white shadow-sm text-[#528C46] text-[10px] font-bold rounded-full tracking-wider uppercase border border-gray-100">
            STEM-CODAP-AI Virtual Lab
          </div>
          <h1 className="text-2xl text-[#0A110B] leading-[1.1]">
            <span className="font-medium text-[#6B7280]">Halo, selamat datang di</span> <br />
            <span className="font-extrabold">AirDataLabs 👋</span>
          </h1>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-[#6B7280] max-w-xl">
          Melalui aplikasi ini kamu akan belajar berbagai hal yang diperlukan
          untuk menjadi seorang{" "}
          <strong className="text-[#0A110B] font-bold">
            Environmental Engineer
          </strong>{" "}
          terkhusus{" "}
          <strong className="text-[#0A110B] font-bold">
            Air Quality Specialist
          </strong>
          .
        </p>

        {/* Interaction Card */}
        <div className="p-4 bg-[#C6E67D] rounded-3xl shadow-sm flex flex-col gap-3 relative overflow-hidden shrink-0 mt-1">
          <p className="text-xs font-bold text-[#0A110B] leading-snug">
            Siap melakukan perjalanan sebagai seorang Air Quality Specialist
            yang hebat?
          </p>

          <div className="flex flex-row items-center justify-between gap-2 bg-white/40 p-1.5 rounded-full backdrop-blur-sm">
            <label className="flex items-center gap-2 cursor-pointer group select-none pl-3">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={isReady}
                  onChange={(e) => setIsReady(e.target.checked)}
                />
                <div className="w-6 h-6 bg-white rounded-full peer-checked:bg-[#528C46] transition-all duration-300 flex items-center justify-center shadow-sm">
                  <svg
                    className={`w-4 h-4 text-white transition-transform duration-300 ease-out ${
                      isReady ? "scale-100 rotate-0" : "scale-0 -rotate-90"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={4}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#0A110B]">
                Ya, Saya siap!
              </span>
            </label>

            <button
              disabled={!isReady}
              onClick={onStart}
              className={`py-2 px-6 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all duration-300 shadow-md ${
                isReady
                  ? "bg-[#0A110B] text-white hover:bg-black active:translate-y-0.5 cursor-pointer"
                  : "bg-[#0A110B]/20 text-[#0A110B]/50 cursor-not-allowed"
              }`}
            >
              Mulai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
