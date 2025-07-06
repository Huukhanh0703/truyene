import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.otruyenapi.com', // Dành cho ảnh bìa (thumbnails)
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'sv1.otruyencdn.com', // **QUAN TRỌNG: Thêm domain cho ảnh chương**
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
