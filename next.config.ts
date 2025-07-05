const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.otruyenapi.com',
        pathname: '/**', // nên là /** để cho phép tất cả đường dẫn con
      },
      {
        protocol: 'https',
        hostname: 'sv1.otruyencdn.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;