'use client';

import type { SignInProps } from 'pages/sign-in';

type Props = SignInProps

export default function SignInMobile({
    t,
}: Props) {
    'use memo'

    return (
        <div>{t('sign-in.title')}</div>
    );
}
