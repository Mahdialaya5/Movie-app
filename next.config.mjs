/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fr.web.img2.acsta.net', 'm.media-amazon.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
