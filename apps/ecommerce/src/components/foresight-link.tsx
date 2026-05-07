'use client';

import type { ReactNode } from 'react';
import type { LinkProps } from 'next/link';
import type { ForesightRegisterOptions } from 'js.foresight';

import Link from 'next/link';

import { useRouter } from 'lib/i18n';

import { useForesight } from 'shared/hooks';

type Props = Omit<LinkProps, "prefetch">
    & Omit<ForesightRegisterOptions, "element" | "callback">
    & Readonly<{
        children: ReactNode;
        className?: string;
    }>;

export default function ForesightLink({
    children,
    className,
    ...props
}: Props) {
    const router = useRouter();

    const { elementRef } = useForesight<HTMLAnchorElement>({
        callback: () => {
            router.prefetch(props.href.toString() as any);
        },
        hitSlop: props.hitSlop,
        name: props.name,
        meta: props.meta,
        reactivateAfter: props.reactivateAfter,
    });

    return (
        <Link
            {...props}
            ref={elementRef}
            className={className}
            prefetch={false}
        >
            {children}
        </Link>
    );
}
