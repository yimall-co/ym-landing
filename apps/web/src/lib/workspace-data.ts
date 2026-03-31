'use server'

import { cache } from 'react'

import { clientEnv } from 'env/client';

import { Workspace } from './db';
import { getAccessToken } from './session-data';

export type WorkspaceData = Pick<
    Workspace,
    'id'
    | 'name'
    | 'slug'
    // | 'description'
    // | 'tin'
    | 'createdAt'
// | 'updatedAt'
>;

export const getWorkspacesByOwner: () => Promise<Array<WorkspaceData> | null> = cache(async () => {
    const accessToken = await getAccessToken();
    if (!accessToken) return null;

    const target = `${clientEnv.NEXT_PUBLIC_SERVICE_URL}/api/v1/users/me/workspaces`;

    const request = await fetch(target, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    const response = await request.json();

    const { data } = response;
    if (!data) return null;

    return data as Array<WorkspaceData>;
});
