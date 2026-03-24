'use client';

import type { SignInProps } from 'pages/sign-in';

import Link from 'next/link';

import { ZodOptional } from 'zod';
import { Controller } from 'react-hook-form';

import {
    Button,
    Checkbox,
    Field,
    FieldError,
    FieldLabel,
    Heading,
    Input,
    Paragraph,
} from '@yimall/ui';

import { Recaptcha } from 'components/recaptcha';

import { signInSchema } from 'features/sign-in/schema';

type Props = SignInProps;

export default function SignInMobile({
    t,
    formControl: {
        control,
        handleSubmit,
    },
    formState: {
        isValid,
    },
    onSubmit,
    onRecaptcha,
}: Props) {
    'use memo'

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex-1 h-full flex flex-col'>
            <div className='flex-1 flex flex-col gap-y-4 p-4'>
                <div className='flex flex-col gap-y-2'>
                    <Heading level='2' className='text-2xl'>
                        {t('SignIn.title')}
                    </Heading>
                    <Paragraph>
                        {t('SignIn.description')}
                    </Paragraph>
                </div>
                <Controller
                    control={control}
                    name='email'
                    render={({ field, fieldState }) => {
                        const isInvalid = fieldState.invalid && (fieldState.isDirty || fieldState.isTouched);

                        const errorMessage = fieldState.error?.message;
                        const errors = Array.of({ message: errorMessage ? t(errorMessage) : '' });

                        return (
                            <Field
                                required={!(signInSchema.shape.email instanceof ZodOptional)}
                                data-invalid={isInvalid}
                            >
                                <FieldLabel htmlFor='email'>
                                    {t('SignIn.email.label')}
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id='email'
                                    type='email'
                                    placeholder={t('SignIn.email.placeholder')}
                                />
                                <FieldError errors={errors} />
                            </Field>
                        );
                    }}
                />
                <Controller
                    control={control}
                    name='password'
                    render={({ field, fieldState }) => {
                        const isInvalid = fieldState.invalid && (fieldState.isDirty || fieldState.isTouched);

                        const errorMessage = fieldState.error?.message;
                        const errors = Array.of({ message: errorMessage ? t(errorMessage) : '' });

                        return (
                            <Field
                                required={!(signInSchema.shape.password instanceof ZodOptional)}
                                data-invalid={isInvalid}
                            >
                                <FieldLabel htmlFor='password'>
                                    {t('SignIn.password.label')}
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id='password'
                                    type='password'
                                    placeholder={t('SignIn.password.placeholder')}
                                />
                                <FieldError errors={errors} />
                            </Field>
                        );
                    }}
                />
                <div className='flex items-center gap-x-4 justify-between'>
                    <Controller
                        control={control}
                        name='rememberMe'
                        render={({ field, fieldState }) => {
                            const isInvalid = fieldState.invalid && (fieldState.isDirty || fieldState.isTouched);

                            return (
                                <Field
                                    required={!(signInSchema.shape.rememberMe instanceof ZodOptional)}
                                    data-invalid={isInvalid}
                                    orientation='horizontal'
                                    className='w-fit'
                                >
                                    <Checkbox
                                        id='rememberMe'
                                        checked={field.value}
                                        value={String(field.value)}
                                        onCheckedChange={field.onChange}
                                    />
                                    <FieldLabel htmlFor='rememberMe' className='ml-0'>
                                        {t('SignIn.rememberMe.label')}
                                    </FieldLabel>
                                </Field>
                            );
                        }}
                    />
                    <Link href='/reset-password' className='w-fit text-sm text-right hover:underline'>
                        {t('SignIn.forgotPassword')}
                    </Link>
                </div>
                <Recaptcha action='signin' onRecaptcha={onRecaptcha} />
                <Button shape='pill' size='xl' type='submit' disabled={!isValid}>
                    {t('SignIn.submit')}
                </Button>
                <div className='flex items-center justify-center gap-x-2'>
                    <Paragraph>
                        {t('SignIn.alreadyHaveAccount')}
                    </Paragraph>
                    <Link href='/sign-up' className='underline'>
                        {t('SignIn.signUp')}
                    </Link>
                </div>
            </div>
        </form>
    );
}
