'use client'

import { cn } from 'tailwind-variants';
import { Separator as BaseSeparator } from '@base-ui/react/separator'

type SeparatorProps = BaseSeparator.Props;

export function Separator({
    className,
    orientation = 'horizontal',
    ...props
}: SeparatorProps) {
    return (
        <BaseSeparator
            data-slot="separator"
            orientation={orientation}
            className={cn(
                "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
                className
            )}
            {...props}
        />
    )
}
