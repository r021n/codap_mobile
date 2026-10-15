import type {
  LabState,
  DragInfo,
  HoseDrawing,
  PortCoords,
  PortId,
} from "./types";

export const DEFAULT_DURATION = 5;

export const initialState: LabState = {
  flaskA: { hasThermo: false, hasStopper: false, temp: 28 },
  flaskB: { hasThermo: false, hasStopper: false, temp: 28 },
  flaskC: { hasSoda: false, hasVinegar: false, hasStopper: false },
  flaskD: { hasThermo: false, hasStopper: false, temp: 28 },
  jar: { hasPlant: false, hasWrap: false },
  scale: { hasCylinder: false, sodaAmount: 0 },
  inventory: {
    thermoA: true,
    thermoB: true,
    thermoD: true,
    stopperA: true,
    stopperB: true,
    stopperC: true,
    stopperD: true,
    plant: true,
    bakingSoda: true,
    vinegar: true,
    cylinder: true,
    sun: true,
    stopwatch: true,
  },
  isSunny: false,
  isRunning: false,
  time: 0,
  logs: [],
  hoseBCConnected: false,
  hoseDJConnected: false,
  duration: DEFAULT_DURATION,
};

export const initialDragInfo: DragInfo = {
  isDragging: false,
  item: null,
  x: 0,
  y: 0,
};

export const initialHoseDrawing: HoseDrawing = {
  isDrawing: false,
  startPort: null,
  currentX: 0,
  currentY: 0,
};

export const initialPortCoords: PortCoords = {
  B: { x: 0, y: 0 },
  C: { x: 0, y: 0 },
  D: { x: 0, y: 0 },
  J: { x: 0, y: 0 },
};

export const isPortId = (
  value: string | null | undefined,
): value is PortId => {
  return value === "B" || value === "C" || value === "D" || value === "J";
};

export const getHosePair = (a: PortId, b: PortId): "BC" | "DJ" | null => {
  if ((a === "B" && b === "C") || (a === "C" && b === "B")) {
    return "BC";
  }
  if ((a === "D" && b === "J") || (a === "J" && b === "D")) {
    return "DJ";
  }
  return null;
};

export const isPairConnected = (
  labState: LabState,
  pair: "BC" | "DJ",
): boolean => {
  return pair === "BC" ? labState.hoseBCConnected : labState.hoseDJConnected;
};

export const hasMeasuredPortCoords = (
  coords: PortCoords,
  port: PortId,
): boolean => {
  return coords[port].x !== 0 || coords[port].y !== 0;
};

export const getClientPoint = (
  event: MouseEvent | TouchEvent,
): { x: number; y: number } | null => {
  if ("touches" in event) {
    const touch = event.touches[0] ?? event.changedTouches[0];
    if (!touch) {
      return null;
    }
    return { x: touch.clientX, y: touch.clientY };
  }

  return { x: event.clientX, y: event.clientY };
};
