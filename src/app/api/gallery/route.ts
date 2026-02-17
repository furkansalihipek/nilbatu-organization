import { NextRequest, NextResponse } from 'next/server';
import { readGalleryData, writeGalleryData } from '@/lib/gallery-store';
import type { GalleryItem } from '@/lib/gallery-store';

// GET - Tüm galeri öğelerini getir
export async function GET() {
  try {
    const items = await readGalleryData();
    return NextResponse.json({ success: true, data: items });
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
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, category, image, description, type, mediaUrl } = body;

    const items = await readGalleryData();
    const newItem: GalleryItem = {
      id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
      title: title || '',
      category: category || 'Genel',
      image: image || '',
      description: description || '',
      type: type || 'image',
      mediaUrl: mediaUrl || undefined,
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
