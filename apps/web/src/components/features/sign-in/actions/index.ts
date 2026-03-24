'use server'

import type { SignInSchema } from '../schema';

import { clientEnv } from 'env/client';

export async function signIn(payload: SignInSchema) {
    'use server'
    const target = `${clientEnv.NEXT_PUBLIC_SERVICE_URL}/api/v1/auth/login`;
    const request = await fetch(target, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...payload,
            emailOrUsername: payload.email,
        }),
    });

    const response = await request.json();
    return response;
}
