'use client'

import type { FC, ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';
import { motion } from 'motion/react';

const badge = tv({
    base: [
        'w-fit',
        'items-center',
        'justify-center',
        'rounded-full',
        'px-1',
        'py-0',
        'whitespace-nowrap',
        'shrink-0',
        'gap-1',
        'overflow-hidden',
    ],
    variants: {
        position: {
            default: 'inline-flex',
            flex: 'flex',
        },
        color: {
            default: 'bg-[var(--background)]',
            primary: 'text-primary bg-[var(--color-primary-400)]/5 border border-(--color-primary)',
        },
        variant: {
            bubble: 'rounded-[35px_25px_35px_25px]',
            default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
            secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
            destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        },
    },
    defaultVariants: {
        variant: 'default',
        position: 'default',
    },
});

type BadgeVariants = VariantProps<typeof badge>;

type BadgeProps = BadgeVariants & ComponentProps<typeof motion.div>;

const Badge: FC<BadgeProps> = ({
    className,
    color,
    variant = 'default',
    position = 'default',
    ...props
}) => {
    'use memo'

    return (
        <motion.div
            {...props}
            data-slot='badge'
            className={badge({
                color,
                variant,
                position,
                className,
            })}
        />
    );
}

Badge.displayName = 'Badge';

export { Badge };
