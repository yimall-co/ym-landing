import createNextIntlMiddleware from 'next-intl/middleware';

import {
    NextRequest,
    NextResponse,
    ProxyConfig,
    userAgent,
} from 'next/server';

import { fallbackLocale, routing } from 'lib/i18n';

const i18nMiddleware = createNextIntlMiddleware(routing);

function getLocaleFromPathname(pathname: string) {
    const [, locale] = pathname.split('/');
    return routing.locales.includes(locale as any)
        ? locale
        : routing.defaultLocale;
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const visited = request.cookies.has('visited');
    const isOnOnboarding = /\/onboarding(\/|$)/.test(pathname);

    const temp = i18nMiddleware(request);

    const locale = temp.headers.get('x-middleware-request-x-next-intl-locale') ?? getLocaleFromPathname(pathname) ?? fallbackLocale;

    if (!visited && !isOnOnboarding) {
        return NextResponse.redirect(
            new URL(`/${locale}/onboarding`, request.url)
        );
    }

    const response = i18nMiddleware(request);

    const { device } = userAgent(request);

    response.cookies.set('device_info', JSON.stringify(device));
    return response;
}

export const config: ProxyConfig = {
    matcher: [
        '/((?!_next|api|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
    ],
};
