import { useSuspenseQuery } from '@tanstack/react-query';
import { minutesToMilliseconds } from 'date-fns';

import { getWorkspacesByOwnerData } from '../actions';

export const dashboardKeys = {
    workspaces: () => ['workspaces'] as const,
    workspacesByOwner: () => [...dashboardKeys.workspaces(), 'by-owner'] as const,
} as const;

export function useWorkspacesByOwner() {
    return useSuspenseQuery({
        queryKey: dashboardKeys.workspacesByOwner(),
        queryFn: getWorkspacesByOwnerData,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: minutesToMilliseconds(5),
        gcTime: minutesToMilliseconds(10),
    });
}
