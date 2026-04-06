'use client'

import type { ReactNode } from 'react';

import { Activity } from 'react';

import { useDevice } from 'shared/contexts/device';

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
    const {
        isMobile,
        isDesktop,
        isTablet,
    } = useDevice();

    return (
        <Activity>
            {children(isMobile, isDesktop, isTablet)}
        </Activity>
    );
}
