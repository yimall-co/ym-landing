import type { Metadata } from 'next';

import Marketing from 'pages/marketing';

type Props = Readonly<{
    params: Promise<{ locale: string; }>;
}>;

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: Props): Promise<Metadata> {
    return {

    };
}

export default async function MarketingPage(props: Props) {
    const { } = props;

    return (
        <Marketing />
    );
}
