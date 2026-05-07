export const catalogKeys = {
    categories: () => ['categories'] as const,
    offers: () => ['offers'] as const,
} as const;

export type CatalogKey = (typeof catalogKeys)[keyof typeof catalogKeys];
