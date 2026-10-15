import React from "react";
import type { DragInfo } from "../types";
import { InventoryToolIcon } from "../../../../assets/air_labs/tools";

type DragOverlayProps = {
  dragInfo: DragInfo;
};

export const DragOverlay = React.memo(({ dragInfo }: DragOverlayProps) => {
  if (!dragInfo.isDragging || !dragInfo.item) {
    return null;
  }

  return (
    <div
      id="drag-overlay"
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl scale-110"
      style={{ left: dragInfo.x, top: dragInfo.y }}
    >
      <div className="bg-[#FDFCF8] p-2.5 rounded-xl border-2 border-[#528C46] shadow-[0_0_15px_rgba(16,185,129,0.3)]">
        <InventoryToolIcon item={dragInfo.item} className="w-10 h-10" />
      </div>
    </div>
  );
});

DragOverlay.displayName = "DragOverlay";
