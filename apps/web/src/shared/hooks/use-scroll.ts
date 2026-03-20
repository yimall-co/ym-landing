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
        x: window.scrollX,
        y: window.scrollY,
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
