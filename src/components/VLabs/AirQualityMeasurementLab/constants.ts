export const LOCATIONS = ["Tasikmalaya", "Solo", "Kutai Barat"] as const;

export type LocationName = (typeof LOCATIONS)[number];

export const PARAMETERS = [
  { key: "pm10", label: "PM₁₀", unit: "µg/m³" },
  { key: "pm25", label: "PM₂.₅", unit: "µg/m³" },
  { key: "so2", label: "SO₂", unit: "µg/m³" },
  { key: "co", label: "CO", unit: "mg/m³" },
  { key: "o3", label: "O₃", unit: "µg/m³" },
  { key: "no2", label: "NO₂", unit: "µg/m³" },
  { key: "hc", label: "HC", unit: "µg/m³" },
] as const;

export const MEASURE_STATUSES = [
  "Menginisialisasi alat ukur di 3 lokasi...",
  "Menyiapkan sensor di Tasikmalaya, Solo, dan Kutai Barat...",
  "Mengukur konsentrasi polutan udara...",
  "Sinkronisasi data antar stasiun...",
  "Menganalisis parameter ISPU (Indeks Standar Pencemaran Udara)...",
  "Menghitung rata-rata regional...",
  "Finalisasi hasil pengukuran...",
] as const;
