import type { ReactNode } from 'react';

import MarketingLayout from 'layouts/marketing';

type Props = Readonly<{
    children: ReactNode;
}>;

export default async function Layout({ children }: Props) {

    return (
        <MarketingLayout>
            {children}
        </MarketingLayout>
    );
}
