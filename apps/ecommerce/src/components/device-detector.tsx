'use client'

import type { ReactNode } from 'react';

import { Activity } from 'react';

import { useDevice } from 'shared/contexts/device';

import { useMounted } from '@yimall/ui/hooks';

type Props = Readonly<{
    children: (
        isMobile: boolean,
        isDesktop: boolean,
        isTablet: boolean,
    ) => ReactNode;
}>;

export default function DeviceDetector({
    children,
}: Props) {
    const mounted = useMounted();

    const {
        isMobile,
        isDesktop,
        isTablet,
    } = useDevice();

    if (!mounted) return null;

    return (
        <Activity>
            {children(isMobile, isDesktop, isTablet)}
        </Activity>
    );
}
