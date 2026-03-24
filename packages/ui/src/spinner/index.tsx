'use client'

import type { ComponentProps } from 'react';

import { cn } from 'tailwind-variants';
import { Loader2Icon } from 'lucide-react'

type SpinnerProps = ComponentProps<"svg">

export function Spinner({
    className,
    ...props
}: SpinnerProps) {
    return (
        <Loader2Icon role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
    );
}
