import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    devIndicators: false,
    cacheComponents: false,
    compiler: {
        removeConsole: isProd,
    },
    experimental: {},
    reactCompiler: {
        compilationMode: 'annotation',
        panicThreshold: 'critical_errors',
    },
    transpilePackages: [
        '@yimall/ui',
        '@yimall/tailwind-config',
    ],
    images: {
        qualities: [25, 50, 75, 100],
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 60,
        unoptimized: false,
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
            {
                source: '/sw.js',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/javascript; charset=utf-8',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self'",
                    },
                ],
            },
        ]
    },
    async redirects() {
        return [];
    },
    async rewrites() {
        return [];
    },
};

const withNextIntl = createNextIntlPlugin({
    requestConfig: './src/lib/i18n/request.ts'
});

export default withNextIntl(nextConfig);
