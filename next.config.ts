import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['crests.football-data.org'],
  },
};

export default nextConfig;
