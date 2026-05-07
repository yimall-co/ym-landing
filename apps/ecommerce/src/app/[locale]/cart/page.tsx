import Cart from 'pages/cart';

type Props = Readonly<{
    params: Promise<{ locale: string }>;
}>;

export default async function CartPage({ params }: Props) {
    const locale = (await params).locale;

    return (
        <Cart locale={locale} />
    );
}
