import type {
  ISPUCategory,
  AirQualityRecord,
  MeasurementResult,
} from "../types";

export function getCategory(value: number | null): {
  category: ISPUCategory | "-";
  color: string;
} {
  if (value === null || isNaN(value))
    return { category: "-", color: "#9ca3af" };
  if (value <= 50) return { category: "Baik", color: "#16a34a" }; // green-600
  if (value <= 100) return { category: "Sedang", color: "#2563eb" }; // blue-600
  if (value <= 200) return { category: "Tidak Sehat", color: "#eab308" }; // yellow-500
  if (value <= 300) return { category: "Sangat Tidak Sehat", color: "#dc2626" }; // red-600
  return { category: "Berbahaya", color: "#581c87" }; // purple-900
}

export function getCategoryBgClass(category: ISPUCategory | "-"): string {
  switch (category) {
    case "Baik":
      return "bg-green-500";
    case "Sedang":
      return "bg-[#C6E67D]/100";
    case "Tidak Sehat":
      return "bg-yellow-400";
    case "Sangat Tidak Sehat":
      return "bg-red-500";
    case "Berbahaya":
      return "bg-purple-900";
    default:
      return "bg-gray-300";
  }
}

export function getCategoryTextClass(category: ISPUCategory | "-"): string {
  switch (category) {
    case "Baik":
      return "text-green-600";
    case "Sedang":
      return "text-[#528C46]";
    case "Tidak Sehat":
      return "text-yellow-600";
    case "Sangat Tidak Sehat":
      return "text-red-600";
    case "Berbahaya":
      return "text-purple-900";
    default:
      return "text-gray-400";
  }
}

export function calculateResult(record: AirQualityRecord): MeasurementResult {
  const categories: MeasurementResult["categories"] = {};
  let maxValue = 0;
  let overallCategory: ISPUCategory = "Baik";

  const params = ["pm10", "pm25", "so2", "co", "o3", "no2", "hc"] as const;
  params.forEach((key) => {
    const value = record[key as keyof AirQualityRecord] as number | null;
    const { category, color } = getCategory(value);
    categories[key] = { value, category, color };

    if (value !== null && value > maxValue) {
      maxValue = value;
      overallCategory = category === "-" ? overallCategory : category;
    }
  });

  const { color: overallColor } = getCategory(maxValue);

  return {
    record,
    categories,
    overallCategory,
    overallColor,
    overallMax: maxValue,
  };
}
