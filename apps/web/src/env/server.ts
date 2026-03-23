import { z } from 'zod';
import { createEnv, } from '@t3-oss/env-nextjs';

export const serverEnv = createEnv({
    server: {
        RECAPTCHA_SITE_KEY: z.string(),
        RECAPTCHA_SECRET_KEY: z.string(),
    },
    experimental__runtimeEnv: process.env,
})
