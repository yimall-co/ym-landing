'use client';

import { Settings } from 'lucide-react';

import {
    PopoverTrigger,
    SidebarMenuButton
} from '@yimall/ui';

import { appPopoverHandler } from 'features/app/popover';

import SettingsMenu from './menu';

type Props = Readonly<{}>;

export default function SettingsSelector({ }: Props) {
    return (
        <PopoverTrigger
            handle={appPopoverHandler}
            payload={{
                side: 'right',
                align: 'center',
                Component: SettingsMenu,
            }}
            render={<SidebarMenuButton tooltip={'Settings'} />}
        >
            <Settings /> Settings
        </PopoverTrigger>
    );
}
