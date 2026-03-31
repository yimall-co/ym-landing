'use client'

import Link from 'next/link';

import { WorkspaceData } from 'lib/workspace-data';

import { Article } from '@yimall/ui';

type Props = Readonly<{
    workspace: WorkspaceData;
}>;

export default function DashboardWorkspaceCard({ workspace }: Props) {
    'use memo'
    const target = `/dashboard/${workspace.slug}`;

    return (
        <Article className='w-full flex h-48 bg-foreground/5 rounded-xl cursor-pointer hover:bg-foreground/10 transition-colors duration-200'>
            <Link
                prefetch
                href={target}
                className='flex-1 flex flex-col p-4 gap-4'
            >
                {workspace.name}
            </Link>
        </Article>
    );
}
