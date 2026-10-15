export type Screen =
  | "start"
  | "time"
  | "confirm"
  | "activation"
  | "measuring"
  | "result";

export type AirQualityRecord = {
  hari: string;
  tanggal: string;
  jam: string;
  kota: string;
  pm10: number | null;
  pm25: number | null;
  so2: number | null;
  co: number | null;
  o3: number | null;
  no2: number | null;
  hc: number | null;
};

export type ISPUCategory =
  | "Baik"
  | "Sedang"
  | "Tidak Sehat"
  | "Sangat Tidak Sehat"
  | "Berbahaya";

export type MeasurementResult = {
  record: AirQualityRecord;
  categories: Record<
    string,
    { value: number | null; category: ISPUCategory | "-"; color: string }
  >;
  overallCategory: ISPUCategory;
  overallColor: string;
  overallMax: number;
};

export type DragInfo = {
  isDragging: boolean;
  x: number;
  y: number;
  isTouch: boolean;
};

export type AirQualityMeasurementLabProps = {
  onBack: () => void;
};
