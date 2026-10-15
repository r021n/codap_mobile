import React, { type PointerEvent as ReactPointerEvent } from "react";
import type { LabState, DropZone, HoseDrawing, PortCoords, PortId, InventoryItem } from "../types";
import { ErlenmeyerSVG } from "../visuals/ErlenmeyerFlask";
import { SunSVG, GelasUkurSVG, TimbanganSVG, ToplesSVG } from "../visuals/LabEquipmentVisuals";
import { HoseOverlay } from "../visuals/HoseOverlay";

type LabWorkspaceProps = {
  workspaceRef: React.RefObject<HTMLDivElement | null>;
  portBRef: React.RefObject<HTMLDivElement | null>;
  portCRef: React.RefObject<HTMLDivElement | null>;
  portDRef: React.RefObject<HTMLDivElement | null>;
  portJRef: React.RefObject<HTMLDivElement | null>;
  state: LabState;
  activeDropZone: DropZone | null;
  hoseDrawing: HoseDrawing;
  portCoords: PortCoords;
  onPortPointerDown: (
    e: ReactPointerEvent<HTMLDivElement>,
    portId: PortId,
  ) => void;
  onItemPointerDown: (
    e: ReactPointerEvent<HTMLDivElement>,
    item: InventoryItem,
  ) => void;
};

export const LabWorkspace = React.memo(
  ({
    workspaceRef,
    portBRef,
    portCRef,
    portDRef,
    portJRef,
    state,
    activeDropZone,
    hoseDrawing,
    portCoords,
    onPortPointerDown,
    onItemPointerDown,
  }: LabWorkspaceProps) => {
    return (
      <div
        ref={workspaceRef}
        className={`relative flex min-h-0 flex-1 touch-none flex-col overflow-hidden transition-colors duration-1000 
        ${state.isSunny ? "bg-[#528C46]/10" : "bg-muted-foreground/5"}
        ${activeDropZone === "environment" ? "ring-inset ring-4 ring-primary/50" : ""}`}
        data-dropzone="environment"
      >
        {state.isSunny && (
          <div className="absolute top-2 right-2 opacity-80 pointer-events-none animate-spin-slow">
            <SunSVG />
          </div>
        )}

        {/* OVERLAY SELANG: Melengkung ke atas rapih seperti jembatan pipa lab */}
        <HoseOverlay
          hoseBCConnected={state.hoseBCConnected}
          hoseDJConnected={state.hoseDJConnected}
          hoseDrawing={hoseDrawing}
          portCoords={portCoords}
        />

        {/* Area Penempatan Tabung dan Timbangan */}
        <div className="z-20 flex flex-1 flex-wrap content-end items-end justify-around gap-2 px-2 pb-8 pt-2 ">
          {/* Tabung A */}
          <div
            className={`relative flex w-14 flex-col items-center transition-transform ${activeDropZone === "flaskA" ? "scale-110 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" : ""}`}
            data-dropzone="flaskA"
          >
            {state.flaskA.hasThermo && (
              <div className="absolute -top-6 bg-slate-900/90 text-white px-2 py-0.5 rounded text-[10px] font-mono border border-slate-700 whitespace-nowrap">
                {state.flaskA.temp.toFixed(1)}°C
              </div>
            )}
            <ErlenmeyerSVG
              label="A"
              hasThermo={state.flaskA.hasThermo}
              hasStopper={state.flaskA.hasStopper}
            />
          </div>

          {/* Tabung B */}
          <div
            className={`relative flex w-14 flex-col items-center transition-transform ${activeDropZone === "flaskB" ? "scale-110 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" : ""}`}
            data-dropzone="flaskB"
          >
            {state.flaskB.hasThermo && (
              <div className="absolute -top-6 bg-slate-900/90 text-white px-2 py-0.5 rounded text-[10px] font-mono border border-slate-700 whitespace-nowrap">
                {state.flaskB.temp.toFixed(1)}°C
              </div>
            )}
            <ErlenmeyerSVG
              label="B"
              hasThermo={state.flaskB.hasThermo}
              hasStopper={state.flaskB.hasStopper}
            />

            {/* Port Selang B */}
            <div
              ref={portBRef}
              data-port="B"
              onPointerDown={(e) => onPortPointerDown(e, "B")}
              className={`absolute top-[12%] left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[3px] touch-none z-40 cursor-pointer shadow-sm 
              ${state.hoseBCConnected ? "bg-[#528C46] border-foreground" : "bg-[#FDFCF8] border-foreground hover:bg-[#528C46]/30 hover:scale-125 animate-pulse"}`}
            ></div>
          </div>

          {/* Tabung C */}
          <div
            className={`relative flex w-14 flex-col items-center transition-transform ${activeDropZone === "flaskC" ? "scale-110 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" : ""}`}
            data-dropzone="flaskC"
          >
            <ErlenmeyerSVG
              label="C"
              hasStopper={state.flaskC.hasStopper}
              hasSoda={state.flaskC.hasSoda}
              hasVinegar={state.flaskC.hasVinegar}
              isBubbling={state.flaskC.hasSoda && state.flaskC.hasVinegar}
            />

            {/* Port Selang C */}
            <div
              ref={portCRef}
              data-port="C"
              onPointerDown={(e) => onPortPointerDown(e, "C")}
              className={`absolute top-[12%] left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[3px] touch-none z-40 cursor-pointer shadow-sm 
              ${state.hoseBCConnected ? "bg-[#528C46] border-foreground" : "bg-[#FDFCF8] border-foreground hover:bg-[#528C46]/30 hover:scale-125 animate-pulse"}`}
            ></div>
          </div>

          {/* Tabung D */}
          <div
            className={`relative flex w-14 flex-col items-center transition-transform ${activeDropZone === "flaskD" ? "scale-110 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" : ""}`}
            data-dropzone="flaskD"
          >
            {state.flaskD.hasThermo && (
              <div className="absolute -top-6 bg-slate-900/90 text-white px-2 py-0.5 rounded text-[10px] font-mono border border-slate-700 whitespace-nowrap">
                {state.flaskD.temp.toFixed(1)}°C
              </div>
            )}
            <ErlenmeyerSVG
              label="D"
              hasThermo={state.flaskD.hasThermo}
              hasStopper={state.flaskD.hasStopper}
            />

            {/* Port Selang D */}
            <div
              ref={portDRef}
              data-port="D"
              onPointerDown={(e) => onPortPointerDown(e, "D")}
              className={`absolute top-[12%] left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[3px] touch-none z-40 cursor-pointer shadow-sm 
              ${state.hoseDJConnected ? "bg-[#528C46] border-foreground" : "bg-[#FDFCF8] border-foreground hover:bg-[#528C46]/30 hover:scale-125 animate-pulse"}`}
            ></div>
          </div>

          {/* Toples Tanaman */}
          <div
            className={`relative flex w-16 flex-col items-center transition-transform ${activeDropZone === "jar" ? "scale-105 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" : ""}`}
            data-dropzone="jar"
          >
            <ToplesSVG
              hasPlant={state.jar.hasPlant}
              hasWrap={state.jar.hasWrap}
            />

            {/* Port Selang Toples */}
            <div
              ref={portJRef}
              data-port="J"
              onPointerDown={(e) => onPortPointerDown(e, "J")}
              className={`absolute top-[24%] right-[16%] h-9 w-9 rounded-full border-[3px] touch-none z-40 cursor-pointer shadow-sm 
              ${state.hoseDJConnected ? "bg-[#528C46] border-foreground" : "bg-[#FDFCF8] border-foreground hover:bg-[#528C46]/30 hover:scale-125 animate-pulse"}`}
            ></div>

            <p className="text-[10px] text-[#6B7280] font-semibold mt-1 text-center">
              {state.jar.hasPlant
                ? "Tanaman siap, wrap terpasang"
                : "Drop Tanaman ke Toples"}
            </p>
          </div>

          {/* Area Timbangan & Gelas Ukur */}
          <div
            className={`relative flex h-20 w-16 flex-col items-center justify-end transition-transform ${activeDropZone === "scale" ? "scale-105 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" : ""}`}
            data-dropzone="scale"
          >
            {state.scale.hasCylinder && (
              <div
                className="w-8 h-16 mb-[-10%] z-20 touch-none cursor-grab"
                onPointerDown={(e) => onItemPointerDown(e, "cylinder")}
              >
                <GelasUkurSVG sodaAmount={state.scale.sodaAmount} />
              </div>
            )}
            <div className="w-full h-12 z-10">
              <TimbanganSVG
                value={
                  state.scale.hasCylinder
                    ? state.scale.sodaAmount > 0
                      ? 5.0
                      : 0.0
                    : 0.0
                }
              />
            </div>
          </div>
        </div>

        {/* Meja Kayu (Landasan Bawah) */}
        <div className="absolute bottom-0 w-full h-8 bg-[#FDFCF8] border-t border-[#C6E67D]/20 z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]"></div>
      </div>
    );
  },
);

LabWorkspace.displayName = "LabWorkspace";
