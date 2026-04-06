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
    images: {},
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
