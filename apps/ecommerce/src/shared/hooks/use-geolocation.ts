import { useCallback, useEffect, useRef } from 'react';

import { useLocalStorage } from './use-local-storage';

type UseGeolocation = {
    currentGeolocation: GeolocationPosition | null;
    requestGeolocation: () => void;
}

export function useGeolocation(): UseGeolocation {
    const watchRef = useRef<number | null>(null);

    const [currentGeolocation, setCurrentGeolocation] = useLocalStorage<GeolocationPosition | null>('geolocation', null);

    const handleRequestGeolocation = useCallback(
        () => {
            if (typeof window === 'undefined') return;

            if (!('geolocation' in navigator)) return;

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentGeolocation(position);
                },
                (error) => {
                    console.error(error);
                },
            );
        },
        [setCurrentGeolocation],
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (!('geolocation' in navigator)) return;

        if (!currentGeolocation) return;

        watchRef.current = navigator.geolocation.watchPosition(
            (position) => {
                setCurrentGeolocation(position);
            },
            (error) => {
                console.error(error);
            },
        );

        return () => {
            if (watchRef.current) {
                navigator.geolocation.clearWatch(watchRef.current);
                watchRef.current = null;
            }
        };
    }, [currentGeolocation, setCurrentGeolocation]);

    return {
        currentGeolocation,
        requestGeolocation: handleRequestGeolocation,
    };
}
