import 'server-only';

import { clientEnv } from 'env/client';

const offersMock = [
    {
        id: '1',
        slug: 'first',
        title: 'My First Product',
    },
    {
        id: '2',
        slug: 'second',
        title: 'My Second Product',
    },
];

export async function getOffers(workspaceId: string) {
    const target = new URL(`/api/v1/offers/workspace/${workspaceId}`, clientEnv.NEXT_PUBLIC_SERVICE_URL);

    // const response = await fetch(target, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //     },
    //     cache: 'force-cache',
    //     next: {
    //         tags: ['offers'],
    //     },
    // });

    // const result = await response.json();
    // return result as ServiceResponse<Array<any>>;
    return {
        data: offersMock,
        success: true,
        message: 'Offers fetched successfully',
    };
}
