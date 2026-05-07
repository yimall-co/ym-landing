'use client';

import type { Location } from 'lib/dtos/location';
import type { MapCameraChangedEvent, MapCameraProps } from '@vis.gl/react-google-maps';

import { Fragment } from 'react';
import { useTranslations } from 'next-intl';

import { useGeolocation, useLocalStorage } from 'shared/hooks';

import { useGeolocationsData } from 'features/location/hooks';

import DeviceDetector from 'components/device-detector';

import LocationMobile from './mobile';
import LocationDesktop from './desktop';

type Props = Readonly<{
    locale: string;
}>;

export type LocationProps = Props & Readonly<{
    t: ReturnType<typeof useTranslations>;
    camera: MapCameraProps;
    geolocations: Array<Location>;
    currentGeolocation: GeolocationPosition | null;
    onCameraChanged: (event: MapCameraChangedEvent) => void;
}>;

export default function Location({ locale }: Props) {
    'use memo'
    const t = useTranslations();

    const { currentGeolocation } = useGeolocation();

    const { data: geolocations } = useGeolocationsData();

    const [camera, setCamera] = useLocalStorage<MapCameraProps>('camera', {
        center: {
            lat: currentGeolocation?.coords?.latitude ?? 37.7749,
            lng: currentGeolocation?.coords?.longitude ?? -122.4194,
        },
        zoom: 10,
    });

    const handleCameraChanged = (event: MapCameraChangedEvent) => {
        setCamera(event.detail);
    };

    const childProps: LocationProps = {
        t,
        locale,
        camera,
        geolocations: geolocations ?? [],
        currentGeolocation,
        onCameraChanged: handleCameraChanged,
    };

    return (
        <DeviceDetector>
            {(isMobile, isDesktop, isTablet) => (
                <Fragment>
                    {isDesktop && <LocationDesktop {...childProps} />}
                    {(isMobile || isTablet) && <LocationMobile {...childProps} />}
                </Fragment>
            )}
        </DeviceDetector>
    );
}
