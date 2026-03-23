'use client';

import { useTranslations } from 'next-intl';

import { DeviceDetector } from 'components/device-detector';

import SignInMobile from './mobile';
import SignInDesktop from './desktop';

type Props = Readonly<{
    locale: string;
}>;

export type SignInProps = Readonly<{
    t: ReturnType<typeof useTranslations>;
}>;

export default function SignIn({
    locale,
}: Props) {
    'use memo'
    const t = useTranslations();

    const childProps: SignInProps = {
        t,
    };

    return (
        <DeviceDetector
            mobile={<SignInMobile {...childProps} />}
            desktop={<SignInDesktop {...childProps} />}
        />
    );
}
