'use client'

import type { ReactNode } from 'react';

import { useDevice } from 'shared/contexts/device';

import {
    Section,
    SidebarProvider,
} from '@yimall/ui';

import DashboardSidebar from 'features/dashboard/sidebar';
import DashboardToolbar from 'features/dashboard/toolbar';

type Props = Readonly<{
    children: ReactNode;
}>;

export default function DashboardLayout({ children }: Props) {
    const { isMobile } = useDevice();

    return (
        <SidebarProvider isMobile={isMobile}>
            <DashboardSidebar />
            <Section className='min-h-full' position='relative'>
                <DashboardToolbar />
                <div
                    className='relative size-full p-4'
                    style={{
                        paddingTop: 'var(--dashboard-toolbar-height)',
                    }}
                >
                    {children}
                </div>
            </Section>
        </SidebarProvider>
    );
}
