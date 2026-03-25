'use server'

import { clientEnv } from 'env/client';

import { getAccessToken } from 'app/actions';

export async function getWorkspacesByUser() {
    'use server'
    const target = `${clientEnv.NEXT_PUBLIC_SERVICE_URL}/api/v1/users/me/workspaces`;

    const accessToken = await getAccessToken();
    const request = await fetch(target, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    const response = await request.json();
    return response;
}
