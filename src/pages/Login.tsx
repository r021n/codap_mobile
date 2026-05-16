import { useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface LoginProps {
  onComplete: (data: any) => void;
  onSwitch: () => void;
}

const Login = ({ onComplete, onSwitch }: LoginProps) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let { name, value } = e.target;

    // Rule: no capital letters, no spaces for username
    if (name === "username") {
      value = value.toLowerCase().replace(/\s/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid =
    formData.username.trim() !== "" &&
    formData.password !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setIsLoading(true);
      setError("");
      try {
        const response = await api.login(formData);
        await login(response.user, response.token);
        onComplete(response.user);
      } catch (err: any) {
        setError(err.message || "Login gagal, silakan periksa username dan password Anda.");
      } finally {
        setIsLoading(false);
      }
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
            Masuk
          </div>
          <h1 className="text-3xl font-extrabold text-[#0A110B] leading-tight">
            Selamat <br /> Datang Kembali
          </h1>
          <p className="text-xs text-[#0A110B]/80 leading-snug max-w-[90%] mt-1">
            Silahkan masuk untuk melanjutkan observasi kualitas udara Anda.
          </p>
        </div>
      </div>

      {/* Right Column - Form Container */}
      <div className="w-[60%] h-full flex flex-col justify-center p-5 overflow-hidden">
        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {/* Username */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider ml-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="masukkan_username"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-[#528C46] focus:ring-1 focus:ring-[#528C46] transition-all text-xs text-[#0A110B]"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider ml-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-[#528C46] focus:ring-1 focus:ring-[#528C46] transition-all text-xs text-[#0A110B]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88L14.12 14.12"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/><circle cx="12" cy="12" r="3"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            {error && (
              <p className="text-[9px] text-red-500 font-bold italic ml-2 -mb-2">
                * {error}
              </p>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-sm ${
                isFormValid && !isLoading
                  ? "bg-[#0A110B] text-white hover:bg-black active:translate-y-0.5 cursor-pointer"
                  : "bg-[#0A110B]/20 text-[#0A110B]/50 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </button>

            {/* Switch to Register */}
            <p className="text-center text-[10px] text-[#6B7280] font-medium">
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={onSwitch}
                className="text-[#528C46] font-bold hover:underline"
              >
                Daftar Sekarang
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
