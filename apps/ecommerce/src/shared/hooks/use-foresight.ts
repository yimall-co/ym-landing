import type { RefObject } from 'react';
import type { ForesightRegisterOptionsWithoutElement, ForesightRegisterResult } from 'js.foresight';

import { useRef, useEffect } from 'react';
import { ForesightManager } from 'js.foresight';

type UseForesight<T> = {
    elementRef: RefObject<T | null>;
    registerResults: RefObject<ForesightRegisterResult | null>;
};

export function useForesight<T extends HTMLElement = HTMLElement>(
    options: ForesightRegisterOptionsWithoutElement
): UseForesight<T> {
    const elementRef = useRef<T>(null);
    const registerResults = useRef<ForesightRegisterResult | null>(null);

    useEffect(() => {
        if (!elementRef.current) return

        registerResults.current = ForesightManager.instance.register({
            element: elementRef.current,
            ...options,
        })
    }, [options])

    return { elementRef, registerResults }
}
