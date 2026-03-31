'use client';

import { useEffect } from 'react';

import { useElementSize } from 'shared/hooks';
import { useDevice } from 'shared/contexts/device';

import { SidebarTrigger } from '@yimall/ui';

type Props = Readonly<{}>;

export default function DashboardToolbar({ }: Props) {
    const device = useDevice();

    const { ref, size } = useElementSize<HTMLDivElement>();

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--dashboard-toolbar-height',
            `${size.height}px`,
        );

        document.documentElement.style.setProperty(
            '--dashboard-toolbar-width',
            `${size.width}px`,
        );
    }, [size]);

    return (
        <div
            ref={ref}
            role='toolbar'
            className='absolute z-50 w-full bg-foreground/10'
            style={{
                height: device.isMobile ? '60px' : '72px',
            } as React.CSSProperties}
        >
            <div className='size-full p-4 flex items-center'>
                <SidebarTrigger />
                <div className='ml-auto'>
                </div>
            </div>
        </div>
    );
}
