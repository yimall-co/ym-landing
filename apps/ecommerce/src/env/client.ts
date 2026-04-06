import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const clientEnv = createEnv({
    client: {
        NEXT_PUBLIC_SITE_URL: z.url(),
        NEXT_PUBLIC_WORKSPACE_ID: z.string().min(1),
        NEXT_PUBLIC_WORKSPACE_SLUG: z.string().min(1),
        NEXT_PUBLIC_WORKSPACE_NUMBER: z.string().min(1),
        NEXT_PUBLIC_WORKSPACE_VARIANT: z.enum([
            'start',
            'center',
        ]).default('center').optional(),
        NEXT_PUBLIC_GOOGLE_MAP_ID: z.string().min(1),
        NEXT_PUBLIC_GOOGLE_API_KEY: z.string(),
        NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().optional(),
        NEXT_PUBLIC_SERVICE_URL: z.url(),
    },
    runtimeEnv: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_WORKSPACE_ID: process.env.NEXT_PUBLIC_WORKSPACE_ID,
        NEXT_PUBLIC_WORKSPACE_SLUG: process.env.NEXT_PUBLIC_WORKSPACE_SLUG,
        NEXT_PUBLIC_WORKSPACE_NUMBER: process.env.NEXT_PUBLIC_WORKSPACE_NUMBER,
        NEXT_PUBLIC_WORKSPACE_VARIANT: process.env.NEXT_PUBLIC_WORKSPACE_VARIANT,
        NEXT_PUBLIC_GOOGLE_MAP_ID: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
        NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        NEXT_PUBLIC_SERVICE_URL: process.env.NEXT_PUBLIC_SERVICE_URL,
    },
});
