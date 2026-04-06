type Props = Readonly<{
    params: Promise<{ locale: string }>;
}>;

export default async function CatalogPage({ params }: Props) {
    const locale = (await params).locale;

    return (
        <main>
            <h1>{locale}</h1>
        </main>
    );
}
