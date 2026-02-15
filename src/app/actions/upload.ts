'use server';

import { createWriteStream, existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import path from 'path';
import { Readable } from 'stream';
import { cookies } from 'next/headers';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'gallery');

async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export async function uploadMediaAction(formData: FormData): Promise<{
  success: boolean;
  data?: {
    url: string;
    fileName: string;
    isVideo: boolean;
    size: number;
    type: string;
  };
  error?: string;
}> {
  try {
    // Auth kontrolü
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      return { success: false, error: 'Yetkisiz erişim' };
    }

    const file = formData.get('file') as File | null;
    if (!file || !(file instanceof File) || file.size === 0) {
      return { success: false, error: 'Dosya bulunamadı veya boş dosya' };
    }

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      return { success: false, error: `Desteklenmeyen dosya tipi: ${file.type}. Sadece görsel ve video dosyaları kabul edilir.` };
    }

    // Boyut kontrolü
    const maxSize = isImage ? 10 * 1024 * 1024 : 200 * 1024 * 1024;
    const maxLabel = isImage ? '10MB' : '200MB';
    if (file.size > maxSize) {
      return { success: false, error: `Dosya boyutu (${(file.size / 1024 / 1024).toFixed(1)}MB) ${maxLabel} limitini aşıyor.` };
    }

    console.log(`[UPLOAD] Başlıyor: ${file.name}, ${(file.size / 1024 / 1024).toFixed(2)}MB, ${file.type}`);

    await ensureUploadDir();

    // Dosya adı oluştur
    const timestamp = Date.now();
    const ext = path.extname(file.name).toLowerCase() || (isVideo ? '.mp4' : '.jpg');
    const baseName = path.basename(file.name, path.extname(file.name))
      .replace(/[^a-zA-Z0-9]/g, '_')
      .substring(0, 50);
    const fileName = `${timestamp}_${baseName}${ext}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Dosyayı Buffer olarak oku ve diske yaz
    const arrayBuffer = await file.arrayBuffer();
    const nodeBuffer = Buffer.from(arrayBuffer);

    await new Promise<void>((resolve, reject) => {
      const writeStream = createWriteStream(filePath);
      const readable = new Readable();
      readable.push(nodeBuffer);
      readable.push(null);

      readable.pipe(writeStream);
      writeStream.on('finish', () => resolve());
      writeStream.on('error', (err) => reject(err));
    });

    // Dosyanın kaydedildiğini doğrula
    if (!existsSync(filePath)) {
      return { success: false, error: 'Dosya kaydedildi ancak doğrulanamadı.' };
    }

    const publicUrl = `/gallery/${fileName}`;
    console.log(`[UPLOAD] Başarılı: ${publicUrl} (${isVideo ? 'VIDEO' : 'IMAGE'}, ${nodeBuffer.length} bytes)`);

    return {
      success: true,
      data: {
        url: publicUrl,
        fileName,
        isVideo,
        size: file.size,
        type: file.type,
      },
    };
  } catch (error) {
    console.error('[UPLOAD] Hata:', error);
    return {
      success: false,
      error: `Dosya yüklenemedi: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
    };
  }
}
