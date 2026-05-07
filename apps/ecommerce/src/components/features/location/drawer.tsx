'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

import { usePathname, useRouter } from 'lib/i18n';

import { useDevice } from 'shared/contexts/device';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from '@yimall/ui';

import Location from 'pages/location';

type Props = Readonly<{
    locale: string;
}>;

export default function LocationDrawer({ locale }: Props) {
    const t = useTranslations('Location');
    const router = useRouter();
    const pathname = usePathname();

    const { isDesktop } = useDevice();

    const [isOpen, setIsOpen] = useState<boolean>(() => pathname === '/location');

    const handleOpenChange = () => {
        setIsOpen(false);
        router.back();
    };

    if (isDesktop) {
        return (
            <Dialog
                open={isOpen}
                onOpenChange={handleOpenChange}
            >
                <DialogContent className='h-full max-h-[768px] p-0'>
                    <DialogHeader className='sr-only'>
                        <DialogTitle>{t('title')}</DialogTitle>
                    </DialogHeader>
                    <Location locale={locale} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer
            open={isOpen}
            dismissible={false}
            onOpenChange={setIsOpen}
        >
            <DrawerContent className='h-full' showToggle={false}>
                <DrawerHeader>
                    <DrawerTitle>{t('title')}</DrawerTitle>
                    <div className='ml-auto'>
                        <DrawerClose
                            onClick={handleOpenChange}
                            onTouchStart={handleOpenChange}
                        >
                            <X />
                        </DrawerClose>
                    </div>
                </DrawerHeader>
                <Location locale={locale} />
            </DrawerContent>
        </Drawer>
    );
}
