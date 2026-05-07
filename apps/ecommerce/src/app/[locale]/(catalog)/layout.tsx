/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactNode } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { all } from 'better-all';

import { cachedQueryClient } from 'lib/query-client';

import { catalogKeys } from 'features/catalog/hooks/keys';
import { getCategoriesData, getOffersData } from 'features/catalog/actions';

import Header from 'layouts/header';

type Props = Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string }>;
}>;

export default async function CatalogLayout({ children, params }: Props) {
    const _ = (await params).locale;

    const queryClient = cachedQueryClient();

    await all({
        async categories() {
            return queryClient.prefetchQuery({
                queryKey: catalogKeys.categories(),
                queryFn: getCategoriesData,
            });
        },
        async offers() {
            return queryClient.prefetchQuery({
                queryKey: catalogKeys.offers(),
                queryFn: getOffersData,
            });
        },
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Header />
            <div style={{ paddingTop: 'calc(var(--header-height) + var(--header-offset-top))' }}>
                {children}
            </div>
        </HydrationBoundary>
    );
}
