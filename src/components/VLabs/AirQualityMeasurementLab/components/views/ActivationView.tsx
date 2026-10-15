import React from "react";
import { DeviceSVG } from "../../visuals/DeviceSVG";

type ActivationViewProps = {
  confirmDevicePower: "off" | "booting" | "ready";
  onPowerClick: () => void;
  onBack: () => void;
  onStartMeasurement: () => void;
};

export const ActivationView = React.memo(
  ({
    confirmDevicePower,
    onPowerClick,
    onBack,
    onStartMeasurement,
  }: ActivationViewProps) => {
    return (
      <div className="flex flex-col min-h-full space-y-6">
        <button
          onClick={onBack}
          className="self-start text-sm text-[#528C46] font-medium hover:underline flex items-center gap-1"
        >
          ← Kembali ke Konfirmasi
        </button>

        <div>
          <h2 className="text-2xl font-serif font-bold text-[#0A110B]">
            Aktivasi Alat
          </h2>
          <p className="text-[#6B7280] mt-2">
            Nyalakan alat untuk mulai memantau kualitas udara di lokasi.
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#FDFCF8] rounded-2xl border border-dashed border-[#C6E67D]/30 relative">
          <div className="absolute top-2 right-3">
            <div
              className={`w-2 h-2 rounded-full ${
                confirmDevicePower === "ready"
                  ? "bg-green-500 animate-pulse"
                  : "bg-slate-300"
              }`}
            />
          </div>

          <div className="w-full mb-6">
            <DeviceSVG
              compact={false}
              powerState={confirmDevicePower}
              onPowerClick={onPowerClick}
            />
          </div>

          <div className="text-center">
            <h4 className="font-bold text-[#0A110B] text-lg">
              {confirmDevicePower === "off"
                ? "Alat Belum Aktif"
                : confirmDevicePower === "booting"
                ? "Menginisialisasi..."
                : "Sistem Siap"}
            </h4>
            <p className="text-sm text-[#6B7280] mt-2 leading-relaxed max-w-[320px] mx-auto">
              {confirmDevicePower === "off"
                ? "Sentuh tombol power (bulat) di samping alat untuk menyalakan."
                : confirmDevicePower === "booting"
                ? "Menghubungkan ke jaringan stasiun udara di 3 kota..."
                : "Alat telah terkalibrasi. Tekan tombol di bawah untuk mulai."}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-6 pb-6">
          <button
            disabled={confirmDevicePower !== "ready"}
            onClick={onStartMeasurement}
            className={`w-full mb-4 py-4 rounded-xl font-bold tracking-wide shadow-lg transition-all ${
              confirmDevicePower === "ready"
                ? "bg-[#528C46] text-white hover:shadow-xl active:scale-95"
                : "bg-slate-200 text-[#6B7280] cursor-not-allowed"
            }`}
          >
            Mulai Pengukuran Serentak
          </button>
        </div>
      </div>
    );
  },
);

ActivationView.displayName = "ActivationView";
