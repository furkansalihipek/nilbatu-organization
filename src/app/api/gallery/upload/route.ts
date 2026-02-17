import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// POST - Görsel/Video yükle (Vercel Blob'a)
export async function POST(request: NextRequest) {
  try {
    // Authentication kontrolü
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    let formData;
    try {
      formData = await request.formData();
    } catch (err) {
      console.error('FormData parse hatası:', err);
      return NextResponse.json(
        { success: false, error: 'Dosya verisi okunamadı. Dosya çok büyük olabilir.' },
        { status: 413 }
      );
    }

    const file = formData.get('file') as File | null;

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'Dosya bulunamadı veya geçersiz dosya' },
        { status: 400 }
      );
    }

    console.log(`Upload başladı: ${file.name}, Boyut: ${(file.size / 1024 / 1024).toFixed(2)}MB, Tip: ${file.type}`);

    // Dosya tipi kontrolü (görsel veya video)
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      return NextResponse.json(
        { success: false, error: `Desteklenmeyen dosya tipi: ${file.type}. Sadece görsel veya video yüklenebilir.` },
        { status: 400 }
      );
    }

    // Dosya boyutu kontrolü (görsel: max 10MB, video: max 100MB)
    const maxSize = isImage ? 10 * 1024 * 1024 : 100 * 1024 * 1024;
    const maxLabel = isImage ? '10MB' : '100MB';
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: `Dosya boyutu (${(file.size / 1024 / 1024).toFixed(1)}MB) ${maxLabel} limitini aşıyor` },
        { status: 400 }
      );
    }

    // Dosya adını oluştur
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').substring(0, 50);
    const blobPath = `gallery/${timestamp}_${safeName}`;

    // Vercel Blob'a yükle
    const blob = await put(blobPath, file, {
      access: 'public',
      contentType: file.type,
    });

    console.log(`Upload başarılı: ${blob.url} (${isVideo ? 'VIDEO' : 'IMAGE'})`);

    return NextResponse.json({
      success: true,
      data: {
        url: blob.url,
        fileName: safeName,
        size: file.size,
        type: file.type,
        isVideo: isVideo,
      },
    });
  } catch (error) {
    console.error('Upload genel hatası:', error);
    return NextResponse.json(
      { success: false, error: `Dosya yüklenemedi: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}` },
      { status: 500 }
    );
  }
}
