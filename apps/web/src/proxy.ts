import {
    NextRequest,
    ProxyConfig,
    NextResponse,
} from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { routing } from 'lib/i18n';

const i18nMiddleware = createMiddleware(routing);

function getLocaleFromPathname(pathname: string) {
    const [, locale] = pathname.split('/');
    return routing.locales.includes(locale as any)
        ? locale
        : routing.defaultLocale;
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const locale = getLocaleFromPathname(pathname);

    // Used for show intro page only once.
    const visitedBefore = request.cookies.has('visited');
    if (!visitedBefore && !pathname.startsWith(`/${locale}/intro`)) {
        return NextResponse.redirect(
            new URL(`/${locale}/intro`, request.url)
        );
    }

    return i18nMiddleware(request);
}

export const config: ProxyConfig = {
    matcher: [
        '/((?!_next|api|.*\\..*).*)'
    ],
};