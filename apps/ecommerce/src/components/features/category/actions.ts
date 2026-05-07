'use server';

import { getCategoryBySlug } from 'lib/data/category';

export async function getCategoryBySlugData(slug: string) {
    try {
        const result = await getCategoryBySlug(slug);

        const { data } = result;
        if (!data) return null;

        return data;
    } catch (error: any) {
        console.error('error', error);
        return null;
    }
}
