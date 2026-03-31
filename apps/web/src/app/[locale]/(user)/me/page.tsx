type Props = Readonly<{
    params: Promise<{ locale: string }>;
}>;

export default async function MePage({ params }: Props) {
    const locale = (await params).locale;

    return (
        <div className="flex flex-col">
            <h1>Me</h1>
        </div>
    );
}
