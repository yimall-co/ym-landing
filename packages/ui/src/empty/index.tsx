'use client';

import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { cn, tv } from 'tailwind-variants';

const empty = tv({
    slots: {
        media: "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
    },
    variants: {
        variant: {
            default: "bg-transparent",
            icon: "bg-muted text-foreground flex size-8 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-4",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

type EmptyVariants = VariantProps<typeof empty>;

type EmptyProps = ComponentProps<'div'> & EmptyVariants;

function Empty({ className, ...props }: EmptyProps) {
    return (
        <div
            data-slot="empty"
            className={cn(
                "gap-4 rounded-xl border-dashed p-6 flex w-full min-w-0 flex-1 flex-col items-center justify-center text-center text-balance",
                className
            )}
            {...props}
        />
    )
}

type EmptyHeaderProps = ComponentProps<'div'>;

function EmptyHeader({ className, ...props }: EmptyHeaderProps) {
    return (
        <div
            data-slot="empty-header"
            className={cn(
                "gap-2 flex max-w-sm flex-col items-center",
                className
            )}
            {...props}
        />
    )
}


type EmptyMediaProps = ComponentProps<'div'> & EmptyVariants;

function EmptyMedia({
    className,
    variant = "default",
    ...props
}: EmptyMediaProps) {
    const { media } = empty();

    return (
        <div
            data-slot="empty-icon"
            data-variant={variant}
            className={media({ variant, className })}
            {...props}
        />
    )
}

type EmptyTitleProps = ComponentProps<'div'>;

function EmptyTitle({ className, ...props }: EmptyTitleProps) {
    return (
        <div
            data-slot="empty-title"
            className={cn("text-sm font-medium tracking-tight cn-font-heading", className)}
            {...props}
        />
    )
}

type EmptyDescriptionProps = ComponentProps<'p'>;

function EmptyDescription({ className, ...props }: EmptyDescriptionProps) {
    return (
        <div
            data-slot="empty-description"
            className={cn(
                "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
                className
            )}
            {...props}
        />
    )
}

type EmptyContentProps = ComponentProps<'div'>;

function EmptyContent({ className, ...props }: EmptyContentProps) {
    return (
        <div
            data-slot="empty-content"
            className={cn(
                "gap-2.5 text-sm flex w-full max-w-sm min-w-0 flex-col items-center text-balance",
                className
            )}
            {...props}
        />
    )
}

export {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
    EmptyMedia,
}
