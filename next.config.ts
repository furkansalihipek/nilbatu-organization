import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Video yükleme için Server Action body size limitini artır
  experimental: {
    serverActions: {
      bodySizeLimit: '200mb',
    },
    // API route (galeri upload) için büyük dosya limiti
    middlewareClientMaxBodySize: '200mb',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nilbatuorg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.nilbatuorg.com',
      },
      {
        protocol: 'https',
        hostname: 'nilbatu-website.fly.dev',
      },
      // Eski galeri kayıtları (Vercel Blob)
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
