import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  async redirects() {
    return [
      // 1.3 — non-www → www (kanonikalizacija)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'diskontvideonadzora.rs' }],
        destination: 'https://www.diskontvideonadzora.rs/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
