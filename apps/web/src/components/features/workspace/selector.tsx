'use client';

import { useTranslations } from 'next-intl';
import { ChevronsUpDown } from 'lucide-react';

import { Workspace } from 'lib/db';
import { WorkspaceData } from 'lib/workspace-data';

import {
    DropdownMenuTrigger,
    SidebarMenuButton,
    Skeleton
} from '@yimall/ui';

import { Logo } from 'ui/logo';

import { dashboardDropdownHandler } from 'features/dashboard/dropdown';

import WorkspaceMenu from './menu';

type Props = Readonly<{
    workspace: Workspace | WorkspaceData | null;
    isLoading: boolean;
}>;

export default function WorkspaceSelector({ workspace, isLoading }: Props) {
    'use memo'
    const t = useTranslations();

    if (isLoading) return <Skeleton className='w-full h-14' />

    return (
        <DropdownMenuTrigger
            handle={dashboardDropdownHandler}
            payload={{
                side: 'right',
                align: 'center',
                Component: WorkspaceMenu,
            }}
            render={<SidebarMenuButton className='hover:bg-foreground/10 hover:cursor-pointer' />}
        >
            <div className='aspect-square size-12'>
                <Logo variant='element' />
            </div>
            {!workspace && (
                <div className='flex-1 flex flex-col'>
                    <span className='font-bold'>{t('Dashboard.sidebar.title')}</span>
                    <span className='text-xs'>{t('Workspace.selectYourWorkspace')}</span>
                </div>
            )}
            {workspace && (
                <div className='flex-1 flex flex-col'>
                    <span className='font-bold'>{workspace.name}</span>
                    <span className='text-xs'>{workspace.slug}</span>
                </div>
            )}
            <ChevronsUpDown />
        </DropdownMenuTrigger>
    );
}
