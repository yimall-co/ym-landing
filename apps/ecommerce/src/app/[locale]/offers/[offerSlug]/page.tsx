import type { Metadata } from 'next';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { cachedQueryClient } from 'lib/query-client';

import { offerKeys } from 'features/offer/hooks/keys';
import { getOfferBySlugData } from 'features/offer/actions';

import Offer from 'pages/offer';

type Props = Readonly<{
    params: Promise<{ locale: string; offerSlug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const offerSlug = (await params).offerSlug;

    const offer = await getOfferBySlugData(offerSlug);

    return {};
    // return {
    //     title: offer?.label,
    //     description: offer?.description,
    // };
}

export default async function OfferPage({ params }: Props) {
    const locale = (await params).locale;
    const offerSlug = (await params).offerSlug;

    const queryClient = cachedQueryClient();

    await queryClient.prefetchQuery({
        queryKey: offerKeys.offerBySlug(offerSlug),
        queryFn: () => getOfferBySlugData(offerSlug),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Offer locale={locale} offerSlug={offerSlug} />
        </HydrationBoundary>
    );
}
