export const onboardingKeys = {
    customization: (workspaceId: string) => ['customization', workspaceId] as const,
} as const;

export type OnboardingKeys = (typeof onboardingKeys)[keyof typeof onboardingKeys];
