'use client';

import type { LocationProps } from 'pages/location';

import { Section } from '@yimall/ui';

import LocationMap from 'features/location/map';

type Props = LocationProps

export default function LocationMobile({
    camera,
    geolocations,
    currentGeolocation,
    onCameraChanged,
}: Props) {
    'use memo'

    return (
        <Section className='h-dvh'>
            <LocationMap
                camera={camera}
                geolocations={geolocations}
                currentGeolocation={currentGeolocation}
                onCameraChanged={onCameraChanged}
            />
        </Section>
    );
}
