import {
    useState,
    useEffect,
    useMemo,
} from 'react';

type WindowSize = Readonly<{
    width: number;
    height: number;
}>;

type UseWindowSize = Readonly<{
    size: WindowSize;
    sizeChanged: boolean;
}>;

export function useWindowSize(): UseWindowSize {
    'use memo'
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0,
    });

    const sizeChanged = useMemo<boolean>(
        () => windowSize.width !== windowSize.width || windowSize.height !== windowSize.height,
        [windowSize.width, windowSize.height],
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setWindowSize({
                width,
                height,
            });
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        size: windowSize,
        sizeChanged,
    };
}
