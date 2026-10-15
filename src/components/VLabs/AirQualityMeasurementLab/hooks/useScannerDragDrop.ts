import { useState, useEffect, useCallback, type PointerEvent as ReactPointerEvent } from "react";
import type { DragInfo } from "../types";

export function useScannerDragDrop() {
  const [dragInfo, setDragInfo] = useState<DragInfo>({
    isDragging: false,
    x: 0,
    y: 0,
    isTouch: false,
  });
  const [activeDropZone, setActiveDropZone] = useState<string | null>(null);
  const [revealedCities, setRevealedCities] = useState<string[]>([]);

  const handleScannerPointerDown = useCallback((e: ReactPointerEvent) => {
    e.preventDefault();
    setDragInfo({
      isDragging: true,
      x: e.clientX,
      y: e.clientY,
      isTouch: e.nativeEvent instanceof TouchEvent,
    });
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!dragInfo.isDragging) return;

      let clientX: number, clientY: number;
      if ("touches" in e) {
        // Prevent scroll on mobile during drag
        if (e.cancelable) e.preventDefault();
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      setDragInfo((prev) => ({ ...prev, x: clientX, y: clientY }));

      // Target detection during drag for feedback
      const dragOverlay = document.getElementById("scanner-overlay");
      if (dragOverlay) dragOverlay.style.visibility = "hidden";
      const target = document.elementFromPoint(clientX, clientY);
      if (dragOverlay) dragOverlay.style.visibility = "visible";

      const dropZone = target?.closest("[data-dropzone-city]");
      setActiveDropZone(
        dropZone ? dropZone.getAttribute("data-dropzone-city") : null,
      );
    };

    const handlePointerUp = (e: MouseEvent | TouchEvent) => {
      if (!dragInfo.isDragging) return;

      let clientX: number, clientY: number;
      if ("touches" in e) {
        clientX = (e as TouchEvent).changedTouches[0].clientX;
        clientY = (e as TouchEvent).changedTouches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const dragOverlay = document.getElementById("scanner-overlay");
      if (dragOverlay) dragOverlay.style.visibility = "hidden";
      const target = document.elementFromPoint(clientX, clientY);
      if (dragOverlay) dragOverlay.style.visibility = "visible";

      const dropZone = target?.closest("[data-dropzone-city]");
      if (dropZone) {
        const cityName = dropZone.getAttribute("data-dropzone-city");
        if (cityName && !revealedCities.includes(cityName)) {
          setRevealedCities((prev) => [...prev, cityName]);
        }
      }

      setDragInfo({ isDragging: false, x: 0, y: 0, isTouch: false });
      setActiveDropZone(null);
    };

    if (dragInfo.isDragging) {
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("touchmove", handlePointerMove, {
        passive: false,
      });
      window.addEventListener("mouseup", handlePointerUp);
      window.addEventListener("touchend", handlePointerUp);
    }

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [dragInfo.isDragging, revealedCities]);

  const resetRevealedCities = useCallback(() => {
    setRevealedCities([]);
    setActiveDropZone(null);
    setDragInfo({ isDragging: false, x: 0, y: 0, isTouch: false });
  }, []);

  return {
    dragInfo,
    activeDropZone,
    revealedCities,
    handleScannerPointerDown,
    resetRevealedCities,
  };
}
