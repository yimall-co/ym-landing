'use client'

import type { ReactNode } from 'react';

import { Fragment } from 'react';
import { useTheme } from 'next-themes';

import Header from 'layouts/header';

type Props = Readonly<{
    children: ReactNode;
}>;

export default function MarketingLayout({ children }: Props) {
    'use memo'
    const {
        theme,
        setTheme,
    } = useTheme();

    const handleChangeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <Fragment>
            <Header />
            <div
                className='flex flex-col'
                style={{
                    paddingTop: 'var(--header-height)',
                    // minHeight: `calc(100dvh - var(--header-height))`,
                    minHeight: '100dvh',
                }}
            >
                {children}
            </div>
        </Fragment>
    );
}
