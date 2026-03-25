import type { ReactNode } from 'react';

import DashboardLayout from 'layouts/dashboard';

type Props = Readonly<{
    children: ReactNode;
}>;

export default function Layout({ children }: Props) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}
