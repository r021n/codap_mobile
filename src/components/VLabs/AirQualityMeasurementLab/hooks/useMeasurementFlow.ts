import { useState, useRef, useCallback, useEffect } from "react";
import type {
  Screen,
  MeasurementResult,
  AirQualityRecord,
} from "../types";
import { LOCATIONS, MEASURE_STATUSES } from "../constants";
import { calculateResult } from "../utils/ispuCalculator";

type UseMeasurementFlowProps = {
  data: AirQualityRecord[];
  onStartMeasurement?: () => void;
};

export function useMeasurementFlow({
  data,
  onStartMeasurement,
}: UseMeasurementFlowProps) {
  const [screen, setScreen] = useState<Screen>("start");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmDevicePower, setConfirmDevicePower] = useState<
    "off" | "booting" | "ready"
  >("off");
  const [measureProgress, setMeasureProgress] = useState(0);
  const [measureStatus, setMeasureStatus] = useState("");
  const [results, setResults] = useState<MeasurementResult[]>([]);

  const measureIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const handlePowerClick = useCallback(() => {
    if (confirmDevicePower !== "off") return;
    setConfirmDevicePower("booting");
    setTimeout(() => {
      setConfirmDevicePower("ready");
    }, 2000);
  }, [confirmDevicePower]);

  const startMeasurement = useCallback(() => {
    if (!selectedTime) return;

    setScreen("measuring");
    setMeasureProgress(0);
    onStartMeasurement?.();

    let progress = 0;
    measureIntervalRef.current = setInterval(() => {
      progress += 1;
      setMeasureProgress(progress);
      const statusIndex = Math.min(
        Math.floor((progress / 100) * MEASURE_STATUSES.length),
        MEASURE_STATUSES.length - 1,
      );
      setMeasureStatus(MEASURE_STATUSES[statusIndex]);

      if (progress >= 100) {
        if (measureIntervalRef.current)
          clearInterval(measureIntervalRef.current);

        const currentResults: MeasurementResult[] = [];
        LOCATIONS.forEach((loc) => {
          const record = data.find(
            (r) => r.kota === loc && r.jam === selectedTime,
          );
          if (record) {
            currentResults.push(calculateResult(record));
          }
        });

        if (currentResults.length > 0) {
          setResults(currentResults);
          setScreen("result");
        }
      }
    }, 120);
  }, [data, selectedTime, onStartMeasurement]);

  useEffect(() => {
    return () => {
      if (measureIntervalRef.current) clearInterval(measureIntervalRef.current);
    };
  }, []);

  const resetFlow = useCallback(() => {
    setScreen("start");
    setResults([]);
    setSelectedTime(null);
    setConfirmDevicePower("off");
    setMeasureProgress(0);
    setMeasureStatus("");
  }, []);

  return {
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
  };
}
