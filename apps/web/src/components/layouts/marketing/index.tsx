'use client'

import type { ReactNode } from 'react';

import { Fragment } from 'react';

import Header from 'layouts/header';

type Props = Readonly<{
    children: ReactNode;
}>;

export default function MarketingLayout(props: Props) {
    'use memo'
    const { children } = props;

    return (
        <Fragment>
            <Header />
            {children}
        </Fragment>
    );
}