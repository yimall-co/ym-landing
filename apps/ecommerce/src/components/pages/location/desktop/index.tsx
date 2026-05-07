'use client';

import type { LocationProps } from 'pages/location';

import LocationMap from 'features/location/map';

type Props = LocationProps

export default function LocationDesktop({
    camera,
    geolocations,
    currentGeolocation,
    onCameraChanged,
}: Props) {
    'use memo'

    return (
        <div className='size-full rounded-[inherit]'>
            <LocationMap
                camera={camera}
                geolocations={geolocations}
                currentGeolocation={currentGeolocation}
                onCameraChanged={onCameraChanged}
            />
        </div>
    );
}
