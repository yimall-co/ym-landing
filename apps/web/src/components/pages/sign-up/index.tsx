'use client';

import type { SignUpSchema } from 'features/sign-up/schema';

import {
    Fragment,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { createFormControl, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { clientEnv } from 'env/client';

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
}>;

export default function SignUp({
    locale,
}: Props) {
    'use memo'
    const t = useTranslations();

    // const [currentStep, setCurrentStep] = useLocalStorage<number>('sign-up-current-step', 1);
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

    const handleFinalStepCompleted = useCallback(
        async () => {
            const isValid = formState.isValid;
            const values = formControl.getValues();

            if (!isValid) {
                toast.error('Please fill all fields');
                return;
            }

            const onSuccess = (data: any) => {
                console.log(data);
                return 'Sign up successfully';
            }

            const onError = (error: Error) => {
                return error.message;
            }

            toast.promise(
                signUpMutation.mutateAsync(values),
                {
                    loading: 'Signing up...',
                    success: onSuccess,
                    error: onError,
                },
            );
        },
        [formControl, formState, toast, signUpMutation],
    );

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();

            // TODO: save progress here.
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
