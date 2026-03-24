'use client'

import type { FC, MouseEventHandler } from 'react';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { clientEnv } from 'env/client';

import { DeviceDetector } from 'components/device-detector';

import MarketingMobile from './mobile';
import MarketingDesktop from './desktop';

type Props = Readonly<{
    locale: string;
}>;

export type MarketingProps = Readonly<{
    t: ReturnType<typeof useTranslations>;
    router: ReturnType<typeof useRouter>;
    handleContact: MouseEventHandler<HTMLButtonElement>;
}>;

export default function Marketing({ locale }: Props) {
    'use memo'
    const router = useRouter();
    const t = useTranslations('Marketing');

    const handleContact: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        window.open(`https://wa.me/${clientEnv.NEXT_PUBLIC_CONTACT_PHONE}`, '_blank');
    }

    const childProps: MarketingProps = {
        t,
        router,
        handleContact,
    };

    return (
        <DeviceDetector
            mobile={<MarketingMobile {...childProps} />}
            desktop={<MarketingDesktop {...childProps} />}
        />
    );
}
