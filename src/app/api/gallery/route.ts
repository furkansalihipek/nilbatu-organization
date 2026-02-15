import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Galeri verilerini saklamak için JSON dosyası
const GALLERY_DATA_PATH = path.join(process.cwd(), 'data', 'gallery.json');

// Veri klasörünü oluştur
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

// Galeri verilerini oku
async function readGalleryData(): Promise<GalleryItem[]> {
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

// Galeri verilerini yaz
async function writeGalleryData(data: GalleryItem[]) {
  try {
    await ensureDataDir();
    await writeFile(GALLERY_DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Galeri verileri yazılamadı:', error);
    throw error;
  }
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  type?: 'image' | 'video'; // Medya tipi
  mediaUrl?: string; // Video URL
  createdAt: string;
  updatedAt: string;
}

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

    // Zorunlu alan kontrolü kaldırıldı - tüm alanlar opsiyonel

    const items = await readGalleryData();
    const newItem: GalleryItem = {
      id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
      title: title || '',
      category: category || 'Genel', // Varsayılan kategori
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
