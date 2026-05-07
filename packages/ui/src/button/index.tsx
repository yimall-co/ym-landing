'use client'

import type { ComponentProps } from 'react';
import type { VariantProps, ClassValue } from 'tailwind-variants'

import { mergeProps, useRender } from '@base-ui/react';
import { Button as BaseButton } from '@base-ui/react/button'
import { tv } from 'tailwind-variants';
import { motion } from 'motion/react';

import { Spinner } from '../spinner';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';

const buttonVariants = tv({
    base: [
        'focus-visible:border-ring',
        'focus-visible:ring-ring/50',
        'aria-invalid:ring-destructive/20',
        'dark:aria-invalid:ring-destructive/40',
        'aria-invalid:border-destructive',
        'dark:aria-invalid:border-destructive/50',
        'rounded-lg',
        'border border-transparent',
        'bg-clip-padding',
        'text-[15px]',
        'font-medium',
        'focus-visible:ring-3',
        'aria-invalid:ring-3',
        'inline-flex',
        'items-center',
        'justify-center',
        'whitespace-nowrap',
        'transition-all',
        'disabled:pointer-events-none',
        'disabled:opacity-50',
        'shrink-0',
        'outline-none',
        'group/button',
        'select-none',
        'cursor-pointer',

        // Icon
        '[&_svg]:pointer-events-none',
        '[&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-6",
    ],
    variants: {
        loading: {
            true: 'relative',
        },
        block: {
            true: 'w-full',
        },
        shape: {
            square: 'rounded-none',
            rounded: 'rounded-xl',
            pill: 'rounded-full',
        },
        variant: {
            default: [
                'border-border',
                'border-primary',
                'bg-primary',
                'text-primary-foreground',
                '[a]:hover:bg-primary/80',
            ],
            outline: [
                'border-border',
                'bg-transparent',
                'hover:bg-muted',
                'hover:text-foreground',
                'aria-expanded:bg-muted',
                'aria-expanded:text-foreground',
            ],
            secondary: [
                'bg-secondary',
                'text-secondary-foreground',
                'hover:bg-secondary/80',
                'aria-expanded:bg-secondary',
                'aria-expanded:text-secondary-foreground',
            ],
            ghost: [
                'hover:bg-muted',
                'hover:text-foreground',
                'dark:hover:bg-muted/50',
                'aria-expanded:bg-muted',
                'aria-expanded:text-foreground',
            ],
            destructive: [
                'bg-destructive/10',
                'hover:bg-destructive/20',
                'focus-visible:ring-destructive/20',
                'dark:focus-visible:ring-destructive/40',
                'dark:bg-destructive/20',
                'text-destructive',
                'focus-visible:border-destructive/40',
                'dark:hover:bg-destructive/30',
            ],
            link: [
                'underline',
                'underline-offset-4',
                'hover:underline',
            ],
            text: [
                'hover:bg-muted',
                'hover:text-foreground',
                'dark:hover:bg-muted/50',
                'aria-expanded:bg-muted',
                'aria-expanded:text-foreground',
            ],
        },
        size: {
            default: "h-10 gap-2 px-4 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-7 gap-1 px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
            lg: "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
            xl: "h-12 gap-2 px-4 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
            '2xl': "h-14 gap-2 px-6 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
            icon: "size-16",
            "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
            "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
            'icon-md': "size-10",
            "icon-lg": "size-9",
        },
    },
    defaultVariants: {
        shape: 'rounded',
        variant: "default",
        size: "default",
    },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

type Props = ButtonVariants & useRender.ComponentProps<'button'> & BaseButton.Props & {
    tooltip?: string | ComponentProps<typeof TooltipContent>
};

export function Button({
    className,
    loading,
    block,
    shape = 'rounded',
    variant = "default",
    size = "default",
    tooltip,
    render,
    ...props
}: Props) {
    'use memo'

    const rendered = useRender({
        defaultTagName: 'button',
        props: mergeProps(
            {
                className: buttonVariants({
                    size,
                    shape,
                    variant,
                    block,
                    className: className as ClassValue
                }),
            },
            props,
        ),
        render: !tooltip ? <BaseButton /> : <TooltipTrigger render={render} />,
        state: {
            slot: 'button',
            size,
            shape,
            variant,
            block,
            loading,
        },
    });

    if (!tooltip) {
        return rendered;
    }

    if (typeof tooltip === 'string') {
        tooltip = { children: tooltip };
    }

    return (
        <Tooltip>
            {rendered}
            <TooltipContent
                side='bottom'
                align='center'
                {...tooltip}
            />
        </Tooltip>
    )
    // return (
    //     <BaseButton
    //         {...props}
    //         data-slot='button'
    //         className={buttonVariants({
    //             size,
    //             shape,
    //             variant,
    //             block,
    //             className: className as ClassValue
    //         })}
    //     >
    //         {loading ? <Spinner /> : children}
    //     </BaseButton>
    // );
}
