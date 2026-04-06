'use server'

import { cookies, headers } from 'next/headers';
import { userAgent } from 'next/server';

import { clientEnv } from 'env/client';
import { trackVisit } from 'lib/data/metrics';

export async function visited() {
    const cookieStore = await cookies();
    const requestHeaders = await headers();

    const userAgentInfo = userAgent({ headers: requestHeaders });

    try {
        const result = await trackVisit({
            source: 'web',
            userAgent: JSON.stringify(userAgentInfo),
            ipAddress: requestHeaders.get('x-forwarded-for') || null,
            locale: requestHeaders.get('x-next-intl-locale') || null,
            visitedAt: new Date(),
            onboardingStepReached: 1,
            completeOnboarding: false,
            isFirstVisit: true,
            workspaceId: clientEnv.NEXT_PUBLIC_WORKSPACE_ID,
        });

        if ('errors' in result) return null;

        const { data } = result;

        const visitId = data.visitId;

        cookieStore.set('visited', visitId, {
            maxAge: 60 * 60 * 24 * 365,
        });

        return visitId;
    } catch (error: any) {
        console.error('error', error);
        return null;
    }
}
