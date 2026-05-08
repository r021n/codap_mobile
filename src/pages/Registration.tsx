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
    <div className="w-[100vw] h-[100vh] bg-[#FDFCF8] flex flex-row overflow-hidden selection:bg-[#C6E67D] selection:text-[#0A110B]">
      {/* Left Column - Visual/Greeting */}
      <div className="w-[40%] h-full bg-[#C6E67D] p-6 relative flex flex-col justify-center items-start overflow-hidden shrink-0 rounded-r-3xl shadow-sm">
        {/* Decorative background shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-48 h-48 bg-white/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-[#528C46]/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col gap-2">
          <div className="inline-block self-start px-3 py-1 bg-[#528C46] text-white text-[10px] font-bold rounded-full tracking-wider uppercase">
            Langkah 1
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A110B] leading-tight">
            Lengkapi <br /> Identitasmu
          </h1>
          <p className="text-[10px] sm:text-xs text-[#0A110B]/80 leading-snug max-w-[90%] mt-1">
            Sebelum memulai observasi sebagai Air Quality Specialist, mari isi data diri terlebih dahulu.
          </p>
        </div>
      </div>

      {/* Right Column - Form Container */}
      <div className="w-[60%] h-full flex flex-col justify-center p-4 sm:p-6 overflow-hidden">
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto flex flex-col gap-2 sm:gap-3">
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            {/* Nama Lengkap - Full Width */}
            <div className="col-span-2 flex flex-col gap-0.5">
              <label className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider ml-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-[#528C46] focus:ring-1 focus:ring-[#528C46] transition-all text-[10px] sm:text-xs text-[#0A110B]"
                required
              />
            </div>

            {/* Jenis Kelamin */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider ml-2">
                Jenis Kelamin
              </label>
              <div className="flex gap-1">
                {["Laki-Laki", "Perempuan"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, gender: option }))}
                    className={`flex-1 py-1.5 sm:py-2 rounded-full border text-[9px] sm:text-[10px] font-bold transition-all ${
                      formData.gender === option
                        ? "bg-[#528C46] border-[#528C46] text-white shadow-sm"
                        : "bg-white border-gray-200 text-[#6B7280] hover:border-[#C6E67D]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Usia */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider ml-2">
                Usia
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full pl-4 pr-10 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-[#528C46] focus:ring-1 focus:ring-[#528C46] transition-all text-[10px] sm:text-xs text-[#0A110B]"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-[#6B7280]">
                  tahun
                </span>
              </div>
            </div>

            {/* Kelas */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider ml-2">
                Kelas
              </label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleChange}
                placeholder="XE A"
                className="w-full px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-[#528C46] focus:ring-1 focus:ring-[#528C46] transition-all text-[10px] sm:text-xs text-[#0A110B]"
                required
              />
            </div>

            {/* No Presensi */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider ml-2">
                No. Presensi
              </label>
              <input
                type="number"
                name="attendanceNumber"
                value={formData.attendanceNumber}
                onChange={handleChange}
                placeholder="Contoh: 1"
                className="w-full px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-[#528C46] focus:ring-1 focus:ring-[#528C46] transition-all text-[10px] sm:text-xs text-[#0A110B]"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2 sm:py-2.5 rounded-full font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 shadow-sm ${
                isFormValid
                  ? "bg-[#0A110B] text-white hover:bg-black active:translate-y-0.5 cursor-pointer"
                  : "bg-[#0A110B]/20 text-[#0A110B]/50 cursor-not-allowed"
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
