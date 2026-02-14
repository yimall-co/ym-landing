import type { ReactNode } from 'react';

import MarketingLayout from 'layouts/marketing';

type LayoutProps = Readonly<{
    children: ReactNode;
}>;

export default async function Layout(props: LayoutProps) {
    const { children } = props;

    return (
        <MarketingLayout>
            {children}
        </MarketingLayout>
    );
}