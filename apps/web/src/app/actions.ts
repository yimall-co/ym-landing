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
