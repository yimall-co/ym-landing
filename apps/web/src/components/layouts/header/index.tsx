'use client'

import type { FC } from 'react';
import type { Size } from 'shared/hooks';

import { useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

import { useElementSize, useScroll } from 'shared/hooks';

import {
    Heading,
    Header as BaseHeader,
} from '@yimall/ui';

type Props = Readonly<{
    onResize?: (size: Size) => void;
}>;

const Header: FC<Props> = ({ onResize }) => {
    'use memo'
    const t = useTranslations('Header');

    const { moving } = useScroll();
    const { ref, size } = useElementSize<HTMLElement>();

    const handleResize = useCallback(
        () => {
            if (onResize) onResize(size);
            document.documentElement.style.setProperty(
                '--header-height',
                `${size.height}px`,
            );
        },
        [onResize, size],
    );

    useEffect(() => {
        handleResize();
    }, [handleResize]);

    return (
        <BaseHeader
            ref={ref}
            scrolling={moving}
            direction='top'
            position='fixed'
            // className='h-[84px] bg-background'
            className='h-[84px] bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10'
        >
            <div className='size-full flex items-center justify-center p-5'>
                <Heading
                    role='link'
                    level='1'
                    className='font-brand text-[40px] leading-12 font-normal'
                    aria-label={t('title')}
                >
                    {t('title')}
                </Heading>
            </div>
        </BaseHeader>
    );
}

export default Header;
