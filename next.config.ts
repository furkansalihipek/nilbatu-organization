import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Video yükleme için Server Action body size limitini artır
  experimental: {
    serverActions: {
      bodySizeLimit: '200mb',
    },
  },
  // Vercel Blob görsellerinin Next.js Image ile kullanılabilmesi için
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
