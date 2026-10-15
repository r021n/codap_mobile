import { useCallback } from "react";
import type { AirExperimentLabProps } from "./types";
import { useAirExperimentLab } from "./hooks/useAirExperimentLab";
import { useHoseConnection } from "./hooks/useHoseConnection";
import { useLabDragAndDrop } from "./hooks/useLabDragAndDrop";
import { InventoryDrawer } from "./components/InventoryDrawer";
import { InstructionHeader } from "./components/InstructionHeader";
import { LabWorkspace } from "./components/LabWorkspace";
import { LKPDPanel } from "./components/LKPDPanel";
import { DragOverlay } from "./components/DragOverlay";

export default function AirExperimentLab({ onBack }: AirExperimentLabProps) {
  const {
    state,
    durationInput,
    isInventoryOpen,
    isLKPDOpen,
    isLabFinished,
    instruction,
    setIsInventoryOpen,
    setIsLKPDOpen,
    handleReset: resetExperimentState,
    handleDurationChange,
    handleDurationBlur,
    processAction,
    connectHose,
    isSetupComplete,
  } = useAirExperimentLab();

  const {
    workspaceRef,
    portBRef,
    portCRef,
    portDRef,
    portJRef,
    portCoords,
    hoseDrawing,
    handlePortPointerDown,
    handleHosePointerMove,
    handleHosePointerUp,
    resetHoseState,
  } = useHoseConnection({
    labState: state,
    onConnectHose: connectHose,
    isInventoryOpen,
    isLKPDOpen,
  });

  const {
    dragInfo,
    activeDropZone,
    handleItemPointerDown,
    resetDragState,
  } = useLabDragAndDrop({
    isHoseDrawing: hoseDrawing.isDrawing,
    onHosePointerMove: handleHosePointerMove,
    onHosePointerUp: handleHosePointerUp,
    onDropItem: processAction,
  });

  const handleFullReset = useCallback(() => {
    resetExperimentState();
    resetHoseState();
    resetDragState();
  }, [resetExperimentState, resetHoseState, resetDragState]);

  return (
    <div className="flex h-[100vh] w-[100vw] flex-row overflow-hidden bg-[#FDFCF8] font-sans text-[#0A110B]">
      {/* PANEL KIRI: INVENTORY */}
      <InventoryDrawer
        isOpen={isInventoryOpen}
        inventory={state.inventory}
        isSetupComplete={isSetupComplete}
        isSunny={state.isSunny}
        dragItem={dragInfo.item}
        onClose={() => setIsInventoryOpen(false)}
        onBack={onBack}
        onReset={handleFullReset}
        onItemPointerDown={handleItemPointerDown}
      />

      {/* PANEL KANAN: AREA PRAKTIKUM & LKPD */}
      <div className="relative flex flex-1 h-full min-h-0 flex-col overflow-hidden">
        {/* Header Instruksi */}
        <InstructionHeader
          instruction={instruction}
          isInventoryOpen={isInventoryOpen}
          onOpenInventory={() => setIsInventoryOpen(true)}
          onBack={onBack}
          onReset={handleFullReset}
        />

        <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
          {/* Meja Praktikum (Area Interaktif) */}
          <LabWorkspace
            workspaceRef={workspaceRef}
            portBRef={portBRef}
            portCRef={portCRef}
            portDRef={portDRef}
            portJRef={portJRef}
            state={state}
            activeDropZone={activeDropZone}
            hoseDrawing={hoseDrawing}
            portCoords={portCoords}
            onPortPointerDown={handlePortPointerDown}
            onItemPointerDown={handleItemPointerDown}
          />

          {/* Panel LKPD (Bawah) */}
          <LKPDPanel
            isOpen={isLKPDOpen}
            durationInput={durationInput}
            time={state.time}
            duration={state.duration}
            isRunning={state.isRunning}
            isLabFinished={isLabFinished}
            logs={state.logs}
            onToggle={() => setIsLKPDOpen((prev) => !prev)}
            onDurationChange={handleDurationChange}
            onDurationBlur={handleDurationBlur}
          />
        </div>
      </div>

      {/* RENDER ITEM DRAG (OVERLAY KUSTOM) */}
      <DragOverlay dragInfo={dragInfo} />
    </div>
  );
}
