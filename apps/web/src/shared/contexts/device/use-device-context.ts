import { useMemo } from 'react';
import { getCookie } from 'cookies-next/client'

import { useWindowSize } from 'shared/hooks';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

type DeviceInfo = {
    type: DeviceType;
    vendor: string;
    model: string;
};

type UseDeviceContext = Readonly<{
    device: DeviceType;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}>;

export default function useDeviceContext(): UseDeviceContext {
    const deviceInfo = useMemo<DeviceInfo | null>(
        () => {
            const cookie = getCookie('device-info');
            if (!cookie) return null;

            const parsed = JSON.parse(cookie) as DeviceInfo;

            if (!parsed.type) parsed.type = 'desktop';
            if (!parsed.model) parsed.model = 'unknown';
            if (!parsed.vendor) parsed.vendor = 'unknown';

            return parsed;
        },
        [getCookie],
    );

    const device = useMemo<DeviceType>(
        () => {
            if (!deviceInfo) return 'desktop';

            const unsupportedDevices = [
                'console',
                'smarttv',
                'wearable',
                'embedded',
            ];

            const type = !deviceInfo.type || unsupportedDevices.includes(deviceInfo.type)
                ? 'desktop'
                : deviceInfo.type;
            return type;
        },
        [deviceInfo],
    );

    const { size } = useWindowSize();

    const isMobile = device === 'mobile' && size.width <= 648;
    const isTablet = device === 'tablet' && size.width <= 1024;
    const isDesktop = device === 'desktop' && !isMobile && !isTablet;

    return {
        device,
        isMobile,
        isTablet,
        isDesktop,
    };
}