'use client'

import type { ComponentProps } from 'react';

import { cn } from 'tailwind-variants';

type SkeletonProps = ComponentProps<"div">;

export function Skeleton({
    className,
    ...props
}: SkeletonProps) {
    return (
        <div
            data-slot="skeleton"
            className={cn("bg-muted rounded-md animate-pulse", className)}
            {...props}
        />
    )
}
