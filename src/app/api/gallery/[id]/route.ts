import { NextRequest, NextResponse } from 'next/server';
import { hasAdminSession } from '@/lib/admin-session';
import { readGalleryData, writeGalleryData } from '@/lib/gallery-store';
import type { GalleryItem } from '@/lib/gallery-store';
import { isVideoUrl } from '@/lib/instagram';
import {
  deleteMediaByUrl,
  isLegacyVercelBlobUrl,
  isLocalGalleryUrl,
} from '@/lib/media-storage';

async function removeGalleryMedia(url: string | undefined) {
  if (!url || !isLocalGalleryUrl(url)) return;
  try {
    await deleteMediaByUrl(url);
  } catch (e) {
    console.error('Yerel medya silinemedi:', e);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const body = await request.json();
    const { title, image, description, type } = body;
    if (type === 'video' || (image !== undefined && (typeof image !== 'string' || isVideoUrl(image)))) {
      return NextResponse.json({ success: false, error: 'Yalnızca fotoğraf kullanılabilir' }, { status: 400 });
    }

    const items: GalleryItem[] = await readGalleryData();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Galeri öğesi bulunamadı' },
        { status: 404 }
      );
    }

    const oldImage = items[index].image;

    if (image && oldImage && oldImage !== image) {
      if (isLocalGalleryUrl(oldImage)) {
        await removeGalleryMedia(oldImage);
      } else if (isLegacyVercelBlobUrl(oldImage)) {
        console.warn('Eski Vercel Blob görseli diskten silinemez:', oldImage);
      }
    }

    items[index] = {
      ...items[index],
      title: title || items[index].title,
      image: image || items[index].image,
      description: description !== undefined ? description : items[index].description,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    await removeGalleryMedia(itemToDelete.image);
    if (itemToDelete.mediaUrl && itemToDelete.mediaUrl !== itemToDelete.image) {
      await removeGalleryMedia(itemToDelete.mediaUrl);
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
