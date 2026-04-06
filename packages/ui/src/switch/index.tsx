'use client'

import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';
import { Switch as BaseSwitch } from '@base-ui/react/switch'

const switchVariants = tv({
    slots: {
        root: [
            'peer',
            'group/switch',
            'relative',
            'inline-flex',
            'shrink-0',
            'items-center',
            'rounded-full',
            'border',
            'border-transparent',
            'transition-all',
            'outline-none',
            'after:absolute',
            'after:-inset-x-3',
            'after:-inset-y-2',
            'focus-visible:border-ring',
            'focus-visible:ring-3',
            'focus-visible:ring-ring/50',
            'aria-invalid:border-destructive',
            'aria-invalid:ring-3',
            'aria-invalid:ring-destructive/20',
            'data-[size=default]:h-[18.4px]',
            'data-[size=default]:w-[32px]',
            'data-[size=sm]:h-[14px]',
            'data-[size=sm]:w-[24px]',
            'dark:aria-invalid:border-destructive/50',
            'dark:aria-invalid:ring-destructive/40',
            'data-checked:bg-(--foreground)/10',
            'data-unchecked:bg-(--foreground)/10',
            'dark:data-unchecked:bg-(--foreground)/10',
            'data-disabled:cursor-not-allowed',
            'data-disabled:opacity-50'
        ],
        thumb: [
            'pointer-events-none',
            'block',
            'rounded-full',
            'bg-(--foreground)/80',
            'ring-0',
            'transition-transform',
            'group-data-[size=default]/switch:size-4',
            'group-data-[size=sm]/switch:size-3',
            'group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)]',
            'group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)]',
            'dark:data-checked:bg-primary',
            'group-data-[size=default]/switch:data-unchecked:translate-x-0',
            'group-data-[size=sm]/switch:data-unchecked:translate-x-0',
            'dark:data-unchecked:bg-(--foreground)'
        ]
    },
    variants: {
        size: {
            sm: 'h-4 w-8',
            default: 'h-5 w-10',
        }
    },
    defaultVariants: {},
})

type SwitchVariantsProps = VariantProps<typeof switchVariants>;

type SwitchProps = BaseSwitch.Root.Props & SwitchVariantsProps;

export function Switch({
    className,
    size = "default",
    ...props
}: SwitchProps) {
    const { root, thumb } = switchVariants();

    return (
        <BaseSwitch.Root
            data-slot="switch"
            data-size={size}
            className={root({
                size,
                className: className as string,
            })}
            {...props}
        >
            <BaseSwitch.Thumb
                data-slot="switch-thumb"
                className={thumb({ size })}
            />
        </BaseSwitch.Root>
    )
}
