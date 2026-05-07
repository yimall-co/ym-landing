import 'server-only';

import type { CategoryBySlug, CategoryItem } from 'lib/dtos/category';

import { clientEnv } from 'env/client';

export async function getCategories(workspaceId: string) {
    const target = new URL(`/api/v1/categories/workspace/${workspaceId}`, clientEnv.NEXT_PUBLIC_SERVICE_URL);

    const response = await fetch(target, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        cache: 'force-cache',
        next: {
            tags: ['categories'],
        },
    });

    const result = await response.json();
    return result as ServiceResponse<Array<CategoryItem>>;
}

export async function getCategoryBySlug(slug: string) {
    const target = new URL(`/api/v1/categories/slug/${slug}`, clientEnv.NEXT_PUBLIC_SERVICE_URL);

    const response = await fetch(target, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        cache: 'force-cache',
        next: {
            tags: ['category', slug],
        },
    });

    const result = await response.json();
    return result as ServiceResponse<CategoryBySlug>;
}
