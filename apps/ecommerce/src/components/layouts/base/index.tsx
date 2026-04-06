'use client';

import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';
import { ProgressBarProvider, ProgressBar } from 'react-transition-progress';

import { getQueryClient } from 'lib/query-client';

import { DeviceProvider } from 'shared/contexts/device';

import { Toaster } from 'ui/sonner';

import RootPopover from 'components/popover';
import RootDropdown from 'components/dropdown';

type Props = Readonly<{
    children: ReactNode;
}>;

export default function BaseLayout({ children }: Props) {
    const [queryClient] = useState(() => getQueryClient());

    return (
        <ThemeProvider enableSystem attribute='class'>
            <QueryClientProvider client={queryClient}>
                <ProgressBarProvider>
                    <DeviceProvider>
                        <ProgressBar className='fixed h-1 shadow-lg shadow-primary/20 bg-primary top-0 z-50' />
                        <Toaster
                            visibleToasts={5}
                            position='bottom-center'
                        />
                        {children}
                        <RootPopover />
                        <RootDropdown />
                    </DeviceProvider>
                </ProgressBarProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
