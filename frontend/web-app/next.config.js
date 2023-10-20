/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    logging: {
      level: 'verbose',
    },
  },
  images: {
    domains: ['cdn.pixabay.com', 'pixabay.com'],
  },
  output: 'standalone',
};

module.exports = nextConfig;
