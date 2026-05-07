'use client';

import { usePathname, useRouter } from 'lib/i18n';

import {
    Drawer,
    DrawerContent,
    DrawerTitle,
} from '@yimall/ui';

import Category from 'pages/category';

type Props = Readonly<{
    locale: string;
    categorySlug: string;
}>;

export default function CategoryDrawer({ locale, categorySlug }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = pathname === '/categories/[categorySlug]';

    return (
        <Drawer
            open={isActive}
            onOpenChange={() => isActive && router.back()}
        >
            <DrawerContent className='h-full'>
                <DrawerTitle className='sr-only'>Categoria</DrawerTitle>
                <Category locale={locale} categorySlug={categorySlug} />
            </DrawerContent>
        </Drawer>
    );
}
