import 'server-only';

import { clientEnv } from 'env/client';

import { Location } from 'lib/dtos/location';

export async function getGeolocations(workspaceId: string) {
    const target = new URL(`/api/v1/workspaces/${workspaceId}/locations`, clientEnv.NEXT_PUBLIC_SERVICE_URL);

    const response = await fetch(target, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        cache: 'force-cache',
    });

    const result = await response.json();
    return result as ServiceResponse<Array<Location>>;
}
