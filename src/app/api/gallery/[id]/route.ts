import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const GALLERY_DATA_PATH = path.join(process.cwd(), 'data', 'gallery.json');

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

async function readGalleryData() {
  try {
    await ensureDataDir();
    if (existsSync(GALLERY_DATA_PATH)) {
      const data = await readFile(GALLERY_DATA_PATH, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Galeri verileri okunamadı:', error);
    return [];
  }
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  type?: 'image' | 'video';
  mediaUrl?: string;
  createdAt: string;
  updatedAt: string;
}

async function writeGalleryData(data: GalleryItem[]) {
  try {
    await ensureDataDir();
    await writeFile(GALLERY_DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Galeri verileri yazılamadı:', error);
    throw error;
  }
}

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
    const { title, category, image, description, type, mediaUrl } = body;

    const items: GalleryItem[] = await readGalleryData();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Galeri öğesi bulunamadı' },
        { status: 404 }
      );
    }

    items[index] = {
      ...items[index],
      title: title || items[index].title,
      category: category || items[index].category,
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
    const filteredItems = items.filter((item) => item.id !== id);

    if (items.length === filteredItems.length) {
      return NextResponse.json(
        { success: false, error: 'Galeri öğesi bulunamadı' },
        { status: 404 }
      );
    }

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
