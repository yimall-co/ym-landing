'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail
} from '@yimall/ui';

import { useLightweightUser } from 'features/user/hooks';

import { useDashboardStore } from './store';

import UserSelector from 'features/user/selector';
import WorkspaceSelector from 'features/workspace/selector';
import SettingsSelector from 'features/settings/selector';

type Props = Readonly<{}>;

export default function DashboardSidebar({ }: Props) {
    'use memo'
    const params = useParams();

    const workspaceSlug = params.workspaceSlug as string;

    const { data: user, isLoading: isLoadingUser } = useLightweightUser();

    const [selectedWorkspace, setSelectedWorkspace] = useDashboardStore(
        useShallow((state) => [state.selectedWorkspace, state.setSelectedWorkspace])
    );

    // Unselect workspace if the workspace slug is not present
    useEffect(() => {
        if (!workspaceSlug) setSelectedWorkspace(null);
    }, [workspaceSlug, setSelectedWorkspace])

    return (
        <Sidebar className='bg-background/80' collapsible='offcanvas' variant='sidebar'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <WorkspaceSelector workspace={selectedWorkspace} isLoading={false} />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SettingsSelector />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <UserSelector user={user ?? null} isLoading={isLoadingUser} />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
