import type { ReactNode } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { cachedQueryClient } from 'lib/query-client';

import { getWorkspacesByOwnerData } from 'features/dashboard/actions';

import DashboardLayout from 'layouts/dashboard';

type Props = Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string }>;
}>;

export default async function Layout({ children, params }: Props) {
    const locale = (await params).locale;

    const queryClient = cachedQueryClient();

    queryClient.prefetchQuery({
        queryKey: ['workspaces-by-owner'],
        queryFn: getWorkspacesByOwnerData,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </HydrationBoundary>
    );
}
