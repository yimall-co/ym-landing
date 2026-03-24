'use server'

import type { SignUpSchema } from '../schema';

import { clientEnv } from 'env/client';
import { setSession } from 'app/actions';

export async function signUp(payload: SignUpSchema) {
    'use server'
    const target = `${clientEnv.NEXT_PUBLIC_SERVICE_URL}/api/v1/auth/sign-up`;
    const request = await fetch(target, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const response = await request.json();

    const { data } = response;
    const { refreshTokenExpiresAt } = data;

    setSession(JSON.stringify(data), refreshTokenExpiresAt);

    return response;
}
