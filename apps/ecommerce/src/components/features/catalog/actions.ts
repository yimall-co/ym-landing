'use server';

import { clientEnv } from 'env/client';
import { getCategories } from 'lib/data/category';
import { getOffers } from 'lib/data/offer';

export async function getCategoriesData() {
    try {
        const result = await getCategories(clientEnv.NEXT_PUBLIC_WORKSPACE_ID);

        const { data } = result;
        if (!data) return null;

        return data;
    } catch (error: any) {
        console.error(error);
        return null;
    }
}

export async function getOffersData() {
    try {
        const result = await getOffers(clientEnv.NEXT_PUBLIC_WORKSPACE_ID);

        const { data } = result;
        if (!data) return null;

        return data;
    } catch (error: any) {
        console.error(error);
        return null;
    }
}
