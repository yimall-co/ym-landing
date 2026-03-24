'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function visited(): Promise<void> {
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
