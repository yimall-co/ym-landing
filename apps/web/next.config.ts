import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    output: 'standalone',
    devIndicators: false,
    // cacheComponents: true,
    experimental: {
        useCache: true,
        turbopackFileSystemCacheForDev: true,
        optimizePackageImports: [
            'lucide-react',
            'date-fns',
            'motion',
        ],
        staleTimes: {
            dynamic: 10,
            static: 30,
        },
    },
    compiler: {
        removeConsole: isProd,
    },
    reactCompiler: {
        compilationMode: 'annotation',
        panicThreshold: 'critical_errors',
    },
    transpilePackages: [
        '@yimall/ui',
        '@yimall/tailwind-config',
    ],
    images: {
        qualities: [75, 100],
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
    headers: async () => {
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
        ];
    },
    redirects: async () => {
        return [
            {
                source: '/demo',
                destination: 'https://demo.yimall.co',
                permanent: true,
            },
            {
                source: '/alashes',
                destination: 'https://alashes.com.co',
                permanent: true,
            }
        ];
    },
    rewrites: async () => {
        return [];
    },
};

const withNextIntl = createNextIntlPlugin({
    requestConfig: './src/lib/i18n/request.ts',
});

export default withNextIntl(nextConfig);
