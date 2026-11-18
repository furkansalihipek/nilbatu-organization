import { NextRequest, NextResponse } from 'next/server';
import { open } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { getContentType, getMediaFilePath } from '@/lib/media-storage';

function parseByteRange(header: string, size: number) {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(header);
  if (!match || (!match[1] && !match[2]) || size === 0) return null;

  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (start >= size || start > end) return null;

  return { start, end };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const contentType = getContentType(filename);
  if (contentType.startsWith('video/')) {
    return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 404 });
  }
  const filepath = getMediaFilePath(filename);
  if (!filepath) {
    return NextResponse.json({ error: 'Geçersiz dosya' }, { status: 400 });
  }

  try {
    const file = await open(filepath, 'r');
    try {
      const { size } = await file.stat();
      const headers = new Headers({
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000, immutable',
      });

      const range = request.headers.get('range');
      if (range) {
        const bytes = parseByteRange(range, size);
        if (!bytes) {
          await file.close();
          return new NextResponse(null, {
            status: 416,
            headers: { 'Content-Range': `bytes */${size}`, 'Accept-Ranges': 'bytes' },
          });
        }

        const { start, end } = bytes;
        headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
        headers.set('Content-Length', String(end - start + 1));
        const body = Readable.toWeb(file.createReadStream({ start, end })) as ReadableStream<Uint8Array>;
        return new NextResponse(body, { status: 206, headers });
      }

      headers.set('Content-Length', String(size));
      const body = Readable.toWeb(file.createReadStream()) as ReadableStream<Uint8Array>;
      return new NextResponse(body, { headers });
    } catch (error) {
      await file.close();
      throw error;
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 404 });
    }
    console.error('Medya okuma hatası:', error);
    return NextResponse.json({ error: 'Dosya okunamadı' }, { status: 500 });
  }
}
