'use client';

import { useTranslations } from 'next-intl';
import { Bell, Globe, Palette } from 'lucide-react';

import {
    Field,
    FieldTitle,
} from '@yimall/ui';

import LanguageSelector from './language-selector';
import ThemeSwitcher from './theme-switcher';
import NotificationSwitcher from './notification-switcher';

type Props = Readonly<object>;

export default function Configuration({ }: Props) {
    const t = useTranslations();

    const options = []

    return (
        <div className='flex flex-col gap-6'>
            <Field className='justify-between' orientation='horizontal'>
                <FieldTitle>
                    <Globe className='size-4 text-foreground/50' /> {t('common.language')}
                </FieldTitle>
                <LanguageSelector />
            </Field>
            <Field className='justify-between' orientation='horizontal'>
                <FieldTitle>
                    <Palette className='size-4 text-foreground/50' /> {t('common.appearance')}
                </FieldTitle>
                <ThemeSwitcher />
            </Field>
            <Field className='justify-between' orientation='horizontal'>
                <FieldTitle>
                    <Bell className='size-4 text-foreground/50' /> {t('common.notification')}
                </FieldTitle>
                <NotificationSwitcher />
            </Field>
        </div>
    );
}
