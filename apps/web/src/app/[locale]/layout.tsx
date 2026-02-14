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
} from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import { cn } from '@yimall/ui';

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

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { params } = props;

    const locale = (await params).locale;

    const t = await getTranslations({
        locale,
        namespace: 'metadata',
    });

    return {
        title: {
            default: t('name'),
            template: `% | ${t('shortName')}`,
        },
        description: t('description'),
    };
};

export default async function RootLayout(props: LayoutProps) {
    const { params, children } = props;

    const locale = (await params).locale;

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
                    'antialiased',
                    'isolate',
                    'relative',
                )}
            >
                <NextIntlClientProvider>
                    <ThemeProvider
                        enableSystem
                        defaultTheme='light'
                        attribute='class'
                    >
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
