'use client';

import { useTranslations } from 'next-intl';

import OnboardingStepContainer from './step-container';

type Props = Readonly<object>;

export default function OnboardingStepGeolocation({ }: Props) {
    const t = useTranslations('Onboarding.geolocation');

    return (
        <OnboardingStepContainer
            title={t('title')}
            description={t('description')}
        >
            <div className='flex flex-col gap-y-2'>
            </div>
        </OnboardingStepContainer>
    );
}
