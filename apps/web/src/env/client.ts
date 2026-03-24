import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const clientEnv = createEnv({
    client: {
        NEXT_PUBLIC_SITE_URL: z.string().min(1),
        NEXT_PUBLIC_CONTACT_PHONE: z.string(),
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
        NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.optional(z.string()),
        NEXT_PUBLIC_SERVICE_URL: z.url(),
    },
    runtimeEnv: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_CONTACT_PHONE: process.env.NEXT_PUBLIC_CONTACT_PHONE,
        NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        NEXT_PUBLIC_SERVICE_URL: process.env.NEXT_PUBLIC_SERVICE_URL,
    },
});
