'use client'

import type { ReactNode } from 'react';

import { useDevice } from 'shared/contexts/device';

type Props = Readonly<{
    mobile: ReactNode;
    desktop: ReactNode;
}>;

export function DeviceDetector({
    mobile,
    desktop,
}: Props) {
    'use memo'
    const { isMobile } = useDevice();
    return isMobile ? mobile : desktop;
}
