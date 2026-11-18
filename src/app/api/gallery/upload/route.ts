import { NextRequest, NextResponse } from 'next/server';
import { hasAdminSession } from '@/lib/admin-session';
import { saveMediaFile } from '@/lib/media-storage';
import { createCloudinaryUpload, getCloudinaryConfig } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  if (!hasAdminSession(request)) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  if (process.env.GALLERY_READ_ONLY === 'true') {
    return NextResponse.json({ error: 'Yayındaki fotoğraflar dağıtım ile güncellenir' }, { status: 403 });
  }

  try {
    return NextResponse.json({ upload: createCloudinaryUpload() }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json({ error: 'Medya depolama ayarları eksik' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!hasAdminSession(request)) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    if (process.env.GALLERY_READ_ONLY === 'true') {
      return NextResponse.json({ success: false, error: 'Yayındaki fotoğraflar dağıtım ile güncellenir' }, { status: 403 });
    }

    if (getCloudinaryConfig()) {
      return NextResponse.json(
        { success: false, error: 'Dosyayı doğrudan Cloudinary’ye yükleyin' },
        { status: 409 }
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

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'Yalnızca fotoğraf yüklenebilir' }, { status: 415 });
    }

    const saved = await saveMediaFile(file);

    return NextResponse.json({
      success: true,
      data: {
        url: saved.url,
        fileName: saved.filename,
        size: saved.size,
        type: saved.type,
        isVideo: saved.isVideo,
      },
    });
  } catch (error) {
    console.error('Upload genel hatası:', error);
    return NextResponse.json(
      {
        success: false,
        error: `Dosya yüklenemedi: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
      },
      { status: 500 }
    );
  }
}
