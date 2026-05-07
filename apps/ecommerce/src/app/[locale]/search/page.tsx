import Search from 'pages/search';

type Props = Readonly<{
    params: Promise<{ locale: string }>;
}>;

export default async function SearchPage({ params }: Props) {
    const locale = (await params).locale;

    return (
        <Search locale={locale} />
    );
}
