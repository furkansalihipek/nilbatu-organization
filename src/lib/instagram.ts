/**
 * Instagram URL'lerini embed URL'ye çevirir
 * @param url Instagram post URL'i
 * @returns Embed URL veya null
 */
export function parseInstagramUrl(url: string): string | null {
  if (!url) return null;

  // Instagram URL formatlarını kontrol et
  // https://www.instagram.com/p/ABC123/
  // https://www.instagram.com/reel/ABC123/
  // https://instagram.com/p/ABC123/
  const patterns = [
    /instagram\.com\/p\/([A-Za-z0-9_-]+)/,
    /instagram\.com\/reel\/([A-Za-z0-9_-]+)/,
    /instagram\.com\/tv\/([A-Za-z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const postId = match[1];
      // Instagram embed URL formatı
      return `https://www.instagram.com/p/${postId}/embed/`;
    }
  }

  return null;
}

/**
 * URL'nin Instagram URL'si olup olmadığını kontrol eder
 */
export function isInstagramUrl(url: string): boolean {
  return /instagram\.com/.test(url);
}

/**
 * URL'nin video URL'si olup olmadığını kontrol eder
 */
export function isVideoUrl(url: string): boolean {
  if (!url) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
  const videoMimeTypes = ['video/'];
  return (
    videoExtensions.some((ext) => url.toLowerCase().includes(ext)) ||
    videoMimeTypes.some((type) => url.toLowerCase().includes(type))
  );
}
