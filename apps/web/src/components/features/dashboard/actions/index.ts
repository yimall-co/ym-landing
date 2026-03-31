'use server'

import { getWorkspacesByOwner } from 'lib/workspace-data';

export async function getWorkspacesByOwnerData() {
    return await getWorkspacesByOwner();
}
