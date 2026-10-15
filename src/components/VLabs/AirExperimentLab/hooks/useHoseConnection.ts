import { useState, useRef, useCallback, useEffect } from "react";
import type {
  PortCoords,
  HoseDrawing,
  PortId,
  LabState,
} from "../types";
import {
  initialHoseDrawing,
  initialPortCoords,
  getHosePair,
  isPairConnected,
  isPortId,
} from "../constants";

type UseHoseConnectionProps = {
  labState: LabState;
  onConnectHose: (pair: "BC" | "DJ") => void;
  isInventoryOpen: boolean;
  isLKPDOpen: boolean;
};

export function useHoseConnection({
  labState,
  onConnectHose,
  isInventoryOpen,
  isLKPDOpen,
}: UseHoseConnectionProps) {
  const [hoseDrawing, setHoseDrawing] =
    useState<HoseDrawing>(initialHoseDrawing);
  const [portCoords, setPortCoords] = useState<PortCoords>(initialPortCoords);

  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const portBRef = useRef<HTMLDivElement | null>(null);
  const portCRef = useRef<HTMLDivElement | null>(null);
  const portDRef = useRef<HTMLDivElement | null>(null);
  const portJRef = useRef<HTMLDivElement | null>(null);

  const updatePortCoords = useCallback(() => {
    if (
      !workspaceRef.current ||
      !portBRef.current ||
      !portCRef.current ||
      !portDRef.current ||
      !portJRef.current
    )
      return;
    const workspaceRect = workspaceRef.current.getBoundingClientRect();
    const rectB = portBRef.current.getBoundingClientRect();
    const rectC = portCRef.current.getBoundingClientRect();
    const rectD = portDRef.current.getBoundingClientRect();
    const rectJ = portJRef.current.getBoundingClientRect();

    setPortCoords({
      B: {
        x: rectB.left - workspaceRect.left + rectB.width / 2,
        y: rectB.top - workspaceRect.top + rectB.height / 2,
      },
      C: {
        x: rectC.left - workspaceRect.left + rectC.width / 2,
        y: rectC.top - workspaceRect.top + rectC.height / 2,
      },
      D: {
        x: rectD.left - workspaceRect.left + rectD.width / 2,
        y: rectD.top - workspaceRect.top + rectD.height / 2,
      },
      J: {
        x: rectJ.left - workspaceRect.left + rectJ.width / 2,
        y: rectJ.top - workspaceRect.top + rectJ.height / 2,
      },
    });
  }, []);

  const schedulePortCoordsUpdate = useCallback(() => {
    updatePortCoords();
    window.setTimeout(updatePortCoords, 80);
  }, [updatePortCoords]);

  const isPortLocked = useCallback(
    (port: PortId, currentLabState: LabState) => {
      const pair = port === "B" || port === "C" ? "BC" : "DJ";
      return isPairConnected(currentLabState, pair);
    },
    [],
  );

  const tryConnectPorts = useCallback(
    (startPort: PortId, targetPort: PortId) => {
      const pair = getHosePair(startPort, targetPort);
      if (!pair) {
        return false;
      }

      if (isPairConnected(labState, pair)) {
        return false;
      }

      onConnectHose(pair);
      setHoseDrawing(initialHoseDrawing);
      setTimeout(updatePortCoords, 50);
      return true;
    },
    [labState, onConnectHose, updatePortCoords],
  );

  // Resize and Orientation Listeners
  useEffect(() => {
    const visualViewport = window.visualViewport;

    window.addEventListener("resize", schedulePortCoordsUpdate);
    window.addEventListener("orientationchange", schedulePortCoordsUpdate);
    visualViewport?.addEventListener("resize", schedulePortCoordsUpdate);

    window.setTimeout(schedulePortCoordsUpdate, 100);

    return () => {
      window.removeEventListener("resize", schedulePortCoordsUpdate);
      window.removeEventListener("orientationchange", schedulePortCoordsUpdate);
      visualViewport?.removeEventListener("resize", schedulePortCoordsUpdate);
    };
  }, [schedulePortCoordsUpdate, labState.isSunny]);

  useEffect(() => {
    schedulePortCoordsUpdate();
    const t1 = window.setTimeout(updatePortCoords, 150);
    const t2 = window.setTimeout(updatePortCoords, 320);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [isInventoryOpen, isLKPDOpen, schedulePortCoordsUpdate, updatePortCoords]);

  useEffect(() => {
    if (!workspaceRef.current) return;
    const ro = new ResizeObserver(() => {
      updatePortCoords();
    });
    ro.observe(workspaceRef.current);
    return () => {
      ro.disconnect();
    };
  }, [updatePortCoords]);

  const handlePortPointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    portId: PortId,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Pastikan koordinat port terbaru tersedia saat mode drag selang dimulai.
    updatePortCoords();

    if (isPortLocked(portId, labState)) return;

    // Perbaikan Bug Selang: Mode Klik-ke-Klik (Jika selang sudah mulai ditarik dan kita klik port lain)
    if (hoseDrawing.isDrawing && hoseDrawing.startPort) {
      if (hoseDrawing.startPort !== portId) {
        if (!tryConnectPorts(hoseDrawing.startPort, portId)) {
          setHoseDrawing(initialHoseDrawing);
        }
      } else {
        // Klik port yang sama = batal
        setHoseDrawing(initialHoseDrawing);
      }
      return;
    }

    // Mulai menggambar selang
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (!workspaceRef.current) {
      return;
    }
    const workspaceRect = workspaceRef.current.getBoundingClientRect();

    setHoseDrawing({
      isDrawing: true,
      startPort: portId,
      currentX: clientX - workspaceRect.left,
      currentY: clientY - workspaceRect.top,
    });
  };

  const handleHosePointerMove = (clientX: number, clientY: number) => {
    if (hoseDrawing.isDrawing && workspaceRef.current) {
      const workspaceRect = workspaceRef.current.getBoundingClientRect();
      setHoseDrawing((prev) => ({
        ...prev,
        currentX: clientX - workspaceRect.left,
        currentY: clientY - workspaceRect.top,
      }));
    }
  };

  const handleHosePointerUp = (clientX: number, clientY: number) => {
    if (!hoseDrawing.isDrawing) return;

    const hoseOverlay = document.getElementById("hose-overlay");
    if (hoseOverlay) hoseOverlay.style.visibility = "hidden";

    const element = document.elementFromPoint(clientX, clientY);
    const portEl = element?.closest("[data-port]");
    const targetPortValue = portEl?.getAttribute("data-port");

    if (hoseOverlay) hoseOverlay.style.visibility = "visible";

    // Hanya pasangan port B<->C dan D<->J yang valid.
    if (
      hoseDrawing.startPort &&
      isPortId(targetPortValue) &&
      targetPortValue !== hoseDrawing.startPort
    ) {
      if (!tryConnectPorts(hoseDrawing.startPort, targetPortValue)) {
        setHoseDrawing(initialHoseDrawing);
      }
    }
    // Jika lepas jari di ruang kosong tapi cukup jauh dari awal (Batal Dragging)
    else if (!targetPortValue) {
      const startX = hoseDrawing.startPort
        ? portCoords[hoseDrawing.startPort].x
        : 0;
      const startY = hoseDrawing.startPort
        ? portCoords[hoseDrawing.startPort].y
        : 0;
      const dist = Math.hypot(
        hoseDrawing.currentX - startX,
        hoseDrawing.currentY - startY,
      );
      if (dist > 30) {
        setHoseDrawing(initialHoseDrawing);
      }
    }
    // Jika hanya menekan lalu lepas (dist < 30), maka biarkan isDrawing = true (transisi ke Mode Klik-ke-Klik)
  };

  const resetHoseState = useCallback(() => {
    setHoseDrawing(initialHoseDrawing);
    setPortCoords(initialPortCoords);
  }, []);

  return {
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
  };
}
