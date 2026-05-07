'use client'

import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';
import { mergeProps, useRender } from '@base-ui/react';

const badgeVariants = tv({
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
            default: 'bg-(--background)',
            primary: 'text-primary bg-(--color-primary-400)/5 border border-(--color-primary)',
        },
        variant: {
            bubble: 'rounded-[35px_25px_35px_25px]',
            default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
            secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
            destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        },
        size: {
            sm: [
                'h-5',
                'gap-1',
                'rounded-4xl',
                'border border-transparent',
                'px-2',
                'py-0.5',
                'text-xs',
                'font-medium',
                'transition-all',
                'has-data-[icon=inline-end]:pr-1.5',
                'has-data-[icon=inline-start]:pl-1.5',
                '[&>svg]:size-3!',
                'group/badge',
                'inline-flex',
                'w-fit',
                'shrink-0',
                'items-center',
                'justify-center',
                'overflow-hidden',
                'whitespace-nowrap',
                'focus-visible:border-ring',
                'focus-visible:ring-[3px]',
                'focus-visible:ring-ring/50',
                'aria-invalid:border-destructive',
                'aria-invalid:ring-destructive/20',
                'dark:aria-invalid:ring-destructive/40',
                '[&>svg]:pointer-events-none',
            ],
        }
    },
    defaultVariants: {
        variant: 'default',
        position: 'default',
    },
});

type BadgeVariants = VariantProps<typeof badgeVariants>;

type Props = BadgeVariants & useRender.ComponentProps<'span'>;

export function Badge({
    className,
    color,
    size,
    variant = 'default',
    position = 'default',
    render,
    ...props
}: Props) {
    'use memo'

    return useRender({
        defaultTagName: 'span',
        props: mergeProps<'span'>(
            {
                className: badgeVariants({
                    variant,
                    position,
                    color,
                    size,
                    className,
                }),
            },
            props,
        ),
        render,
        state: {
            slot: 'badge',
            variant,
            color,
            size,
            position,
        }
    });
}
