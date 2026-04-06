'use client';

import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { cn, tv } from 'tailwind-variants';
import { Select as BaseSelect } from '@base-ui/react/select';
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from 'lucide-react';

const select = tv({
    slots: {
        group: [
            'scroll-my-1',
            'p-1',
        ],
        value: [
            'flex',
            'flex-1',
            'text-left',
        ],
        trigger: [
            'border-input',
            'data-placeholder:text-muted-foreground',
            'dark:bg-input/30',
            'dark:hover:bg-input/50',
            'focus-visible:border-ring',
            'focus-visible:ring-ring/50',
            'aria-invalid:ring-destructive/20',
            'dark:aria-invalid:ring-destructive/40',
            'aria-invalid:border-destructive',
            'dark:aria-invalid:border-destructive/50',
            'gap-1.5',
            'rounded-lg',
            'border',
            'bg-transparent',
            'px-4.5',
            'py-4',
            'text-sm',
            'transition-colors',
            'select-none',
            'focus-visible:ring-3',
            'aria-invalid:ring-3',
            'data-[size=default]:h-8',
            'data-[size=sm]:h-7',
            'data-[size=sm]:rounded-[min(var(--radius-md),10px)]',
            '*:[data-slot=select-value]:gap-1.5',
            "[&_svg:not([class*='size - '])]:size-4",
            'flex',
            'min-w-[160px]',
            'w-fit',
            'items-center',
            'justify-between',
            'whitespace-nowrap',
            'outline-none',
            'disabled:cursor-not-allowed',
            'disabled:opacity-50',
            '*:[data-slot=select-value]:line-clamp-1',
            '*:[data-slot=select-value]:flex',
            '*:[data-slot=select-value]:items-center',
            '[&_svg]:pointer-events-none',
            '[&_svg]:shrink-0',
        ],
        popup: [
            'bg-(--background)',
            'text-popover-foreground',
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
            'min-w-36',
            'rounded-lg',
            'shadow-md',
            'ring-1',
            'duration-100',
            'data-[side=inline-start]:slide-in-from-right-2',
            'data-[side=inline-end]:slide-in-from-left-2',
            'relative',
            'isolate',
            'z-50',
            'max-h-(--available-height)',
            'w-(--anchor-width)',
            'origin-(--transform-origin)',
            'overflow-x-hidden',
            'overflow-y-auto',
            'data-[align-trigger=true]:animate-none',
        ]
    },
    variants: {},
    defaultVariants: {},
});

type SelectVariants = VariantProps<typeof select>;

const Select = BaseSelect.Root

type SelectGroupProps = BaseSelect.Group.Props & SelectVariants;

function SelectGroup({ className, ...props }: SelectGroupProps) {
    const { group } = select();

    return (
        <BaseSelect.Group
            data-slot="select-group"
            className={group({
                className: className as string,
            })}
            {...props}
        />
    )
}

type SelectValueProps = SelectVariants & BaseSelect.Value.Props;

function SelectValue({ className, ...props }: SelectValueProps) {
    const { value } = select();

    return (
        <BaseSelect.Value
            data-slot="select-value"
            className={value({
                className: className as string,
            })}
            {...props}
        />
    )
}

type SelectTriggerProps = SelectVariants & BaseSelect.Trigger.Props & {
    size?: 'sm' | 'default';
};

function SelectTrigger({
    className,
    size = "default",
    children,
    ...props
}: SelectTriggerProps) {
    const { trigger } = select();

    return (
        <BaseSelect.Trigger
            data-slot="select-trigger"
            data-size={size}
            className={trigger({
                className: className as string,
            })}
            {...props}
        >
            {children}
            <BaseSelect.Icon
                render={
                    <ChevronDownIcon className="text-muted-foreground size-4 pointer-events-none" />
                }
            />
        </BaseSelect.Trigger>
    )
}

type SelectContentProps = SelectVariants & BaseSelect.Popup.Props & {
    side?: 'bottom' | 'left' | 'right' | 'top';
    sideOffset?: number;
    align?: 'center' | 'start' | 'end';
    alignOffset?: number;
    alignItemWithTrigger?: boolean;
};

function SelectContent({
    className,
    children,
    side = "bottom",
    sideOffset = 4,
    align = "center",
    alignOffset = 0,
    alignItemWithTrigger = true,
    ...props
}: SelectContentProps) {
    const { popup } = select();

    return (
        <BaseSelect.Portal>
            <BaseSelect.Positioner
                side={side}
                sideOffset={sideOffset}
                align={align}
                alignOffset={alignOffset}
                alignItemWithTrigger={alignItemWithTrigger}
                className="isolate z-50"
            >
                <BaseSelect.Popup
                    data-slot="select-content"
                    data-align-trigger={alignItemWithTrigger}
                    className={popup({
                        className: className as string
                    })}
                    {...props}
                >
                    <SelectScrollUpButton />
                    <BaseSelect.List>{children}</BaseSelect.List>
                    <SelectScrollDownButton />
                </BaseSelect.Popup>
            </BaseSelect.Positioner>
        </BaseSelect.Portal>
    )
}

type SelectLabelProps = SelectVariants & BaseSelect.GroupLabel.Props;

function SelectLabel({
    className,
    ...props
}: SelectLabelProps) {
    return (
        <BaseSelect.GroupLabel
            data-slot="select-label"
            className={cn("text-muted-foreground px-1.5 py-1 text-xs", className)}
            {...props}
        />
    )
}

type SelectItemProps = SelectVariants & BaseSelect.Item.Props;

function SelectItem({
    className,
    children,
    ...props
}: SelectItemProps) {
    return (
        <BaseSelect.Item
            data-slot="select-item"
            className={cn(
                "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className
            )}
            {...props}
        >
            <BaseSelect.ItemText className="flex flex-1 gap-2 shrink-0 whitespace-nowrap">
                {children}
            </BaseSelect.ItemText>
            <BaseSelect.ItemIndicator render={<span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center"><CheckIcon className="pointer-events-none" /></span>} />
        </BaseSelect.Item>
    )
}

type SelectSeparatorProps = SelectVariants & BaseSelect.Separator.Props;

function SelectSeparator({
    className,
    ...props
}: SelectSeparatorProps) {
    return (
        <BaseSelect.Separator
            data-slot="select-separator"
            className={cn("bg-border -mx-1 my-1 h-px pointer-events-none", className)}
            {...props}
        />
    )
}

type SelectScrollUpButtonProps = SelectVariants & ComponentProps<typeof BaseSelect.ScrollUpArrow>;

function SelectScrollUpButton({
    className,
    ...props
}: SelectScrollUpButtonProps) {
    return (
        <BaseSelect.ScrollUpArrow
            data-slot="select-scroll-up-button"
            className={cn("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4 top-0 w-full", className)}
            {...props}
        >
            <ChevronUpIcon
            />
        </BaseSelect.ScrollUpArrow>
    )
}

type SelectScrollDownButtonProps = SelectVariants & ComponentProps<typeof BaseSelect.ScrollDownArrow>;

function SelectScrollDownButton({
    className,
    ...props
}: SelectScrollDownButtonProps) {
    return (
        <BaseSelect.ScrollDownArrow
            data-slot="select-scroll-down-button"
            className={cn("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4 bottom-0 w-full", className)}
            {...props}
        >
            <ChevronDownIcon
            />
        </BaseSelect.ScrollDownArrow>
    )
}

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
}
