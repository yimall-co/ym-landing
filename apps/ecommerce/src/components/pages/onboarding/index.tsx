'use client';

import { toast } from 'sonner';
import {
    Fragment,
    startTransition,
    useCallback,
    useEffect,
} from 'react';
import { useProgress } from 'react-transition-progress';
import { useTranslations } from 'next-intl';

import { useRouter } from 'lib/i18n';

import { visited } from 'features/onboarding/actions';

import DeviceDetector from 'components/device-detector';

import OnboardingMobile from './mobile';
import OnboardingDesktop from './desktop';

type Props = Readonly<{
    locale: string;
}>;

type FinalStepCompletedProps = {
    currentStep: number;
    isLastStep: boolean;
};

export type OnboardingProps = Props & Readonly<{
    t: ReturnType<typeof useTranslations>;
    onFinalStepCompleted: (props: FinalStepCompletedProps) => void;
}>;

export default function Onboarding({ locale }: Props) {
    'use memo'
    const t = useTranslations();
    const router = useRouter();
    const startProgress = useProgress();

    const handleFinalStepCompleted = useCallback(
        ({ currentStep, isLastStep }: FinalStepCompletedProps) => {
            const onSuccess = () => t('Onboarding.completed');
            const onFinally = () => router.push({ pathname: '/', });

            startTransition(async () => {
                startProgress();

                toast.promise(
                    visited({
                        onboardingStepReached: currentStep,
                        completeOnboarding: isLastStep,
                    }),
                    {
                        loading: t('common.loading'),
                        success: onSuccess,
                        finally: onFinally,
                    }
                );
            });
        },
        [
            t,
            startProgress,
            router,
        ]
    );

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const childProps: OnboardingProps = {
        t,
        locale,
        onFinalStepCompleted: handleFinalStepCompleted,
    };

    return (
        <DeviceDetector>
            {(isMobile, isDesktop, isTablet) => (
                <Fragment>
                    {isDesktop && <OnboardingDesktop {...childProps} />}
                    {(isMobile || isTablet) && <OnboardingMobile {...childProps} />}
                </Fragment>
            )}
        </DeviceDetector>
    );
}
