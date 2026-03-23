'use client'

import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

const label = tv({
    base: [
        'gap-2',
        'text-sm',
        'leading-none',
        'font-medium',
        'group-data-[disabled=true]:opacity-50',
        'peer-disabled:opacity-50',
        'flex',
        'items-center',
        'select-none',
        'group-data-[disabled=true]:pointer-events-none',
        'peer-disabled:cursor-not-allowed',
    ],
    variants: {
        color: {
            default: 'text-foreground',
            primary: 'text-primary',
            secondary: 'text-secondary',
        },
        focus: {
            true: 'text-primary',
            false: 'text-foreground',
        },
        invalid: {
            true: 'text-red-500',
            false: '',
        }
    },
    defaultVariants: {
        color: 'default',
    }
});

type LabelVariants = VariantProps<typeof label>;

type LabelProps = ComponentProps<'label'> & LabelVariants;

export function Label({
    className,
    color,
    invalid,
    focus,
    ...props
}: LabelProps) {
    return (
        <label
            {...props}
            data-slot='label'
            className={label({
                className,
                color,
                focus,
                invalid,
            })}
        />
    );
}
