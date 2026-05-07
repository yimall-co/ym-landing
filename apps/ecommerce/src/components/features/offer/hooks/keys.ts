export const offerKeys = {
    offerBySlug: (slug: string) => ['offer', slug] as const,
} as const;

export type OfferKey = (typeof offerKeys)[keyof typeof offerKeys];
