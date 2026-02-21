import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { readGalleryData, writeGalleryData } from '@/lib/gallery-store';
import type { GalleryItem } from '@/lib/gallery-store';

// PUT - Galeri öğesini güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication kontrolü
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const body = await request.json();
    const { title, image, description, type, mediaUrl } = body;

    const items: GalleryItem[] = await readGalleryData();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Galeri öğesi bulunamadı' },
        { status: 404 }
      );
    }

    // Eğer görsel değiştiyse ve eski görsel Vercel Blob'da ise, eski blob'u sil
    const oldImage = items[index].image;
    if (image && oldImage && oldImage !== image && oldImage.includes('.public.blob.vercel-storage.com')) {
      try {
        await del(oldImage);
      } catch (e) {
        console.error('Eski blob silinemedi:', e);
      }
    }

    items[index] = {
      ...items[index],
      title: title || items[index].title,
      image: image || items[index].image,
      description: description !== undefined ? description : items[index].description,
      type: type !== undefined ? type : items[index].type || 'image',
      mediaUrl: mediaUrl !== undefined ? mediaUrl : items[index].mediaUrl,
      updatedAt: new Date().toISOString(),
    };

    await writeGalleryData(items);

    return NextResponse.json({ success: true, data: items[index] });
  } catch (error) {
    console.error('Galeri öğesi güncellenemedi:', error);
    return NextResponse.json(
      { success: false, error: 'Galeri öğesi güncellenemedi' },
      { status: 500 }
    );
  }
}

// DELETE - Galeri öğesini sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication kontrolü
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const items: GalleryItem[] = await readGalleryData();
    const itemToDelete = items.find((item) => item.id === id);

    if (!itemToDelete) {
      return NextResponse.json(
        { success: false, error: 'Galeri öğesi bulunamadı' },
        { status: 404 }
      );
    }

    // Blob'daki dosyayı da sil (eğer Vercel Blob URL'si ise)
    if (itemToDelete.image && itemToDelete.image.includes('.public.blob.vercel-storage.com')) {
      try {
        await del(itemToDelete.image);
      } catch (e) {
        console.error('Blob dosyası silinemedi:', e);
      }
    }

    const filteredItems = items.filter((item) => item.id !== id);
    await writeGalleryData(filteredItems);

    return NextResponse.json({ success: true, message: 'Galeri öğesi silindi' });
  } catch (error) {
    console.error('Galeri öğesi silinemedi:', error);
    return NextResponse.json(
      { success: false, error: 'Galeri öğesi silinemedi' },
      { status: 500 }
    );
  }
}
