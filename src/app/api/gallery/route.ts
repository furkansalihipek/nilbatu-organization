import { NextRequest, NextResponse } from 'next/server';
import { hasAdminSession } from '@/lib/admin-session';
import { readGalleryData, writeGalleryData } from '@/lib/gallery-store';
import type { GalleryItem } from '@/lib/gallery-store';
import { isVideoUrl } from '@/lib/instagram';

// GET - Tüm galeri öğelerini getir
export async function GET() {
  try {
    const items = await readGalleryData();
    return NextResponse.json({ success: true, readOnly: process.env.GALLERY_READ_ONLY === 'true', data: items.filter(item => item.type !== 'video' && !isVideoUrl(item.image)) });
  } catch (error) {
    console.error('Galeri verileri getirilemedi:', error);
    return NextResponse.json(
      { success: false, error: 'Galeri verileri getirilemedi' },
      { status: 500 }
    );
  }
}

// POST - Yeni galeri öğesi ekle
export async function POST(request: NextRequest) {
  try {
    // Authentication kontrolü
    if (!hasAdminSession(request)) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    if (process.env.GALLERY_READ_ONLY === 'true') {
      return NextResponse.json({ success: false, error: 'Yayındaki fotoğraflar dağıtım ile güncellenir' }, { status: 403 });
    }

    const body = await request.json();
    const { title, image, description, type } = body;
    if (type === 'video' || typeof image !== 'string' || !image.trim() || isVideoUrl(image)) {
      return NextResponse.json({ success: false, error: 'Bir fotoğraf ekleyin' }, { status: 400 });
    }

    const items = await readGalleryData();
    const newItem: GalleryItem = {
      id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
      title: title || '',
      image: image || '',
      description: description || '',
      type: 'image',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    items.push(newItem);
    await writeGalleryData(items);

    return NextResponse.json({ success: true, data: newItem });
  } catch (error) {
    console.error('Galeri öğesi eklenemedi:', error);
    return NextResponse.json(
      { success: false, error: 'Galeri öğesi eklenemedi' },
      { status: 500 }
    );
  }
}
