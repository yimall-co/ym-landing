'use client'

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import {
    Field,
    Input,
} from '@yimall/ui';

import OnboardingStepContainer from './step-container';

type Props = Readonly<object>;

export default function OnboardingStepSearch({ }: Props) {
    const t = useTranslations('Onboarding.search');

    const [query, setQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    };

    return (
        <OnboardingStepContainer
            title={t('title')}
            description={t('description')}
        >
            <div className='flex-1 flex flex-col'>
                <Field className='z-50'>
                    <Input
                        value={query}
                        onChange={handleInputChange}
                        placeholder='Search'
                    />
                </Field>
            </div>
        </OnboardingStepContainer>
    );
}
