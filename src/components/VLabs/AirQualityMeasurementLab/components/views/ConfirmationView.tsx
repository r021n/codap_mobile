import React from "react";

type ConfirmationViewProps = {
  selectedTime: string | null;
  availableDates: Array<{ hari: string; tanggal: string }>;
  onBack: () => void;
  onNext: () => void;
};

export const ConfirmationView = React.memo(
  ({
    selectedTime,
    availableDates,
    onBack,
    onNext,
  }: ConfirmationViewProps) => {
    return (
      <div className="flex flex-col min-h-full space-y-6">
        <button
          onClick={onBack}
          className="self-start text-sm text-[#528C46] font-medium hover:underline flex items-center gap-1"
        >
          ← Kembali Pilih Waktu
        </button>

        <div>
          <h2 className="text-2xl font-serif font-bold text-[#0A110B]">
            Konfirmasi
          </h2>
          <p className="text-[#6B7280] mt-2">
            Anda akan mengaktifkan sensor di 3 lokasi pemantauan pada:
          </p>
        </div>

        <div className="bg-[#C6E67D]/20 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[#6B7280] text-sm">Lokasi (3)</span>
            <span className="font-bold text-[#0A110B] text-right">
              Tasikmalaya, Solo,
              <br />
              Kutai Barat
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B7280] text-sm">Jam</span>
            <span className="font-bold text-[#0A110B]">{selectedTime}</span>
          </div>
          {availableDates.length > 0 && (
            <div className="flex justify-between">
              <span className="text-[#6B7280] text-sm">Tanggal Data</span>
              <span className="font-bold text-[#0A110B] text-right">
                {availableDates[0].hari}, {availableDates[0].tanggal}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#C6E67D]/10 rounded-2xl border border-dashed border-[#C6E67D]/30">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-xl">
              ⚡
            </div>
            <h4 className="font-bold text-[#0A110B]">Siap Aktivasi</h4>
            <p className="text-xs text-[#6B7280] leading-relaxed max-w-[200px]">
              Semua data sudah siap. Langkah selanjutnya adalah menyalakan alat
              deteksi.
            </p>
          </div>
        </div>

        <div className="mt-auto pt-6 pb-6">
          <button
            onClick={onNext}
            className="w-full mb-4 py-4 rounded-xl font-bold tracking-wide shadow-lg transition-all bg-[#528C46] text-white hover:shadow-xl active:scale-95"
          >
            Lanjut ke Aktivasi Alat
          </button>
        </div>
      </div>
    );
  },
);

ConfirmationView.displayName = "ConfirmationView";
