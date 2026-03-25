'use client'

import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ProgressBarProvider, ProgressBar } from 'react-transition-progress';

import { getQueryClient } from 'lib/get-query-client';
import { DeviceProvider } from 'shared/contexts/device';

import { Toaster } from 'ui/sonner';

import AppPopover from 'components/features/app/popover';

type Props = Readonly<{
    children: ReactNode;
}>;

export default function BaseLayout({ children }: Props) {
    const queryClient = getQueryClient();

    return (
        <ProgressBarProvider>
            <QueryClientProvider client={queryClient}>
                <DeviceProvider>
                    <ProgressBar className='fixed h-1 shadow-lg shadow-primary/20 bg-primary top-0 z-50' />
                    <Toaster
                        visibleToasts={5}
                        position='top-center'
                    />
                    {children}
                    <AppPopover />
                </DeviceProvider>
            </QueryClientProvider>
        </ProgressBarProvider>
    );
}
