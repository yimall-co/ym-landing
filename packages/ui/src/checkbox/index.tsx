'use client'

import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';
import { CheckIcon } from 'lucide-react'
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'

const checkbox = tv({
    slots: {
        root: [
            'border-input',
            'dark:bg-input/30',
            'data-checked:bg-primary',
            'data-checked:text-primary-foreground',
            'dark:data-checked:bg-primary',
            'data-checked:border-primary',
            'aria-invalid:aria-checked:border-primary',
            'aria-invalid:border-destructive',
            'dark:aria-invalid:border-destructive/50',
            'focus-visible:border-ring',
            'focus-visible:ring-ring/50',
            'aria-invalid:ring-destructive/20',
            'dark:aria-invalid:ring-destructive/40',
            'flex',
            'size-4',
            'items-center',
            'justify-center',
            'rounded-[4px]',
            'border',
            'transition-colors',
            'group-has-disabled/field:opacity-50',
            'focus-visible:ring-3',
            'aria-invalid:ring-3',
            'peer',
            'relative',
            'shrink-0',
            'outline-none',
            'after:absolute',
            'after:-inset-x-3',
            'after:-inset-y-2',
            'disabled:cursor-not-allowed',
            'disabled:opacity-50'
        ],
        indicator: [
            ' [&>svg]:size-3.5',
            'grid',
            'place-content-center',
            'text-current',
            'transition-none'
        ],
    },
    variants: {},
    defaultVariants: {},
});

type CheckboxVariants = VariantProps<typeof checkbox>;

type CheckboxProps = BaseCheckbox.Root.Props & CheckboxVariants;

export function Checkbox({
    className,
    ...props
}: CheckboxProps) {
    'use memo'
    const { root, indicator } = checkbox();

    return (
        <BaseCheckbox.Root
            data-slot="checkbox"
            className={root({
                className: className as string,

            })}
            {...props}
        >
            <BaseCheckbox.Indicator
                data-slot="checkbox-indicator"
                className={indicator()}
            >
                <CheckIcon
                />
            </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
    )
}
