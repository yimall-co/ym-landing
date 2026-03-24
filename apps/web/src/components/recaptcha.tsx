'use client';

import Script from 'next/script';

import { clientEnv } from 'env/client';

declare global {
    const grecaptcha: {
        enterprise: {
            ready: (callback: () => void) => void;
            execute: (
                siteKey: string,
                options: { action: string }
            ) => Promise<string>;
        };
    };
}

type Props = Readonly<{
    action: string;
    onRecaptcha: (token: string, action: string) => Promise<void>;
}>;

export function Recaptcha({
    action,
    onRecaptcha,
}: Props) {
    'use memo'
    const handleRecaptchaLoad = (event: any) => {
        event.preventDefault();

        if (typeof grecaptcha === 'undefined') return;

        grecaptcha.enterprise.ready(async () => {
            try {
                const token = await grecaptcha.enterprise.execute(
                    clientEnv.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
                    { action },
                );

                await onRecaptcha(token, action);
            } catch (error) {
                console.error(error);
            }
        });
    };

    return (
        <Script
            strategy='afterInteractive'
            src={`https://www.google.com/recaptcha/enterprise.js?render=${clientEnv.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            onLoad={handleRecaptchaLoad}
        />
    );
}
