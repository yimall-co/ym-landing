'use client'

import type { ComponentProps } from 'react'

import { tv, VariantProps } from 'tailwind-variants';
import { Input as BaseInput } from '@base-ui/react/input'

const input = tv({
    base: [
        'dark:bg-input/30',
        'focus-visible:border-ring',
        'aria-invalid:ring-destructive/20',
        'dark:aria-invalid:ring-destructive/40',
        'aria-invalid:border-destructive',
        'dark:aria-invalid:border-destructive/50',
        'disabled:bg-input/50',
        'dark:disabled:bg-input/80',
        // 'h-8',
        'rounded-xl',
        'border',
        'bg-transparent',
        'px-4.5',
        'py-4',
        'text-base',
        'transition-colors',
        'file:h-6',
        'file:text-sm',
        'file:font-medium',
        'focus-visible:ring-3',
        'aria-invalid:ring-3',
        'md:text-sm',
        'w-full',
        'min-w-0',
        'outline-none',
        'file:inline-flex',
        'file:border-0',
        'file:bg-transparent',
        'file:text-foreground',
        'placeholder:text-muted-foreground',
        'disabled:pointer-events-none',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
    ],
    variants: {
        color: {
            default: 'border-input focus-visible:ring-ring/50',
            primary: 'border-input focus:border-primary focus-visible:ring-primary',
            secondary: 'border-input focus:border-primary focus-visible:ring-secondary',
        },
    },
    defaultVariants: {
        color: 'primary',
    }
});

type InputVariants = VariantProps<typeof input>;

type InputProps = ComponentProps<'input'> & InputVariants;

export function Input({
    className,
    type,
    color,
    ...props
}: InputProps) {
    return (
        <BaseInput
            {...props}
            type={type}
            data-slot="input"
            className={input({
                className,
                color,
            })}
        />
    )
}
