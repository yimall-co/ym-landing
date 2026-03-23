'use client';

import type { SignUpSchema } from 'features/sign-up/schema';

import { Fragment, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { createFormControl, useFormState, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { clientEnv } from 'env/client';

import { useLocalStorage } from 'shared/hooks';
import { DeviceDetector } from 'components/device-detector';
import { signUpSchema } from 'features/sign-up/schema';

import SignUpMobile from './mobile';
import SignUpDesktop from './desktop';

type Props = Readonly<{
    locale: string;
}>;

export type SignUpProps = Readonly<{
    t: ReturnType<typeof useTranslations>;
    formControl: ReturnType<typeof createFormControl<SignUpSchema>>;
    formState: ReturnType<typeof useFormState<SignUpSchema>>;
    currentStep: number;
    onStepChange: (step: number) => void;
    onFinalStepCompleted: () => void;
}>;

export default function SignUp({
    locale,
}: Props) {
    'use memo'
    const t = useTranslations();

    // const [currentStep, setCurrentStep] = useLocalStorage<number>('sign-up-current-step', 1);
    const [currentStep, setCurrentStep] = useState<number>(1);

    const formControl = createFormControl<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        mode: 'all',
        reValidateMode: 'onChange',
        values: {
            name: '',
            email: '',
            password: '',
            image: undefined,
            termsAndConditions: false,
            newsLetter: undefined,
        },
    });

    const formState = useFormState({
        control: formControl.control,
    });

    const values = useWatch({
        control: formControl.control,
    });

    const handleStepChange = (step: number) => {
        setCurrentStep(step);
    }

    const handleFinalStepCompleted = () => {
        const isValid = formState.isValid;
        const values = formControl.getValues();

        console.log('Final step completed');
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();

        // TODO: save progress here.
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const childProps: SignUpProps = {
        t,
        formControl,
        formState,
        currentStep,
        onStepChange: handleStepChange,
        onFinalStepCompleted: handleFinalStepCompleted,
    };

    return (
        <Fragment>
            <DeviceDetector
                mobile={<SignUpMobile {...childProps} />}
                desktop={<SignUpDesktop {...childProps} />}
            />
            <div className='g-recaptcha' data-sitekey={clientEnv.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} data-action='signup' />
        </Fragment>
    );
}
