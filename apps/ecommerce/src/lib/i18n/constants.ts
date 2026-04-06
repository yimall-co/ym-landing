import type { Locale } from './types';

export const fallbackLocale: Locale = 'es';

export const locales: Array<{ code: Locale }> = [
    { code: fallbackLocale },
    { code: 'en' },
] as const;

export const cookieName = 'i18next';

export const headerName = 'x-i18next-current-language';
