import path from 'path';

/** Fly volume veya yerel `data/` klasörü */
export function getDataDir(): string {
  const bundledData = path.join(process.cwd(), 'data');
  if (process.env.GALLERY_READ_ONLY === 'true') return bundledData;
  return process.env.DATA_DIR || bundledData;
}

export function getGalleryUploadsDir(): string {
  return path.join(getDataDir(), 'gallery', 'uploads');
}

export function getGalleryDataPath(): string {
  return path.join(getDataDir(), 'gallery-data.json');
}
