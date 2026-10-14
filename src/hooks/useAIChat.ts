import { useState, useEffect, useCallback, useRef } from 'react';
import { chatApi, type ChatMessageItem } from '../services/chatApi';

interface UseAIChatOptions {
  moduleKey: string;
  initialMessages?: ChatMessageItem[];
  isOpen?: boolean;
}

export function useAIChat({ moduleKey, initialMessages = [], isOpen = false }: UseAIChatOptions) {
  const [messages, setMessages] = useState<ChatMessageItem[]>(initialMessages);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialLoadedRef = useRef(false);
  const token = localStorage.getItem('token') || '';

  // Muat riwayat dari database saat modal dibuka untuk pertama kali
  useEffect(() => {
    if (!isOpen || initialLoadedRef.current || !token) return;

    let isMounted = true;
    setIsLoadingHistory(true);
    setError(null);

    chatApi
      .getHistory(moduleKey, token)
      .then((history) => {
        if (!isMounted) return;
        if (history.length > 0) {
          setMessages(history);
        } else {
          setMessages(initialMessages);
        }
        initialLoadedRef.current = true;
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn('Gagal memuat riwayat chat dari server:', err);
        // Fallback tetap gunakan initialMessages
        setMessages(initialMessages);
        initialLoadedRef.current = true;
      })
      .finally(() => {
        if (isMounted) setIsLoadingHistory(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, moduleKey, token, initialMessages]);

  // Kirim pesan baru dengan streaming SSE
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsgId = `user-${Date.now()}`;
      const aiMsgId = `ai-${Date.now() + 1}`;

      const userMessage: ChatMessageItem = {
        id: userMsgId,
        sender: 'user',
        text: trimmed,
      };

      const emptyAiMessage: ChatMessageItem = {
        id: aiMsgId,
        sender: 'ai',
        text: '',
      };

      // Optimistic update
      setMessages((prev) => [...prev, userMessage, emptyAiMessage]);
      setIsTyping(true);
      setError(null);

      await chatApi.streamChatMessage(
        moduleKey,
        trimmed,
        token,
        // onChunk: Tambahkan potongan teks ke bubble AI secara real-time
        (chunk) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMsgId ? { ...msg, text: msg.text + chunk } : msg
            )
          );
        },
        // onDone: Selesai streaming
        () => {
          setIsTyping(false);
        },
        // onError: Gagal streaming
        (err) => {
          console.error('Chat stream error:', err);
          const errMsg = err.message || 'Gagal menerima balasan AI';
          setError(errMsg);
          setIsTyping(false);

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMsgId && !msg.text
                ? {
                    ...msg,
                    text: `⚠️ Maaf, terjadi gangguan koneksi ke AI: ${errMsg}. Silakan coba lagi.`,
                  }
                : msg
            )
          );
        }
      );
    },
    [isTyping, moduleKey, token]
  );

  // Soft-delete riwayat percakapan (arsipkan di DB & reset tampilan)
  const clearHistory = useCallback(async () => {
    try {
      setError(null);
      if (token) {
        await chatApi.archiveHistory(moduleKey, token);
      }
      setMessages(initialMessages);
    } catch (err) {
      console.error('Gagal mengarsipkan chat:', err);
      setError(err instanceof Error ? err.message : 'Gagal mereset chat');
      // Reset tampilan lokal tetap dijalankan untuk kenyamanan user
      setMessages(initialMessages);
    }
  }, [moduleKey, token, initialMessages]);

  return {
    messages,
    isLoadingHistory,
    isTyping,
    error,
    sendMessage,
    clearHistory,
    setError,
  };
}
