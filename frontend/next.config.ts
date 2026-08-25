import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Mengizinkan gambar dari Sanity
      },
    ],
  },
};

export default nextConfig;