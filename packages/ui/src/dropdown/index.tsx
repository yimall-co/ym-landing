'use client'

import type { ComponentProps, JSX } from 'react';
import type { VariantProps } from 'tailwind-variants';

import {
    createContext,
    useContext,
} from 'react';
import { cn, tv } from 'tailwind-variants';
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { ChevronRightIcon, CheckIcon } from 'lucide-react'

const dropdown = tv({
    slots: {
        positioner: [
            'isolate',
            'z-50',
            'outline-none'
        ],
        popup: [
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
            'ring-foreground/10',
            'bg-background',
            'text-popover-foreground',
            'min-w-32',
            'rounded-lg',
            'p-2',
            'shadow-md',
            'ring-1',
            'ring-neutral-800',
            'duration-100',
            'data-[side=inline-start]:slide-in-from-right-2',
            'data-[side=inline-end]:slide-in-from-left-2',
            'z-50',
            'md:min-w-32',
            'max-h-(--available-height)',
            'w-(--anchor-width)',
            'origin-(--transform-origin)',
            'overflow-x-hidden',
            'overflow-y-auto',
            'outline-none',
            'data-closed:overflow-hidden',
        ],
        label: [
            'text-muted-foreground',
            'px-1.5',
            'py-1',
            'text-xs',
            'font-medium',
            'data-inset:pl-7',
        ],
        item: [
            'focus:bg-accent',
            'focus:text-accent-foreground',
            'data-[variant=destructive]:text-destructive',
            'data-[variant=destructive]:focus:bg-destructive/10',
            'dark:data-[variant=destructive]:focus:bg-destructive/20',
            'data-[variant=destructive]:focus:text-destructive',
            'data-[variant=destructive]:*:[svg]:text-destructive',
            'not-data-[variant=destructive]:focus:**:text-accent-foreground',
            'gap-1.5',
            'rounded-md',
            'px-2.5',
            'py-2',
            'text-sm',
            'data-inset:pl-7',
            '[&_svg:not([class*="size-"])]:size-4',
            'group/dropdown-menu-item',
            'relative',
            'flex',
            'items-center',
            'outline-hidden',
            'select-none',
            'data-disabled:pointer-events-none',
            'data-disabled:opacity-50',
            '[&_svg]:pointer-events-none',
            '[&_svg]:shrink-0',
        ]
    },
    variants: {
        variant: {
            default: {
                item: [
                    'hover:bg-foreground/10',
                    'hover:cursor-pointer',
                ],
            },
            destructive: {
                item: [],
            },
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

type DropdownVariants = VariantProps<typeof dropdown>;

type DropdownContextProps = Pick<BaseMenu.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset"> & {
    Component: any | null;
};

const DropdownContext = createContext<DropdownContextProps>({
    align: 'center',
    side: 'right',
    Component: null,
});

function useDropdown() {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error('useDropdown must be used within a Dropdown');
    }

    return context;
}

function createDropdownHandler() {
    return BaseMenu.createHandle<DropdownContextProps>();
}

type DropdownMenuProps = BaseMenu.Root.Props<DropdownContextProps> & Omit<DropdownContextProps, 'Component'>;

function DropdownMenu({
    align = "center",
    alignOffset = 0,
    side = "right",
    sideOffset = 4,
    ...props
}: DropdownMenuProps) {
    return (
        <DropdownContext.Provider value={{
            align,
            alignOffset,
            side,
            sideOffset,
            Component: null,
        }}>
            <BaseMenu.Root data-slot="dropdown-menu" {...props} />
        </DropdownContext.Provider>
    );
}

type DropdownMenuPortalProps = BaseMenu.Portal.Props;

function DropdownMenuPortal({ ...props }: DropdownMenuPortalProps) {
    return <BaseMenu.Portal data-slot="dropdown-menu-portal" {...props} />
}

type DropdownMenuTriggerProps = BaseMenu.Trigger.Props;

function DropdownMenuTrigger({ ...props }: DropdownMenuTriggerProps) {
    return <BaseMenu.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

type DropdownMenuContentProps = DropdownVariants
    & BaseMenu.Popup.Props
    & Omit<DropdownContextProps, 'Component'>;

function DropdownMenuContent({
    align = "start",
    alignOffset = 0,
    side = "bottom",
    sideOffset = 4,
    className,
    ...props
}: DropdownMenuContentProps) {
    const {
        align: ctxAlign,
        alignOffset: ctxAlignOffset,
        side: ctxSide,
        sideOffset: ctxSideOffset
    } = useDropdown();

    const { positioner, popup } = dropdown();

    return (
        <BaseMenu.Portal>
            <BaseMenu.Positioner
                className={positioner()}
                align={align ?? ctxAlign}
                alignOffset={alignOffset ?? ctxAlignOffset}
                side={side ?? ctxSide}
                sideOffset={sideOffset ?? ctxSideOffset}
            >
                <BaseMenu.Popup
                    data-slot="dropdown-menu-content"
                    className={popup({
                        className: className as string,
                    })}
                    {...props}
                />
            </BaseMenu.Positioner>
        </BaseMenu.Portal>
    )
}

type DropdownMenuGroupProps = BaseMenu.Group.Props;

function DropdownMenuGroup({ ...props }: DropdownMenuGroupProps) {
    return <BaseMenu.Group data-slot="dropdown-menu-group" {...props} />
}

type DropdownMenuLabelProps = BaseMenu.GroupLabel.Props & {
    inset?: boolean
};

function DropdownMenuLabel({
    className,
    inset,
    ...props
}: DropdownMenuLabelProps) {
    const { label } = dropdown();

    return (
        <BaseMenu.GroupLabel
            data-slot="dropdown-menu-label"
            data-inset={inset}
            className={label({
                className: className as string
            })}
            {...props}
        />
    )
}

type DropdownMenuItemProps = DropdownVariants & BaseMenu.Item.Props & {
    inset?: boolean
    variant?: "default" | "destructive"
};

function DropdownMenuItem({
    className,
    inset,
    variant = "default",
    ...props
}: DropdownMenuItemProps) {
    const { item } = dropdown();

    return (
        <BaseMenu.Item
            data-slot="dropdown-menu-item"
            data-inset={inset}
            data-variant={variant}
            className={item({
                className: className as string,
                variant,
            })}
            {...props}
        />
    )
}

type DropdownMenuSubProps = BaseMenu.SubmenuRoot.Props;

function DropdownMenuSub({ ...props }: DropdownMenuSubProps) {
    return <BaseMenu.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

type DropdownMenuSubTriggerProps = BaseMenu.SubmenuTrigger.Props & {
    inset?: boolean
};

function DropdownMenuSubTrigger({
    className,
    inset,
    children,
    ...props
}: DropdownMenuSubTriggerProps) {
    return (
        <BaseMenu.SubmenuTrigger
            data-slot="dropdown-menu-sub-trigger"
            data-inset={inset}
            className={cn(
                "focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 flex cursor-default items-center outline-hidden select-none data-popup-open:bg-accent data-popup-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className
            )}
            {...props}
        >
            {children}
            <ChevronRightIcon className="cn-rtl-flip ml-auto" />
        </BaseMenu.SubmenuTrigger>
    )
}

type DropdownMenuSubContentProps = ComponentProps<typeof DropdownMenuContent>;

function DropdownMenuSubContent({
    align = "start",
    alignOffset = -3,
    side = "right",
    sideOffset = 0,
    className,
    ...props
}: DropdownMenuSubContentProps) {
    return (
        <DropdownMenuContent
            data-slot="dropdown-menu-sub-content"
            className={cn("data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-[96px] rounded-lg p-1 shadow-lg ring-1 duration-100 w-auto", className)}
            align={align}
            alignOffset={alignOffset}
            side={side}
            sideOffset={sideOffset}
            {...props}
        />
    )
}

type DropdownMenuCheckboxItemProps = BaseMenu.CheckboxItem.Props & {
    inset?: boolean
};

function DropdownMenuCheckboxItem({
    className,
    children,
    checked,
    inset,
    ...props
}: DropdownMenuCheckboxItemProps) {
    return (
        <BaseMenu.CheckboxItem
            data-slot="dropdown-menu-checkbox-item"
            data-inset={inset}
            className={cn(
                "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className
            )}
            checked={checked}
            {...props}
        >
            <span
                className="absolute right-2 flex items-center justify-center pointer-events-none"
                data-slot="dropdown-menu-checkbox-item-indicator"
            >
                <BaseMenu.CheckboxItemIndicator>
                    <CheckIcon
                    />
                </BaseMenu.CheckboxItemIndicator>
            </span>
            {children}
        </BaseMenu.CheckboxItem>
    )
}

type DropdownMenuRadioGroupProps = BaseMenu.RadioGroup.Props;

function DropdownMenuRadioGroup({ ...props }: DropdownMenuRadioGroupProps) {
    return (
        <BaseMenu.RadioGroup
            data-slot="dropdown-menu-radio-group"
            {...props}
        />
    )
}

type DropdownMenuRadioItemProps = BaseMenu.RadioItem.Props & {
    inset?: boolean
};

function DropdownMenuRadioItem({
    className,
    children,
    inset,
    ...props
}: DropdownMenuRadioItemProps) {
    return (
        <BaseMenu.RadioItem
            data-slot="dropdown-menu-radio-item"
            data-inset={inset}
            className={cn(
                'focus:bg-accent',
                'focus:text-accent-foreground',
                'focus:**:text-accent-foreground',
                'gap-1.5',
                'rounded-md',
                'py-1',
                'pr-8',
                'pl-1.5',
                'text-sm',
                'data-inset:pl-7',
                "[&_svg:not([class*='size-'])]:size-4",
                'relative flex cursor-default items-center outline-hidden select-none',
                'data-disabled:pointer-events-none',
                'data-disabled:opacity-50',
                '[&_svg]:pointer-events-none',
                '[&_svg]:shrink-0',
                className
            )}
            {...props}
        >
            <span
                className="absolute right-2 flex items-center justify-center pointer-events-none"
                data-slot="dropdown-menu-radio-item-indicator"
            >
                <BaseMenu.RadioItemIndicator>
                    <CheckIcon
                    />
                </BaseMenu.RadioItemIndicator>
            </span>
            {children}
        </BaseMenu.RadioItem>
    )
}

type DropdownMenuSeparatorProps = BaseMenu.Separator.Props;

function DropdownMenuSeparator({
    className,
    ...props
}: DropdownMenuSeparatorProps) {
    return (
        <BaseMenu.Separator
            data-slot="dropdown-menu-separator"
            className={cn("bg-border -mx-1 my-1 h-px", className)}
            {...props}
        />
    )
}

type DropdownMenuShortcutProps = ComponentProps<"span">;

function DropdownMenuShortcut({
    className,
    ...props
}: DropdownMenuShortcutProps) {
    return (
        <span
            data-slot="dropdown-menu-shortcut"
            className={cn("text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest", className)}
            {...props}
        />
    )
}

export {
    createDropdownHandler,
    DropdownMenu,
    DropdownMenuPortal,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
}
