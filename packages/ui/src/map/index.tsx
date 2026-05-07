'use client'

import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { useId } from 'react';
import { tv } from 'tailwind-variants';
import {
    Map as BaseMap,
    Pin as BasePin,
    InfoWindow as BaseInfoWindow,
    AdvancedMarker as BaseAdvanceMarker,
    StaticMap as BaseStaticMap,
} from '@vis.gl/react-google-maps';

const map = tv({
    slots: {
        root: [
            'w-full',
            'min-h-full',
        ],
        infoWindow: [''],
        marker: [''],
        staticMap: [''],
    },
    variants: {},
});

type MapVariants = VariantProps<typeof map>;

type MapProps = MapVariants & ComponentProps<typeof BaseMap>;

function Map({ className, ...props }: MapProps) {
    'use memo'
    const { root } = map();

    const uniqueId = useId();

    return (
        <BaseMap
            id={uniqueId}
            reuseMaps
            disableDefaultUI
            colorScheme='DARK'
            zoom={12.5}
            streetViewControlOptions={{
                sources: null,
            }}
            {...props}
            data-slot='map'
            className={root({
                className,
            })}
        />
    );
}

type PinProps = MapVariants & ComponentProps<typeof BasePin>;

function Pin({ ...props }: PinProps) {
    'use memo'

    return (
        <BasePin {...props} />
    );
}

type AdvancedMarkerProps = MapVariants & ComponentProps<typeof BaseAdvanceMarker>;

function AdvancedMarker({ className, ...props }: AdvancedMarkerProps) {
    'use memo'
    const { marker } = map();

    return (
        <BaseAdvanceMarker
            {...props}
            data-slot='map-marker'
            className={marker({
                className,
            })}
        />
    );
}

type InfoWindowProps = MapVariants & ComponentProps<typeof BaseInfoWindow>;

function InfoWindow({ className, ...props }: InfoWindowProps) {
    'use memo'
    const { infoWindow } = map();

    return (
        <BaseInfoWindow
            {...props}
            data-slot='map-info-window'
            className={infoWindow({
                className,
            })}
        />
    );
}

type StaticMapProps = MapVariants & ComponentProps<typeof BaseStaticMap>;

function StaticMap({ className, ...props }: StaticMapProps) {
    'use memo'
    const { staticMap } = map();

    return (
        <BaseStaticMap
            {...props}
            data-slot='map-static'
            className={staticMap({
                className,
            })}
        />
    );
}

export {
    Map,
    Pin,
    AdvancedMarker,
    InfoWindow,
    StaticMap,
}
