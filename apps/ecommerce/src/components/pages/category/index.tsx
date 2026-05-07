'use client';

import { useTranslations } from 'next-intl';

type Props = Readonly<{
    locale: string;
    categorySlug: string;
}>;

export type CategoryProps = Props & Readonly<{
    t: ReturnType<typeof useTranslations>;
}>

export default function Category({ locale, categorySlug }: Props) {
    const t = useTranslations();

    return (
        <>
            Category: {categorySlug}
        </>
    );
}
