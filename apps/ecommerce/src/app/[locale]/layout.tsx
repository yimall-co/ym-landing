import './globals.css';
import '@yimall/ui/styles.css';

import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';

import {
    Geist,
    Geist_Mono,
    Montserrat,
    Nunito_Sans,
    Poppins,
    Raleway,
} from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';

import { cn } from '@yimall/ui';

import BaseLayout from 'layouts/base';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const monstserrat = Montserrat({
    variable: '--font-monstserrat',
    subsets: ['latin'],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900',],
});

const nunitoSans = Nunito_Sans({
    variable: '--font-nunito',
    subsets: ['latin'],
    display: 'swap',
    weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000',],
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

type Props = Readonly<{
    params: Promise<{ locale: string }>;
}>;

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

    return {
        other: {
            'google-site-verification': '',
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: LayoutProps) {
    const locale = (await params).locale;

    return (
        <html
            lang={locale}
            translate='no'
            suppressHydrationWarning
            suppressContentEditableWarning
            className={cn(
                geistSans.variable,
                geistMono.variable,
                monstserrat.variable,
                nunitoSans.variable,
                poppins.variable,
                raleway.variable,
                'h-full',
                'isolate',
                'relative',
                'antialiased',
            )}
        >
            <body
                suppressHydrationWarning
                suppressContentEditableWarning
                className='relative min-h-full flex flex-col'
            >
                <noscript></noscript>
                <NextIntlClientProvider locale={locale}>
                    <BaseLayout>
                        {children}
                    </BaseLayout>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
