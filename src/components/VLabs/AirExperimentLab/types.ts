export type PortId = "B" | "C" | "D" | "J";

export type InventoryItem =
  | "thermoA"
  | "thermoB"
  | "thermoD"
  | "stopperA"
  | "stopperB"
  | "stopperC"
  | "stopperD"
  | "plant"
  | "bakingSoda"
  | "vinegar"
  | "cylinder"
  | "sun"
  | "stopwatch";

export type DropZone =
  | "flaskA"
  | "flaskB"
  | "flaskC"
  | "flaskD"
  | "jar"
  | "scale"
  | "environment";

export type PortCoords = Record<PortId, { x: number; y: number }>;

export type LabLog = {
  time: number;
  tempA: string;
  tempB: string;
  tempD: string;
};

export type LabState = {
  flaskA: {
    hasThermo: boolean;
    hasStopper: boolean;
    temp: number;
  };
  flaskB: { hasThermo: boolean; hasStopper: boolean; temp: number };
  flaskC: { hasSoda: boolean; hasVinegar: boolean; hasStopper: boolean };
  flaskD: { hasThermo: boolean; hasStopper: boolean; temp: number };
  jar: { hasPlant: boolean; hasWrap: boolean };
  scale: { hasCylinder: boolean; sodaAmount: number };
  inventory: Record<InventoryItem, boolean>;
  isSunny: boolean;
  isRunning: boolean;
  time: number;
  logs: LabLog[];
  hoseBCConnected: boolean;
  hoseDJConnected: boolean;
  duration: number;
};

export type DragInfo = {
  isDragging: boolean;
  item: InventoryItem | null;
  x: number;
  y: number;
};

export type HoseDrawing = {
  isDrawing: boolean;
  startPort: PortId | null;
  currentX: number;
  currentY: number;
};

export type ErlenmeyerProps = {
  label: string;
  hasThermo?: boolean;
  hasStopper?: boolean;
  hasSoda?: boolean;
  hasVinegar?: boolean;
  isBubbling?: boolean;
};

export type GelasUkurProps = {
  sodaAmount: number;
};

export type TimbanganProps = {
  value: number;
};

export type ToplesProps = {
  hasPlant: boolean;
  hasWrap: boolean;
};

export type AirExperimentLabProps = {
  onBack: () => void;
};
