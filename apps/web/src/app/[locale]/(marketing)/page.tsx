import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import Marketing from 'pages/marketing';

type Props = Readonly<{
    params: Promise<{ locale: string; }>;
}>;

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { params } = props;

    const locale = (await params).locale;

    const t = await getTranslations({
        locale,
        namespace: 'metadata',
    });

    return {};
}

export default async function MarketingPage(props: Props) {
    const { } = props;

    return (
        <Marketing />
    );
}
