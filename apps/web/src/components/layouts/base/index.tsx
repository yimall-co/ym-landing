'use client'

import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from 'lib/get-query-client';

import { DeviceProvider } from 'shared/contexts/device';

import { Toaster } from 'ui/sonner';

type LayoutProps = Readonly<{
    children: ReactNode;
}>;

export default function BaseLayout({ children }: LayoutProps) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <DeviceProvider>
                <Toaster
                    visibleToasts={5}
                    position='top-center'
                />
                {children}
            </DeviceProvider>
        </QueryClientProvider>
    );
}
