import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Emits a self-contained server in .next/standalone for the Docker image.
  output: 'standalone',
  // Validates every <Link href> against the real route tree at type-check time.
  typedRoutes: true,
  images: { remotePatterns: [] },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
};

export default nextConfig;
