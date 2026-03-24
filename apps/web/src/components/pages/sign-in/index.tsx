'use client';

import type { SubmitHandler } from 'react-hook-form';
import type { SignInSchema } from 'features/sign-in/schema';

import { useCallback, useEffect } from 'react';
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
            rememberMe: false,
        },
    });

    const formState = useFormState({
        control: formControl.control,
    });

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

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
                    loading: 'Signing in...',
                    success: onSuccess,
                    error: onError,
                },
            );
        },
        [formControl, formState, toast, signInMutation],
    );

    const childProps: SignInProps = {
        t,
        formControl,
        formState,
        onSubmit: handleSubmit,
    };

    return (
        <DeviceDetector
            mobile={<SignInMobile {...childProps} />}
            desktop={<SignInDesktop {...childProps} />}
        />
    );
}
