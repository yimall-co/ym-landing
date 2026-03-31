import type { Metadata } from 'next';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { cachedQueryClient } from 'lib/query-client';

import Dashboard from 'pages/dashboard';

type Props = Readonly<{
    params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = (await params).locale;

    return {
        title: 'Dashboard',
    };
}

export default async function DashboardPage({ params }: Props) {
    const locale = (await params).locale;

    const queryClient = cachedQueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Dashboard locale={locale} />
        </HydrationBoundary>
    );
}
