import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  experimental: { missingSuspenseWithCSRBailout: false },
};
export default nextConfig;
