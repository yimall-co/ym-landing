'use client'

import type { SVGProps, ComponentType } from 'react';

import { useTheme } from 'next-themes';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { cn } from '@yimall/ui';

import LogoHorizontal from './horizontal';
import LogoVertical from './vertical';
import LogoElement from './element';

export type LogoVariant = 'horizontal' | 'vertical' | 'element';

type Props = Readonly<{
    variant?: LogoVariant;
    className?: string;
}>;

const logoMap: Record<LogoVariant, ComponentType<SVGProps<SVGSVGElement>>> = {
    'horizontal': LogoHorizontal,
    'vertical': LogoVertical,
    'element': LogoElement,
};

export function Logo({
    variant = 'horizontal',
    className,
}: Props) {
    'use memo'

    const { resolvedTheme } = useTheme();

    const shouldReducedMotion = useReducedMotion();

    const fill = resolvedTheme === 'light'
        ? 'fill-(--color-primary)'
        : 'fill-(--color-light)';

    const Wrapper = logoMap[variant];
    if (!Wrapper) return <LogoHorizontal fill={fill} />

    const transition = {
        duration: shouldReducedMotion ? 0 : 0.20,
        ease: [0.22, 1, 0.36, 1], // easeOutCubic-ish
    };

    return (
        <AnimatePresence mode='wait' initial={false}>
            <motion.div
                key={variant + '-' + resolvedTheme}
                initial={{ opacity: 0, y: 6, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.985 }}
                transition={transition as any}
                className={cn('h-full w-full', className)}
            >
                <Wrapper className={cn('block h-full w-auto', fill)} />
            </motion.div>
        </AnimatePresence>
    );
}
