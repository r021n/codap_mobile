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
      <Literacy
        onNext={handleLiteracyComplete}
        onBack={handleBackToAnalysis}
      />
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center font-sans">
      <div className="bg-green-50 p-10 rounded-3xl border border-green-100 shadow-xl max-w-md">
        <h1 className="text-3xl font-black text-slate-800 mb-4">
          Selamat Datang, <br />
          <span className="text-green-600">{userData?.fullName}</span>!
        </h1>
        <p className="text-slate-600 mb-6">
          Kamu telah terdaftar sebagai siswa kelas{" "}
          <span className="font-bold text-slate-800">
            {userData?.className}
          </span>{" "}
          dengan nomor presensi{" "}
          <span className="font-bold text-slate-800">
            {userData?.attendanceNumber}
          </span>
          .
        </p>
        <button
          onClick={() => alert("Mulai Pembelajaran!")}
          className="w-full py-4 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-green-200 hover:-translate-y-1 transition-all"
        >
          Mulai Belajar
        </button>
      </div>
    </div>
  );
}

export default App;
