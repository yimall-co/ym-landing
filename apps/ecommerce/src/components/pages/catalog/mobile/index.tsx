'use client';

import type { CatalogProps } from 'pages/catalog';

import { Section } from '@yimall/ui';

import CatalogOfferList from 'features/catalog/offer-list';
import CatalogCategoryList from 'features/catalog/category-list';

type Props = CatalogProps;

export default function CatalogMobile({
    categories,
    offers
}: Props) {
    if (!categories) return null;

    return (
        <Section>
            <CatalogCategoryList categories={categories} />
            <CatalogOfferList offers={offers} />
        </Section>
    );
}
