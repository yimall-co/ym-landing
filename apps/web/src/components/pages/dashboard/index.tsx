'use client';

import { Heading } from '@yimall/ui';

import { useWorkspacesByOwner } from 'features/dashboard/hooks';

import AppBreadcrumb from 'features/app/breadcrumb';
import DashboardWorkspaceCard from 'features/dashboard/workspace-card';

type Props = Readonly<{
    locale: string;
}>;

export default function Dashboard({ locale }: Props) {
    const { data: workspaces, isLoading: isLoadingWorkspaces } = useWorkspacesByOwner();

    return (
        <div className='size-full flex-1 flex flex-col gap-4 pt-4'>
            <AppBreadcrumb />
            <div className='flex flex-col gap-y-2'>
                <Heading level='2'>
                    Panel de control
                </Heading>
            </div>
            <div className='flex flex-col items-center gap-4 md:flex-row'>
                {workspaces?.map((workspace) => (
                    <DashboardWorkspaceCard key={workspace.id} workspace={workspace} />
                ))}
            </div>
        </div>
    );
}
