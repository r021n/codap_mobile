import { useState } from "react";
import Onboarding from "./pages/Onboarding";
import Registration from "./pages/Registration";
import Instructions from "./pages/Instructions";

function App() {
  const [step, setStep] = useState<"onboarding" | "registration" | "instructions" | "main">("onboarding");
  const [userData, setUserData] = useState<any>(null);

  const handleOnboardingComplete = () => {
    setStep("registration");
  };

  const handleRegistrationComplete = (data: any) => {
    setUserData(data);
    setStep("instructions");
  };

  const handleInstructionsComplete = () => {
    setStep("main");
  };

  if (step === "onboarding") {
    return <Onboarding onStart={handleOnboardingComplete} />;
  }

  if (step === "registration") {
    return <Registration onComplete={handleRegistrationComplete} />;
  }

  if (step === "instructions") {
    return <Instructions onNext={handleInstructionsComplete} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center font-sans">
      <div className="bg-green-50 p-10 rounded-3xl border border-green-100 shadow-xl max-w-md">
        <h1 className="text-3xl font-black text-slate-800 mb-4">
          Selamat Datang, <br />
          <span className="text-green-600">{userData?.fullName}</span>!
        </h1>
        <p className="text-slate-600 mb-6">
          Kamu telah terdaftar sebagai siswa kelas <span className="font-bold text-slate-800">{userData?.className}</span> dengan nomor presensi <span className="font-bold text-slate-800">{userData?.attendanceNumber}</span>.
        </p>
        <button 
          onClick={() => alert("Mulai Pembelajaran!")}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-green-200 hover:-translate-y-1 transition-all"
        >
          Mulai Belajar
        </button>
      </div>
    </div>
  );
}

export default App;

