import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export interface UploadResult {
  fileName: string;
  fileUrl: string;
  fileType: 'image' | 'text';
  textSnippet?: string;
}

const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads', 'chat');

// Pastikan direktori uploads/chat ada saat startup
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const ALLOWED_IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const ALLOWED_TEXT_EXTS = new Set(['.csv', '.txt']);

const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3 MB
const MAX_TEXT_SIZE = 300 * 1024; // 300 KB

export const fileStorageService = {
  /**
   * Validasi dan simpan file yang diunggah ke storage lokal server.
   */
  async saveUploadedFile(file: File): Promise<UploadResult> {
    const originalName = file.name || 'file';
    const ext = path.extname(originalName).toLowerCase();
    const mimeType = file.type;

    const isImage =
      ALLOWED_IMAGE_EXTS.has(ext) || mimeType.startsWith('image/');
    const isText =
      ALLOWED_TEXT_EXTS.has(ext) ||
      mimeType === 'text/csv' ||
      mimeType === 'text/plain';

    if (!isImage && !isText) {
      throw new Error(
        'Format tidak didukung. Hanya gambar (JPG/PNG/WEBP) dan data (CSV/TXT) yang diperbolehkan.'
      );
    }

    const fileSize = file.size;
    if (isImage && fileSize > MAX_IMAGE_SIZE) {
      throw new Error('Ukuran gambar melebihi batas maksimal 3 MB.');
    }
    if (isText && fileSize > MAX_TEXT_SIZE) {
      throw new Error('Ukuran file data melebihi batas maksimal 300 KB.');
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate nama file unik agar tidak bertabrakan
    const safeExt = ext || (isImage ? '.jpg' : '.txt');
    const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${safeExt}`;
    const destinationPath = path.join(UPLOADS_DIR, uniqueName);

    fs.writeFileSync(destinationPath, buffer);

    const fileUrl = `/uploads/chat/${uniqueName}`;

    let textSnippet: string | undefined = undefined;
    if (isText) {
      // Baca teks dan batasi maksimal 200 baris agar tidak membebani token LLM
      const fullText = buffer.toString('utf-8');
      const lines = fullText.split('\n');
      textSnippet = lines.slice(0, 200).join('\n');
      if (lines.length > 200) {
        textSnippet += `\n... (Dibatasi pada 200 baris pertama dari ${lines.length} baris)`;
      }
    }

    return {
      fileName: originalName,
      fileUrl,
      fileType: isImage ? 'image' : 'text',
      textSnippet,
    };
  },
};
