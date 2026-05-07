'use client';

import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { XIcon } from 'lucide-react';

import { Button } from '../button';

const dialog = tv({
    slots: {
        overlay: [
            'fixed',
            'inset-0',
            'isolate',
            'z-50',
            'bg-black/10',
            'duration-100',
            'supports-backdrop-filter:backdrop-blur-xs',
            'data-open:animate-in',
            'data-open:fade-in-0',
            'data-closed:animate-out',
            'data-closed:fade-out-0'
        ],
        popup: [
            'fixed',
            'top-1/2',
            'left-1/2',
            'z-50',
            'grid w-full max-w-[calc(100%-2rem)]',
            '-translate-x-1/2 -translate-y-1/2',
            'gap-4',
            'rounded-xl',
            'bg-(--background)',
            'p-4',
            'text-sm',
            'text-(--foreground)',
            'ring-1 ring-(--foreground)/10',
            'duration-100',
            'outline-none',
            'overflow-hidden',
            'sm:max-w-4xl',
            'data-open:animate-in',
            'data-open:fade-in-0',
            'data-open:zoom-in-95',
            'data-closed:animate-out',
            'data-closed:fade-out-0',
            'data-closed:zoom-out-95'
        ],
        header: [
            'flex',
            'flex-col',
            'gap-2'
        ],
        footer: [
            '-mx-4 -mb-4',
            'flex',
            'flex-col-reverse',
            'gap-2',
            'rounded-b-xl',
            // 'border-t',
            'p-4',
            'sm:flex-row',
            'sm:justify-end'
        ],
        title: [
            'cn-font-heading',
            'text-base',
            'leading-none',
            'font-medium'
        ],
        description: [
            'text-sm',
            'text-muted-foreground',
            '*:[a]:underline',
            '*:[a]:underline-offset-3',
            '*:[a]:hover:text-foreground'
        ]
    },
    variants: {},
});

type DialogVariants = VariantProps<typeof dialog>;

type DialogProps = DialogVariants & BaseDialog.Root.Props;

function Dialog({ ...props }: DialogProps) {
    return (
        <BaseDialog.Root
            data-slot="dialog"
            {...props}
        />
    );
}

type DialogTriggerProps = DialogVariants & BaseDialog.Trigger.Props;

function DialogTrigger({ ...props }: DialogTriggerProps) {
    return (
        <BaseDialog.Trigger
            data-slot="dialog-trigger"
            {...props}
        />
    );
}

type DialogPortalProps = DialogVariants & BaseDialog.Portal.Props;

function DialogPortal({ ...props }: DialogPortalProps) {
    return (
        <BaseDialog.Portal
            data-slot="dialog-portal"
            {...props}
        />
    );
}

type DialogCloseProps = DialogVariants & BaseDialog.Close.Props;

function DialogClose({ ...props }: DialogCloseProps) {
    return (
        <BaseDialog.Close
            data-slot="dialog-close"
            {...props}
        />
    );
}

type DialogOverlayProps = DialogVariants & BaseDialog.Backdrop.Props;

function DialogOverlay({
    className,
    ...props
}: DialogOverlayProps) {
    'use memo'
    const { overlay } = dialog();

    return (
        <BaseDialog.Backdrop
            data-slot="dialog-overlay"
            className={overlay({
                className: className as string,
            })}
            {...props}
        />
    )
}

type DialogContentProps = DialogVariants & BaseDialog.Popup.Props & {
    showCloseButton?: boolean
}

function DialogContent({
    className,
    children,
    showCloseButton = true,
    ...props
}: DialogContentProps) {
    const { popup } = dialog();

    return (
        <DialogPortal>
            <DialogOverlay />
            <BaseDialog.Popup
                data-slot="dialog-content"
                className={popup({
                    className: className as string,
                })}
                {...props}
            >
                {children}
                {showCloseButton && (
                    <BaseDialog.Close
                        data-slot="dialog-close"
                        render={<Button
                            variant="ghost"
                            className="absolute top-2 right-2"
                            size="icon-sm">
                            <XIcon /><span className="sr-only">Close</span>
                        </Button>}
                    />
                )}
            </BaseDialog.Popup>
        </DialogPortal >
    )
}

type DialogHeaderProps = DialogVariants & ComponentProps<'div'>;

function DialogHeader({
    className,
    ...props
}: DialogHeaderProps) {
    const { header } = dialog();

    return (
        <div
            data-slot="dialog-header"
            className={header({
                className: className as string,
            })}
            {...props}
        />
    )
}

type DialogFooterProps = DialogVariants & ComponentProps<'div'> & {
    showCloseButton?: boolean
}

function DialogFooter({
    className,
    showCloseButton = false,
    children,
    ...props
}: DialogFooterProps) {
    const { footer } = dialog();

    return (
        <div
            data-slot="dialog-footer"
            className={footer({
                className: className as string,
            })}
            {...props}
        >
            {children}
            {showCloseButton && (
                <BaseDialog.Close render={<Button variant="outline">Close</Button>} />
            )}
        </div>
    )
}

type DialogTitleProps = DialogVariants & BaseDialog.Title.Props;

function DialogTitle({ className, ...props }: DialogTitleProps) {
    const { title } = dialog();

    return (
        <BaseDialog.Title
            data-slot="dialog-title"
            className={title({
                className: className as string,
            })}
            {...props}
        />
    )
}

type DialogDescriptionProps = DialogVariants & BaseDialog.Description.Props;

function DialogDescription({
    className,
    ...props
}: DialogDescriptionProps) {
    const { description } = dialog();

    return (
        <BaseDialog.Description
            data-slot="dialog-description"
            className={description({
                className: className as string,
            })}
            {...props}
        />
    )
}

export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
}
