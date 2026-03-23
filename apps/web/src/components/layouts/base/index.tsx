'use client'

import type { ReactNode } from 'react';

import { DeviceProvider } from 'shared/contexts/device';

import { Toaster } from 'ui/sonner';

type LayoutProps = Readonly<{
    children: ReactNode;
}>;

export default function BaseLayout({ children }: LayoutProps) {
    return (
        <DeviceProvider>
            <Toaster />
            {children}
        </DeviceProvider>
    );
}
