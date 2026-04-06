'use client';

import { useTranslations } from 'next-intl';

import Configuration from 'components/configuration';

import OnboardingStepContainer from './step-container';

type Props = Readonly<object>;

export default function OnboardingStepWelcome({ }: Props) {
    const t = useTranslations('Onboarding.welcome');

    return (
        <OnboardingStepContainer
            title={t('title')}
            description={t('description')}
        >
            <Configuration />
            <span className='text-xs mt-auto'>{t('note')}</span>
        </OnboardingStepContainer>
    );
}
