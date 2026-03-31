'use server'

import { cache } from 'react'

import { clientEnv } from 'env/client';

import { User } from './db';
import { getAccessToken } from './session-data';

export type LightweightUser = Pick<
    User,
    'id'
    | 'name'
    | 'email'
    | 'image'
    | 'emailVerified'
>;

export const getLightweightUser: () => Promise<LightweightUser | null> = cache(async () => {
    const accessToken = await getAccessToken();
    if (!accessToken) return null;

    const target = `${clientEnv.NEXT_PUBLIC_SERVICE_URL}/api/v1/users/me`;

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

    return data as LightweightUser;
});
