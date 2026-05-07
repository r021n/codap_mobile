import { useState } from "react";
import envImg from "../assets/screen_1/env.png";

interface OnboardingProps {
  onStart: () => void;
}

const Onboarding = ({ onStart }: OnboardingProps) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="w-screen h-screen bg-white flex flex-row overflow-hidden font-sans selection:bg-green-200 selection:text-green-900">
      {/* Left Column - Image Section (Fixed Full Height) */}
      <div className="w-[40%] h-full bg-gradient-to-br from-green-50 to-emerald-100 flex justify-center items-center p-4 relative overflow-hidden flex-shrink-0 border-r border-green-50">
        {/* Decorative background shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-48 h-48 sm:w-64 sm:h-64 bg-green-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 sm:w-64 sm:h-64 bg-emerald-200/40 rounded-full blur-3xl"></div>

        <img
          src={envImg}
          alt="Environmental Illustration"
          className="relative z-10 w-full h-auto max-h-[80vh] object-contain drop-shadow-[0_10px_20px_rgba(16,185,129,0.15)]"
        />
      </div>

      {/* Right Column - Content Section (Fixed, No Scroll) */}
      <div className="w-[60%] h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12 gap-3 sm:gap-4 bg-white overflow-hidden">
        {/* Badge & Title */}
        <div className="space-y-1 sm:space-y-2">
          <div className="inline-block px-3 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full tracking-wider uppercase">
            STEM-CODAP-AI Virtual Lab
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 leading-[1.1]">
            Halo, selamat datang di <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
              AirDataLabs
            </span>
          </h1>
        </div>

        {/* Description */}
        <p className="text-[10px] sm:text-xs md:text-sm lg:text-base leading-tight md:leading-relaxed text-slate-600 max-w-xl">
          Melalui aplikasi ini kamu akan belajar berbagai hal yang diperlukan
          untuk menjadi seorang{" "}
          <strong className="text-slate-800 font-bold">
            Environmental Engineer
          </strong>{" "}
          terkhusus{" "}
          <strong className="text-slate-800 font-bold">
            Air Quality Specialist
          </strong>
          .
        </p>

        {/* Interaction Card */}
        <div className="p-2 sm:p-3 md:p-4 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm space-y-2 sm:space-y-4">
          <p className="text-[11px] sm:text-xs md:text-sm lg:text-base font-bold text-slate-800 leading-snug">
            Siap melakukan perjalanan sebagai seorang Air Quality Specialist
            yang hebat?
          </p>

          <div className="flex flex-row items-center justify-between gap-3">
            <label className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={isReady}
                  onChange={(e) => setIsReady(e.target.checked)}
                />
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border-2 border-slate-300 rounded-lg sm:rounded-xl peer-checked:bg-green-500 peer-checked:border-green-500 transition-all duration-300 flex items-center justify-center bg-white group-hover:border-green-400 shadow-sm">
                  <svg
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white transition-transform duration-300 ease-out ${
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
              <span className="text-[11px] sm:text-xs md:text-sm lg:text-base font-bold text-slate-600 group-hover:text-slate-800 transition-colors">
                Ya, Saya siap!
              </span>
            </label>

            <button
              disabled={!isReady}
              onClick={onStart}
              className={`px-5 py-2 sm:px-8 sm:py-3 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-widest transition-all duration-300 shadow-sm ${
                isReady
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 hover:shadow-lg hover:shadow-green-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
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
