'use client';

import type { SubmitHandler } from 'react-hook-form';
import type { SignInSchema } from 'features/sign-in/schema';

import {
    useCallback,
    useEffect,
} from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { createFormControl, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signInSchema } from 'features/sign-in/schema';
import { useSignIn } from 'features/sign-in/hooks';
import { DeviceDetector } from 'components/device-detector';

import SignInMobile from './mobile';
import SignInDesktop from './desktop';

type Props = Readonly<{
    locale: string;
}>;

export type SignInProps = Readonly<{
    t: ReturnType<typeof useTranslations>;
    formControl: ReturnType<typeof createFormControl<SignInSchema>>;
    formState: ReturnType<typeof useFormState<SignInSchema>>;
    onSubmit: SubmitHandler<SignInSchema>;
    onRecaptcha: (token: string, action: string) => Promise<void>;
}>;

export default function SignIn({
    locale,
}: Props) {
    'use memo'
    const t = useTranslations();

    const signInMutation = useSignIn();

    const formControl = createFormControl<SignInSchema>({
        resolver: zodResolver(signInSchema),
        mode: 'all',
        reValidateMode: 'onChange',
        values: {
            email: '',
            password: '',
            recaptchaToken: '',
            rememberMe: false,
        },
    });

    const formState = useFormState({
        control: formControl.control,
    });

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

    const handleSubmit: SubmitHandler<SignInSchema> = useCallback(
        (data) => {
            const isValid = formState.isValid;
            if (!isValid) {
                return;
            }

            const onSuccess = () => {
                formControl.reset();

                return 'Sign in successful!';
            };

            const onError = (error: Error) => {
                return error.message;
            };

            toast.promise(
                signInMutation.mutateAsync(data),
                {
                    loading: t('SignIn.loading'),
                    success: onSuccess,
                    error: onError,
                },
            );
        },
        [formControl, formState, toast, signInMutation, t],
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

    const childProps: SignInProps = {
        t,
        formControl,
        formState,
        onSubmit: handleSubmit,
        onRecaptcha: handleRecaptcha,
    };

    return (
        <DeviceDetector
            mobile={<SignInMobile {...childProps} />}
            desktop={<SignInDesktop {...childProps} />}
        />
    );
}
