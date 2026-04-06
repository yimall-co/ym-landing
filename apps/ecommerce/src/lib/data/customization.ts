import 'server-only';

import { clientEnv } from 'env/client';

type CustomizationResult = {
    logo: string;
};

export async function getCustomization(workspaceId: string): Promise<any> {
    const target = new URL(`/api/v1/customizations/workspace/${workspaceId}`, clientEnv.NEXT_PUBLIC_SERVICE_URL);

    const response = await fetch(target, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'force-cache',
    });
    return response.json();
}
