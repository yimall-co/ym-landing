'use server'

import { cache } from 'react';
import { cookies } from 'next/headers';

type Session = {
    accessToken: string;
    accessTokenExpiresAt: number;
    refreshToken: string;
    refreshTokenExpiresAt: number;
};

export const getSession = cache(async () => {
    const cookieStore = await cookies();

    const session = cookieStore.get('session');
    if (!session?.value) return null;

    return JSON.parse(session.value) as Session;
});

export const getAccessToken = cache(async () => {
    const session = await getSession();
    if (!session) return null;

    return session.accessToken;
});
