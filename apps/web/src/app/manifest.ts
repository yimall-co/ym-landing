import type { MetadataRoute } from 'next';

import { getTranslations } from 'next-intl/server';

import { fallbackLocale } from 'lib/i18n';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
    const t = await getTranslations({
        namespace: 'metadata',
        locale: fallbackLocale,
    });

    return {
        name: t('name'),
        short_name: t('shortName'),
        description: t('description'),
        categories: t('keywords').split(','),
        start_url: '/',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [],
    };
};
