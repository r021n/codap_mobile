import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAIChat } from '../hooks/useAIChat';
import { getAttachmentFullUrl, type ChatMessageItem } from '../services/chatApi';

// Re-export interface for backward compatibility
export type ChatMessage = ChatMessageItem;

export const DEFAULT_SUGGESTIONS: Record<string, string[]> = {
  literacy: [
    'Apa itu kualitas udara dan ISPU?',
    'Mengapa partikel PM2.5 sangat berbahaya?',
    'Apa perbedaan polutan primer dan sekunder?',
  ],
  literacy2: [
    'Apa dampak jangka panjang polutan udara?',
    'Siapa saja kelompok yang paling rentan?',
    'Bagaimana polusi mempengaruhi fungsi paru?',
  ],
  literacy3: [
    'Bagaimana strategi mengurangi emisi kendaraan?',
    'Apa solusi rekayasa lingkungan untuk polusi?',
    'Bagaimana peran vegetasi menyerap polutan?',
  ],
  literacy5: [
    'Bagaimana cara menarik kesimpulan dari data sains?',
    'Apa rekomendasi aksi mitigasi udara bersih?',
  ],
  investigation: [
    'Bagaimana merumuskan rumusan masalah yang baik?',
    'Bagaimana menentukan variabel bebas dan terikat?',
    'Apa hipotesis yang tepat untuk eksperimen ini?',
  ],
  analysis: [
    'Bagaimana cara membaca grafik CODAP ini?',
    'Mengapa ada lonjakan polutan di jam sibuk?',
    'Bagaimana korelasi antara suhu dan PM2.5?',
  ],
};

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  storageKey?: string;
  moduleKey?: string;
  suggestions?: string[];
}

const AIChatModal: React.FC<AIChatModalProps> = ({
  isOpen,
  onClose,
  messages: initialMessages,
  storageKey,
  moduleKey,
  suggestions: customSuggestions,
}) => {
  const resolvedModuleKey =
    moduleKey ||
    (storageKey ? storageKey.replace(/^chat_history_/, '') : 'general');

  const {
    messages,
    isLoadingHistory,
    isTyping,
    isUploading,
    attachment,
    selectFile,
    removeAttachment,
    error,
    sendMessage,
    clearHistory,
    setError,
  } = useAIChat({
    moduleKey: resolvedModuleKey,
    initialMessages,
    isOpen,
  });

  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Suggestions yang aktif untuk modul saat ini
  const resolvedSuggestions =
    customSuggestions ||
    DEFAULT_SUGGESTIONS[resolvedModuleKey] ||
    DEFAULT_SUGGESTIONS['analysis'];

  // Auto scroll to bottom saat pesan bertambah atau saat sedang streaming
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = useCallback(() => {
    if ((!inputValue.trim() && !attachment) || isTyping || isUploading) return;
    const textToSend = inputValue;
    setInputValue('');
    void sendMessage(textToSend);
  }, [inputValue, attachment, isTyping, isUploading, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void selectFile(file);
    }
    // Reset file input agar bisa memilih file yang sama lagi jika perlu
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSuggestionClick = (promptText: string) => {
    if (isTyping || isUploading) return;
    void sendMessage(promptText);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-end justify-end pointer-events-none font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0A110B]/20 backdrop-blur-[2px] pointer-events-auto transition-opacity"
        onClick={onClose}
      />

      {/* Side Drawer for Landscape */}
      <div className="w-3/5 max-w-xl h-full bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.12)] border-l border-[#C6E67D]/40 flex flex-col overflow-hidden animate-slide-right pointer-events-auto relative z-10">
        {/* Minimalist Header */}
        <div className="px-5 py-3.5 flex justify-between items-center shrink-0 border-b border-[#C6E67D]/20 bg-[#FDFCF8]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#528C46] rounded-xl flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px] text-white">
                smart_toy
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0A110B] leading-none">
                Tanya AI
              </h3>
              <span className="text-[10px] text-[#528C46] font-semibold leading-none capitalize">
                {resolvedModuleKey}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => void clearHistory()}
              title="Reset Percakapan"
              className="w-8 h-8 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                delete_sweep
              </span>
            </button>
            <button
              onClick={onClose}
              title="Tutup"
              className="w-8 h-8 rounded-lg text-gray-400 hover:text-[#0A110B] hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>
        </div>

        {/* Minimal Error Notice */}
        {error && (
          <div className="px-4 py-1.5 bg-red-50 border-b border-red-100 flex items-center justify-between text-[11px] text-red-600">
            <span className="truncate">{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-600 text-xs ml-2"
            >
              ×
            </button>
          </div>
        )}

        {/* Chat Messages Body */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-[#FDFCF8]/40"
        >
          {isLoadingHistory && messages.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <div className="w-5 h-5 border-2 border-[#528C46] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const hasAttachment = Boolean(msg.attachmentUrl || msg.attachmentName);
              const isImageAttachment =
                msg.attachmentType === 'image' ||
                Boolean(msg.attachmentUrl?.match(/\.(png|jpe?g|webp)$/i));

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 max-w-[88%] ${
                    isUser ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-auto text-white text-[13px] ${
                      isUser ? 'bg-[#0A110B]' : 'bg-[#528C46]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
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
                    {/* Render Lampiran jika ada */}
                    {hasAttachment && (
                      <div className="mb-2">
                        {isImageAttachment && msg.attachmentUrl ? (
                          <div className="overflow-hidden rounded-xl border border-white/20 bg-black/5">
                            <img
                              src={getAttachmentFullUrl(msg.attachmentUrl)}
                              alt={msg.attachmentName || 'Lampiran Gambar'}
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
                    ) : msg.text ? (
                      <div className="prose prose-xs max-w-none text-[#0A110B]">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="mb-1.5 last:mb-0">{children}</p>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc ml-3.5 mb-1.5 space-y-0.5">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal ml-3.5 mb-1.5 space-y-0.5">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => <li>{children}</li>,
                            strong: ({ children }) => (
                              <strong className="font-bold text-[#528C46]">
                                {children}
                              </strong>
                            ),
                            code: ({ children }) => (
                              <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-[10px] font-mono">
                                {children}
                              </code>
                            ),
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      /* Indikator Streaming Typing Pertama Kali */
                      <div className="flex items-center gap-1 py-1 px-1">
                        <span className="w-1.5 h-1.5 bg-[#528C46] rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-[#528C46] rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-[#528C46] rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Area: Suggestions + Attachment Preview + Input Bar */}
        <div className="p-2.5 bg-white border-t border-[#C6E67D]/20 shrink-0 space-y-2">
          {/* Saran Prompt Minimalis (Scroll Horizontal) */}
          <div className="flex gap-1.5 overflow-x-auto py-0.5 custom-scrollbar-x no-scrollbar">
            {resolvedSuggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(sug)}
                disabled={isTyping || isUploading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#FDFCF8] border border-[#C6E67D]/40 text-[#528C46] hover:bg-[#528C46] hover:text-white transition-colors disabled:opacity-40 shrink-0"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Attachment Preview Chip */}
          {attachment && (
            <div className="flex items-center gap-2 p-1.5 px-2 bg-[#FDFCF8] border border-[#C6E67D]/40 rounded-xl text-xs">
              {attachment.fileType === 'image' ? (
                <img
                  src={attachment.previewUrl}
                  alt="preview"
                  className="w-6 h-6 object-cover rounded-md border border-gray-200"
                />
              ) : (
                <span className="material-symbols-outlined text-[16px] text-[#528C46]">
                  description
                </span>
              )}
              <span className="text-[10px] font-medium text-[#0A110B] truncate max-w-[200px]">
                {attachment.fileName}
              </span>
              {isUploading ? (
                <span className="text-[9px] text-[#528C46] animate-pulse ml-auto">
                  Mengunggah...
                </span>
              ) : (
                <button
                  type="button"
                  onClick={removeAttachment}
                  className="ml-auto w-5 h-5 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500"
                >
                  <span className="material-symbols-outlined text-[13px]">
                    close
                  </span>
                </button>
              )}
            </div>
          )}

          {/* Input Bar */}
          <div className="flex items-center gap-1.5 bg-[#FDFCF8] border border-[#C6E67D]/40 rounded-xl px-2.5 py-1 focus-within:border-[#528C46] transition-colors">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png,image/jpeg,image/webp,.csv,.txt"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Tombol Lampiran (Upload) */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isTyping || isUploading}
              title="Unggah Gambar (JPG/PNG) atau Data (CSV/TXT)"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-[#528C46] hover:bg-gray-100 transition-colors disabled:opacity-40 shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">
                attach_file
              </span>
            </button>

            {/* Kolom Teks Input */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isUploading
                  ? 'Sedang memproses file...'
                  : isTyping
                  ? 'AI sedang merespons...'
                  : attachment
                  ? 'Ketik pertanyaan tentang file ini...'
                  : 'Tanya sesuatu...'
              }
              className="flex-1 bg-transparent border-none outline-none text-xs text-[#0A110B] placeholder:text-gray-400 py-1"
              disabled={isTyping || isUploading}
            />

            {/* Tombol Kirim */}
            <button
              onClick={handleSend}
              disabled={(!inputValue.trim() && !attachment) || isTyping || isUploading}
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-white transition-all shrink-0 ${
                (!inputValue.trim() && !attachment) || isTyping || isUploading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#528C46] hover:bg-[#3d6934] active:scale-95'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                arrow_upward
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatModal;
