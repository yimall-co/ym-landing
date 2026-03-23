import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import SignUp from 'pages/sign-up';

type Props = Readonly<{
    params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = (await params).locale;

    const t = await getTranslations({
        locale,
        namespace: '',
    });

    return {};
}

export default async function Page({ params }: Props) {
    'use memo'

    const locale = (await params).locale;

    return (
        <SignUp locale={locale} />
    );
}
