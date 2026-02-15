import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Video yükleme için Server Action body size limitini artır
  experimental: {
    serverActions: {
      bodySizeLimit: '200mb',
    },
  },
};

export default nextConfig;
