/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/products/:path*',
        destination: 'https://fakeapi.platzi.com/api/v1/products/:path*',
      },
    ];
  },
  images: {
    domains: ['i.imgur.com'], 
  },
};

module.exports = nextConfig;