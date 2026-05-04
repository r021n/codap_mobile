import { useState } from "react";
import envImg from "./assets/screen_1/env.png";

function App() {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-8 overflow-hidden font-sans">
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full gap-8 md:gap-12">
        <div className="flex-1 flex justify-center items-center">
          <img
            src={envImg}
            alt="Env Illustration"
            className="w-full h-auto max-h-[60vh] md:max-h-[80vh] object-contain drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]"
          />
        </div>

        <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
          <div className="space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Halo, selamat datang di AirDataLabs
              </span>
              <br />
              <span className="text-lg md:text-xl font-medium text-gray-400">
                (Virtual Lab terintegrasi STEM-CODAP-AI)
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto md:mx-0">
              Melalui aplikasi ini kamu akan belajar berbagai hal yang diperlukan
              untuk menjadi seorang Environmental Engineer terkhusus Air Quality
              Specialist
            </p>

            <p className="text-lg md:text-xl font-semibold text-white mt-8">
              Siap melakukan perjalanan sebagai seorang Air Quality Specialist yang hebat?
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-4 items-center md:items-start">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="hidden peer"
                checked={isReady}
                onChange={(e) => setIsReady(e.target.checked)}
              />
              <div className="w-6 h-6 border-2 border-green-500 rounded flex items-center justify-center transition-all peer-checked:bg-green-500 group-hover:border-green-400">
                {isReady && <span className="text-black">✓</span>}
              </div>
              <span className="text-lg text-gray-200 select-none group-hover:text-white">
                Ya, Saya siap!
              </span>
            </label>

            <button
              disabled={!isReady}
              className={`px-16 py-4 rounded-xl font-bold text-xl uppercase tracking-[0.2em] transition-all duration-300 ${
                isReady
                  ? "bg-green-500 text-black hover:bg-green-400 hover:scale-105 shadow-[0_0_30px_rgba(34,197,94,0.5)] cursor-pointer"
                  : "bg-gray-800 text-gray-600 cursor-not-allowed opacity-50"
              }`}
            >
              MULAI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
