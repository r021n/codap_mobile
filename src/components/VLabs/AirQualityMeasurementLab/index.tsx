import { useCallback, useMemo } from "react";
import type { AirQualityMeasurementLabProps } from "./types";
import { useAirQualityData } from "./hooks/useAirQualityData";
import { useMeasurementFlow } from "./hooks/useMeasurementFlow";
import { useScannerDragDrop } from "./hooks/useScannerDragDrop";
import { StartView } from "./components/views/StartView";
import { TimeSelectionView } from "./components/views/TimeSelectionView";
import { ConfirmationView } from "./components/views/ConfirmationView";
import { ActivationView } from "./components/views/ActivationView";
import { MeasuringView } from "./components/views/MeasuringView";
import { ResultView } from "./components/views/ResultView";
import { SplitStageView } from "./components/SplitStageView";
import { ScannerButton, ScannerOverlay } from "./components/ScannerOverlay";

export default function AirQualityMeasurementLab({
  onBack,
}: AirQualityMeasurementLabProps) {
  const { data, loading, availableTimes } = useAirQualityData();

  const {
    dragInfo,
    activeDropZone,
    revealedCities,
    handleScannerPointerDown,
    resetRevealedCities,
  } = useScannerDragDrop();

  const {
    screen,
    selectedTime,
    confirmDevicePower,
    measureProgress,
    measureStatus,
    results,
    setScreen,
    setSelectedTime,
    setConfirmDevicePower,
    handlePowerClick,
    startMeasurement,
    resetFlow,
  } = useMeasurementFlow({
    data,
    onStartMeasurement: resetRevealedCities,
  });

  const availableDates = useMemo(() => {
    if (!selectedTime || data.length === 0) return [];
    return data
      .filter((r) => r.kota === "Solo" && r.jam === selectedTime)
      .map((r) => ({ hari: r.hari, tanggal: r.tanggal }));
  }, [data, selectedTime]);

  const handleFullReset = useCallback(() => {
    resetFlow();
    resetRevealedCities();
  }, [resetFlow, resetRevealedCities]);

  const handleStartMeasurement = useCallback(() => {
    if (!selectedTime) return;
    startMeasurement();
  }, [selectedTime, startMeasurement]);

  const renderLeftPanel = () => {
    if (loading) {
      return (
        <div className="flex h-full items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#528C46]/20 border-t-primary rounded-full animate-spin" />
        </div>
      );
    }

    if (screen === "start") {
      return (
        <StartView onBack={onBack} onNext={() => setScreen("time")} />
      );
    }

    if (screen === "time") {
      return (
        <TimeSelectionView
          availableTimes={availableTimes}
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
          onBack={() => setScreen("start")}
          onNext={() => setScreen("confirm")}
        />
      );
    }

    if (screen === "confirm") {
      return (
        <ConfirmationView
          selectedTime={selectedTime}
          availableDates={availableDates}
          onBack={() => {
            setScreen("time");
            setConfirmDevicePower("off");
          }}
          onNext={() => setScreen("activation")}
        />
      );
    }

    if (screen === "activation") {
      return (
        <ActivationView
          confirmDevicePower={confirmDevicePower}
          onPowerClick={handlePowerClick}
          onBack={() => setScreen("confirm")}
          onStartMeasurement={handleStartMeasurement}
        />
      );
    }

    if (screen === "measuring") {
      return <MeasuringView measureStatus={measureStatus} />;
    }

    if (screen === "result" && results.length > 0) {
      return (
        <ResultView
          results={results}
          revealedCities={revealedCities}
          activeDropZone={activeDropZone}
          onReset={handleFullReset}
        />
      );
    }

    return null;
  };

  return (
    <div className="flex flex-row w-screen h-screen bg-[#FDFCF8] overflow-hidden font-sans">
      {/* Visual Stage: Top on mobile, right on desktop */}
      <SplitStageView
        screen={screen}
        measureProgress={measureProgress}
        measureStatus={measureStatus}
        results={results}
      />

      {/* Left Panel: Controls */}
      <div className="w-[45vw] shrink-0 bg-[#FDFCF8] border-r border-[#C6E67D]/30 flex flex-col z-10 relative order-1">
        {screen === "result" && (
          <ScannerButton onPointerDown={handleScannerPointerDown} />
        )}
        <div className="flex-1 overflow-y-auto p-4">{renderLeftPanel()}</div>
      </div>

      {/* Drag Overlay for Scanner */}
      <ScannerOverlay dragInfo={dragInfo} />
    </div>
  );
}
