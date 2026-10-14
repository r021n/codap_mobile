import fs from 'node:fs';
import path from 'node:path';
import type { AIMessage, ContentPart } from './ai.service.js';

export interface ChatAttachmentInput {
  url?: string;
  type?: 'image' | 'text';
  name?: string;
  textSnippet?: string;
  dataUrl?: string; // Optional client-sent base64 data URL
}

export const promptBuilderService = {
  /**
   * Mengubah pesan teks dan lampiran menjadi format yang kompatibel dengan OpenRouter Vision atau Prompt CSV.
   */
  buildUserMessage(content: string, attachment?: ChatAttachmentInput): AIMessage {
    if (!attachment || !attachment.type) {
      return { role: 'user', content };
    }

    // 1. Kategori Gambar (Multimodal Vision)
    if (attachment.type === 'image') {
      let imageUrl = attachment.dataUrl || attachment.url || '';

      // Jika URL adalah path lokal /uploads/..., baca file lokal menjadi Base64 Data URL
      // agar OpenRouter selalu dapat membaca gambar tanpa terhalang firewall/private IP.
      if (attachment.url?.startsWith('/uploads/chat/')) {
        try {
          const localPath = path.resolve(
            process.cwd(),
            attachment.url.replace(/^\//, '')
          );
          if (fs.existsSync(localPath)) {
            const ext = path.extname(localPath).toLowerCase().replace('.', '');
            const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
            const base64Data = fs.readFileSync(localPath).toString('base64');
            imageUrl = `data:${mime};base64,${base64Data}`;
          }
        } catch (readErr) {
          console.warn('Gagal membaca gambar lokal untuk base64 OpenRouter:', readErr);
        }
      }

      const parts: ContentPart[] = [];
      if (content.trim()) {
        parts.push({ type: 'text', text: content.trim() });
      } else {
        parts.push({ type: 'text', text: 'Tolong amati dan jelaskan gambar/grafik ini.' });
      }

      if (imageUrl) {
        parts.push({
          type: 'image_url',
          image_url: { url: imageUrl },
        });
      }

      return {
        role: 'user',
        content: parts,
      };
    }

    // 2. Kategori Data Teks / CSV
    if (attachment.type === 'text') {
      const fileName = attachment.name || 'data.csv';
      const snippet = attachment.textSnippet || '';

      const enrichedPrompt = `[Lampiran File Data: ${fileName}]\n\`\`\`csv\n${snippet}\n\`\`\`\n\nPertanyaan Siswa: ${content.trim()}`;

      return {
        role: 'user',
        content: enrichedPrompt,
      };
    }

    return { role: 'user', content };
  },
};
