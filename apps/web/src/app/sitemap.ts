import type { MetadataRoute } from 'next';

import { clientEnv } from 'env/client';

import { getPathname } from 'lib/i18n';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const getLocaleUrlWithPathName = (
        locale: string,
        href: string = '/'
    ) => `${clientEnv.NEXT_PUBLIC_SITE_URL}${getPathname({ locale, href: href as any, })}`;

    const localesMap = {
        es: getLocaleUrlWithPathName('es'),
        en: getLocaleUrlWithPathName('en'),
        fr: getLocaleUrlWithPathName('fr'),
        pt: getLocaleUrlWithPathName('pt'),
    } as const;

    return [
        {
            url: localesMap['es'],
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 1,
            alternates: {
                languages: {
                    es: localesMap['es'],
                    en: localesMap['en'],
                    pt: localesMap['pt'],
                    fr: localesMap['fr'],
                },
            },
        },
        {
            url: `${localesMap['es']}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
            alternates: {
                languages: {
                    es: `${localesMap['es']}/contact`,
                    en: `${localesMap['en']}/contact`,
                    pt: `${localesMap['pt']}/contact`,
                    fr: `${localesMap['fr']}/contact`,
                },
            },
        },
    ];
};
