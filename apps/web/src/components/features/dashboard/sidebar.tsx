'use client';

import { Settings, User2 } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    PopoverTrigger,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from '@yimall/ui';

import { appPopoverHandler } from 'features/app/popover';

import SettingsPanel from 'features/settings/panel';

type Props = Readonly<{}>;

export default function DashboardSidebar({ }: Props) {

    return (
        <Sidebar className='bg-primary text-light' collapsible='icon' variant='sidebar'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>

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
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                nativeButton={false}
                                render={<div />}
                                className='w-full'
                            >
                                <SidebarMenuButton>
                                    <User2 /> Username
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                        Marketplace
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <PopoverTrigger
                            handle={appPopoverHandler}
                            payload={SettingsPanel}
                            nativeButton={false}
                            render={<div />}
                        >
                            <SidebarMenuButton>
                                <Settings /> Settings
                            </SidebarMenuButton>
                        </PopoverTrigger>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
