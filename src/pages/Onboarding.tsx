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
      <div className="w-[45%] h-full flex justify-center items-center p-4 sm:p-6 relative overflow-hidden shrink-0">
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
      <div className="w-[55%] h-full flex flex-col justify-center p-4 sm:p-6 gap-2 sm:gap-4 overflow-hidden">
        {/* Badge & Title */}
        <div className="flex flex-col gap-1 sm:gap-2">
          <div className="inline-block self-start px-3 py-1 bg-white shadow-sm text-[#528C46] text-[9px] sm:text-[10px] font-bold rounded-full tracking-wider uppercase border border-gray-100">
            STEM-CODAP-AI Virtual Lab
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl text-[#0A110B] leading-tight sm:leading-[1.1]">
            <span className="font-medium text-[#6B7280]">Halo, selamat datang di</span> <br />
            <span className="font-extrabold">AirDataLabs 👋</span>
          </h1>
        </div>

        {/* Description */}
        <p className="text-[10px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed text-[#6B7280] max-w-xl">
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
        <div className="p-3 sm:p-4 md:p-5 bg-[#C6E67D] rounded-2xl sm:rounded-3xl shadow-sm flex flex-col gap-2 sm:gap-3 relative overflow-hidden shrink-0 mt-1">
          <p className="text-[11px] sm:text-xs md:text-sm font-bold text-[#0A110B] leading-snug">
            Siap melakukan perjalanan sebagai seorang Air Quality Specialist
            yang hebat?
          </p>

          <div className="flex flex-row items-center justify-between gap-2 bg-white/40 p-1 sm:p-1.5 rounded-full backdrop-blur-sm">
            <label className="flex items-center gap-2 cursor-pointer group select-none pl-2 sm:pl-3">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={isReady}
                  onChange={(e) => setIsReady(e.target.checked)}
                />
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-white rounded-full peer-checked:bg-[#528C46] transition-all duration-300 flex items-center justify-center shadow-sm">
                  <svg
                    className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white transition-transform duration-300 ease-out ${
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
              <span className="text-[10px] sm:text-[11px] md:text-xs font-bold text-[#0A110B]">
                Ya, Saya siap!
              </span>
            </label>

            <button
              disabled={!isReady}
              onClick={onStart}
              className={`py-1.5 px-4 sm:py-2 sm:px-6 md:px-8 rounded-full font-bold text-[10px] sm:text-[11px] md:text-xs uppercase tracking-widest transition-all duration-300 shadow-md ${
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
