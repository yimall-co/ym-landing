import Link from 'next/link';

import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import { setConsent } from 'app/actions';

import { Button, Paragraph } from '@yimall/ui';

type Props = Readonly<object>;

export default async function CookiesConsent({ }: Props) {
    const t = await getTranslations();

    const cookieStore = await cookies();

    const consent = cookieStore.get('consent');

    if (consent?.value) return null;

    return (
        <form
            action={setConsent}
            className='fixed bottom-0 left-0 right-0 z-50 md:max-w-3xl mx-auto flex items-center gap-x-4 justify-center p-4 bg-background rounded-lg border-t md:border border-neutral-600/20'
        >
            <Paragraph>
                {t('CookiesConsent.description')}{" "}
                <Link className='underline' href='/cookies'>{t('common.readMore')}</Link>
            </Paragraph>
            <Button
                type='submit'
                shape='pill'
                size='sm'
            >
                {t('common.accept')}
            </Button>
        </form>
    );
}
