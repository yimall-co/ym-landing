'use client'

import type { ReactNode } from 'react';

import { Section } from '@yimall/ui';

type Props = Readonly<{
    children: ReactNode;
}>;

export default function AuthLayout({ children }: Props) {
    'use memo'

    return (
        <Section className='h-dvh overflow-hidden' position='relative'>
            {children}
        </Section>
    );
}
