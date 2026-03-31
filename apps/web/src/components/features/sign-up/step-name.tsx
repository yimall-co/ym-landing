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

export default function StepName({
    t,
    control,
}: Props) {
    'use memo'

    return (
        <div className='flex flex-col gap-y-6'>
            <IntroSection
                title={t('SignUp.name.title')}
                subtitle={t('SignUp.name.subtitle')}
                description={t('SignUp.name.description')}
            />
            <Controller
                control={control}
                name='name'
                render={({ field, fieldState, }) => {
                    const errorMessage = fieldState.error?.message;
                    const errors = Array.of({ message: errorMessage ? t(errorMessage, { maxLength: 100 }) : '' });

                    return (
                        <Field
                            data-invalid={fieldState.invalid}
                            required={!(signUpSchema.shape.name instanceof ZodOptional)}
                        >
                            <FieldLabel htmlFor='name'>{t('SignUp.name.label')}</FieldLabel>
                            <Input
                                {...field}
                                id='name'
                                type='text'
                                aria-invalid={fieldState.invalid}
                                autoComplete='off'
                                placeholder={t('SignUp.name.placeholder')}
                            />
                            {fieldState.invalid && errors.length > 0 && (
                                <FieldError errors={errors} />
                            )}
                        </Field>
                    );
                }}
            />
        </div>
    );
}
