export const categoryKeys = {
    categoryBySlug: (slug: string) => ['category', slug],
    subcategories: (categoryId: string) => ['subcategories', categoryId] as const,
} as const;

export type CategoryKey = (typeof categoryKeys)[keyof typeof categoryKeys];
