import {
    useState,
    useEffect,
    useCallback,
} from 'react';

type Scroll = Readonly<{
    y: number;
    x: number;
}>;

type UseScroll = Readonly<{
    moving: boolean;
    scroll: Scroll;
    lastScrollY: number;
}>;

export function useScroll(): UseScroll {
    'use memo'
    const [scroll, setScroll] = useState<Scroll>({
        x: typeof window !== 'undefined' ? window.scrollX : 0,
        y: typeof window !== 'undefined' ? window.scrollY : 0,
    });
    const [moving, setMoving,] = useState<boolean>(false);
    const [lastScrollY, setLastScrollY] = useState<number>(0);

    const handleScroll: (event: Event) => void = useCallback(
        () => {
            const currentScrollY = window.scrollY;
            const currentScrollX = window.scrollX;
            if (currentScrollY > lastScrollY && currentScrollY > 35) setMoving(true);
            else setMoving(false);

            setScroll({
                x: currentScrollX,
                y: currentScrollY,
            });
            setLastScrollY(currentScrollY);
        },
        [lastScrollY,],
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll,]);

    return {
        moving,
        scroll,
        lastScrollY,
    };
};
