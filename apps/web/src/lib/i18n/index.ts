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
        '/sign-up': {
            es: '/registrarse',
        },
        '/sign-in': {
            es: '/iniciar-sesion',
        },
        '/intro': {
            es: '/introduccion',
        },
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
};
