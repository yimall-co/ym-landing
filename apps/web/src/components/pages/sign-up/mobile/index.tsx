'use client';

import type { SignUpProps } from 'pages/sign-up';

import { useMemo } from 'react';

import {
    Step,
    Stepper,
} from '@yimall/ui';

import StepName from 'features/sign-up/step-name';
import StepEmail from 'features/sign-up/step-email';
import StepTerms from 'features/sign-up/step-terms';

type Props = SignUpProps

export default function SignUpMobile({
    t,
    formControl: {
        control
    },
    formState: {
        isValid,
    },
    currentStep,
    onStepChange,
    onFinalStepCompleted,
}: Props) {
    'use memo'

    const steps = useMemo(() => [
        <StepName t={t} control={control} />,
        <StepEmail t={t} control={control} />,
        <StepTerms t={t} control={control} />
    ], [t, control]);

    const stepsCount = steps.length;
    const isLastStep = currentStep === stepsCount
    const canComplete = isValid && isLastStep;

    return (
        <Stepper
            hideStepIndicator
            disableStepIndicators
            stepContainerClassName='p-0'
            stepCircleContainerClassName='flex-1 h-full max-w-[none] shadow-none flex flex-col'
            contentClassName='flex-1 h-full'
            completeButtonProps={{
                type: 'submit',
                disabled: !canComplete,
            }}
            initialStep={currentStep}
            nextButtonText={t('common.next')}
            backButtonText={t('common.back')}
            completeButtonText={t('common.complete')}
            onStepChange={onStepChange}
            onFinalStepCompleted={onFinalStepCompleted}
        >
            {steps.map((step, index) => (
                <Step key={index} className='p-2'>
                    {step}
                </Step>
            ))}
        </Stepper>
    );
}
