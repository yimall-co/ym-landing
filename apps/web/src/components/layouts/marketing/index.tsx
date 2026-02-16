'use client'

import type { ReactNode } from 'react';

import { Fragment } from 'react';
import { useTheme } from 'next-themes';

import { Dock } from '@yimall/ui';

import Header from 'layouts/header';

type Props = Readonly<{
    children: ReactNode;
}>;

export default function MarketingLayout(props: Props) {
    'use memo'
    const { children } = props;

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
            {/* <Dock
                className='fixed bottom-0'
                items={[
                    {
                        icon: <></>,
                        label: 'Theme',
                        onClick: handleChangeTheme,
                    },
                    {
                        icon: <></>,
                        label: 'About',
                        onClick: () => console.log('about'),
                    },
                    {
                        icon: <></>,
                        label: 'Contact',
                        onClick: () => console.log('contact'),
                    },
                ]}
                baseItemSize={48}
            /> */}
        </Fragment>
    );
}