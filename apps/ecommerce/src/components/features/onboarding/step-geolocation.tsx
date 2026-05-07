'use client';

import Image from 'next/image';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { useGeolocation } from 'shared/hooks';

import OnboardingStepContainer from './step-container';

type Props = Readonly<object>;

export default function OnboardingStepGeolocation({ }: Props) {
    const t = useTranslations('Onboarding.geolocation');

    const { requestGeolocation } = useGeolocation();

    useEffect(() => {
        requestGeolocation();
    }, [requestGeolocation]);

    return (
        <OnboardingStepContainer
            title={t('title')}
            description={t('description')}
        >
            <div className='size-full flex-1 flex flex-col gap-y-2'>
                <div className='relative w-full h-[400px]'>
                    <Image
                        fill
                        src="/location.svg"
                        alt="Geolocation"
                        className='object-contain'
                    />
                </div>
            </div>
        </OnboardingStepContainer>
    );
}
