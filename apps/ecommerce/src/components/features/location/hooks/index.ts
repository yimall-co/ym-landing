import { useSuspenseQuery } from '@tanstack/react-query';

import { locationKeys } from './keys';
import { getGeolocationsData } from '../actions';

function useGeolocations() {
    return useSuspenseQuery({
        queryKey: locationKeys.all(),
        queryFn: getGeolocationsData,
    });
}

export function useGeolocationsData() {
    const query = useGeolocations();
    return query;
}
