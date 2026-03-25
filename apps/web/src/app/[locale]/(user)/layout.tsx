import type { ReactNode } from 'react';

import UserLayout from 'layouts/user';

type Props = Readonly<{
    children: ReactNode;
}>;

export default function Layout({ children }: Props) {
    return (
        <UserLayout>
            {children}
        </UserLayout>
    );
}
