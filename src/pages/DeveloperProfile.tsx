import React from "react";

interface DeveloperProfileProps {
  onBack: () => void;
}

interface ProfileData {
  role: string;
  name: string;
  subInfo: string;
  institution: string;
  photoUrl?: string;
}

const profiles: ProfileData[] = [
  {
    role: "Mahasiswa / Pengembang",
    name: "Nama Mahasiswa",
    subInfo: "Pendidikan Ilmu Pengetahuan Alam",
    institution: "Universitas Asal",
    photoUrl: "", // Bisa diganti dengan URL/path foto mahasiswa
  },
  {
    role: "Dosen Pembimbing I",
    name: "Nama Dosen Pembimbing 1",
    subInfo: "Dosen Pembimbing Utama",
    institution: "Universitas Asal",
    photoUrl: "", // Bisa diganti dengan URL/path foto dosen pembimbing 1
  },
  {
    role: "Dosen Pembimbing II",
    name: "Nama Dosen Pembimbing 2",
    subInfo: "Dosen Pembimbing Pendamping",
    institution: "Universitas Asal",
    photoUrl: "", // Bisa diganti dengan URL/path foto dosen pembimbing 2
  },
];

const DeveloperProfile: React.FC<DeveloperProfileProps> = ({ onBack }) => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#FDFCF8] flex flex-col p-4 md:p-5 overflow-hidden font-sans relative selection:bg-[#C6E67D] selection:text-[#0A110B]">
      {/* Subtle Background Accents */}
      <div className="absolute top-[-10%] right-[-5%] w-48 h-48 bg-[#C6E67D]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-48 h-48 bg-[#528C46]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between shrink-0 mb-2 relative z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-white border border-[#C6E67D]/40 shadow-xs flex items-center justify-center text-[#0A110B] hover:text-[#528C46] hover:border-[#528C46]/40 transition-all active:scale-95"
            title="Kembali"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-base font-bold text-[#0A110B] leading-tight">
              Profil Pengembang
            </h1>
            <p className="text-[10px] text-[#6B7280]">
              Tim Pengembang Aplikasi & Dosen Pembimbing
            </p>
          </div>
        </div>
      </div>

      {/* Content Section - 3 Cards for Landscape View */}
      <div className="flex-1 flex items-center justify-center min-h-0 relative z-10 px-2">
        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-3xl">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#C6E67D]/30 shadow-xs p-3.5 flex flex-col items-center text-center justify-center transition-all hover:border-[#528C46]/40"
            >
              {/* Dummy Photo / Avatar */}
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-[#F2F5E8] border-2 border-[#C6E67D]/40 shadow-xs flex items-center justify-center mb-2.5 shrink-0">
                {profile.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-8 h-8 md:w-9 md:h-9 text-[#528C46]/60"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>

              {/* Role Badge */}
              <span className="px-2 py-0.5 mb-1.5 bg-[#C6E67D]/30 text-[#528C46] text-[9px] font-bold rounded-full uppercase tracking-wider">
                {profile.role}
              </span>

              {/* Name */}
              <h2 className="text-xs md:text-[13px] font-bold text-[#0A110B] leading-tight mb-1">
                {profile.name}
              </h2>

              {/* Department / Sub Info */}
              <p className="text-[10px] text-[#6B7280] leading-snug line-clamp-1">
                {profile.subInfo}
              </p>

              {/* Institution */}
              <p className="text-[10px] text-[#0A110B]/80 font-medium leading-snug line-clamp-1">
                {profile.institution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
