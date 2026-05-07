import type { Metadata } from 'next';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';

import { cachedQueryClient } from 'lib/query-client';

import { locationKeys } from 'features/location/hooks/keys';
import { getGeolocationsData } from 'features/location/actions';

import LocationDrawer from 'features/location/drawer';

type Props = Readonly<{
    params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = (await params).locale;

    const t = await getTranslations({
        locale,
        namespace: 'metadata',
    });

    return {};
}

export default async function LocationPage({ params }: Props) {
    const locale = (await params).locale;

    const queryClient = cachedQueryClient();

    await queryClient.prefetchQuery({
        queryKey: locationKeys.all(),
        queryFn: getGeolocationsData,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LocationDrawer locale={locale} />
        </HydrationBoundary>
    );
}
