'use client';

import Link from 'next/link';

import {
    Fragment,
    startTransition,
    useCallback,
} from 'react';
import { useTranslations } from 'next-intl';
import { useProgress } from 'react-transition-progress';
import { PackagePlus } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

import { useRouter } from 'lib/i18n';

import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator
} from '@yimall/ui';

import { useDashboardStore } from 'features/dashboard/store';
import { useWorkspacesByOwner } from 'features/dashboard/hooks';

type Props = Readonly<{}>;

export default function WorkspaceMenu({ }: Props) {
    'use memo'
    const t = useTranslations();

    const router = useRouter();
    const startProgress = useProgress();

    // TODO: handle null state
    const [selectedWorkspace, setSelectedWorkspace] = useDashboardStore(
        useShallow((state) => [state.selectedWorkspace, state.setSelectedWorkspace])
    );

    const selectedWorkspaceId = selectedWorkspace?.id ?? null;

    const { data: workspaces, isLoading: isLoadingWorkspaces } = useWorkspacesByOwner();

    const handleWorkspaceChange = useCallback((workspaceId: string) => {
        if (selectedWorkspaceId === workspaceId) return;

        const workspace = workspaces?.find((w) => w.id === workspaceId);

        setSelectedWorkspace(workspace ?? null);

        startTransition(() => {
            startProgress();

            router.push(`/dashboard/${workspace?.slug}` as any);
        });
    }, [workspaces, setSelectedWorkspace, startProgress, router, selectedWorkspaceId]);

    // TODO: review this.
    if (!workspaces) return null;

    return (
        <Fragment>
            <DropdownMenuGroup>
                <DropdownMenuLabel>{t('Workspace.availableWorkspaces')}</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={selectedWorkspace?.id ?? null} onValueChange={handleWorkspaceChange}>
                    {isLoadingWorkspaces ? (
                        <DropdownMenuRadioItem
                            value='loading'
                            className='hover:bg-foreground/10 hover:cursor-pointer'
                        >
                            {t('Workspace.loading')}
                        </DropdownMenuRadioItem>
                    ) : workspaces.map((workspace, index) => {
                        return (
                            <DropdownMenuRadioItem
                                key={`${workspace.id}-${index}`}
                                value={workspace.id}
                                className='hover:bg-foreground/10 hover:cursor-pointer'
                            >
                                {workspace.name}
                            </DropdownMenuRadioItem>
                        )
                    })}
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator className='bg-foreground/10' />
            </DropdownMenuGroup>
            <DropdownMenuItem render={<Link href={'/workspace/create'} />}>
                <PackagePlus /> {t('Workspace.create')}
            </DropdownMenuItem>
        </Fragment>
    );
}
