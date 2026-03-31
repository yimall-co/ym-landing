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
            fr: '/inscription',
            pt: '/cadastro'
        },
        '/sign-in': {
            es: '/iniciar-sesion',
            fr: '/connexion',
            pt: '/login'
        },
        '/intro': {
            es: '/introduccion',
            fr: '/introduction',
            pt: '/introducao'
        },
        '/dashboard': {
            es: '/panel-de-control',
            fr: '/tableau-de-bord',
            pt: '/painel-de-controle'
        },
        '/dashboard/[workspaceSlug]': {
            es: '/panel-de-control/[workspaceSlug]',
            fr: '/tableau-de-bord/[workspaceSlug]',
            pt: '/painel-de-controle/[workspaceSlug]'
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
