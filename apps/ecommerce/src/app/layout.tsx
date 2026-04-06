import type { ReactNode } from 'react'

type LayoutProps = Readonly<{
    children: ReactNode;
}>;

export default function RootLayout({ children }: LayoutProps) {
    return children;
}
