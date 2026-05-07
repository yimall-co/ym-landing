'use client';

import type { CategoryItem } from 'lib/dtos/category';
import type { OfferItem } from 'lib/dtos/offer';

import { Fragment } from 'react';
import { useTranslations } from 'next-intl';

import { useCategoriesData, useOffersData } from 'features/catalog/hooks';

import DeviceDetector from 'components/device-detector';

import CatalogMobile from './mobile';
import CatalogDesktop from './desktop';

type Props = Readonly<{
    locale: string;
}>;

export type CatalogProps = Props & Readonly<{
    t: ReturnType<typeof useTranslations>;
    categories: Array<CategoryItem> | null;
    offers: Array<OfferItem>;
}>;

export default function Catalog({ locale }: Props) {
    'use memo'
    const t = useTranslations();

    const { data: categories } = useCategoriesData();
    const { data: offers } = useOffersData();

    console.log('offers', offers);

    const childProps: CatalogProps = {
        t,
        locale,
        categories,
        offers: offers || [],
    };

    return (
        <DeviceDetector>
            {(isMobile, isDesktop, isTablet) => (
                <Fragment>
                    {isDesktop && <CatalogDesktop {...childProps} />}
                    {(isMobile || isTablet) && <CatalogMobile {...childProps} />}
                </Fragment>
            )}
        </DeviceDetector>
    );
}
