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
        // '/onboarding': {
        //     es: '/bienvenida',
        // },
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
