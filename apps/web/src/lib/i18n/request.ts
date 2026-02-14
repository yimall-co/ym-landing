import type { Formats } from 'next-intl';

import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from 'lib/i18n';

export const formats: Formats = {
    dateTime: {
        short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        },
    },
    number: {
        precise: {
            maximumFractionDigits: 5,
        },
    },
    list: {
        enumeration: {
            style: 'long',
            type: 'conjunction',
        },
    },
} satisfies Formats;

export default getRequestConfig(
    async ({
        locale: _,
        requestLocale,
    }) => {
        const requested = await requestLocale;

        const locale = (
            hasLocale(routing.locales, requested)
                ? requested
                : routing.defaultLocale
        ) || _;

        const module = (
            await import(`messages/${locale}.json`)
        ).default;

        return {
            locale,
            messages: module,
        };
    }
);
