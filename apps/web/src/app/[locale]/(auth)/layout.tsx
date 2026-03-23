import type { ReactNode } from 'react';

import AuthLayout from 'layouts/auth';

type LayoutProps = Readonly<{
    children: ReactNode;
}>;

export default function Layout({ children }: LayoutProps) {
    'use memo'

    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    );
}
