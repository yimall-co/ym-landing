'use client'

import type { ReactNode } from 'react';

import { DeviceProvider } from 'shared/contexts/device';

type LayoutProps = Readonly<{
    children: ReactNode;
}>;

export default function BaseLayout(props: LayoutProps) {
    const { children } = props;

    return (
        <DeviceProvider>
            {children}
        </DeviceProvider>
    );
}