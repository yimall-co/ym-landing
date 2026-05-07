'use client';

type Props = Readonly<{
    locale: string;
    offerSlug: string;
}>;

export default function Offer({ locale, offerSlug }: Props) {
    'use memo'

    return (
        <main>
            <h1>Offer</h1>
        </main>
    );
}
