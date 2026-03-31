'use client'

import { Fragment } from 'react';
import { useTranslations } from 'next-intl';
import { LogOut, User2 } from 'lucide-react';

import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@yimall/ui';

type Props = Readonly<{}>;

export default function UserMenu({ }: Props) {
    const t = useTranslations();

    return (
        <Fragment>
            <DropdownMenuGroup>
                <DropdownMenuLabel>{t('User.account')}</DropdownMenuLabel>
                <DropdownMenuItem>
                    <User2 /> {t('User.profile')}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <LogOut /> {t('User.logout')}
            </DropdownMenuItem>
        </Fragment>
    );
}
