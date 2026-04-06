'use client'

import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ProgressBarProvider, ProgressBar } from 'react-transition-progress';

import { getQueryClient } from 'lib/query-client';

import { DeviceProvider } from 'shared/contexts/device';
import { NavigationProvider } from 'shared/contexts/navigation';

import { Toaster } from 'ui/sonner';

import AppPopover from 'features/app/popover';
import AppDropdown from 'features/app/dropdown';

type Props = Readonly<{
    children: ReactNode;
}>;

export default function BaseLayout({ children }: Props) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ProgressBarProvider>
                <NavigationProvider>
                    <DeviceProvider>
                        <ProgressBar className='fixed h-1 shadow-lg shadow-primary/20 bg-primary top-0 z-50' />
                        <Toaster
                            visibleToasts={5}
                            position='bottom-center'
                        />
                        {children}
                        <AppPopover />
                        <AppDropdown />
                    </DeviceProvider>
                </NavigationProvider>
            </ProgressBarProvider>
        </QueryClientProvider>
    );
}
