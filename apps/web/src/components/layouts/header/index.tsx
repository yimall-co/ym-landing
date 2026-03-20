'use client'

import type { Size } from 'shared/hooks';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useEffect, useCallback, useState } from 'react';

import { useScroll, useElementSize } from 'shared/hooks';
import { useDevice } from 'shared/contexts/device';

import {
    cn,
    Header as BaseHeader,
} from '@yimall/ui';

import { Logo } from 'components/ui/logo';

type Props = Readonly<{
    onResize?: (size: Size) => void;
}>;

export function Header({ onResize }: Props) {
    'use memo'
    const t = useTranslations('Header');

    const { moving, scroll } = useScroll();
    const { device, isMobile } = useDevice();
    const { ref, size } = useElementSize<HTMLElement>();

    const [isScrolled, setIsScrolled] = useState<boolean>(scroll.y > 0);

    const handleResize = useCallback(
        () => {
            if (onResize) onResize(size);
            document.documentElement.style.setProperty(
                '--header-height',
                `${size.height}px`,
            );
        },
        [size, onResize],
    );

    useEffect(() => {
        handleResize();
    }, [handleResize]);

    useEffect(() => {
        setIsScrolled(scroll.y > size.height);
    }, [scroll, size]);

    const variant = isScrolled ? 'element' : 'horizontal';
    const isCompact = isScrolled;

    return (
        <BaseHeader
            ref={ref}
            // scrolling={moving}
            direction='top'
            position='fixed'
            className={cn(
                // 'h-[84px] bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10',
                'fixed inset-x-0 top-0 z-50 rounded-xl',
                'bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10',
            )}
            animate={{
                y: 0,
                height: isCompact ? 64 : 84,
                width: isCompact ? '90%' : '100%',
                margin: isCompact ? '10px auto 10px auto' : '0',
            }}
            transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <motion.div
                className='size-full flex items-center justify-center px-5'
                animate={{ paddingTop: isCompact ? 8 : 16, paddingBottom: isCompact ? 8 : 16 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
                <motion.div
                    className={cn('flex items-center', isCompact ? 'origin-left h-[40px]' : 'origin-center justify-center h-full')}
                    animate={{ scale: isCompact ? 0.95 : 1, x: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Logo variant={variant} />
                </motion.div>
                {isCompact && <div className='flex-1' />}
            </motion.div>
        </BaseHeader>
    );
}

export default Header;
