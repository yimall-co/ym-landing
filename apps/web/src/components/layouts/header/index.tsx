'use client'

import type { FC } from 'react';
import type { Size } from 'shared/hooks';

import { useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

import { useElementSize } from 'shared/hooks';

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

    const { ref, size } = useElementSize<HTMLElement>();

    const handleResize = useCallback(
        () => {
            if (onResize) onResize(size);
        },
        [onResize, size],
    );

    useEffect(() => handleResize(), [handleResize]);

    return (
        <BaseHeader
            ref={ref}
            position='fixed'
            className='h-[84px]'
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
