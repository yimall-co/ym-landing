'use client';

import type { Control } from 'react-hook-form';
import type { SignUpSchema } from './schema';

import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import {
    Checkbox,
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@yimall/ui';

import IntroSection from './intro-section';

type Props = Readonly<{
    control: Control<SignUpSchema>;
    t: ReturnType<typeof useTranslations>;
}>

export default function StepTerms({
    t,
    control,
}: Props) {
    'use memo'

    return (
        <div className='flex flex-col gap-y-6'>
            <IntroSection
                title={t('SignUp.terms.title')}
                subtitle={t('SignUp.terms.subtitle')}
                description={t('SignUp.terms.description')}
            />
            <Controller
                control={control}
                name='termsAndConditions'
                render={({ field, fieldState }) => {
                    const isInvalid = fieldState.invalid && (fieldState.isDirty || fieldState.isTouched);

                    const errorMessage = fieldState.error?.message;
                    const errors = Array.of({ message: errorMessage ? t(errorMessage) : '' });

                    return (
                        <Field orientation='horizontal' data-invalid={isInvalid}>
                            <Checkbox
                                {...field}
                                checked={field.value}
                                value={String(field.value)}
                                onCheckedChange={(value) => field.onChange(value)}
                                onBlur={field.onBlur}
                                id='termsAndConditions'
                            />
                            <FieldContent>
                                <FieldLabel htmlFor='termsAndConditions'>{t('SignUp.terms.label')}</FieldLabel>
                                <FieldDescription>
                                    {t('SignUp.terms.labelDescription')}
                                </FieldDescription>
                                <FieldError errors={errors} />
                            </FieldContent>
                        </Field>
                    );
                }}
            />
            <Controller
                control={control}
                name='newsLetter'
                render={({ field, fieldState }) => {
                    const isInvalid = fieldState.invalid && (fieldState.isDirty || fieldState.isTouched);

                    const errorMessage = fieldState.error?.message;
                    const errors = Array.of({ message: errorMessage ? t(errorMessage) : '' });

                    return (
                        <Field orientation='horizontal' data-invalid={isInvalid}>
                            <Checkbox
                                {...field}
                                checked={field.value}
                                value={String(field.value)}
                                onCheckedChange={(value) => field.onChange(value)}
                                onBlur={field.onBlur}
                                id='newsLetter'
                            />
                            <FieldContent>
                                <FieldLabel htmlFor='newsLetter'>{t('SignUp.newsLetter.label')}</FieldLabel>
                                <FieldDescription>
                                    {t('SignUp.newsLetter.labelDescription')}
                                </FieldDescription>
                                <FieldError errors={errors} />
                            </FieldContent>
                        </Field>
                    );
                }}
            />
        </div>
    )
}
