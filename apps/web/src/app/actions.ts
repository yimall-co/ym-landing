'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function setVisited(): Promise<void> {
    'use server'
    const cookieStore = await cookies();

    const now = new Date();
    now.setFullYear(now.getFullYear() + 1);

    const visitedBefore = cookieStore.has('visited');
    if (!visitedBefore) {
        cookieStore.set({
            name: 'visited',
            value: '1',
            expires: now,
        });
    }

    redirect('/');
}

export async function setSession(payload: string, expiresAt: number) {
    'use server'
    const cookieStore = await cookies();

    const currentSession = cookieStore.get('session');
    if (currentSession?.value) {
        cookieStore.delete('session');
    }

    cookieStore.set('session', payload, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        expires: expiresAt,
    });
}

export async function setConsent() {
    'use server'
    const cookieStore = await cookies();

    const hasConsent = cookieStore.has('consent');
    if (!hasConsent) {
        const expireAt = new Date();
        expireAt.setDate(expireAt.getFullYear() + 2);

        cookieStore.set({
            name: 'consent',
            value: '1',
            expires: expireAt,
        });
    }
}

export async function getSession() {
    'use server'
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    if (!session?.value) return null;

    return JSON.parse(session.value);
}

export async function getAccessToken() {
    'use server'
    const session = await getSession();
    return session?.accessToken;
}
