'use client';

import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { mergeProps, useRender } from '@base-ui/react';
import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { tv } from 'tailwind-variants';

import { Badge } from '../badge';

const toggleVariants = tv({
    base: [
        'relative',
        'group/toggle',
        'inline-flex',
        'items-center',
        'justify-center',
        'gap-1',
        'rounded-lg',
        'text-sm',
        'text-(--background)',
        'font-medium',
        'whitespace-nowrap',
        'transition-all',
        'outline-none',
        'hover:bg-muted',
        'hover:text-(--foreground)',
        'focus-visible:border-ring',
        'focus-visible:ring-[3px]',
        'focus-visible:ring-ring/50',
        'disabled:pointer-events-none',
        'disabled:opacity-50',
        'aria-invalid:border-destructive',
        'aria-invalid:ring-destructive/20',
        'dark:aria-invalid:ring-destructive/40',
        '[&_svg]:pointer-events-none',
        '[&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
    ],
    variants: {
        variant: {
            default: "bg-transparent",
            outline: "border border-input bg-transparent hover:bg-muted",
        },
        color: {
            default: [
                // 'bg-(--foreground)',
                'data-pressed:text-(--background)',
                'data-pressed:[&_svg]:fill-(--background)',
            ],
            primary: [
                'data-pressed:text-primary',
                'data-pressed:[&_svg]:fill-primary',
            ],
        },
        size: {
            sm: [
                'h-7',
                'min-w-7',
                'rounded-[min(var(--radius-md),12px)]',
                'px-2.5',
                'text-[0.8rem]',
                'has-data-[icon=inline-end]:pr-1.5',
                'has-data-[icon=inline-start]:pl-1.5',
                "[&_svg:not([class*='size-'])]:size-3.5",
            ],
            default: [
                'h-8',
                'min-w-8',
                'px-2.5',
                'has-data-[icon=inline-end]:pr-2',
                'has-data-[icon=inline-start]:pl-2',
            ],
            lg: [
                'h-12',
                'min-w-12',
                'px-2',
                'py-2',
                'has-data-[icon=inline-end]:pr-3',
                'has-data-[icon=inline-start]:pl-3',
                "[&_svg:not([class*='size-'])]:size-6",
            ],
            flex: [
                'h-auto',
                'min-w-12',
                'px-2',
                'py-2',
                'flex',
                'flex-col',
                "[&_svg:not([class*='size-'])]:size-8",
            ],
        },
        rounded: {
            default: 'rounded-full',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            '2xl': 'rounded-2xl',
            '3xl': 'rounded-3xl',
            full: 'rounded-full',
        }
    },
    defaultVariants: {
        color: 'default',
        variant: 'default',
        size: 'default',
        rounded: 'default',
    },
});

type ToggleVariants = VariantProps<typeof toggleVariants>;

type Props = ToggleVariants & useRender.ComponentProps<'button'> & BaseToggle.Props & {
    badge?: string | ComponentProps<typeof Badge>;
};

export function Toggle({
    className,
    children,
    badge,
    color = 'default',
    variant = 'default',
    size = 'default',
    rounded = 'default',
    ...props
}: Props) {
    'use memo'

    const renderedBadge = useRender({
        defaultTagName: 'span',
        props: mergeProps(
            {
                className: 'flex items-center justify-center text-xs font-semibold'
            },
            {
                children: badge,
            }
        ),
        render: <span />,
        state: {
            rounded,
        },
    });

    return (
        <BaseToggle
            data-slot='toggle'
            className={toggleVariants({
                color,
                variant,
                size: badge ? 'flex' : size,
                rounded,
                className: className as string
            })}
            {...props}
        >
            {children}
            {badge && renderedBadge}
        </BaseToggle>
    );
}
