'use server';

import { clientEnv } from 'env/client';
import { getGeolocations } from 'lib/data/workspace';

export async function getGeolocationsData() {
    try {
        const result = await getGeolocations(clientEnv.NEXT_PUBLIC_WORKSPACE_ID);

        const { data } = result;
        if (!data || data.length === 0) return null;

        return data;
    } catch (error: any) {
        console.error('error', error);
        return null;
    }
}
