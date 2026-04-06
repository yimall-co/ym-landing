'use client'

import type { OnboardingProps } from 'pages/onboarding';

import {
    Check,
    MoveLeft,
    MoveRight,
} from 'lucide-react';

import {
    Button,
    cn,
    Stepper,
} from '@yimall/ui';

import OnboardingStepWelcome from 'features/onboarding/step-welcome';
import OnboardingStepGeolocation from 'features/onboarding/step-geolocation';
import OnboardingStepSearch from 'features/onboarding/step-search';

type Props = OnboardingProps;

export default function OnboardingMobile({
    t,
    onFinalStepCompleted,
}: Props) {
    return (
        <Stepper
            contentClassName='flex-1 flex h-full'
            stepCircleContainerClassName='flex-1 flex flex-col h-full justify-between'
            onFinalStepCompleted={onFinalStepCompleted}
            renderFooter={({
                isLastStep,
                currentStep,
                onBackClick,
                onNextClick,
                onCompleteClick,
            }) => (
                <div className='flex flex-col gap-y-2 px-2 pb-4'>
                    <div className='grid grid-cols-3 gap-4'>
                        {currentStep !== 1 ? (
                            <Button
                                shape='pill'
                                variant='text'
                                onClick={onBackClick}
                            >
                                <MoveLeft /> {t('common.back')}
                            </Button>
                        ) : (
                            <div />
                        )}
                        {!isLastStep ? (
                            <Button
                                shape='pill'
                                onClick={onNextClick}
                                className={cn(currentStep === 1 ? 'col-span-3' : 'col-span-2')}
                            >
                                {t('common.next')} <MoveRight />
                            </Button>
                        ) : (
                            <Button
                                shape='pill'
                                onClick={onCompleteClick}
                                className='col-span-2'
                            >
                                {t('common.complete')} <Check />
                            </Button>
                        )}
                    </div>
                    <Button
                        variant='link'
                        className='text-sm'
                        onClick={onFinalStepCompleted}
                    >
                        {t('jumpToCatalog')}
                    </Button>
                </ div>
            )}
        >
            <OnboardingStepWelcome />
            <OnboardingStepGeolocation />
            <OnboardingStepSearch />
        </Stepper >
    );
}
