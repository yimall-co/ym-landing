'use client';

import type { LocationProps } from 'pages/location';

import { clientEnv } from 'env/client';

import { AdvancedMarker, Map, Pin } from '@yimall/ui';

type Props = Omit<LocationProps, 't' | 'locale'>;

export default function LocationMap({
    camera,
    geolocations,
    currentGeolocation,
    onCameraChanged,
}: Props) {
    'use memo'
    return (
        <Map
            mapId={clientEnv.NEXT_PUBLIC_GOOGLE_MAP_ID}
            zoom={camera.zoom}
            center={{
                lat: camera.center.lat,
                lng: camera.center.lng,
            }}
            onCameraChanged={onCameraChanged}
            className='flex-1 shrink-0 size-full rounded-[inherit]'
        >
            {currentGeolocation && (
                <AdvancedMarker
                    position={{
                        lat: currentGeolocation.coords.latitude,
                        lng: currentGeolocation.coords.longitude,
                    }}
                />
            )}
            {geolocations.map((geolocation) => (
                <AdvancedMarker
                    key={geolocation.id}
                    position={{
                        lat: +geolocation.latitude,
                        lng: +geolocation.longitude,
                    }}
                >
                    <Pin
                        background='var(--color-primary)'
                        borderColor='var(--foreground)'
                        glyphColor='transparent'
                    />
                </AdvancedMarker>
            ))}
        </Map>
    );
}
