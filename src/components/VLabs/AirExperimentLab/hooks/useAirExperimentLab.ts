import { useState, useEffect, useCallback } from "react";
import type { LabState, InventoryItem, DropZone } from "../types";
import { initialState, DEFAULT_DURATION } from "../constants";

export function useAirExperimentLab() {
  const [state, setState] = useState<LabState>(initialState);
  const [durationInput, setDurationInput] = useState<string>(
    String(DEFAULT_DURATION),
  );
  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(true);
  const [isLKPDOpen, setIsLKPDOpen] = useState<boolean>(false);

  // Timer simulasi suhu praktikum
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (state.isRunning && state.time < state.duration) {
      interval = setInterval(() => {
        setState((prev) => {
          const newTime = prev.time + 1;
          const newTempA = prev.flaskA.temp + 1.0;
          const newTempB =
            prev.flaskB.temp + (prev.hoseBCConnected ? 2.5 : 1.0);
          // Tabung D dibuat sebagai profil suhu terendah (efek pendinginan oleh tanaman/toples).
          const newTempD =
            prev.flaskD.temp + (prev.hoseDJConnected ? 0.3 : 0.5);

          const newLogs = [
            ...prev.logs,
            {
              time: newTime,
              tempA: newTempA.toFixed(1),
              tempB: newTempB.toFixed(1),
              tempD: newTempD.toFixed(1),
            },
          ];
          return {
            ...prev,
            time: newTime,
            flaskA: { ...prev.flaskA, temp: newTempA },
            flaskB: { ...prev.flaskB, temp: newTempB },
            flaskD: { ...prev.flaskD, temp: newTempD },
            logs: newLogs,
            isRunning: newTime < prev.duration,
          };
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [
    state.isRunning,
    state.time,
    state.hoseBCConnected,
    state.hoseDJConnected,
    state.duration,
  ]);

  const isSetupComplete = useCallback((s: LabState) => {
    return (
      s.flaskA.hasThermo &&
      s.flaskA.hasStopper &&
      s.flaskB.hasThermo &&
      s.flaskB.hasStopper &&
      s.flaskD.hasThermo &&
      s.flaskD.hasStopper &&
      s.flaskC.hasSoda &&
      s.flaskC.hasVinegar &&
      s.flaskC.hasStopper &&
      s.jar.hasPlant &&
      s.jar.hasWrap &&
      s.hoseBCConnected &&
      s.hoseDJConnected
    );
  }, []);

  const handleReset = useCallback(() => {
    setState({ ...initialState, duration: state.duration });
  }, [state.duration]);

  const handleDurationChange = useCallback((value: string) => {
    setDurationInput(value);
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 5) {
      setState((prev) => ({ ...prev, duration: num }));
    }
  }, []);

  const handleDurationBlur = useCallback(() => {
    const num = parseInt(durationInput, 10);
    if (isNaN(num) || num < 5) {
      setDurationInput("5");
      setState((prev) => ({ ...prev, duration: 5 }));
    }
  }, [durationInput]);

  const connectHose = useCallback((pair: "BC" | "DJ") => {
    setState((prev) => {
      if (pair === "BC") {
        return { ...prev, hoseBCConnected: true };
      }
      return { ...prev, hoseDJConnected: true };
    });
  }, []);

  const processAction = useCallback(
    (item: InventoryItem, zone: DropZone) => {
      setState((prev) => {
        const newState: LabState = {
          ...prev,
          flaskA: { ...prev.flaskA },
          flaskB: { ...prev.flaskB },
          flaskC: { ...prev.flaskC },
          flaskD: { ...prev.flaskD },
          jar: { ...prev.jar },
          scale: { ...prev.scale },
          inventory: { ...prev.inventory },
          logs: [...prev.logs],
        };
        const inv = newState.inventory;

        if (zone === "flaskA") {
          if (item === "thermoA" && !newState.flaskA.hasThermo) {
            newState.flaskA.hasThermo = true;
            inv.thermoA = false;
          }
          if (item === "stopperA" && !newState.flaskA.hasStopper) {
            newState.flaskA.hasStopper = true;
            inv.stopperA = false;
          }
        }

        if (zone === "flaskB") {
          if (item === "thermoB" && !newState.flaskB.hasThermo) {
            newState.flaskB.hasThermo = true;
            inv.thermoB = false;
          }
          if (item === "stopperB" && !newState.flaskB.hasStopper) {
            newState.flaskB.hasStopper = true;
            inv.stopperB = false;
          }
        }

        if (zone === "scale") {
          if (item === "cylinder" && !newState.scale.hasCylinder) {
            newState.scale.hasCylinder = true;
            inv.cylinder = false;
          }
          // Baking soda bisa di-drop ke timbangan (yang sudah ada gelas ukur)
          if (item === "bakingSoda" && newState.scale.hasCylinder) {
            newState.scale.sodaAmount = 10;
          }
        }

        if (zone === "flaskC") {
          if (item === "cylinder" && newState.scale.sodaAmount > 0) {
            newState.flaskC.hasSoda = true;
            newState.scale.sodaAmount = 0;
            inv.cylinder = true;
            newState.scale.hasCylinder = false;
          }
          if (item === "vinegar") {
            newState.flaskC.hasVinegar = true;
          }
          if (item === "stopperC" && !newState.flaskC.hasStopper) {
            newState.flaskC.hasStopper = true;
            inv.stopperC = false;
          }
        }

        if (zone === "flaskD") {
          if (item === "thermoD" && !newState.flaskD.hasThermo) {
            newState.flaskD.hasThermo = true;
            inv.thermoD = false;
          }
          if (item === "stopperD" && !newState.flaskD.hasStopper) {
            newState.flaskD.hasStopper = true;
            inv.stopperD = false;
          }
        }

        if (zone === "jar") {
          if (item === "plant" && !newState.jar.hasPlant) {
            newState.jar.hasPlant = true;
            newState.jar.hasWrap = true;
            inv.plant = false;
          }
        }

        if (zone === "environment") {
          if (item === "sun" && isSetupComplete(newState)) {
            newState.isSunny = true;
            inv.sun = false;
          }
          if (item === "stopwatch" && newState.isSunny) {
            newState.isRunning = true;
            inv.stopwatch = false;
            setIsLKPDOpen(true);
          }
        }

        return newState;
      });
    },
    [isSetupComplete],
  );

  const isLabFinished = state.time >= state.duration && state.time > 0;

  const getInstruction = useCallback(() => {
    if (!state.flaskA.hasThermo || !state.flaskA.hasStopper)
      return "1. Siapkan Tabung A: tarik Termometer A dan Gabus A ke Tabung A.";
    if (!state.flaskB.hasThermo || !state.flaskB.hasStopper)
      return "2. Siapkan Tabung B: tarik Termometer B dan Gabus B ke Tabung B.";

    if (!state.flaskC.hasSoda) {
      if (!state.scale.hasCylinder)
        return "3. Tarik Gelas Ukur ke atas Timbangan.";
      if (state.scale.sodaAmount === 0)
        return "4. Tarik Baking Soda ke Timbangan atau Gelas Ukur untuk menimbang 10 ml.";
      return "5. Tarik Gelas Ukur (yang berisi soda) ke Tabung C untuk menuangkannya.";
    }

    if (!state.flaskC.hasVinegar) return "6. Tarik Asam Cuka ke Tabung C.";
    if (!state.flaskC.hasStopper) return "7. Tutup Tabung C dengan Gabus C.";
    if (!state.hoseBCConnected)
      return "8. Hubungkan selang 1: tekan titik Tabung B, lalu tekan titik Tabung C.";
    if (!state.flaskD.hasThermo || !state.flaskD.hasStopper)
      return "9. Siapkan Tabung D: tarik Termometer D dan Gabus D ke Tabung D.";
    if (!state.jar.hasPlant) return "10. Tarik Tanaman ke Toples.";
    if (!state.hoseDJConnected)
      return "11. Hubungkan selang 2: tekan titik Tabung D, lalu tekan titik Toples.";
    if (!state.isSunny)
      return "12. Tarik Matahari ke area kosong untuk memindahkan set alat ke luar ruangan.";
    if (!state.isRunning && state.time === 0)
      return "13. Tarik stopwatch ke area kerja untuk mulai mengamati perbedaan suhu tabung A, B, dan D!";
    if (state.time < state.duration)
      return "Mengamati... (Perhatikan suhu di Tabung B naik lebih cepat karena CO2 dari Tabung C)";
    return "Praktikum selesai! LKPD menampilkan perbandingan suhu Tabung A dan B tiap menit.";
  }, [
    state.flaskA.hasThermo,
    state.flaskA.hasStopper,
    state.flaskB.hasThermo,
    state.flaskB.hasStopper,
    state.flaskC.hasSoda,
    state.scale.hasCylinder,
    state.scale.sodaAmount,
    state.flaskC.hasVinegar,
    state.flaskC.hasStopper,
    state.hoseBCConnected,
    state.flaskD.hasThermo,
    state.flaskD.hasStopper,
    state.jar.hasPlant,
    state.hoseDJConnected,
    state.isSunny,
    state.isRunning,
    state.time,
    state.duration,
  ]);

  return {
    state,
    durationInput,
    isInventoryOpen,
    isLKPDOpen,
    isLabFinished,
    instruction: getInstruction(),
    setIsInventoryOpen,
    setIsLKPDOpen,
    handleReset,
    handleDurationChange,
    handleDurationBlur,
    processAction,
    connectHose,
    isSetupComplete: isSetupComplete(state),
  };
}
