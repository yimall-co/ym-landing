'use client'

import type { ReactNode } from 'react';

import { Fragment } from 'react';

type Props = Readonly<{
    children: ReactNode;
}>;

export default function UserLayout({ children }: Props) {
    'use memo'

    return (
        <Fragment>
            {children}
        </Fragment>
    );
}
