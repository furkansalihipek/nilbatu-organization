import { NextRequest, NextResponse } from 'next/server';
import { stat, open } from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'gallery');

// Video MIME type belirleme
function getVideoMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.ogg': 'video/ogg',
    '.mov': 'video/mp4', // QuickTime → mp4 olarak sun
    '.avi': 'video/x-msvideo',
    '.mkv': 'video/x-matroska',
    '.m4v': 'video/mp4',
  };
  return mimeTypes[ext] || 'video/mp4';
}

// GET - Video dosyasını stream et (Range request desteği)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const filePath = path.join(UPLOAD_DIR, filename);

    // Güvenlik: path traversal koruması
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(path.resolve(UPLOAD_DIR))) {
      return NextResponse.json(
        { error: 'Geçersiz dosya yolu' },
        { status: 403 }
      );
    }

    // Dosya bilgilerini al
    let fileStat;
    try {
      fileStat = await stat(filePath);
    } catch {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 404 }
      );
    }

    const fileSize = fileStat.size;
    const mimeType = getVideoMimeType(filename);
    const rangeHeader = request.headers.get('range');

    if (rangeHeader) {
      // Range request - video seeking desteği
      const parts = rangeHeader.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      const fileHandle = await open(filePath, 'r');
      const buffer = Buffer.alloc(chunkSize);
      await fileHandle.read(buffer, 0, chunkSize, start);
      await fileHandle.close();

      return new NextResponse(buffer, {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize.toString(),
          'Content-Type': mimeType,
          'Cache-Control': 'public, max-age=31536000',
        },
      });
    } else {
      // Normal request - tüm dosyayı gönder
      const fileHandle = await open(filePath, 'r');
      const buffer = Buffer.alloc(fileSize);
      await fileHandle.read(buffer, 0, fileSize, 0);
      await fileHandle.close();

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Accept-Ranges': 'bytes',
          'Content-Length': fileSize.toString(),
          'Content-Type': mimeType,
          'Cache-Control': 'public, max-age=31536000',
        },
      });
    }
  } catch (error) {
    console.error('Video stream hatası:', error);
    return NextResponse.json(
      { error: 'Video yüklenemedi' },
      { status: 500 }
    );
  }
}
