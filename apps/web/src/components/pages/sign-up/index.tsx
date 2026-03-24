'use client';

import type { SignUpSchema } from 'features/sign-up/schema';

import {
    useCallback,
    useEffect,
    useState,
} from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { createFormControl, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signUpSchema } from 'features/sign-up/schema';
import { useSignUp } from 'features/sign-up/hooks';
import { DeviceDetector } from 'components/device-detector';

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
    onRecaptcha: (token: string, action: string) => Promise<void>;
}>;

export default function SignUp({
    locale,
}: Props) {
    'use memo'
    const t = useTranslations();

    const [currentStep, setCurrentStep] = useState<number>(1);

    const signUpMutation = useSignUp();

    const formControl = createFormControl<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        mode: 'all',
        reValidateMode: 'onChange',
        values: {
            name: '',
            email: '',
            password: '',
            image: 'https://ssfdpagynvyveoschegx.supabase.co/storage/v1/object/public/assets/collamiy/collamiy.webp',
            termsAndConditions: false,
            newsLetter: undefined,
        },
    });

    const formState = useFormState({
        control: formControl.control,
    });

    const handleStepChange = (step: number) => {
        setCurrentStep(step);
    }

    const handleRecaptcha = useCallback(
        async (token: string, action: string) => {
            await fetch('/api/recaptcha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    action,
                }),
            });
        },
        [],
    );

    const handleFinalStepCompleted = useCallback(
        async () => {
            const isValid = formState.isValid;
            const values = formControl.getValues();

            if (!isValid) {
                toast.error('Please fill all fields');

                return;
            }

            const onSuccess = () => {
                formControl.reset();

                return 'Sign up successfully';
            };

            const onError = (error: Error) => {
                return error.message;
            };

            toast.promise(
                signUpMutation.mutateAsync(values),
                {
                    loading: t('SignUp.loading'),
                    success: onSuccess,
                    error: onError,
                },
            );
        },
        [formControl, formState, toast, signUpMutation, t],
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

    const childProps: SignUpProps = {
        t,
        formControl,
        formState,
        currentStep,
        onStepChange: handleStepChange,
        onFinalStepCompleted: handleFinalStepCompleted,
        onRecaptcha: handleRecaptcha,
    };

    return (
        <DeviceDetector
            mobile={<SignUpMobile {...childProps} />}
            desktop={<SignUpDesktop {...childProps} />}
        />
    );
}
