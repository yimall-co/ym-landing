import './globals.css';
import '@yimall/ui/styles.css';

import type { ReactNode } from 'react';
import type { Viewport, Metadata } from 'next';

import {
    Anta,
    Geist,
    Poppins,
    Raleway,
    Geist_Mono,
    Nunito_Sans,
    Montserrat,
} from 'next/font/google';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { getTranslations } from 'next-intl/server';
import { hasLocale, NextIntlClientProvider } from 'next-intl';

import { routing } from 'lib/i18n';
import { clientEnv } from 'env/client';

import { cn } from '@yimall/ui';

import BaseLayout from 'layouts/base';
import CookiesConsent from 'features/app/cookies-consent';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const poppins = Poppins({
    variable: '--font-poppins',
    display: 'swap',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const raleway = Raleway({
    variable: '--font-raleway',
    display: 'swap',
    subsets: ['latin', 'latin-ext', 'cyrillic',],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900',],
});

const nunito = Nunito_Sans({
    variable: '--font-nunito',
    subsets: ['latin'],
    display: 'swap',
    weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000',],
});

const anta = Anta({
    variable: '--font-anta',
    subsets: ['latin'],
    display: 'swap',
    weight: ['400'],
});

const monstserrat = Montserrat({
    variable: '--font-monstserrat',
    subsets: ['latin'],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900',],
})

type Props = Readonly<{
    params: Promise<{ locale: string }>;
}>

type LayoutProps = Props & Readonly<{
    children: ReactNode;
}>;

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
    themeColor: [
        {
            media: '(prefers-color-scheme: light)',
            color: '#121212',
        },
        {
            media: '(prefers-color-scheme: dark)',
            color: '#ffffff',
        },
    ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = (await params).locale;

    const t = await getTranslations({
        locale,
        namespace: 'metadata',
    });

    return {
        title: {
            default: t('name'),
            template: `%s | ${t('shortName')}`,
        },
        description: t('description'),
        other: {
            'google-site-verification': clientEnv.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION!,
        },
    };
};

export default async function RootLayout({
    children,
    params,
}: LayoutProps) {
    const locale = (await params).locale;

    const supportsLocale = hasLocale(routing.locales, locale);
    if (!supportsLocale) return notFound();

    const t = await getTranslations();

    return (
        <html
            lang={locale}
            translate='no'
            suppressHydrationWarning
            suppressContentEditableWarning
        >
            <body
                suppressContentEditableWarning
                suppressHydrationWarning
                className={cn(
                    geistSans.variable,
                    geistMono.variable,
                    poppins.variable,
                    raleway.variable,
                    nunito.variable,
                    anta.variable,
                    monstserrat.variable,
                    'antialiased',
                    'isolate',
                    'relative',
                )}
            >
                <noscript>{t('NoScript')}</noscript>
                <NextIntlClientProvider>
                    <ThemeProvider
                        enableSystem
                        attribute='class'
                    >
                        <BaseLayout>
                            {children}
                        </BaseLayout>
                        <CookiesConsent />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
