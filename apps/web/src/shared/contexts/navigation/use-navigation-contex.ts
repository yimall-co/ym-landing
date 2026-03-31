import { useMemo } from 'react';
import { useLocale } from 'next-intl';

import { usePathname } from 'lib/i18n';

type BreadcrumbItem = Readonly<{
    label: string;
    href: string;
}>;

type UseNavigationContext = Readonly<{
    breadcrumbs: BreadcrumbItem[];
}>;

export default function useNavigationContext(): UseNavigationContext {
    'use memo'
    const locale = useLocale();
    const pathname = usePathname();

    const breadcrumbs = useMemo<Array<BreadcrumbItem>>(
        () => {
            const segments = pathname.split('/').filter(Boolean);

            return [
                { label: 'root', href: '/' },
                ...segments.map((segment, index) => ({
                    label: segment,
                    href: `/${locale}/${segments.slice(0, index + 1).join('/')}`,
                })),
            ];
        },
        [locale, pathname],
    );

    return {
        breadcrumbs,
    };
}
