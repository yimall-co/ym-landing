type Props = Readonly<{
    params: Promise<{ locale: string }>;
}>;

export default async function Page({ params }: Props) {
    const locale = (await params).locale;

    return (
        <div className="flex flex-col">
            <h1>Me</h1>
        </div>
    );
}
