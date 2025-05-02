/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ftp-safenet.liara.run'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ftp-safenet.liara.run/api/:path*',
      },
    ];
  },
};

export default nextConfig;
