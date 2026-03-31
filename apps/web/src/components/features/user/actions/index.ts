'use server'

import { getLightweightUser } from 'lib/user-data';

export async function getLightweightUserData() {
    'use server';

    return await getLightweightUser();
}
