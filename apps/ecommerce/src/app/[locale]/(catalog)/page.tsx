import type { Metadata } from 'next';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';

import { cachedQueryClient } from 'lib/query-client';

import Catalog from 'pages/catalog';

type Props = Readonly<{
    params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = (await params).locale;

    const t = await getTranslations({
        locale,
        namespace: 'metadata',
    });

    return {
        title: 'Catalog',
        description: 'Catalog',
    };
}

export default async function CatalogPage({ params }: Props) {
    const locale = (await params).locale;

    const queryClient = cachedQueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Catalog locale={locale} />
        </HydrationBoundary>
    );
}
