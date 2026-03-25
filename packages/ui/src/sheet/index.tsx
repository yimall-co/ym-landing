'use client'

import type { ComponentProps } from 'react'

import { cn } from 'tailwind-variants';
import { XIcon } from 'lucide-react'
import { Dialog as BaseSheet } from '@base-ui/react/dialog'

import { Button } from '../button'

function Sheet({ ...props }: BaseSheet.Root.Props) {
    return <BaseSheet.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: BaseSheet.Trigger.Props) {
    return <BaseSheet.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: BaseSheet.Close.Props) {
    return <BaseSheet.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: BaseSheet.Portal.Props) {
    return <BaseSheet.Portal data-slot="sheet-portal" {...props} />
}

type SheetOverlayProps = BaseSheet.Backdrop.Props

function SheetOverlay({
    className,
    ...props
}: SheetOverlayProps) {
    return (
        <BaseSheet.Backdrop
            data-slot="sheet-overlay"
            className={cn(
                "bg-black/10 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0",
                className
            )}
            {...props}
        />
    )
}

type SheetContentProps = BaseSheet.Popup.Props & {
    side?: "top" | "right" | "bottom" | "left"
    showCloseButton?: boolean
}

function SheetContent({
    className,
    children,
    side = "right",
    showCloseButton = true,
    ...props
}: SheetContentProps) {
    return (
        <SheetPortal>
            <SheetOverlay />
            <BaseSheet.Popup
                data-slot="sheet-content"
                data-side={side}
                className={cn(
                    "bg-popover text-popover-foreground fixed z-50 flex flex-col gap-4 bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem]",
                    className
                )}
                {...props}
            >
                {children}
                {showCloseButton && (
                    <BaseSheet.Close data-slot="sheet-close" render={<Button variant="ghost" className="absolute top-3 right-3" size="icon-sm"><XIcon
                    /><span className="sr-only">Close</span></Button>} />
                )}
            </BaseSheet.Popup>
        </SheetPortal>
    )
}

type SheetHeaderProps = ComponentProps<"div">

function SheetHeader({ className, ...props }: SheetHeaderProps) {
    return (
        <div
            data-slot="sheet-header"
            className={cn("gap-0.5 p-4 flex flex-col", className)}
            {...props}
        />
    )
}

type SheetFooterProps = ComponentProps<"div">

function SheetFooter({ className, ...props }: SheetFooterProps) {
    return (
        <div
            data-slot="sheet-footer"
            className={cn("gap-2 p-4 mt-auto flex flex-col", className)}
            {...props}
        />
    )
}

type SheetTitleProps = BaseSheet.Title.Props

function SheetTitle({ className, ...props }: SheetTitleProps) {
    return (
        <BaseSheet.Title
            data-slot="sheet-title"
            className={cn("text-foreground text-base font-medium cn-font-heading", className)}
            {...props}
        />
    )
}

type SheetDescriptionProps = BaseSheet.Description.Props

function SheetDescription({
    className,
    ...props
}: SheetDescriptionProps) {
    return (
        <BaseSheet.Description
            data-slot="sheet-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    )
}

export {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
}
