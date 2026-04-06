import 'server-only';

import { z } from 'zod';

import { clientEnv } from 'env/client';

const trackVisitSchema = z.object({
    source: z.enum(['web', 'mobile', 'desktop', 'qr', 'unknown']),
    userAgent: z.string(),
    ipAddress: z.nullable(z.string()),
    locale: z.nullable(z.string()),
    visitedAt: z.date(),
    onboardingStepReached: z.number().positive(),
    completeOnboarding: z.boolean(),
    isFirstVisit: z.boolean(),
    workspaceId: z.uuidv4(),
    visitorId: z.optional(z.uuidv4()),
});

type TrackVisit = z.infer<typeof trackVisitSchema>;

export async function trackVisit(data: TrackVisit) {
    const validatedFields = await trackVisitSchema.safeParseAsync(data);
    if (!validatedFields.success) {
        const errors = z.treeifyError(validatedFields.error).errors;
        return {
            errors,
        }
    }

    const target = new URL('/api/v1/tracking/visited', clientEnv.NEXT_PUBLIC_SERVICE_URL);

    const response = await fetch(target, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(validatedFields.data),
    });

    const result = await response.json();
    return result;
}
