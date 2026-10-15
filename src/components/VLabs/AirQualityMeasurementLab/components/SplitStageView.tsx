import React from "react";
import type { Screen, MeasurementResult } from "../types";
import { LOCATIONS } from "../constants";
import { IndonesiaMap } from "../visuals/IndonesiaMap";
import { EnvironmentVisual } from "../visuals/EnvironmentVisual";
import { DeviceSVG } from "../visuals/DeviceSVG";

type SplitStageViewProps = {
  screen: Screen;
  measureProgress: number;
  measureStatus: string;
  results: MeasurementResult[];
};

export const SplitStageView = React.memo(
  ({ screen, measureProgress, measureStatus, results }: SplitStageViewProps) => {
    return (
      <div className="flex-1 transition-all duration-500 relative bg-[#FDFCF8] border-l border-[#C6E67D]/30 overflow-hidden order-2">
        {/* Background Visuals for selection phases */}
        {(screen === "start" ||
          screen === "time" ||
          screen === "confirm" ||
          screen === "activation") && (
          <div className="absolute inset-0 flex items-center justify-center p-4 ">
            <div className="w-full max-w-4xl text-center">
              <h2 className="text-xl font-serif text-[#528C46] opacity-60 mb-4 ">
                Jaringan Pemantauan Kualitas Udara
              </h2>
              <IndonesiaMap isMonitoring={screen === "activation"} />
            </div>
          </div>
        )}

        {/* Measuring/Result visuals - 3 split screen */}
        {(screen === "measuring" || screen === "result") && (
          <div className="flex flex-row h-full w-full">
            {LOCATIONS.map((loc, idx) => (
              <div
                key={loc}
                className={`relative flex-1 border-[#C6E67D]/30 ${
                  idx !== 2 ? "border-r" : ""
                }`}
              >
                <div className="absolute inset-0 transition-opacity duration-1000 opacity-100">
                  <EnvironmentVisual location={loc} />
                  <div className="absolute inset-0 bg-black/10" />

                  {/* Location Label */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-full text-xs font-bold text-[#0A110B]">
                      {loc}
                    </span>
                  </div>

                  {/* Device/Measurement UI for this location */}
                  <div className="absolute inset-x-0 bottom-4 flex justify-center items-end px-4">
                    <div className="w-full max-w-[180px]">
                      <DeviceSVG
                        progress={measureProgress}
                        status={measureStatus}
                        result={results[idx] || null}
                        compact={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

SplitStageView.displayName = "SplitStageView";
