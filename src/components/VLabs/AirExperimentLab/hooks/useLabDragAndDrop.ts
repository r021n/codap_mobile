import { useState, useEffect, useCallback, type PointerEvent as ReactPointerEvent } from "react";
import type { DragInfo, DropZone, InventoryItem } from "../types";
import { initialDragInfo, getClientPoint } from "../constants";

type UseLabDragAndDropProps = {
  isHoseDrawing: boolean;
  onHosePointerMove: (clientX: number, clientY: number) => void;
  onHosePointerUp: (clientX: number, clientY: number) => void;
  onDropItem: (item: InventoryItem, zone: DropZone) => void;
};

export function useLabDragAndDrop({
  isHoseDrawing,
  onHosePointerMove,
  onHosePointerUp,
  onDropItem,
}: UseLabDragAndDropProps) {
  const [dragInfo, setDragInfo] = useState<DragInfo>(initialDragInfo);
  const [activeDropZone, setActiveDropZone] = useState<DropZone | null>(null);

  const handleItemPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>, item: InventoryItem) => {
      e.preventDefault();
      setDragInfo({
        isDragging: true,
        item,
        x: e.clientX,
        y: e.clientY,
      });
    },
    [],
  );

  const resetDragState = useCallback(() => {
    setDragInfo(initialDragInfo);
    setActiveDropZone(null);
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const point = getClientPoint(e);
      if (!point) {
        return;
      }
      const { x: clientX, y: clientY } = point;

      if (dragInfo.isDragging) {
        setDragInfo((prev) => ({ ...prev, x: clientX, y: clientY }));

        const dragOverlay = document.getElementById("drag-overlay");
        if (dragOverlay) dragOverlay.style.visibility = "hidden";

        const element = document.elementFromPoint(clientX, clientY);
        const dropZone = element?.closest("[data-dropzone]");
        setActiveDropZone(
          dropZone
            ? (dropZone.getAttribute("data-dropzone") as DropZone)
            : null,
        );

        if (dragOverlay) dragOverlay.style.visibility = "visible";
      }

      if (isHoseDrawing) {
        onHosePointerMove(clientX, clientY);
      }
    };

    const handlePointerUp = (e: MouseEvent | TouchEvent) => {
      if (dragInfo.isDragging) {
        const point = getClientPoint(e);
        if (!point) {
          return;
        }
        const { x: clientX, y: clientY } = point;

        const dragOverlay = document.getElementById("drag-overlay");
        if (dragOverlay) dragOverlay.style.visibility = "hidden";

        const element = document.elementFromPoint(clientX, clientY);
        const dropZoneEl = element?.closest("[data-dropzone]");
        const targetZone = dropZoneEl?.getAttribute(
          "data-dropzone",
        ) as DropZone | null;

        if (dragOverlay) dragOverlay.style.visibility = "visible";

        if (targetZone && dragInfo.item) {
          onDropItem(dragInfo.item, targetZone);
        }

        setDragInfo(initialDragInfo);
        setActiveDropZone(null);
      }

      if (isHoseDrawing) {
        const point = getClientPoint(e);
        if (point) {
          onHosePointerUp(point.x, point.y);
        }
      }
    };

    if (dragInfo.isDragging || isHoseDrawing) {
      window.addEventListener("mousemove", handlePointerMove, {
        passive: false,
      });
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
  }, [
    dragInfo.isDragging,
    dragInfo.item,
    isHoseDrawing,
    onHosePointerMove,
    onHosePointerUp,
    onDropItem,
  ]);

  return {
    dragInfo,
    activeDropZone,
    handleItemPointerDown,
    resetDragState,
  };
}
