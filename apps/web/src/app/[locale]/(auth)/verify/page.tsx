import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

// import SignIn from 'pages/sign-in';

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

export default async function VerifyPage({ params }: Props) {
    const locale = (await params).locale;

    return (
        <>Verify</>
    );
}
