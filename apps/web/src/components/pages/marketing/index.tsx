'use client'

import type { FC } from 'react';

import { useTranslations } from 'next-intl';

import {
    Main,
    Heading,
    FloatingLines,
} from '@yimall/ui';

type Props = Readonly<{}>;

const Marketing: FC<Props> = () => {
    'use memo'
    const t = useTranslations();

    return (
        <Main className='h-dvh relative'>

        </Main>
    );
}

export default Marketing;
