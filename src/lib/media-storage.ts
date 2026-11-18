import fs from 'fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'path';
import { getGalleryUploadsDir } from './storage-paths';

const MIME_BY_EXT: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'video/ogg',
  '.ogv': 'video/ogg',
  '.mov': 'video/quicktime',
  '.avi': 'video/x-msvideo',
};

export function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return MIME_BY_EXT[ext] || 'application/octet-stream';
}

export function sanitizeFilename(filename: string): string | null {
  const base = path.basename(filename);
  if (!base || base.includes('..') || base === '.' || base === '..') {
    return null;
  }
  return base;
}

export function getMediaPublicPath(filename: string): string {
  return `/api/gallery/files/${encodeURIComponent(filename)}`;
}

export function getFilenameFromMediaUrl(url: string): string | null {
  const match = url.match(/\/api\/gallery\/files\/([^?#]+)/);
  if (!match) return null;
  try {
    return sanitizeFilename(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

export function isLocalGalleryUrl(url: string): boolean {
  return url.includes('/api/gallery/files/');
}

export function isLegacyVercelBlobUrl(url: string): boolean {
  return url.includes('.public.blob.vercel-storage.com');
}

export async function ensureGalleryUploadsDir(): Promise<void> {
  await fs.mkdir(getGalleryUploadsDir(), { recursive: true });
}

export async function saveMediaFile(
  file: File
): Promise<{ filename: string; url: string; size: number; type: string; isVideo: boolean }> {
  await ensureGalleryUploadsDir();

  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    throw new Error(`Desteklenmeyen dosya tipi: ${file.type}`);
  }

  const maxSize = 10 * 1024 * 1024;
  const maxLabel = '10MB';
  if (file.size > maxSize) {
    throw new Error(
      `Dosya boyutu (${(file.size / 1024 / 1024).toFixed(1)}MB) ${maxLabel} limitini aşıyor`
    );
  }

  const extension = path.extname(file.name).toLowerCase();
  const basename = path.basename(file.name, path.extname(file.name));
  const safeName = basename.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50);
  const filename = sanitizeFilename(`${Date.now()}_${randomUUID()}_${safeName}${extension}`);
  if (!filename) {
    throw new Error('Geçersiz dosya adı');
  }

  const filepath = path.join(getGalleryUploadsDir(), filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filepath, buffer);

  return {
    filename,
    url: getMediaPublicPath(filename),
    size: file.size,
    type: file.type,
    isVideo: false,
  };
}

export async function deleteMediaFile(filename: string): Promise<void> {
  const safe = sanitizeFilename(filename);
  if (!safe) return;

  const filepath = path.join(getGalleryUploadsDir(), safe);
  try {
    await fs.unlink(filepath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }
  }
}

export async function deleteMediaByUrl(url: string): Promise<void> {
  const filename = getFilenameFromMediaUrl(url);
  if (filename) {
    await deleteMediaFile(filename);
  }
}

export function getMediaFilePath(filename: string): string | null {
  const safe = sanitizeFilename(filename);
  if (!safe) return null;
  const resolved = path.resolve(getGalleryUploadsDir(), safe);
  const uploadsDir = path.resolve(getGalleryUploadsDir());
  if (!resolved.startsWith(uploadsDir + path.sep) && resolved !== uploadsDir) {
    return null;
  }
  return resolved;
}
