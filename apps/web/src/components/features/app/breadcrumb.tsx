'use client';

import Link from 'next/link';

import { Fragment } from 'react';
import { useTranslations } from 'next-intl';

import { useNavigation } from 'shared/contexts/navigation';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@yimall/ui';

type Props = Readonly<{}>;

export default function AppBreadcrumb({ }: Props) {
    const t = useTranslations('breadcrumb');

    const { breadcrumbs } = useNavigation();

    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    const label = t.has(breadcrumb.label) ? t(breadcrumb.label) : breadcrumb.label;

                    return (
                        <Fragment key={breadcrumb.label}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>
                                        {label}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink render={<Link href={breadcrumb.href} />}>
                                        {label}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
