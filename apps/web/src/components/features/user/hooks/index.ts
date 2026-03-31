import { minutesToMilliseconds } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

import { getLightweightUserData } from '../actions';

// Query Key factory
export const userKeys = {
    user: () => ['user'] as const,
    lightweight: () => [...userKeys.user(), 'lightweight'] as const,
} as const;

export function useLightweightUser() {
    return useQuery({
        queryKey: userKeys.lightweight(),
        queryFn: getLightweightUserData,
        refetchOnReconnect: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: minutesToMilliseconds(5),
        gcTime: minutesToMilliseconds(10),
        retry: 2,
    });
}
