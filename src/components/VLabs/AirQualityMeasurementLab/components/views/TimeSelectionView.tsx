import React from "react";

type TimeSelectionViewProps = {
  availableTimes: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  onBack: () => void;
  onNext: () => void;
};

export const TimeSelectionView = React.memo(
  ({
    availableTimes,
    selectedTime,
    onSelectTime,
    onBack,
    onNext,
  }: TimeSelectionViewProps) => {
    return (
      <div className="flex flex-col min-h-full space-y-6">
        <button
          onClick={onBack}
          className="self-start text-sm text-[#528C46] font-medium hover:underline flex items-center gap-1"
        >
          ← Kembali ke Info
        </button>

        <div>
          <h2 className="text-2xl font-serif font-bold text-[#0A110B]">
            Pilih Waktu Pengukuran
          </h2>
          <p className="text-[#6B7280] mt-1">
            Pengukuran akan dilakukan secara serentak pada waktu yang Anda
            pilih.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 flex-1 content-start overflow-y-auto pr-2">
          {availableTimes.map((time) => (
            <button
              key={time}
              onClick={() => onSelectTime(time)}
              className={`p-3 rounded-lg border font-bold transition-all ${
                selectedTime === time
                  ? "border-[#528C46] bg-[#528C46]/10 text-[#528C46]"
                  : "border-[#C6E67D]/30 bg-white text-[#6B7280] hover:border-[#528C46]/40"
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 pb-6">
          <button
            disabled={!selectedTime}
            onClick={onNext}
            className={`w-full py-4 mb-4 rounded-xl font-bold tracking-wide shadow-lg transition-all ${
              selectedTime
                ? "bg-[#528C46] text-white hover:shadow-xl active:scale-95"
                : "bg-slate-200 text-[#6B7280] cursor-not-allowed"
            }`}
          >
            Lanjut ke Konfirmasi
          </button>
        </div>
      </div>
    );
  },
);

TimeSelectionView.displayName = "TimeSelectionView";
