'use client';

import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';
import { motion } from 'motion/react';
import { Drawer as BaseDrawer } from 'vaul';

const drawer = tv({
    slots: {
        overlay: [
            'z-40',
            'bg-black/60',
            'data-[state=open]:animate-in',
            'data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0',
            'data-[state=open]:fade-in-0',
            'fixed inset-0 z-none'
        ],
        content: [
            'group/drawer-content',
            'fixed',
            'z-50',
            'flex',
            'h-auto',
            'flex-col',
            'bg-(--background)',
            'border-(--foreground)/10',
            'data-[vaul-drawer-direction=top]:inset-x-0',
            'data-[vaul-drawer-direction=top]:top-0',
            'data-[vaul-drawer-direction=top]:mb-24',
            'data-[vaul-drawer-direction=top]:max-h-[90dvh]',
            'data-[vaul-drawer-direction=top]:rounded-b-lg',
            'data-[vaul-drawer-direction=top]:border-b',
            'data-[vaul-drawer-direction=bottom]:inset-x-0',
            'data-[vaul-drawer-direction=bottom]:bottom-0',
            'data-[vaul-drawer-direction=bottom]:mt-8',
            'data-[vaul-drawer-direction=bottom]:max-h-[95dvh]',
            'data-[vaul-drawer-direction=bottom]:rounded-t-2xl',
            'data-[vaul-drawer-direction=bottom]:border-t',
            'data-[vaul-drawer-direction=right]:inset-y-0',
            'data-[vaul-drawer-direction=right]:right-0',
            'data-[vaul-drawer-direction=right]:w-3/4',
            'data-[vaul-drawer-direction=right]:border-l',
            'data-[vaul-drawer-direction=right]:sm:max-w-sm',
            'data-[vaul-drawer-direction=left]:inset-y-0',
            'data-[vaul-drawer-direction=left]:left-0',
            'data-[vaul-drawer-direction=left]:w-3/4',
            'data-[vaul-drawer-direction=left]:border-r',
            'data-[vaul-drawer-direction=left]:sm:max-w-sm',
        ],
        contentToggle: [
            'bg-neutral-200',
            'mx-auto',
            'mt-2',
            'mb-2',
            'hidden',
            'h-2',
            'w-[100px]',
            'shrink-0',
            'rounded-full',
            'group-data-[vaul-drawer-direction=bottom]/drawer-content:block',
        ],
        trigger: ['outline-none'],
        header: ['flex flex-row gap-1.5 p-4'],
        footer: ['mt-auto flex flex-col gap-2 p-4'],
        title: [
            'text-lg text-foreground font-semibold',
            'md:text-xl'
        ],
        close: ['cursor-pointer'],
        description: ['text-muted-foreground text-sm'],
    },
    variants: {
        selected: {
            true: {
                // trigger: 'text-(--mui-palette-primary-main)',
            },
            false: {
                // trigger: 'text-dark-600 dark:text-light-400',
            },
        },
    },
});

type DrawerVariants = VariantProps<typeof drawer>;

type DrawerProps = DrawerVariants & ComponentProps<typeof BaseDrawer.Root>;

function Drawer({
    ...props
}: DrawerProps) {
    'use memo'

    return (
        <BaseDrawer.Root
            {...props}
            data-slot='drawer'
        />
    );
};

type DrawerTriggerProps = DrawerVariants & ComponentProps<typeof BaseDrawer.Trigger>;

function DrawerTrigger({
    className,
    selected,
    ...props
}: DrawerTriggerProps) {
    'use memo'
    const { trigger } = drawer({
        selected,
    });

    return (
        <BaseDrawer.Trigger
            {...props}
            data-slot='drawer-trigger'
            className={trigger({
                className,
            })}
        />
    );
}

type DrawerPortalProps = DrawerVariants & ComponentProps<typeof BaseDrawer.Portal>;

function DrawerPortal({
    ...props
}: DrawerPortalProps) {
    'use memo'

    return (
        <BaseDrawer.Portal
            {...props}
            data-slot='drawer-portal'
        />
    );
}

type DrawerCloseProps = DrawerVariants & ComponentProps<typeof BaseDrawer.Close>;

function DrawerClose({
    className,
    ...props
}: DrawerCloseProps) {
    'use memo'
    const { close } = drawer();

    return (
        <BaseDrawer.Close
            {...props}
            data-slot='drawer-close'
            className={close({
                className,
            })}
        />
    );
}

type DrawerOverlayProps = DrawerVariants & ComponentProps<typeof BaseDrawer.Overlay>;

function DrawerOverlay({
    className,
    ...props
}: DrawerOverlayProps) {
    'use memo'
    const { overlay } = drawer();

    return (
        <BaseDrawer.Overlay
            {...props}
            data-slot='drawer-overlay'
            className={overlay({
                className,
            })}
        />
    );
}

type DrawerContentProps = DrawerVariants & ComponentProps<typeof BaseDrawer.Content> & {
    showToggle?: boolean;
};

function DrawerContent({
    className,
    children,
    showToggle = true,
    ...props
}: DrawerContentProps) {
    'use memo'
    const {
        content,
        contentToggle,
    } = drawer();

    return (
        <DrawerPortal>
            <DrawerOverlay />
            <BaseDrawer.Content
                {...props}
                data-slot='drawer-content'
                className={content({
                    className,
                })}
            >
                <BaseDrawer.Description className='sr-only'>
                    Dynamic menu for mobile devices
                </BaseDrawer.Description>
                {showToggle && <div className={contentToggle()} />}
                {children}
            </BaseDrawer.Content>
        </DrawerPortal>
    );
}

type DrawerHeaderProps = DrawerVariants & ComponentProps<typeof motion.div>;

function DrawerHeader({
    className,
    ...props
}: DrawerHeaderProps) {
    'use memo'
    const { header } = drawer();

    return (
        <motion.div
            {...props}
            data-slot='drawer-header'
            className={header({
                className,
            })}
        />
    );
}

type DrawerFooterProps = DrawerVariants & ComponentProps<typeof motion.div>;

function DrawerFooter({
    className,
    ...props
}: DrawerFooterProps) {
    'use memo'
    const { footer } = drawer();

    return (
        <motion.div
            {...props}
            data-slot='drawer-footer'
            className={footer({
                className,
            })}
        />
    );
}

type DrawerTitleProps = DrawerVariants & ComponentProps<typeof BaseDrawer.Title>;

function DrawerTitle({
    className,
    ...props
}: DrawerTitleProps) {
    'use memo'
    const { title } = drawer();

    return (
        <BaseDrawer.Title
            {...props}
            data-slot='drawer-title'
            className={title({
                className,
            })}
        />
    );
}

type DrawerDescriptionProps = DrawerVariants & ComponentProps<typeof BaseDrawer.Description>;

function DrawerDescription({
    className,
    ...props
}: DrawerDescriptionProps) {
    'use memo'
    const { description } = drawer();

    return (
        <BaseDrawer.Description
            {...props}
            data-slot='drawer-description'
            className={description({
                className,
            })}
        />
    );
}

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
};
