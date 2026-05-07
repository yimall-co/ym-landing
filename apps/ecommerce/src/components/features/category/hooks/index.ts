import { useSuspenseQuery } from '@tanstack/react-query';
import { minutesToMilliseconds } from 'date-fns';

import { categoryKeys } from './keys';
import { getCategoryBySlugData } from '../actions';

function useCategory(slug: string) {
    return useSuspenseQuery({
        queryKey: categoryKeys.categoryBySlug(slug),
        queryFn: () => getCategoryBySlugData(slug),
        staleTime: minutesToMilliseconds(15),
        gcTime: minutesToMilliseconds(20),
        refetchOnReconnect: true,
    });
}

export function useCategoryData(slug: string) {
    const query = useCategory(slug);
    return query;
}
