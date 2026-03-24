import type { Metadata } from 'next';

type Props = Readonly<{
    params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = (await params).locale;

    return {};
}

export default async function CookiesPage({ params }: Props) {
    const locale = (await params).locale;

    return (
        <>
            Cookies Policy
        </>
    );
}
