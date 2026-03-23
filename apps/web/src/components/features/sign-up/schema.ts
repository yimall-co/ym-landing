import { z } from 'zod';

export const signUpSchema = z.object({
    name: z
        .string()
        .min(1, 'errors.required')
        .max(100, 'errors.mustBeAtMostMaxLength')
        .regex(new RegExp('^[a-zA-Z0-9 ]+$'), 'errors.mustBeAlphanumeric')
        .describe('Full name'),
    email: z
        .email('errors.mustBeAnEmail')
        .describe('Email'),
    password: z
        .string()
        .min(6, 'errors.mustBeAtLeastMinLength')
        // .regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'), 'errors.mustBeComplex')
        .describe('Password'),
    image: z.optional(z
        .url()
        .describe('Image')
    ),
    termsAndConditions: z
        .boolean()
        .refine((value) => value, 'errors.required')
        .describe('Terms and conditions'),
    newsLetter: z.optional(z
        .boolean()
        .default(false)
        .describe('News letter')
    ),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
