'use client'

import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { cn, tv } from 'tailwind-variants';
import { Avatar as BaseAvatar } from '@base-ui/react/avatar';

const avatar = tv({
    slots: {
        root: [
            'rounded-full',
            'after:rounded-full',
            'group/avatar',
            'relative',
            'flex',
            'shrink-0',
            'select-none',
            'after:absolute',
            'after:inset-0',
            'after:border',
            'after:border-(--foreground)/20',
            'after:mix-blend-darken',
            'dark:after:mix-blend-lighten',
        ],
        image: [
            'rounded-full',
            'aspect-square',
            'size-full',
            'object-contain',
        ],
        fallback: [
            'bg-muted',
            'text-muted-foreground',
            'rounded-full',
            'flex',
            'size-full',
            'items-center',
            'justify-center',
            'text-sm',
            'focus:outline-none',
            'focus-visible:outline-none',
            'group-data-[size=sm]/avatar:text-xs',
        ],
        badge: [
            'bg-primary',
            'text-primary-foreground',
            'ring-background',
            'absolute',
            'right-0',
            'bottom-0',
            'z-10',
            'inline-flex',
            'items-center',
            'justify-center',
            'rounded-full',
            'bg-blend-color',
            'ring-2',
            'select-none',
            'group-data-[size=sm]/avatar:size-2',
            'group-data-[size=sm]/avatar:[&>svg]:hidden',
            'group-data-[size=default]/avatar:size-2.5',
            'group-data-[size=default]/avatar:[&>svg]:size-2',
            'group-data-[size=lg]/avatar:size-3',
            'group-data-[size=lg]/avatar:[&>svg]:size-2',
        ],
    },
    variants: {
        size: {
            default: {
                root: 'size-8',
            },
            lg: {
                root: 'size-10',
            },
            sm: {
                root: 'size-6',
            },
        },
        shape: {
            square: {
                root: 'rounded-none',
            },
            rounded: {
                root: 'rounded-md',
            },
            circle: {
                root: 'rounded-full',
            },
        }
    },
    defaultVariants: {
        size: 'default',
        shape: 'circle',
    },
});

type AvatarVariants = VariantProps<typeof avatar>;

type AvatarProps = AvatarVariants & BaseAvatar.Root.Props;

function Avatar({
    className,
    size = "default",
    shape = "circle",
    ...props
}: AvatarProps) {
    const { root } = avatar();

    return (
        <BaseAvatar.Root
            data-slot="avatar"
            data-size={size}
            data-shape={shape}
            className={root({
                className: className as string,
                size,
                shape,
            })}
            {...props}
        />
    )
}

type AvatarImageProps = BaseAvatar.Image.Props;

function AvatarImage({ className, ...props }: AvatarImageProps) {
    const { image } = avatar();

    return (
        <BaseAvatar.Image
            data-slot="avatar-image"
            className={image({
                className: className as string,
            })}
            {...props}
        />
    )
}

type AvatarFallbackProps = BaseAvatar.Fallback.Props;

function AvatarFallback({
    className,
    ...props
}: AvatarFallbackProps) {
    const { fallback } = avatar();

    return (
        <BaseAvatar.Fallback
            data-slot="avatar-fallback"
            className={fallback({
                className: className as string,
            })}
            {...props}
        />
    )
}

type AvatarBadgeProps = ComponentProps<"span">;

function AvatarBadge({ className, ...props }: AvatarBadgeProps) {
    const { badge } = avatar();

    return (
        <span
            data-slot="avatar-badge"
            className={badge({
                className: className as string,
            })}
            {...props}
        />
    )
}

type AvatarGroupProps = ComponentProps<"div">;

function AvatarGroup({ className, ...props }: AvatarGroupProps) {
    return (
        <div
            data-slot="avatar-group"
            className={cn(
                "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
                className
            )}
            {...props}
        />
    )
}

type AvatarGroupCountProps = ComponentProps<"div">;

function AvatarGroupCount({
    className,
    ...props
}: AvatarGroupCountProps) {
    return (
        <div
            data-slot="avatar-group-count"
            className={cn("bg-muted text-muted-foreground size-8 rounded-full text-sm group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3 relative flex shrink-0 items-center justify-center ring-2 ring-background", className)}
            {...props}
        />
    )
}

export {
    Avatar,
    AvatarImage,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarBadge,
}
