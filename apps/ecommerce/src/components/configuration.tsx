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

type Props = Readonly<{
    showLanguage?: boolean;
    showTheme?: boolean;
    showNotification?: boolean;
}>;

export default function Configuration({
    showLanguage = true,
    showTheme = true,
    showNotification = true
}: Props) {
    const t = useTranslations();

    return (
        <div className='flex flex-col gap-6'>
            {showLanguage && (
                <Field className='justify-between' orientation='horizontal'>
                    <FieldTitle>
                        <Globe className='size-4 text-foreground/50' /> {t('common.language')}
                    </FieldTitle>
                    <LanguageSelector />
                </Field>
            )}
            {showTheme && (
                <Field className='justify-between' orientation='horizontal'>
                    <FieldTitle>
                        <Palette className='size-4 text-foreground/50' /> {t('common.appearance')}
                    </FieldTitle>
                    <ThemeSwitcher />
                </Field>
            )}
            {showNotification && (
                <Field className='justify-between' orientation='horizontal'>
                    <FieldTitle>
                        <Bell className='size-4 text-foreground/50' /> {t('common.notification')}
                    </FieldTitle>
                    <NotificationSwitcher />
                </Field>
            )}
        </div>
    );
}
