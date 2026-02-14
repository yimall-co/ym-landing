import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const clientEnv = createEnv({
    client: {
        NEXT_PUBLIC_SITE_URL: z.string().min(1),
    },
    runtimeEnv: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    },
});
