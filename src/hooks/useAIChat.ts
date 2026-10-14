import { useState, useEffect, useCallback, useRef } from 'react';
import {
  chatApi,
  type ChatMessageItem,
  type ChatAttachmentPayload,
} from '../services/chatApi';

interface UseAIChatOptions {
  moduleKey: string;
  initialMessages?: ChatMessageItem[];
  isOpen?: boolean;
}

export interface ActiveAttachment {
  file: File;
  previewUrl: string;
  fileType: 'image' | 'text';
  fileName: string;
  serverUrl?: string;
  textSnippet?: string;
  dataUrl?: string;
}

export function useAIChat({ moduleKey, initialMessages = [], isOpen = false }: UseAIChatOptions) {
  const [messages, setMessages] = useState<ChatMessageItem[]>(initialMessages);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [attachment, setAttachment] = useState<ActiveAttachment | null>(null);
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

  // Handler memilih file attachment (dengan validasi ekstensi klien)
  const selectFile = useCallback(
    async (file: File) => {
      setError(null);
      const name = file.name.toLowerCase();
      const isImg =
        name.endsWith('.png') ||
        name.endsWith('.jpg') ||
        name.endsWith('.jpeg') ||
        name.endsWith('.webp') ||
        file.type.startsWith('image/');
      const isTxt =
        name.endsWith('.csv') ||
        name.endsWith('.txt') ||
        file.type === 'text/csv' ||
        file.type === 'text/plain';

      if (!isImg && !isTxt) {
        setError('Format tidak didukung. Pilih gambar (PNG/JPG) atau data (CSV/TXT).');
        return;
      }

      if (isImg && file.size > 3 * 1024 * 1024) {
        setError('Ukuran gambar maksimal 3 MB.');
        return;
      }
      if (isTxt && file.size > 300 * 1024) {
        setError('Ukuran file data maksimal 300 KB.');
        return;
      }

      try {
        setIsUploading(true);

        // Buat preview lokal
        let previewUrl = '';
        let dataUrl: string | undefined = undefined;

        if (isImg) {
          previewUrl = URL.createObjectURL(file);

          // Baca data URL untuk vision payload
          const reader = new FileReader();
          dataUrl = await new Promise<string>((resolve) => {
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
        } else {
          previewUrl = '';
        }

        // Upload ke backend
        const uploaded = await chatApi.uploadFile(file, token);

        setAttachment({
          file,
          previewUrl: previewUrl || uploaded.fileUrl,
          fileType: uploaded.fileType,
          fileName: uploaded.fileName,
          serverUrl: uploaded.fileUrl,
          textSnippet: uploaded.textSnippet,
          dataUrl,
        });
      } catch (err) {
        console.error('Upload error:', err);
        setError(err instanceof Error ? err.message : 'Gagal mengunggah file.');
      } finally {
        setIsUploading(false);
      }
    },
    [token]
  );

  const removeAttachment = useCallback(() => {
    if (attachment?.previewUrl && attachment.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(attachment.previewUrl);
    }
    setAttachment(null);
  }, [attachment]);

  // Kirim pesan baru dengan streaming SSE (dan lampiran jika ada)
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      const currentAttachment = attachment;

      // Harus ada teks atau attachment
      if ((!trimmed && !currentAttachment) || isTyping || isUploading) return;

      const userMsgId = `user-${Date.now()}`;
      const aiMsgId = `ai-${Date.now() + 1}`;

      const userMessage: ChatMessageItem = {
        id: userMsgId,
        sender: 'user',
        text: trimmed || (currentAttachment?.fileType === 'image' ? 'Tolong jelaskan gambar ini' : 'Tolong amati data ini'),
        attachmentUrl: currentAttachment?.serverUrl || currentAttachment?.previewUrl,
        attachmentType: currentAttachment?.fileType,
        attachmentName: currentAttachment?.fileName,
      };

      const emptyAiMessage: ChatMessageItem = {
        id: aiMsgId,
        sender: 'ai',
        text: '',
      };

      // Optimistic update
      setMessages((prev) => [...prev, userMessage, emptyAiMessage]);
      setAttachment(null); // Clear attachment selection
      setIsTyping(true);
      setError(null);

      const attachmentPayload: ChatAttachmentPayload | undefined = currentAttachment
        ? {
            url: currentAttachment.serverUrl,
            type: currentAttachment.fileType,
            name: currentAttachment.fileName,
            textSnippet: currentAttachment.textSnippet,
            dataUrl: currentAttachment.dataUrl,
          }
        : undefined;

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
        },
        attachmentPayload
      );
    },
    [attachment, isTyping, isUploading, moduleKey, token]
  );

  // Soft-delete riwayat percakapan (arsipkan di DB & reset tampilan)
  const clearHistory = useCallback(async () => {
    try {
      setError(null);
      if (token) {
        await chatApi.archiveHistory(moduleKey, token);
      }
      setMessages(initialMessages);
      setAttachment(null);
    } catch (err) {
      console.error('Gagal mengarsipkan chat:', err);
      setError(err instanceof Error ? err.message : 'Gagal mereset chat');
      setMessages(initialMessages);
    }
  }, [moduleKey, token, initialMessages]);

  return {
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
  };
}
