'use client';

import type { CategoryItem } from 'lib/dtos/category';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

import {
    Heading,
    Wrapper,
} from '@yimall/ui';
import { useMounted } from '@yimall/ui/hooks';

import CatalogCategoryCard from './category-card';

type Props = Readonly<{
    categories: Array<CategoryItem>;
}>;

export default function CatalogCategoryList({ categories }: Props) {
    'use memo'

    const mounted = useMounted();
    const t = useTranslations('Catalog');

    const defaultCategory: CategoryItem = useMemo(
        () => ({
            id: 'all',
            label: t('categories.all'),
            slug: 'all',
            banner: null,
            description: '',
            position: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            workspaceId: '',
            subcategories: [],
        }),
        [t],
    );

    if (!mounted) return null;

    return (
        <div>
            <div className="px-4 pt-4 pb-2">
                <Heading level='2' className="text-base font-medium text-(--foreground)/80">
                    {t('categories.title')}
                </Heading>
            </div>
            <Wrapper className='flex gap-3 overflow-x-auto px-4 py-2 scrollbar-hide'>
                <CatalogCategoryCard category={defaultCategory} />
                {categories.sort((a, b) => a.position - b.position).map((category) => (
                    <CatalogCategoryCard key={category.id} category={category} />
                ))}
            </Wrapper>
        </div>
    );
}
