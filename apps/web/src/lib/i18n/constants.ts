import type { Locale } from './types';

export const fallbackLocale: Locale = 'es';

export const locales: Array<Locale> = [
    fallbackLocale,
    'en',
    'fr',
    'pt',
];

export const cookieName = 'i18next';

export const headerName = 'x-i18next-current-language';
