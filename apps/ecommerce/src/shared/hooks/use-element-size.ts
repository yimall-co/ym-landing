import {
    useRef,
    useState,
    useEffect,
    useCallback,
} from 'react';

export type Size = Readonly<{
    width: number;
    height: number;
    offsetTop?: number;
    offsetLeft?: number;
}>;

export function useElementSize<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);

    const [size, setSize] = useState<Size>({
        width: 0,
        height: 0,
        offsetTop: 0,
        offsetLeft: 0,
    });

    const handleResize: ResizeObserverCallback = useCallback(
        ([entry]) => {
            const { width, height } = entry?.contentRect ?? {};

            setSize({
                width: width ?? 0,
                height: height ?? 0,
                offsetTop: (entry?.target as HTMLElement).offsetTop ?? 0,
                offsetLeft: (entry?.target as HTMLElement).offsetLeft ?? 0,
            });
        },
        [],
    );

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new ResizeObserver(handleResize);
        observer.observe(element);

        return () => observer.disconnect();
    }, [handleResize]);

    return { ref, size };
}
