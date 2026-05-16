import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

interface AdminProgressProps {
  onBack: () => void;
}

interface UserProgressData {
  id: number;
  fullName: string;
  className: string;
  status: string;
  completedPagesCount: number;
}

const AdminProgress: React.FC<AdminProgressProps> = ({ onBack }) => {
  const { token, user } = useAuth();
  const [progressData, setProgressData] = useState<UserProgressData[]>([]);
  const [loading, setLoading] = useState(true);

  // observation, observation2, investigation, analysis, literacy, literacy2, literacy3, literacy4, literacy5
  const totalStages = 9; 

  const fetchData = async (isRefresh = false) => {
    if (token && user?.status === "admin") {
      if (isRefresh) setLoading(true);
      try {
        const res = await api.getAllProgress(token);
        setProgressData(res.data || []);
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, user]);

  if (user?.status !== "admin") {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#FDFCF8]">
        <p className="text-[#0A110B] font-bold">Akses Ditolak. Halaman ini hanya untuk Admin.</p>
        <button onClick={onBack} className="ml-4 text-[#528C46] underline">Kembali</button>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-[#FDFCF8] flex flex-col p-4 overflow-hidden font-sans selection:bg-[#C6E67D] selection:text-[#0A110B]">
      {/* Top Header Section */}
      <div className="flex justify-between items-center mb-4 shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-8 h-8 bg-white rounded-full border border-[#C6E67D]/30 shadow-sm flex items-center justify-center hover:bg-[#528C46] group transition-all duration-300 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px] text-[#528C46] group-hover:text-white transition-colors">
              arrow_back
            </span>
          </button>
          
          <div className="bg-white px-4 py-1.5 rounded-full border border-[#C6E67D]/30 shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[#528C46] text-[20px]">
              monitoring
            </span>
            <h1 className="text-xs font-black text-[#0A110B] uppercase tracking-widest whitespace-nowrap">
              Pantau Progress Siswa
            </h1>
          </div>
        </div>

        <button
          onClick={() => fetchData(true)}
          disabled={loading}
          className="bg-white px-4 py-1.5 rounded-full border border-[#C6E67D]/30 shadow-sm flex items-center gap-2 hover:border-[#528C46] transition-all duration-300 group disabled:opacity-50"
        >
          <span className={`material-symbols-outlined text-[#528C46] text-[18px] group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`}>
            refresh
          </span>
          <span className="text-[10px] font-bold text-[#0A110B] uppercase tracking-wider">
            Refresh Data
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-4 rounded-2xl border border-[#C6E67D]/30 shadow-sm flex flex-col min-h-0 relative">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#528C46]"></div>
          </div>
        ) : (
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white shadow-sm z-10">
                <tr>
                  <th className="py-3 px-4 text-xs font-black text-[#6B7280] uppercase tracking-wider border-b border-[#C6E67D]/30 w-16 text-center">
                    No
                  </th>
                  <th className="py-3 px-4 text-xs font-black text-[#6B7280] uppercase tracking-wider border-b border-[#C6E67D]/30">
                    Nama Siswa
                  </th>
                  <th className="py-3 px-4 text-xs font-black text-[#6B7280] uppercase tracking-wider border-b border-[#C6E67D]/30 w-1/2">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody>
                {progressData.filter(u => u.status === 'student').map((student, index) => {
                  const percent = Math.min(100, Math.round((student.completedPagesCount / totalStages) * 100));
                  
                  return (
                    <tr key={student.id} className="hover:bg-[#FDFCF8] transition-colors group">
                      <td className="py-3 px-4 text-xs font-bold text-[#0A110B] border-b border-[#C6E67D]/10 text-center">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 border-b border-[#C6E67D]/10">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#0A110B] leading-tight">
                            {student.fullName}
                          </span>
                          <span className="text-[10px] text-[#6B7280]">
                            Kelas: {student.className || '-'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 border-b border-[#C6E67D]/10">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-[#FDFCF8] rounded-full overflow-hidden border border-[#C6E67D]/20 shadow-inner">
                            <div 
                              className="h-full bg-[#528C46] rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                          <div className="w-16 text-right shrink-0">
                            <span className="text-xs font-bold text-[#0A110B]">
                              {student.completedPagesCount}
                            </span>
                            <span className="text-xs font-medium text-[#6B7280]">
                              /{totalStages}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                
                {progressData.filter(u => u.status === 'student').length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-xs text-[#6B7280]">
                      Belum ada data siswa.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #C6E67D;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #528C46;
        }
      `}</style>
    </div>
  );
};

export default AdminProgress;
