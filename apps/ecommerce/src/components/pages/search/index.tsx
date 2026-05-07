'use client';

import { Fragment } from 'react';
import { useTranslations } from 'next-intl';

import DeviceDetector from 'components/device-detector';

import SearchMobile from './mobile';
import SearchDesktop from './desktop';

type Props = Readonly<{
    locale: string;
}>;

export type SearchProps = Props & Readonly<{
    t: ReturnType<typeof useTranslations>;
}>;

export default function Search({ locale }: Props) {
    'use memo'
    const t = useTranslations();

    const childProps: SearchProps = {
        t,
        locale,
    };

    return (
        <DeviceDetector>
            {(isMobile, isDesktop, isTablet) => (
                <Fragment>
                    {isDesktop && <SearchDesktop {...childProps} />}
                    {(isMobile || isTablet) && <SearchMobile {...childProps} />}
                </Fragment>
            )}
        </DeviceDetector>
    );
}
