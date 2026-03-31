'use client'

import Image from 'next/image';

import { ChevronsUpDown } from 'lucide-react';

import { User } from 'lib/db';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    DropdownMenuTrigger,
    SidebarMenuButton,
    Skeleton
} from '@yimall/ui';

import { dashboardDropdownHandler } from 'features/dashboard/dropdown';

import UserMenu from './menu';

type Props = Readonly<{
    user: User | null;
    isLoading: boolean;
}>;

export default function UserSelector({ user, isLoading }: Props) {
    'use memo'
    if (!user || isLoading) return <Skeleton className='w-full h-14' />

    return (
        <DropdownMenuTrigger
            handle={dashboardDropdownHandler}
            payload={{
                side: 'right',
                align: 'center',
                Component: UserMenu
            }}
            render={<SidebarMenuButton
                tooltip={user.name}
                className='hover:bg-foreground/10 hover:cursor-pointer'
            />}
        >
            <Avatar>
                <AvatarImage src={user.image} render={<Image
                    src={user.image}
                    alt={user.name}
                    width={24}
                    height={24}
                />} />
                <AvatarFallback>
                    {user.name}
                </AvatarFallback>
            </Avatar>
            <div className='flex-1 flex flex-col text-sm overflow-hidden'>
                <span className='font-bold truncate'>{user.name}</span>
                <span className='text-xs truncate'>{user.email}</span>
            </div>
            <ChevronsUpDown />
        </DropdownMenuTrigger>
    );
}
