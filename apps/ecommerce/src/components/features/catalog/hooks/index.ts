import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { minutesToMilliseconds } from 'date-fns';

import { catalogKeys } from './keys';
import { getCategoriesData, getOffersData } from '../actions';

function useCategories() {
    return useSuspenseQuery({
        queryKey: catalogKeys.categories(),
        queryFn: getCategoriesData,
        staleTime: minutesToMilliseconds(10),
        gcTime: minutesToMilliseconds(15),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 2,
    });
}

export function useCategoriesData() {
    const query = useCategories();
    return query;
}

function useOffers() {
    return useQuery({
        queryKey: catalogKeys.offers(),
        queryFn: getOffersData,
        staleTime: minutesToMilliseconds(10),
        gcTime: minutesToMilliseconds(15),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 2,
    });
}

export function useOffersData() {
    const query = useOffers();
    return query;
}
