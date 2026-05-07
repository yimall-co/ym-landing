export const locationKeys = {
    all: () => ['location'] as const,
} as const;

export type LocationKey = (typeof locationKeys)[keyof typeof locationKeys];
