import type { Metadata } from 'next';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { cachedQueryClient } from 'lib/query-client';

import WorkspaceBySlug from 'pages/workspace-by-slug';

type Props = Readonly<{
    params: Promise<{
        locale: string;
        workspaceSlug: string
    }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = (await params).locale;
    const workspaceSlug = (await params).workspaceSlug;

    return {
        title: 'Dashboard',
    };
}

export default async function WorkspaceBySlugPage({ params }: Props) {
    const locale = (await params).locale;
    const workspaceSlug = (await params).workspaceSlug;

    const queryClient = cachedQueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <WorkspaceBySlug locale={locale} workspaceSlug={workspaceSlug} />
        </HydrationBoundary>
    );
}
