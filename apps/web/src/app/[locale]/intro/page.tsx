import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Intro from 'pages/intro';

type Props = Readonly<{
    params: Promise<{ locale: string; }>;
}>;

export default async function IntroPage({ params }: Props) {
    const locale = (await params).locale;

    const cookieStore = await cookies();
    if (cookieStore.has('visited')) return redirect(`/${locale}`);

    return (
        <Intro locale={locale} />
    );
}
