import { useState, useEffect, useMemo } from "react";
import type { AirQualityRecord } from "../types";
import { parseCSV } from "../utils/csvParser";

export function useAirQualityData() {
  const [data, setData] = useState<AirQualityRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Load CSV data
  useEffect(() => {
    fetch("./data/udara_24.csv")
      .then((res) => res.text())
      .then((text) => {
        const parsed = parseCSV(text);
        setData(parsed);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const availableTimes = useMemo(() => {
    if (data.length === 0) return [];
    // Use Solo as reference for times (assuming all cities have same times)
    const times = data.filter((r) => r.kota === "Solo").map((r) => r.jam);
    return [...new Set(times)].sort((a, b) => {
      const ah = parseFloat(a.replace(".", ":"));
      const bh = parseFloat(b.replace(".", ":"));
      return ah - bh;
    });
  }, [data]);

  return {
    data,
    loading,
    availableTimes,
  };
}
