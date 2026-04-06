import type { Formats } from 'next-intl';

import { mergeDeep } from 'remeda';
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

async function getMessage(workspaceSlug: string, locale: string) {
    // TODO: do a call to API.
    const base = (await import(`messages/${locale}.json`)).default;

    let messagesByWorkspace = {};
    try {
        // messagesByWorkspace = (await import(`messages/${workspaceSlug}/${locale}.json`)).default;
        messagesByWorkspace = {};
    } catch (error) {
        console.error(error);
    }

    return Object.keys(messagesByWorkspace).length > 0
        ? mergeDeep(base, messagesByWorkspace)
        : base;
}

export default getRequestConfig(
    async ({
        locale: defaultLocale,
        requestLocale,
    }) => {
        const requested = await requestLocale;

        const locale = (
            hasLocale(routing.locales, requested)
                ? requested
                : routing.defaultLocale
        ) || defaultLocale;

        const messages = (await import(`messages/${locale}.json`)).default;

        return {
            locale,
            messages,
        };
    }
);
