'use client'

import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { cn, tv } from 'tailwind-variants';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';

const breadcrumb = tv({
    slots: {
        root: [],
        list: [],
        item: [],
        link: [],
        page: [],
        separator: [],
        ellipsis: [],
    },
    variants: {},
    defaultVariants: {},
});

type BreadcrumbVariants = VariantProps<typeof breadcrumb>;

type BreadcrumbProps = BreadcrumbVariants & ComponentProps<"nav">;

function Breadcrumb({ className, ...props }: BreadcrumbProps) {
    return (
        <nav
            aria-label="breadcrumb"
            data-slot="breadcrumb"
            className={cn(className)}
            {...props}
        />
    )
}

type BreadcrumbListProps = BreadcrumbVariants & ComponentProps<"ol">;

function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
    return (
        <ol
            data-slot="breadcrumb-list"
            className={cn(
                "text-muted-foreground gap-1.5 text-sm flex flex-wrap items-center wrap-break-word",
                className
            )}
            {...props}
        />
    )
}

type BreadcrumbItemProps = BreadcrumbVariants & ComponentProps<"li">;

function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
    return (
        <li
            data-slot="breadcrumb-item"
            className={cn("gap-1 inline-flex items-center", className)}
            {...props}
        />
    )
}

type BreadcrumbLinkProps = BreadcrumbVariants & useRender.ComponentProps<"a">;

function BreadcrumbLink({
    className,
    render,
    ...props
}: BreadcrumbLinkProps) {
    return useRender({
        defaultTagName: "a",
        props: mergeProps<"a">(
            {
                className: cn("hover:text-(--foreground)/70 cursor-pointer transition-colors", className),
            },
            props
        ),
        render,
        state: {
            slot: "breadcrumb-link",
        },
    })
}

type BreadcrumbPageProps = BreadcrumbVariants & ComponentProps<"span">;

function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
    return (
        <span
            data-slot="breadcrumb-page"
            role="link"
            aria-disabled="true"
            aria-current="page"
            className={cn("text-foreground font-normal", className)}
            {...props}
        />
    )
}

type BreadcrumbSeparatorProps = BreadcrumbVariants & ComponentProps<"li">;

function BreadcrumbSeparator({
    children,
    className,
    ...props
}: BreadcrumbSeparatorProps) {
    return (
        <li
            data-slot="breadcrumb-separator"
            role="presentation"
            aria-hidden="true"
            className={cn("[&>svg]:size-3.5", className)}
            {...props}
        >
            {children ?? (
                <ChevronRightIcon className="cn-rtl-flip" />
            )}
        </li>
    )
}

type BreadcrumbEllipsisProps = BreadcrumbVariants & ComponentProps<"span">;

function BreadcrumbEllipsis({
    className,
    ...props
}: BreadcrumbEllipsisProps) {
    return (
        <span
            data-slot="breadcrumb-ellipsis"
            role="presentation"
            aria-hidden="true"
            className={cn(
                "size-5 [&>svg]:size-4 flex items-center justify-center",
                className
            )}
            {...props}
        >
            <MoreHorizontalIcon
            />
            <span className="sr-only">More</span>
        </span>
    )
}

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
}
