import React, { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  chatApi,
  getAttachmentFullUrl,
  type AdminStudentChatOverview,
  type AdminTranscriptResponse,
} from '../services/chatApi';

interface AdminChatViewerProps {
  token: string;
}

export const AdminChatViewer: React.FC<AdminChatViewerProps> = ({ token }) => {
  const [students, setStudents] = useState<AdminStudentChatOverview[]>([]);
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [transcript, setTranscript] = useState<AdminTranscriptResponse | null>(null);
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Ambil overview siswa & sesi
  const loadOverview = useCallback(async () => {
    setLoadingOverview(true);
    setError(null);
    try {
      const data = await chatApi.getAdminOverview(token);
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat overview chat');
    } finally {
      setLoadingOverview(false);
    }
  }, [token]);

  useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

  // Ambil transkrip ketika sesi dipilih
  const handleSelectSession = useCallback(
    async (sessionId: number) => {
      setSelectedSessionId(sessionId);
      setLoadingTranscript(true);
      setError(null);
      try {
        const data = await chatApi.getAdminSessionTranscript(sessionId, token);
        setTranscript(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal memuat transkrip chat');
      } finally {
        setLoadingTranscript(false);
      }
    },
    [token]
  );

  // Filter siswa berdasarkan nama atau kelas
  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.className && s.className.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex-1 flex overflow-hidden border border-[#C6E67D]/30 rounded-2xl bg-white shadow-xs">
      {/* Kolom Kiri: Master List (35%) */}
      <div className="w-[35%] border-r border-[#C6E67D]/20 flex flex-col bg-[#FDFCF8]/50">
        {/* Search bar & Refresh */}
        <div className="p-3 border-b border-[#C6E67D]/20 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white border border-[#C6E67D]/30 rounded-xl px-2.5 py-1.5 text-xs">
            <span className="material-symbols-outlined text-[16px] text-gray-400">
              search
            </span>
            <input
              type="text"
              placeholder="Cari nama / kelas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-[#0A110B] placeholder:text-gray-400 text-xs"
            />
          </div>
          <button
            onClick={() => void loadOverview()}
            title="Muat Ulang"
            disabled={loadingOverview}
            className="w-8 h-8 rounded-xl border border-[#C6E67D]/30 bg-white flex items-center justify-center hover:bg-gray-50 text-[#528C46] disabled:opacity-50"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${
                loadingOverview ? 'animate-spin' : ''
              }`}
            >
              refresh
            </span>
          </button>
        </div>

        {/* Student Sessions List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
          {loadingOverview ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-5 h-5 border-2 border-[#528C46] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-400">
              Tidak ada data siswa
            </div>
          ) : (
            filteredStudents.map((student) => {
              const hasSessions = student.sessions.length > 0;

              return (
                <div
                  key={student.id}
                  className="bg-white border border-[#C6E67D]/20 rounded-xl p-2.5 shadow-2xs"
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <h4 className="text-xs font-bold text-[#0A110B] leading-tight">
                        {student.fullName}
                      </h4>
                      <p className="text-[10px] text-gray-500">
                        Kelas {student.className || '-'}
                      </p>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md font-semibold bg-[#FDFCF8] border border-[#C6E67D]/40 text-[#528C46]">
                      {student.totalMessages} pesan
                    </span>
                  </div>

                  {/* Daftar Modul / Sesi */}
                  {hasSessions ? (
                    <div className="space-y-1 mt-2">
                      {student.sessions.map((session) => {
                        const isSelected = selectedSessionId === session.id;

                        return (
                          <button
                            key={session.id}
                            onClick={() => void handleSelectSession(session.id)}
                            className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                              isSelected
                                ? 'bg-[#528C46] text-white font-medium'
                                : 'bg-[#FDFCF8] hover:bg-gray-100 text-[#0A110B]'
                            }`}
                          >
                            <span className="truncate text-[11px] capitalize">
                              {session.moduleKey}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              <span
                                className={`text-[9px] px-1.5 py-0.2 rounded font-medium ${
                                  session.isArchived
                                    ? isSelected
                                      ? 'bg-white/20 text-white'
                                      : 'bg-gray-200 text-gray-600'
                                    : isSelected
                                    ? 'bg-white/30 text-white'
                                    : 'bg-green-100 text-[#528C46]'
                                }`}
                              >
                                {session.isArchived ? 'Arsip' : 'Aktif'}
                              </span>
                              <span className="text-[10px] opacity-80">
                                {session.messageCount}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-400 italic mt-1">
                      Belum ada percakapan
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Kolom Kanan: Detail Transkrip (65%) */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedSessionId && transcript ? (
          <>
            {/* Header Transkrip */}
            <div className="px-5 py-3 border-b border-[#C6E67D]/20 bg-[#FDFCF8] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#528C46]" />
                <h3 className="font-bold text-xs text-[#0A110B]">
                  {transcript.student.fullName} ({transcript.student.className})
                </h3>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-[#528C46] font-semibold capitalize">
                  Modul {transcript.session.moduleKey}
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                    transcript.session.isArchived
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-green-50 text-[#528C46]'
                  }`}
                >
                  {transcript.session.isArchived ? 'Diarsipkan' : 'Aktif'}
                </span>
              </div>
              <span className="text-[10px] text-gray-400">
                {transcript.session.createdAt.slice(0, 16)}
              </span>
            </div>

            {/* Error Transkrip jika ada */}
            {error && (
              <div className="px-4 py-1.5 bg-red-50 text-red-600 text-xs">
                {error}
              </div>
            )}

            {/* Isi Pesan */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-[#FDFCF8]/30">
              {loadingTranscript ? (
                <div className="flex justify-center items-center h-40">
                  <div className="w-5 h-5 border-2 border-[#528C46] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : transcript.messages.length === 0 ? (
                <div className="text-center py-12 text-xs text-gray-400">
                  Tidak ada pesan dalam sesi ini
                </div>
              ) : (
                transcript.messages.map((msg) => {
                  const isUser = msg.sender === 'user';

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2 max-w-[85%] ${
                        isUser ? 'ml-auto flex-row-reverse' : ''
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-auto text-white text-[12px] ${
                          isUser ? 'bg-[#0A110B]' : 'bg-[#528C46]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {isUser ? 'person' : 'smart_toy'}
                        </span>
                      </div>

                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                          isUser
                            ? 'bg-[#528C46] text-white rounded-br-none'
                            : 'bg-white text-[#0A110B] border border-[#C6E67D]/30 rounded-bl-none'
                        }`}
                      >
                        {/* Lampiran Gambar atau File jika ada */}
                        {(msg.attachmentUrl || msg.attachmentName) && (
                          <div className="mb-2">
                            {msg.attachmentType === 'image' || msg.attachmentUrl?.match(/\.(png|jpe?g|webp)$/i) ? (
                              <div className="overflow-hidden rounded-xl border border-white/20 bg-black/5">
                                <img
                                  src={getAttachmentFullUrl(msg.attachmentUrl)}
                                  alt={msg.attachmentName || 'Lampiran Siswa'}
                                  className="max-h-36 max-w-full object-cover rounded-xl"
                                />
                              </div>
                            ) : (
                              <div
                                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-mono border ${
                                  isUser
                                    ? 'bg-white/15 border-white/25 text-white'
                                    : 'bg-[#FDFCF8] border-[#C6E67D]/40 text-[#528C46]'
                                }`}
                              >
                                <span className="material-symbols-outlined text-[14px]">
                                  description
                                </span>
                                <span className="truncate max-w-[180px]">
                                  {msg.attachmentName || 'data.csv'}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {isUser ? (
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                        ) : (
                          <div className="prose prose-xs max-w-none text-[#0A110B]">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          </div>
                        )}
                        {msg.createdAt && (
                          <span
                            className={`block text-[9px] mt-1 text-right ${
                              isUser ? 'text-white/70' : 'text-gray-400'
                            }`}
                          >
                            {msg.createdAt.slice(11, 16)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
            <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">
              chat_bubble_outline
            </span>
            <p className="text-xs">
              Pilih siswa dan modul di panel kiri untuk melihat transkrip percakapan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
