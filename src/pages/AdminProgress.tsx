import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/auth-context";
import { api } from "../services/api";
import { AdminChatViewer } from "../components/AdminChatViewer";

interface AdminProgressProps {
  onBack: () => void;
}

export interface StageConfig {
  key: string;
  shortLabel: string;
  name: string;
}

export const APP_STAGES: StageConfig[] = [
  { key: 'observation', shortLabel: 'F1', name: 'Observasi' },
  { key: 'investigation', shortLabel: 'F2', name: 'Investigasi' },
  { key: 'analysis', shortLabel: 'F3', name: 'Analisis' },
  { key: 'literacy', shortLabel: 'F4', name: 'Literasi 1' },
  { key: 'literacy2', shortLabel: 'F5', name: 'Literasi 2' },
  { key: 'literacy3', shortLabel: 'F6', name: 'Literasi 3' },
  { key: 'literacy4', shortLabel: 'F7', name: 'Literasi 4' },
  { key: 'literacy5', shortLabel: 'F8', name: 'Literasi 5' },
];

interface UserProgressData {
  id: number;
  fullName: string;
  className: string;
  status: string;
  completedPagesCount: number;
  completedPages?: string[];
}

const AdminProgress: React.FC<AdminProgressProps> = ({ onBack }) => {
  const { token, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'progress' | 'chat'>('progress');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 12;

  const totalStages = APP_STAGES.length; 
  const isAdmin = user?.status === "admin";

  const {
    data: progressResponse,
    isLoading: loading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['admin-progress', page, search],
    queryFn: async () => {
      if (!token) return { data: [], pagination: { totalPages: 1, totalRecords: 0, page: 1, limit, hasMore: false } };
      return api.getAllProgress(token, { page, limit, search });
    },
    enabled: Boolean(token && isAdmin),
    staleTime: 1000 * 30, // 30 detik
  });

  const progressData: UserProgressData[] = progressResponse?.data || [];
  const pagination = progressResponse?.pagination;
  const totalPages = pagination?.totalPages || 1;

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
      <div className="flex justify-between items-center mb-3 shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-8 h-8 bg-white rounded-full border border-[#C6E67D]/30 shadow-sm flex items-center justify-center hover:bg-[#528C46] group transition-all duration-300 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px] text-[#528C46] group-hover:text-white transition-colors">
              arrow_back
            </span>
          </button>
          
          {/* Tab Switcher */}
          <div className="bg-white p-1 rounded-full border border-[#C6E67D]/30 shadow-sm flex items-center gap-1">
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'progress'
                  ? 'bg-[#528C46] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#0A110B]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                monitoring
              </span>
              <span>Progress</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'bg-[#528C46] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#0A110B]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                forum
              </span>
              <span>Riwayat Chat</span>
            </button>
          </div>
        </div>

        {activeTab === 'progress' && (
          <div className="flex items-center gap-2">
            <div className="bg-white px-2.5 py-1 rounded-full border border-[#C6E67D]/30 shadow-xs flex items-center gap-1.5 text-xs">
              <span className="material-symbols-outlined text-[15px] text-gray-400">search</span>
              <input
                type="text"
                placeholder="Cari siswa..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent outline-none text-[#0A110B] text-xs w-28 placeholder:text-gray-400"
              />
            </div>
            <button
              onClick={() => void refetch()}
              disabled={isFetching}
              title="Refresh data"
              className="w-7 h-7 bg-white rounded-full border border-[#C6E67D]/30 shadow-xs flex items-center justify-center hover:border-[#528C46] transition-all disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-[#528C46] text-[16px] ${isFetching ? 'animate-spin' : ''}`}>
                refresh
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {activeTab === 'chat' ? (
        <AdminChatViewer token={token || ''} />
      ) : (
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
                    const completedPages = student.completedPages || [];
                    const activeCompletedCount = APP_STAGES.filter(stage => 
                      completedPages.includes(stage.key)
                    ).length;

                    return (
                      <tr key={student.id} className="hover:bg-[#FDFCF8] transition-colors group">
                        <td className="py-2.5 px-4 text-xs font-bold text-[#0A110B] border-b border-[#C6E67D]/10 text-center">
                          {(page - 1) * limit + index + 1}
                        </td>
                        <td className="py-2.5 px-4 border-b border-[#C6E67D]/10">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-[#0A110B] leading-tight">
                              {student.fullName}
                            </span>
                            <span className="text-[10px] text-[#6B7280]">
                              Kelas: {student.className || '-'}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-4 border-b border-[#C6E67D]/10">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 flex items-center gap-1.5 flex-wrap">
                              {APP_STAGES.map((stage) => {
                                const isCompleted = completedPages.includes(stage.key);
                                return (
                                  <div
                                    key={stage.key}
                                    title={`${stage.name}: ${isCompleted ? 'Selesai' : 'Belum selesai / Dilewati'}`}
                                    className={`h-6 px-1.5 rounded-md flex items-center justify-center gap-1 text-[10px] font-bold transition-all ${
                                      isCompleted
                                        ? 'bg-[#528C46] text-white shadow-xs'
                                        : 'bg-[#FDFCF8] border border-[#C6E67D]/30 text-[#9CA3AF]'
                                    }`}
                                  >
                                    <span className="material-symbols-outlined text-[13px] leading-none font-bold">
                                      {isCompleted ? 'check' : 'remove'}
                                    </span>
                                    <span className="leading-none">{stage.shortLabel}</span>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="w-14 text-right shrink-0">
                              <span className="text-xs font-bold text-[#0A110B]">
                                {activeCompletedCount}
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

          {/* Minimalist Pagination Bar */}
          <div className="pt-2.5 mt-auto border-t border-[#C6E67D]/20 flex items-center justify-between text-xs text-[#6B7280] shrink-0">
            <span>Total: {pagination?.totalRecords ?? progressData.length} siswa</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="w-6 h-6 flex items-center justify-center rounded-md border border-[#C6E67D]/30 bg-white hover:bg-[#FDFCF8] disabled:opacity-30 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_left</span>
              </button>
              <span className="text-[11px] font-medium text-[#0A110B] px-1">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="w-6 h-6 flex items-center justify-center rounded-md border border-[#C6E67D]/30 bg-white hover:bg-[#FDFCF8] disabled:opacity-30 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
