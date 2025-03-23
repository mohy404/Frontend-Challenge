/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/products/:path*',
        destination: 'https://api.escuelajs.co/api/v1/products/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
          { key: 'Access-Control-Allow-Headers', value: 'Authorization, Content-Type' },
        ],
      },
    ];
  },
  images: {
    domains: [
      'i.imgur.com',
      'api.lorem.space',
      'fakeapi.platzi.com',
      'images.unsplash.com'
    ],
  },
};

module.exports = nextConfig;