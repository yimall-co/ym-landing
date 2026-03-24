'use client'

import type { ReactNode } from 'react';

type Props = Readonly<{
    children: ReactNode;
}>;

export default function DashboardLayout({ children }: Props) {
    return (
        <>{children}</>
    );
}
