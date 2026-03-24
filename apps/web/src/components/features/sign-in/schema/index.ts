import { z } from 'zod';

export const signInSchema = z.object({
    email: z
        .email('errors.mustBeAnEmail')
        .describe('Email address'),
    password: z
        .string()
        .min(1, 'errors.required')
        .describe('Password'),
    rememberMe: z.optional(z
        .boolean()
        .describe('Remember me'),
    ),
    recaptchaToken: z.string().describe('reCAPTCHA token'),
});

export type SignInSchema = z.infer<typeof signInSchema>;
