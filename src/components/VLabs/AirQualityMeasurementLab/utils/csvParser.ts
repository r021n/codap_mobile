import type { AirQualityRecord } from "../types";

export function parseCSV(csvText: string): AirQualityRecord[] {
  const lines = csvText.trim().split("\n");
  if (lines.length === 0) return [];
  const records: AirQualityRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = line.split(",");
    if (values.length < 11) continue;

    const parseNum = (v: string): number | null => {
      const trimmed = v.trim();
      if (trimmed === "" || trimmed === "-") return null;
      const n = Number(trimmed);
      return isNaN(n) ? null : n;
    };

    records.push({
      hari: values[0].trim(),
      tanggal: values[1].trim(),
      jam: values[2].trim(),
      kota: values[3].trim(),
      pm10: parseNum(values[4]),
      pm25: parseNum(values[5]),
      so2: parseNum(values[6]),
      co: parseNum(values[7]),
      o3: parseNum(values[8]),
      no2: parseNum(values[9]),
      hc: parseNum(values[10]),
    });
  }

  return records;
}
