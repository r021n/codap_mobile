import { useState } from "react";
import envImg from "../assets/screen_1/env.png";

interface OnboardingProps {
  onStart: () => void;
}

const Onboarding = ({ onStart }: OnboardingProps) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="w-[100vw] h-[100vh] bg-[#FDFCF8] flex flex-row overflow-hidden selection:bg-[#C6E67D] selection:text-[#0A110B]">
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
