import type { Metadata } from 'next';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { cachedQueryClient } from 'lib/query-client';

import { categoryKeys } from 'features/category/hooks/keys';
import { getCategoryBySlugData } from 'features/category/actions';

import CategoryDrawer from 'features/category/drawer';

type Props = Readonly<{
    params: Promise<{ locale: string; categorySlug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const categorySlug = (await params).categorySlug;

    const category = await getCategoryBySlugData(categorySlug);

    return {
        title: category?.label,
        description: category?.description,
    };
}

export default async function CategoryModal({ params }: Props) {
    const locale = (await params).locale;
    const categorySlug = (await params).categorySlug;

    const queryClient = cachedQueryClient();

    await queryClient.prefetchQuery({
        queryKey: categoryKeys.categoryBySlug(categorySlug),
        queryFn: () => getCategoryBySlugData(categorySlug),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CategoryDrawer locale={locale} categorySlug={categorySlug} />
        </HydrationBoundary>
    );
}
