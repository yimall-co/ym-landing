import type { ReactNode } from 'react';
import type { DashboardStore } from './types';

import {
    createContext,
    useContext,
    useRef,
} from 'react';
import { useStore } from 'zustand';

import { createDashboardStore } from './store';

type DashboardStoreApi = ReturnType<typeof createDashboardStore>;

const DashboardStoreContext = createContext<DashboardStoreApi | null>(null);

type Props = Readonly<{
    children: ReactNode;
}>;

export function DashboardStoreProvider({ children }: Props) {
    const storeRef = useRef<DashboardStoreApi | null>(null);

    if (!storeRef.current) {
        storeRef.current = createDashboardStore();
    }

    return (
        <DashboardStoreContext.Provider value={storeRef.current}>
            {children}
        </DashboardStoreContext.Provider>
    );
}

export function useDashboardStore<T>(selector: (store: DashboardStore) => T) {
    const store = useContext(DashboardStoreContext);
    if (!store) {
        throw new Error('useDashboardStore must be used within a DashboardStoreProvider');
    }

    return useStore(store, selector);
}
