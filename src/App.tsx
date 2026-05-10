import { useState } from "react";
import Onboarding from "./pages/Onboarding";
import Registration from "./pages/Registration";
import Instructions from "./pages/Instructions";
import Observation from "./pages/Observation";
import Observation2 from "./pages/Observation2";
import Investigation from "./pages/Investigation";
import Analysis from "./pages/Analysis";
import Literacy from "./pages/Literacy";
import Literacy2 from "./pages/Literacy2";
import Literacy3 from "./pages/Literacy3";
import Literacy4 from "./pages/Literacy4";
import Literacy5 from "./pages/Literacy5";

function App() {
  const [step, setStep] = useState<
    | "onboarding"
    | "registration"
    | "instructions"
    | "observation"
    | "observation2"
    | "investigation"
    | "analysis"
    | "literacy"
    | "literacy2"
    | "literacy3"
    | "literacy4"
    | "literacy5"
    | "main"
  >("onboarding");
  const [userData, setUserData] = useState<any>(null);

  const handleOnboardingComplete = () => {
    setStep("registration");
  };

  const handleRegistrationComplete = (data: any) => {
    setUserData(data);
    setStep("instructions");
  };

  const handleInstructionsComplete = () => {
    setStep("observation");
  };

  const handleObservationComplete = () => {
    setStep("observation2");
  };

  const handleObservation2Complete = () => {
    setStep("investigation");
  };

  const handleInvestigationComplete = () => {
    setStep("analysis");
  };

  const handleAnalysisComplete = () => {
    setStep("literacy");
  };

  const handleLiteracyComplete = () => {
    setStep("literacy2");
  };

  const handleLiteracy2Complete = () => {
    setStep("literacy3");
  };

  const handleLiteracy3Complete = () => {
    setStep("literacy4");
  };

  const handleLiteracy4Complete = () => {
    setStep("literacy5");
  };

  const handleLiteracy5Complete = () => {
    setStep("main");
  };

  const handleBackToLiteracy4 = () => {
    setStep("literacy4");
  };

  const handleBackToLiteracy3 = () => {
    setStep("literacy3");
  };

  const handleBackToLiteracy2 = () => {
    setStep("literacy2");
  };

  const handleBackToLiteracy = () => {
    setStep("literacy");
  };

  const handleBackToObservation = () => {
    setStep("observation");
  };

  const handleBackToObservation2 = () => {
    setStep("observation2");
  };

  const handleBackToInvestigation = () => {
    setStep("investigation");
  };

  const handleBackToAnalysis = () => {
    setStep("analysis");
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

  if (step === "observation") {
    return <Observation onNext={handleObservationComplete} />;
  }

  if (step === "observation2") {
    return (
      <Observation2
        onNext={handleObservation2Complete}
        onBack={handleBackToObservation}
      />
    );
  }

  if (step === "investigation") {
    return (
      <Investigation
        onNext={handleInvestigationComplete}
        onBack={handleBackToObservation2}
      />
    );
  }

  if (step === "analysis") {
    return (
      <Analysis
        onNext={handleAnalysisComplete}
        onBack={handleBackToInvestigation}
      />
    );
  }

  if (step === "literacy") {
    return (
      <Literacy onNext={handleLiteracyComplete} onBack={handleBackToAnalysis} />
    );
  }

  if (step === "literacy2") {
    return (
      <Literacy2
        onNext={handleLiteracy2Complete}
        onBack={handleBackToLiteracy}
      />
    );
  }

  if (step === "literacy3") {
    return (
      <Literacy3
        onNext={handleLiteracy3Complete}
        onBack={handleBackToLiteracy2}
      />
    );
  }

  if (step === "literacy4") {
    return (
      <Literacy4
        onNext={handleLiteracy4Complete}
        onBack={handleBackToLiteracy3}
      />
    );
  }

  if (step === "literacy5") {
    return (
      <Literacy5
        onNext={handleLiteracy5Complete}
        onBack={handleBackToLiteracy4}
      />
    );
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-[#FDFCF8] flex flex-col items-center justify-center p-4 overflow-hidden font-sans relative">
      {/* Subtle Background Accents */}
      <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-[#C6E67D]/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-[#528C46]/10 rounded-full blur-3xl"></div>

      <div className="bg-white w-full max-w-lg p-5 rounded-3xl border border-[#C6E67D]/30 shadow-xl relative z-10 flex flex-col items-center">
        <div className="w-12 h-12 bg-[#C6E67D]/20 rounded-2xl flex items-center justify-center mb-3 rotate-3 shadow-sm">
          <span className="material-symbols-outlined text-[#528C46] text-3xl animate-gentle-bounce">
            celebration
          </span>
        </div>

        <h1 className="text-2xl font-black text-[#0A110B] mb-2 leading-tight text-center">
          Luar Biasa,{" "}
          <span className="text-[#528C46]">{userData?.fullName}!</span>
        </h1>

        <p className="text-[#6B7280] text-[14px] mb-5 leading-snug font-medium text-center">
          Kamu telah berhasil menyelesaikan seluruh rangkaian <br />
          <span className="text-[#0A110B] font-bold">
            Investigasi Kualitas Udara Digital
          </span>
          .
        </p>

        <button
          onClick={() => {
            setStep("onboarding");
            setUserData(null);
          }}
          className="w-full py-3 bg-[#0A110B] text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#528C46] transition-all flex items-center justify-center gap-2 group"
        >
          Kembali ke Beranda
          <span className="material-symbols-outlined text-[16px] group-hover:rotate-180 transition-transform duration-500">
            replay
          </span>
        </button>
      </div>

      <style>{`
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-4px) rotate(3deg); }
        }
        .animate-gentle-bounce {
          animation: gentle-bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
