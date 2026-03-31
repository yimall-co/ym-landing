'use client';

import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { cn, tv } from 'tailwind-variants';
import { Popover as BasePopover } from '@base-ui/react/popover'

const popover = tv({
    slots: {
        popup: [
            'bg-background',
            'text-foreground',
            'data-open:animate-in',
            'data-closed:animate-out',
            'data-closed:fade-out-0',
            'data-open:fade-in-0',
            'data-closed:zoom-out-95',
            'data-open:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2',
            'flex flex-col gap-2.5',
            'rounded-xl',
            'p-2',
            'text-sm',
            'shadow-md',
            'ring-1',
            'ring-neutral-800',
            'shadow-md',
            'duration-100',
            'data-[side=inline-start]:slide-in-from-right-2',
            'data-[side=inline-end]:slide-in-from-left-2',
            'z-50',
            'min-w-xs md:min-w-md',
            'w-full',
            'max-w-md',
            'origin-(--transform-origin)',
            'outline-hidden',
        ],
        title: [
            'font-medium',
            'md:text-base',
            'cn-font-heading',
        ],
    },
    variants: {},
    defaultVariants: {},
});

type PopoverVariants = VariantProps<typeof popover>;

type PopoverContextProps = Pick<BasePopover.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset"> & {
    Component: any | null;
};

function createPopoverHandler() {
    return BasePopover.createHandle<PopoverContextProps>();
}

type PopoverProps = BasePopover.Root.Props<PopoverContextProps>;

function Popover({
    ...props
}: PopoverProps) {
    return <BasePopover.Root data-slot="popover" {...props} />
}

type PopoverTriggerProps = BasePopover.Trigger.Props;

function PopoverTrigger({ ...props }: PopoverTriggerProps) {
    return <BasePopover.Trigger data-slot="popover-trigger" {...props} />
}

type PopoverViewportProps = PopoverVariants & BasePopover.Viewport.Props;

function PopoverViewport({ ...props }: PopoverViewportProps) {
    return <BasePopover.Viewport data-slot="popover-viewport" {...props} />
}

type PopoverContentProps = PopoverVariants
    & BasePopover.Popup.Props
    & Omit<PopoverContextProps, 'Component'>;

function PopoverContent({
    className,
    align = "center",
    alignOffset = 0,
    side = "bottom",
    sideOffset = 4,
    ...props
}: PopoverContentProps) {
    const { popup } = popover()

    return (
        <BasePopover.Portal>
            <BasePopover.Positioner
                align={align}
                alignOffset={alignOffset}
                side={side}
                sideOffset={sideOffset}
                className="isolate z-50"
            >
                <BasePopover.Popup
                    data-slot="popover-content"
                    className={popup({
                        className: className as string,
                    })}
                    {...props}
                />
            </BasePopover.Positioner>
        </BasePopover.Portal>
    )
}

type PopoverHeaderProps = PopoverVariants & ComponentProps<'div'>;

function PopoverHeader({ className, ...props }: PopoverHeaderProps) {
    return (
        <div
            data-slot="popover-header"
            className={cn("flex flex-col gap-0.5 text-sm", className)}
            {...props}
        />
    )
}

type PopoverTitleProps = PopoverVariants & BasePopover.Title.Props;

function PopoverTitle({ className, ...props }: PopoverTitleProps) {
    const { title } = popover();

    return (
        <BasePopover.Title
            data-slot="popover-title"
            className={title({
                className: className as string
            })}
            {...props}
        />
    )
}

type PopoverDescriptionProps = PopoverVariants & BasePopover.Description.Props;

function PopoverDescription({
    className,
    ...props
}: PopoverDescriptionProps) {
    return (
        <BasePopover.Description
            data-slot="popover-description"
            className={cn("text-muted-foreground", className)}
            {...props}
        />
    )
}

export {
    createPopoverHandler,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
    PopoverViewport,
}
