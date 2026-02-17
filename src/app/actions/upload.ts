'use server';

import { put } from '@vercel/blob';
import { cookies } from 'next/headers';

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

    // Dosya adı oluştur
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').substring(0, 50);
    const blobPath = `gallery/${timestamp}_${safeName}`;

    // Vercel Blob'a yükle
    const blob = await put(blobPath, file, {
      access: 'public',
      contentType: file.type,
    });

    console.log(`[UPLOAD] Başarılı: ${blob.url} (${isVideo ? 'VIDEO' : 'IMAGE'}, ${file.size} bytes)`);

    return {
      success: true,
      data: {
        url: blob.url,
        fileName: safeName,
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
