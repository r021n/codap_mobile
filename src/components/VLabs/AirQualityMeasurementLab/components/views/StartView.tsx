import React from "react";
import { LOCATIONS } from "../../constants";
import { WindIcon, MapPinIcon } from "../../visuals/Icons";

type StartViewProps = {
  onBack: () => void;
  onNext: () => void;
};

export const StartView = React.memo(({ onBack, onNext }: StartViewProps) => {
  return (
    <div className="flex flex-col min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-[#0A110B] flex items-center gap-2">
          <WindIcon className="w-6 h-6 text-[#528C46]" /> Virtual Lab
        </h1>
        <button
          onClick={onBack}
          className="text-xs font-semibold px-2 py-1 border rounded hover:bg-[#FDFCF8] transition-colors"
        >
          ← Kembali
        </button>
      </div>

      <div className="bg-[#C6E67D]/10 border-l-4 border-[#528C46] p-4 rounded-r-xl">
        <h3 className="font-bold text-[#528C46] mb-1">Misi Pengukuran</h3>
        <p className="text-sm text-[#6B7280] leading-relaxed">
          Anda akan melakukan pemantauan kualitas udara secara serentak di 3
          lokasi berbeda di Indonesia untuk membandingkan kondisi lingkungan
          yang berbeda.
        </p>
      </div>

      <div className="flex-1 space-y-4">
        <h4 className="font-bold text-[#0A110B]">Lokasi Pemantauan:</h4>
        <div className="space-y-3">
          {LOCATIONS.map((loc) => (
            <div
              key={loc}
              className="flex items-center gap-3 p-4 rounded-xl border border-[#C6E67D]/30 bg-white shadow-sm"
            >
              <MapPinIcon className="w-6 h-6 text-[#528C46]" />
              <div>
                <span className="font-bold text-[#0A110B] block">{loc}</span>
                <span className="text-xs text-[#6B7280]">
                  {loc === "Tasikmalaya"
                    ? "Jawa Barat (Kaki Gunung)"
                    : loc === "Solo"
                    ? "Jawa Tengah (Pusat Kota)"
                    : "Kalimantan Timur (Area Hutan)"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 pb-6">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-xl font-bold tracking-wide shadow-lg transition-all bg-[#528C46] text-white hover:shadow-xl active:scale-95"
        >
          Lanjut Pilih Waktu
        </button>
      </div>
    </div>
  );
});

StartView.displayName = "StartView";
