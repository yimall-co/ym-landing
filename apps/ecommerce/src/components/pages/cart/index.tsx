'use client';

import { Fragment } from 'react';
import { useTranslations } from 'next-intl';

import DeviceDetector from 'components/device-detector';

import CartMobile from './mobile';
import CartDesktop from './desktop';

type Props = Readonly<{
    locale: string;
}>;

export type CartProps = Props & Readonly<{
    t: ReturnType<typeof useTranslations>;
}>;

export default function Cart({ locale }: Props) {
    'use memo'
    const t = useTranslations();

    const childProps: CartProps = {
        t,
        locale,
    };

    return (
        <DeviceDetector>
            {(isMobile, isDesktop, isTablet) => (
                <Fragment>
                    {isDesktop && <CartDesktop {...childProps} />}
                    {(isMobile || isTablet) && <CartMobile {...childProps} />}
                </Fragment>
            )}
        </DeviceDetector>
    );
}
