import { NextRequest, NextResponse } from 'next/server';
import { createWriteStream, existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import path from 'path';
import { Readable } from 'stream';

// Görselleri ve videoları public/gallery klasörüne kaydet
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'gallery');

async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// POST - Görsel/Video yükle (streaming ile büyük dosya desteği)
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

    // Dosya bilgilerini logla
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

    await ensureUploadDir();

    // Dosya adını oluştur (timestamp + temiz isim)
    const timestamp = Date.now();
    const ext = path.extname(file.name).toLowerCase() || (isVideo ? '.mp4' : '.jpg');
    const baseName = path.basename(file.name, path.extname(file.name)).replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
    const fileName = `${timestamp}_${baseName}${ext}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Dosyayı streaming ile diske yaz (bellek dostu)
    try {
      const arrayBuffer = await file.arrayBuffer();
      const nodeBuffer = Buffer.from(arrayBuffer);
      
      await new Promise<void>((resolve, reject) => {
        const writeStream = createWriteStream(filePath);
        const readable = new Readable();
        readable.push(nodeBuffer);
        readable.push(null);
        
        readable.pipe(writeStream);
        writeStream.on('finish', () => {
          console.log(`Dosya yazıldı: ${filePath} (${nodeBuffer.length} bytes)`);
          resolve();
        });
        writeStream.on('error', (err) => {
          console.error('Dosya yazma hatası:', err);
          reject(err);
        });
      });
    } catch (err) {
      console.error('Dosya kaydetme hatası:', err);
      return NextResponse.json(
        { success: false, error: 'Dosya diske kaydedilemedi' },
        { status: 500 }
      );
    }

    // Dosyanın gerçekten yazıldığını doğrula
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { success: false, error: 'Dosya kaydedildi ancak doğrulanamadı' },
        { status: 500 }
      );
    }

    const publicUrl = `/gallery/${fileName}`;
    
    console.log(`Upload başarılı: ${publicUrl} (${isVideo ? 'VIDEO' : 'IMAGE'})`);

    return NextResponse.json({
      success: true,
      data: {
        url: publicUrl,
        fileName: fileName,
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
