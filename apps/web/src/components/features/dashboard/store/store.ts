import type { DashboardState, DashboardStore } from './types';

import { createStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const defaultInitState: DashboardState = {
    selectedWorkspace: null,
};

export const createDashboardStore = (
    initState: DashboardState = defaultInitState
) => {
    return createStore<DashboardStore>()(
        persist(
            (set) => ({
                ...initState,
                setSelectedWorkspace: (workspace) => set({ selectedWorkspace: workspace }),
            }),
            {
                name: 'dashboard',
                // storage: createJSONStorage(() => localStorage),
            },
        ),
    );
}
