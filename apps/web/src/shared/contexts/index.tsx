'use client'

import type { FC, PropsWithChildren, MemoExoticComponent } from 'react';

import {
    JSX,
    memo,
    useContext,
    createContext,
} from 'react';

type ContextFactoryResult<T> = {
    Provider: MemoExoticComponent<FC<PropsWithChildren>>;
    useContext: () => T;
};

function contextFactory<T>(
    useContextState: () => T,
    defaultValue?: T,
    ContextComponent?: JSX.Element,
): ContextFactoryResult<T> {
    const Context = createContext<T>(defaultValue || Object.create(null) as T);

    return {
        Provider: memo<PropsWithChildren>(({ children, }) => {
            const value = useContextState();

            return (
                <Context.Provider value={value}>
                    {children}
                    {ContextComponent}
                </Context.Provider>
            );
        }) as any,
        useContext: () => useContext(Context),
    };
};

export default contextFactory;
