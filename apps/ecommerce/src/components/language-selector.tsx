'use client';

import { startTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useProgress } from 'react-transition-progress';

import { useRouter, locales, usePathname } from 'lib/i18n';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@yimall/ui';

type Props = Readonly<object>;

export default function LanguageSelector({ }: Props) {
    const t = useTranslations();

    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const startProgress = useProgress();

    const handleChangeLanguage = (locale: string) => {
        startTransition(() => {
            startProgress();

            // router.replace({ pathname, params } as any, { locale })
            router.replace(pathname, { locale });
        });
    }

    const languageOptions = locales.map((l) => ({
        label: t('common.languages.' + l.code),
        code: l.code
    }));

    return (
        <Select
            value={locale}
            items={languageOptions.map((l) => ({ label: l.label, value: l.code }))}
            onValueChange={(value) => handleChangeLanguage(value ?? locale)}
        >
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger>
                <SelectGroup>
                    <SelectLabel>{t('common.language')}</SelectLabel>
                    {languageOptions.map((language) => (
                        <SelectItem key={language.code} value={language.code}>
                            {language.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
