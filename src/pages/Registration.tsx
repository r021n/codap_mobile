import { useState } from "react";

interface RegistrationProps {
  onComplete: (data: any) => void;
}

const Registration = ({ onComplete }: RegistrationProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    className: "XE ",
    attendanceNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.gender !== "" &&
    formData.age !== "" &&
    formData.className.length > 3 &&
    formData.attendanceNumber !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onComplete(formData);
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden font-sans selection:bg-green-200 selection:text-green-900">
      {/* Content Container - Constrained to prevent overflow */}
      <div className="w-full max-w-2xl max-h-full flex flex-col justify-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-3 w-full"
        >
          {/* Header - Compact */}
          <div className="mb-4 flex items-center">
            <div className="bg-green-500 px-4 py-2 rounded-lg flex items-center shadow-sm">
              <h1 className="text-xs md:text-sm font-black text-white uppercase tracking-[0.2em]">
                Identitas
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {/* Nama Lengkap - Full Width */}
            <div className="col-span-2 space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-[11px] text-slate-800"
                required
              />
            </div>

            {/* Jenis Kelamin */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                Jenis Kelamin
              </label>
              <div className="flex gap-1.5">
                {["Laki-Laki", "Perempuan"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, gender: option }))
                    }
                    className={`flex-1 py-1.5 rounded-lg border text-[9px] font-bold transition-all ${
                      formData.gender === option
                        ? "bg-green-500 border-green-500 text-white shadow-md shadow-green-100"
                        : "bg-white border-slate-200 text-slate-600 hover:border-green-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Usia */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                Usia
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-[11px] text-slate-800"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400">
                  tahun
                </span>
              </div>
            </div>

            {/* Kelas */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                Kelas
              </label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleChange}
                placeholder="XE A"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-[11px] text-slate-800"
                required
              />
            </div>

            {/* No Presensi */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                No. Presensi
              </label>
              <input
                type="number"
                name="attendanceNumber"
                value={formData.attendanceNumber}
                onChange={handleChange}
                placeholder="Contoh: 1"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-[11px] text-slate-800"
                required
              />
            </div>
          </div>

          {/* Submit Button - Compact */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 rounded-lg font-bold text-[9px] uppercase tracking-widest transition-all duration-300 shadow-sm ${
                isFormValid
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 hover:shadow-lg hover:shadow-green-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              Lanjutkan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
