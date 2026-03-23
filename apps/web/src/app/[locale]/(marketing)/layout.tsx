import type { ReactNode } from 'react';

import MarketingLayout from 'layouts/marketing';

type LayoutProps = Readonly<{
    children: ReactNode;
}>;

export default async function Layout({ children }: LayoutProps) {
    'use memo'

    return (
        <MarketingLayout>
            {children}
        </MarketingLayout>
    );
}
