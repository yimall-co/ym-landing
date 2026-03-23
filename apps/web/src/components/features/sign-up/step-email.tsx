'use client';

import type { Control } from 'react-hook-form';
import type { SignUpSchema } from './schema';

import { ZodOptional } from 'zod';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import {
    Field,
    FieldError,
    FieldLabel,
    Input,
} from '@yimall/ui';

import { signUpSchema } from './schema';

import IntroSection from './intro-section';

type Props = Readonly<{
    control: Control<SignUpSchema>;
    t: ReturnType<typeof useTranslations>;
}>;

export default function StepEmail({
    t,
    control,
}: Props) {
    'use memo'

    return (
        <div className='flex flex-col gap-y-6'>
            <IntroSection
                title={t('SignUp.email.title')}
                subtitle={t('SignUp.email.subtitle')}
                description={t('SignUp.email.description')}
            />
            <Controller
                control={control}
                name='email'
                render={({ field, fieldState, }) => {
                    const isInvalid = fieldState.invalid && (fieldState.isDirty || fieldState.isTouched);

                    const errorMessage = fieldState.error?.message;
                    const errors = Array.of({ message: errorMessage ? t(errorMessage) : '' });

                    return (
                        <Field
                            required={!(signUpSchema.shape.email instanceof ZodOptional)}
                            data-invalid={isInvalid}
                        >
                            <FieldLabel htmlFor='email'>{t('SignUp.email.label')}</FieldLabel>
                            <Input
                                {...field}
                                id='email'
                                type='email'
                                placeholder={t('SignUp.email.placeholder')}
                            />
                            <FieldError errors={errors} />
                        </Field>
                    );
                }}
            />
            <Controller
                control={control}
                name='password'
                render={({ field, fieldState, }) => {
                    const isInvalid = fieldState.invalid && (fieldState.isDirty || fieldState.isTouched);

                    const errorMessage = fieldState.error?.message;
                    const errors = Array.of({ message: errorMessage ? t(errorMessage, { minLength: 6 }) : '' });

                    return (
                        <Field
                            required={!(signUpSchema.shape.password instanceof ZodOptional)}
                            data-invalid={isInvalid}
                        >
                            <FieldLabel htmlFor='password'>{t('SignUp.password.label')}</FieldLabel>
                            <Input
                                {...field}
                                id='password'
                                type='password'
                                placeholder={t('SignUp.password.placeholder')}
                            />
                            <FieldError errors={errors} />
                        </Field>
                    );
                }}
            />
        </div>
    );
}
