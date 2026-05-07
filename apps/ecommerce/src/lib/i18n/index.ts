import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

import {
    locales,
    fallbackLocale,
    cookieName,
    headerName,
} from './constants';

const routing = defineRouting({
    locales: locales.map((l) => l.code),
    defaultLocale: fallbackLocale,
    pathnames: {
        '/': '/',
        '/location': {
            es: '/ubicacion',
            en: '/location',
        },
        '/cart': {
            es: '/carrito',
            en: '/cart',
        },
        '/search': {
            es: '/buscar',
            en: '/search',
        },
        '/categories/[categorySlug]': {
            es: '/categorias/[categorySlug]',
            en: '/categories/[categorySlug]',
        },
        '/offers/[offerSlug]': {
            es: '/ofertas/[offerSlug]',
            en: '/offers/[offerSlug]',
        }
    },
});

const {
    Link,
    useRouter,
    usePathname,
    getPathname,
    redirect,
    permanentRedirect,
} = createNavigation(routing);

function useResolvedPathname(params: Record<string, any>) {
    const pathname = usePathname();

    const resolvedPathname = Object.entries(params).reduce<string>((acc, [key, value]) => {
        return acc.replace(`[${key}]`, value as string);
    }, pathname);

    return resolvedPathname;
}

export {
    routing,
    locales,
    fallbackLocale,
    cookieName,
    headerName,
    Link,
    useRouter,
    getPathname,
    redirect,
    permanentRedirect,
    usePathname,
    useResolvedPathname,
};
