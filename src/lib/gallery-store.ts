import { put, list, del } from '@vercel/blob';

const GALLERY_DATA_BLOB_NAME = 'gallery-data.json';

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  description: string;
  type?: 'image' | 'video';
  mediaUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Vercel Blob'dan galeri verilerini oku
 */
export async function readGalleryData(): Promise<GalleryItem[]> {
  try {
    // Blob'daki gallery-data.json dosyasını bul
    const { blobs } = await list({ prefix: GALLERY_DATA_BLOB_NAME });
    
    if (blobs.length === 0) {
      return [];
    }

    // En son yüklenen blob'u al
    const latestBlob = blobs[blobs.length - 1];
    const response = await fetch(latestBlob.url);
    
    if (!response.ok) {
      console.error('Gallery data fetch failed:', response.status);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Galeri verileri okunamadı:', error);
    return [];
  }
}

/**
 * Vercel Blob'a galeri verilerini yaz
 */
export async function writeGalleryData(data: GalleryItem[]): Promise<void> {
  try {
    // Önce eski blob'ları temizle
    const { blobs } = await list({ prefix: GALLERY_DATA_BLOB_NAME });
    for (const blob of blobs) {
      await del(blob.url);
    }

    // Yeni veriyi yaz
    await put(GALLERY_DATA_BLOB_NAME, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    });
  } catch (error) {
    console.error('Galeri verileri yazılamadı:', error);
    throw error;
  }
}
