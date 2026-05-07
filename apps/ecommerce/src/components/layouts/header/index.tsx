/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import type { ForesightCallback } from 'js.foresight';
import type { MouseEventHandler, RefCallback } from 'react';

import {
    Fragment,
    useEffect,
    useTransition,
} from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LucideIcon, MapPin, Settings } from 'lucide-react';
import { useProgress } from 'react-transition-progress';

import { useResolvedPathname, useRouter } from 'lib/i18n';

import { useElementSize, useScroll } from 'shared/hooks';

import { cn, Header as BaseHeader } from '@yimall/ui';

import DeviceDetector from 'components/device-detector';

import HeaderMobile from './mobile';
import HeaderDesktop from './desktop';

type Props = Readonly<object>;

export type HeaderAction = Readonly<{
    icon: LucideIcon;
    tooltip: string;
    isActive: boolean;
    callback: ForesightCallback;
    onClick: MouseEventHandler<HTMLButtonElement>;
}>;

export type HeaderProps = Readonly<{
    actions: Array<HeaderAction>;
    router: ReturnType<typeof useRouter>;
    startProgress: ReturnType<typeof useProgress>;
    startTransition: ReturnType<typeof useTransition>[1];
}>;

export default function Header({ }: Props) {
    'use memo'

    const t = useTranslations('Header');

    const router = useRouter();
    const params = useParams();
    const pathname = useResolvedPathname(params);
    const startProgress = useProgress();

    const [_, startTransition] = useTransition();

    const { moving } = useScroll();
    const { ref, size } = useElementSize<HTMLElement>();

    const refCallback: RefCallback<HTMLElement> = (node) => {
        if (node) {
            ref.current = node;
        }
    }

    useEffect(() => {
        const handleResize = () => {
            document.documentElement.style.setProperty('--header-height', `${size.height}px`);
            document.documentElement.style.setProperty('--header-width', `${size.width}px`);
            document.documentElement.style.setProperty('--header-offset-top', `${size.offsetTop}px`);
            document.documentElement.style.setProperty('--header-offset-left', `${size.offsetLeft}px`);
        }

        handleResize();

        return () => {
            document.documentElement.style.removeProperty('--header-height');
            document.documentElement.style.removeProperty('--header-width');
            document.documentElement.style.removeProperty('--header-offset-top');
            document.documentElement.style.removeProperty('--header-offset-left');
        }
    }, [size]);

    const actions: Array<HeaderAction> = [
        {
            icon: MapPin,
            tooltip: t('location'),
            isActive: pathname === '/location',
            callback: () => router.prefetch({ pathname: '/location' }),
            onClick: () => startTransition(() => {
                startProgress();
                router.push({ pathname: '/location' });
            }),
        },
        {
            icon: Settings,
            tooltip: t('settings'),
            isActive: false,
            callback: () => { },
            onClick: () => { },
        },
    ];

    const childProps: HeaderProps = {
        actions,
        router,
        startProgress,
        startTransition,
    };

    return (
        <BaseHeader
            ref={refCallback}
            scrolling={moving}
            className={cn(
                'w-full',
                'fixed',
                'top-0',
                'inset-x-0',
                'z-10',
                'bg-background',
                'border-b',
                'border-b-(--foreground)/5',
                'lg:max-w-[1024px]',
                'xl:max-w-[1280px]',
                'lg:mx-auto',
                'lg:mt-4',
                'lg:rounded-3xl',
                'lg:border',
                'lg:border-(--foreground)/5',
            )}
            animate={{
                y: 0,
                height: 100,
            }}
            transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <DeviceDetector>
                {(isMobile, isDesktop, isTablet) => (
                    <Fragment>
                        {isDesktop && <HeaderDesktop {...childProps} />}
                        {(isMobile || isTablet) && <HeaderMobile {...childProps} />}
                    </Fragment>
                )}
            </DeviceDetector>
        </BaseHeader>
    );
}
