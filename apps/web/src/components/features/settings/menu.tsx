'use client';

import { useTranslations } from 'next-intl';
import { Globe, Palette } from 'lucide-react';

import {
    Field,
    FieldTitle,
    PopoverDescription,
    PopoverTitle,
} from '@yimall/ui';

import ThemeSwitcher from './theme-switcher';
import LanguageSelector from './language-selector';

type Props = Readonly<{}>;

export default function SettingsMenu({ }: Props) {
    const t = useTranslations();

    return (
        <div className='flex flex-col gap-y-6 p-1.5'>
            <div className='flex flex-col gap-y-2'>
                <PopoverTitle>{t('Dashboard.settings.title')}</PopoverTitle>
                <PopoverDescription>{t('Dashboard.settings.description')}</PopoverDescription>
            </div>
            <Field className='justify-between' orientation='horizontal'>
                <FieldTitle>
                    <Globe className='size-4 text-foreground/50' />{t('Dashboard.settings.displayLanguage')}
                </FieldTitle>
                <LanguageSelector />
            </Field>
            <Field className='justify-between' orientation='horizontal'>
                <FieldTitle>
                    <Palette className='size-4 text-foreground/50' />{t('Dashboard.settings.appearance')}
                </FieldTitle>
                <ThemeSwitcher />
            </Field>
        </div>
    );
}
