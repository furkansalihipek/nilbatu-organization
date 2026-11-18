import fs from 'fs/promises';
import { getCloudinaryConfig, readCloudinaryRecords, writeCloudinaryRecords } from './cloudinary';
import { getDataDir, getGalleryDataPath } from './storage-paths';

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

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(getDataDir(), { recursive: true });
}

export async function readGalleryData(): Promise<GalleryItem[]> {
  const config = getCloudinaryConfig();
  if (config) return readCloudinaryRecords(config);

  try {
    const raw = await fs.readFile(getGalleryDataPath(), 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function writeGalleryData(data: GalleryItem[]): Promise<void> {
  if (process.env.GALLERY_READ_ONLY === 'true') throw new Error('Galeri salt okunur');

  const config = getCloudinaryConfig();
  if (config) return writeCloudinaryRecords(data, config);

  await ensureDataDir();
  await fs.writeFile(getGalleryDataPath(), JSON.stringify(data, null, 2), 'utf-8');
}
